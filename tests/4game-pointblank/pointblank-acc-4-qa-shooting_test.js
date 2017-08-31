Feature("pointblank-acc-4-qa-shooting. Тесты для страницы Тир удачи.");

var games = require('../../data/games');

BeforeSuite((I) => {
    I.syncDown('4game-pointblank', "acc-4-qa-shooting");
});

Before((I, pointblankRatingsPage, genericPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(pointblankRatingsPage.url);
    I.seeInTitle(pointblankRatingsPage.title);
    I.waitForElement(genericPage.userBar);
});

AfterSuite((I) => {
    I.createTar('4game-pointblank', "acc-4-qa-shooting");
    I.syncUp('4game-pointblank', "acc-4-qa-shooting");
    I.clearDir('4game-pointblank', "acc-4-qa-shooting");
})

Scenario("Проверяем верстку страницы", (I, pointblankShootingPage) => {
    I.amOnPage(pointblankShootingPage.url);
    I.seeInTitle(pointblankShootingPage.title);
    I.checkLayout('main', [{
            name: 'body',
            elem: pointblankShootingPage.content,
            exclude: pointblankShootingPage.exclude,
        }],
        0.05,
        '4game-pointblank', "acc-4-qa-shooting");
});

Scenario("Проверяем кнопку Стрелять за 30р", (I, pointblankShootingPage, genericPage) => {
    I.amOnPage(pointblankShootingPage.url);
    I.seeInTitle(pointblankShootingPage.title);
    if (I.seeElement(pointblankShootingPage.errorMessage)) {
        I.waitForText(pointblankShootingPage.buyButtonText);
        I.waitForElement(pointblankShootingPage.buyButtonDisabled);
    } else {
        I.waitForText(pointblankShootingPage.buyButtonText);
        I.waitForElement(pointblankShootingPage.buyButton);
        I.click(pointblankShootingPage.buyButton);
        I.waitForElement(genericPage.authPopup);
    };
});

Scenario("Проверяем, что без персонажа стрелять нельзя", function*(I, pointblankShootingPage) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, pointblankShootingPage.url);
    I.waitForVisible(pointblankShootingPage.buyButtonDisabled);
    I.waitForVisible(pointblankShootingPage.errorMessage);
    I.waitForText(pointblankShootingPage.noCharacterText, pointblankShootingPage.timeout, pointblankShootingPage.errorMessage)
});

xScenario("Проверяем, что с персонажем стрелять можно", function*(I, pointblankShootingPage, legalPage) {
    //TODO: добить проверку того, что стрелять можно
    //Можно будет сделать после того как разберемся с лицензиями, пока тест нерабочий
    var user = yield I.createUser();
    I.createServiceAccount(user.id, games.Pointblank.serviceId)
    I.sendGameLogin(user.id, games.Pointblank.serviceId, "0")
    I.createCharacterWithRandomNickname(user.id, games.Pointblank.serviceId);
    I.addRubles(user.id, "100");
    I.acceptLicense(user.id, games.Pointblank.serviceId, "1")
    I.acceptLicenceAgreementsForGame(user.id, games.Pointblank)
    I.amOnPageForAuthUser(user, pointblankShootingPage.url);
    I.waitForVisible(pointblankShootingPage.buyButton);
    I.waitForText(pointblankShootingPage.buyButtonText, pointblankShootingPage.timeout, pointblankShootingPage.buyButton);
    I.click(pointblankShootingPage.buyButton)
    I.waitForVisible(legalPage.licencePopup.locator);
    I.switchTo(legalPage.licencePopup.iframe);
    I.waitAndClick(legalPage.licencePopup.button)
    I.switchTo();
    I.waitForVisible(pointblankShootingPage.collimatorImage);
    I.click(pointblankShootingPage.collimatorImage)
    pause();
    I.click(pointblankShootingPage.collimatorImage)
});
