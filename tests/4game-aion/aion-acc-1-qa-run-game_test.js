Feature("aion-acc-1-qa-run-game_test. Тесты запуска aion");

var games = require('../../data/games');

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

Scenario("Проверяем, что для запуска не нужен телефон", function*(I, gamePanelPage, premiumPopup) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, games.Aion.play_url);
    I.waitForVisible(gamePanelPage.index.locators.main_section);
    I.makeInstalledGame(games.Aion.serviceId);
    I.setGameMaintenanceFor(games.Aion.serviceId, false)
    I.waitForVisible(gamePanelPage.index.locators.buttons.play.locator);
});

xScenario("Проверяем, что для запуска с премиумом нужен телефон", function*(I, gamePanelPage, premiumPopup, pagattiPopup) {
    //TODO: отрефакторить, когда появятся нужные методы и разберемся с попапом лицензий
    // Надо завернуть покупку премиума в метод и убрать попап лицензий
    // до этого момента тест не очень стабильный
    var user = yield I.createUser();
    I.addRubles(user.id, "3000");
    I.amOnPageForAuthUser(user, games.Aion.play_url);
    I.setCookieWithoutDot("promoPopupShowed__9__" + user.id, "1", "/")
    I.waitForVisible(gamePanelPage.index.locators.main_section);
    I.makeInstalledGame(games.Aion.serviceId);
    I.setGameMaintenanceFor(games.Aion.serviceId, false)
    I.waitAndClick(gamePanelPage.buttons.buySubscription);
    I.acceptLicenseIfPresents(30)
    I.waitInUrl(premiumPopup.url, gamePanelPage.timeout)
    I.makeInstalledGame(games.Aion.serviceId);
    I.setGameMaintenanceFor(games.Aion.serviceId, false)
    I.waitAndClick(premiumPopup.buttonBuy)
    I.waitToHide(premiumPopup.buttonBuy, premiumPopup.timeout)
    I.refreshPage();
    I.waitForVisible(gamePanelPage.index.locators.main_section);
    I.makeInstalledGame(games.Aion.serviceId);
    I.setGameMaintenanceFor(games.Aion.serviceId, false)
    I.waitForVisible(gamePanelPage.index.locators.buttons.play_blocked.locator)
    I.waitForVisible(gamePanelPage.buttons.addMobile);
    I.waitAndClick(gamePanelPage.buttons.switchUbersecurityOn);
    I.waitInUrl("/settings/security/", gamePanelPage.timeout)
    I.setSuperSecurityON(user.id);
    I.amOnPage(games.Aion.play_url)
    I.waitForVisible(gamePanelPage.index.locators.main_section);
    I.makeInstalledGame(games.Aion.serviceId);
    I.setGameMaintenanceFor(games.Aion.serviceId, false)
    I.waitForVisible(gamePanelPage.index.locators.buttons.play_blocked.locator)
    I.waitForVisible(gamePanelPage.buttons.addMobile);
    I.dontSeeElement(gamePanelPage.buttons.switchUbersecurityOn);
    I.click(gamePanelPage.buttons.addMobile)
    I.waitInUrl("?popupWidget=SetContactWidget&contactType=3", gamePanelPage.timeout)
    I.addRandomMobileNumber(user.id)
    I.amOnPage(games.Aion.play_url)
    I.waitForVisible(gamePanelPage.index.locators.main_section);
    I.makeInstalledGame(games.Aion.serviceId);
    I.setGameMaintenanceFor(games.Aion.serviceId, false)
    I.waitForVisible(gamePanelPage.index.locators.buttons.play.locator);
});
