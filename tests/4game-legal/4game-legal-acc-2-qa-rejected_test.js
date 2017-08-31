Feature("4game-legal-acc-2-qa-rejected. Проверка попапа перепринятия лицензии");

var games = require('../../data/games');
var config = require('../../codecept.conf').config

Before((I) => {
    I.closeTabsExceptForOne();
    I.clearCookie();
});

Scenario("Проверка перепринятия лицензии 4game", function*(I, legalPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(games[config.testGame].play_url);
    I.waitForVisible(legalPage.licencePopup.locator);
    I.switchTo(legalPage.licencePopup.iframe);
    legalPage.validateLicencePopup();
    I.amOnPage("/");
    I.waitForVisible(legalPage.licencePopup.locator);
    I.amOnPage(games[config.testGame].play_url);
    I.waitForVisible(legalPage.licencePopup.locator);
    I.switchTo(legalPage.licencePopup.iframe);
    I.waitForVisible(legalPage.licencePopup.button);
    I.waitForText(legalPage.licencePopup.text.button, legalPage.timeout, legalPage.licencePopup.button);
    I.click(legalPage.licencePopup.button);
    I.refreshPage();
    I.dontSeeElement(legalPage.licencePopup.locator);
});
