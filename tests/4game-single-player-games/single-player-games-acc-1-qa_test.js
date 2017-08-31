var spgs = require('../../data/hits');
var defaultGameName = require('../../codecept.conf').config.testHitsGame;
var game = spgs[defaultGameName];

var editions = [];
var mailTitle;

for (edt in game.editions) {
    editions.push(game.editions[edt]);
}

if (game.status !== 'preorder') {
    mailTitle = 'Спасибо за покупку ' + game.name;
} else {
    mailTitle = 'Спасибо за предзаказ ' + game.name;
}

Feature('single-player-games-acc-1-qa. Сингл-плеерные игры');

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

Scenario('Правильные тайтл и мета-дескрипшены', function*(I, genericPage, spgPage) {
    I.amOnPage(game.url);
    I.seeInTitle(game.title);
    I.checkAttributeValue('meta[name="description"]', 'content', game.description);
    I.checkAttributeValue('meta[property="og:description"]', 'content', game.ogdescription);
});

Scenario('Правильная платформа игры над кнопкой Купить', (I, genericPage, spgPage) => {
    I.amOnPage(game.url);
    I.waitForVisible(spgPage.priceDiv, 30);
    I.seeElement(spgPage.platformMessage.icon[game.platform]);
    I.see(game.platform, spgPage.platformMessage.css);
});

Scenario('Игра есть в юзербаре', (I, genericPage, spgPage, userbar) => {
    I.amOnPage(game.url);
    I.waitForVisible(genericPage.barSpgLink, 30);
    I.seeElement(userbar.gameIcon.replace('%s', game.serviceId));
});

Scenario('Плитка игры есть на главной странице', (I) => {
    I.amOnPage('/?hits');
    I.see(game.name);
});

Scenario('Правильные цены для всех изданий', (I, genericPage, spgPage) => {
    I.amOnPage(game.url);
    I.waitForVisible(spgPage.priceDiv, 30);
    I.waitForVisible(spgPage.buttonBuy.active, 30);
    spgPage.verifyGamePrices(game);
});

editions.forEach((edition) => {
    Scenario((game.name + ' покупка без скидки ' + edition.name), function*(I, genericPage, spgPage) {
        var user = yield I.createUser();
        I.setBalance(user.id, 10000, 0);
        I.amOnPage('/404');
        I.setLoginCookieFor(user.email, user.password);
        I.amOnPage(game.url);
        I.waitForVisible(spgPage.priceDiv, 30);
        I.waitForVisible(genericPage.barBalance, 30);

        var oldBalance = yield parseInt(I.grabTextFrom(genericPage.barBalance));
        var newBalance = oldBalance - edition.price.full + edition.price.bonus;
        spgPage.buy(edition);
        spgPage.checkGamePurchaseIsDone(game);
        I.see(newBalance, genericPage.barBalance);
    });

    Scenario((game.name + ' покупка со скидкой ' + edition.name), function*(I, genericPage, spgPage) {
        var user = yield I.createUser();
        I.setBalance(user.id, 10000, 0);
        I.amOnPage('/404');
        I.setLoginCookieFor(user.email, user.password);
        I.amOnPage(game.url);
        I.waitForVisible(spgPage.priceDiv, 30);
        I.waitForVisible(genericPage.barBalance, 30);

        var oldBalance = yield parseInt(I.grabTextFrom(genericPage.barBalance));
        var newBalance = oldBalance - edition.price.discount;
        spgPage.buyWithDiscount(edition);
        spgPage.checkGamePurchaseIsDone(game);
        I.see(newBalance, genericPage.barBalance);
    });

});

Scenario('Письмо с бонусами приходит', function*(I, spgPage, genericPage) {
    var user = yield I.createUser();
    I.setBalance(user.id, 10000, 0);
    I.buyGameUsingApi(game.editions.standard.id, user);
    I.wait(15);
    I.amOnPage('http://notify.qa.inn.ru/maildata/' + user.email + '.htm');
    I.see(mailTitle);
    I.see('Subject: ' + mailTitle);
    I.see('Деньги на твой счет');
    I.see('+' + game.editions.standard.price.bonus);
});

