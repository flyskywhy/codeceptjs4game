Feature("4game-legal-acc-1-qa-licence. Проверка, что лицензии игр отдаются");

var games = require('../../data/games');

Before((I) => {
    I.closeTabsExceptForOne();
    I.clearCookie();
});

Object.keys(games).forEach(function(game) {
    if (game != "default_game" && game != "Drakensang") {
        Scenario("Проверка лицензионного соглашения " + game, function*(I, legalPage) {
            I.amOnPage("/licence/view/serviceId/" + games[game].serviceId + "/type/2/");
            I.waitForVisible(legalPage.locators[game].licenceText);
            I.waitForText(games[game].name, legalPage.timeout, legalPage.locators[game].licenceText);
            I.waitForVisible(legalPage.locators[game].licenceHeader);
            I.waitForText(games[game].licenceHeader, legalPage.timeout, legalPage.locators[game].licenceHeader);
        });

        Scenario("Проверка пользовательского соглашения " + game, function*(I, legalPage) {
            I.amOnPage("/licence/view/serviceId/" + games[game].serviceId + "/type/1/");
            I.waitForVisible(legalPage.locators[game].userAgreementText);
            I.waitForText(games[game].name, legalPage.timeout, legalPage.locators[game].userAgreementText);
            I.waitForVisible(legalPage.locators[game].userAgreementHeader);
            I.waitForText(games[game].userAgreementHeader, legalPage.timeout, legalPage.locators[game].userAgreementHeader);
        });
    }
});

Scenario("Проверка лицензионного соглашения Drakensang", function*(I, legalPage) {
    I.amOnPage("/licence/view/serviceId/32/type/2/");
    I.waitForVisible(legalPage.locators.Drakensang.licenceText);
    I.waitForText("Drakensang Online", legalPage.timeout, legalPage.locators.Drakensang.licenceText);
    I.waitForVisible(legalPage.locators.Drakensang.licenceHeader);
    I.waitForText("Лицензионное соглашение", legalPage.timeout, legalPage.locators.Drakensang.licenceHeader);
});

Scenario("Проверка пользовательского соглашения Drakensang", function*(I, legalPage) {
    I.amOnPage("/licence/view/serviceId/32/type/1/");
    I.waitForVisible(legalPage.locators.Drakensang.userAgreementHeader);
    I.waitForText("Общие условия Пользовательского соглашения Bigpoint S.à.r.l. and Co, SCS (далее «Bigpoint»)", legalPage.timeout, legalPage.locators.Drakensang.userAgreementHeader);
    I.seeInCurrentUrl("https://legal.bigpoint.com/RU/terms-and-conditions/ru");
});