Scenario('Письмо без бонусов приходит', function*(I, spgPage, genericPage) {
    var user = yield I.createUser();
    I.setBalance(user.id, 10000, 0);
    I.buyGameUsingApi(game.editions.standard.id, user, true);
    I.wait(15);
    I.amOnPage('http://notify.qa.inn.ru/maildata/' + user.email + '.htm');
    I.see(mailTitle);
    I.see('Subject: ' + mailTitle);
    I.dontSee('Деньги на твой счет');
    I.dontSee('+' + game.editions.standard.price.bonus);
});

Scenario('Все скидочные коды для игры работают', (I, genericPage, spgPage) => {
    game.codes.forEach((code) => {
        I.amOnPage(game.url); //Это временно, пока есть баг для игр с одним изданием
        I.waitForVisible(spgPage.promoCodeLink, 30);
        I.click(spgPage.promoCodeLink);
        I.waitForVisible(spgPage.promoCodeField, 30);
        I.fillField(spgPage.promoCodeField, code);
        I.waitForVisible(spgPage.promoCodeSuccess, 10);
        I.waitForVisible(spgPage.priceDivDiscount, 10);
        //I.click(spgPage.promoCodeClear);
        //I.waitToHide(spgPage.promoCodeSuccess, 5);
        //I.waitToHide(spgPage.priceDivDiscount, 5);
    });
});

if (game.status !== 'preorder') {
    Scenario('Правильная платформа на странице кодов', function*(I, genericPage, spgPage) {
        var user = yield I.createUser();
        I.setBalance(user.id, 10000, 0);
        I.buyGameUsingApi(game.editions.standard.id, user);
        I.amOnPage('/404');
        I.setLoginCookieFor(user.email, user.password);
        I.amOnPage(game.url + '/codes');
        I.waitForVisible(spgPage.codesPage.codeInstructionLink, 30);
        I.click(spgPage.codesPage.codeInstructionLink);
        I.see(game.platform, spgPage.codesPage.platformLink);
    });
}

Scenario('Правильная рекомендованная игра на странице кодов', function*(I, genericPage, spgPage) {
    var user = yield I.createUser();
    I.setBalance(user.id, 10000, 0);
    var recommendedGame = spgs[game.recommendedGame];
    var recomLink = spgPage.codesPage.recommendedLink(recommendedGame.url);
    I.buyGameUsingApi(game.editions.standard.id, user);
    I.amOnPage('/404');
    I.setLoginCookieFor(user.email, user.password);
    I.amOnPage(game.url + 'codes');
    I.waitForVisible(recomLink, 30);
    I.see(recommendedGame.name, recomLink);
});

Scenario('Тултип с призами показывается', (I, genericPage, spgPage) => {
    I.amOnPage(game.url);
    I.waitForVisible(spgPage.prizeLink, 30);
    I.click(spgPage.prizeLink);
    I.seeElement(spgPage.prizeTooltip);
});

Scenario('Ссылка на страницу кодов и обратно', function*(I, genericPage, spgPage) {
    var user = yield I.createUser();
    I.setBalance(user.id, 10000, 0);
    I.buyGameUsingApi(game.editions.standard.id, user);
    I.amOnPage('/404');
    I.setLoginCookieFor(user.email, user.password);
    I.amOnPage(game.url);
    I.waitForVisible(spgPage.codesLink, 30);
    I.click(spgPage.codesLink);
    I.seeInCurrentUrl(game.url + 'codes');
    I.waitForVisible(spgPage.codesPage.goBackLink, 30);
    I.click(spgPage.codesPage.goBackLink);
    I.seeInCurrentUrl(game.url);
    I.dontSeeInCurrentUrl('/codes');
});

xScenario('Navigation order is correct');
xScenario('"Copy" button for serial and giftcode work');

//Для этой всей херни нужна техническая возможность
xScenario('Preorder stuff on the game page');
xScenario('Preorder stuff disappears at the release date');
xScenario('Purchase button is inactive when there\'re no more keys');
xScenario('"Oops, something\'s wrong" is displayed on error');
xScenario('"Retrieving the key" is displayed');
