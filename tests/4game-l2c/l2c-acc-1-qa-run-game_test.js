Feature("l2c-acc-1-qa-run-game_test. Тесты запуска l2cl");

var games = require('../../data/games');

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

Scenario("Проверяем, что для запуска нужна подписка и сб", function*(I, gamePanelPage, premiumPopup) {
    var user = yield I.createUser();
    I.addRubles(user.id, "1000");
    I.amOnPageForAuthUser(user, games.Lineage2classic.play_url);
    I.waitForVisible(gamePanelPage.index.locators.main_section);
    I.makeInstalledGame(games.Lineage2classic.serviceId);
    I.setGameMaintenanceFor(games.Lineage2classic.serviceId, false)
    I.waitForVisible(gamePanelPage.index.locators.buttons.play_blocked.locator)
    I.waitForVisible(gamePanelPage.buttons.buySubscription);
    I.waitAndClick(gamePanelPage.buttons.switchUbersecurityOn);
    I.waitInUrl("/settings/security/", gamePanelPage.timeout)
    I.setSuperSecurityON(user.id);
    I.amOnPage(games.Lineage2classic.play_url)
    I.waitForVisible(gamePanelPage.index.locators.main_section);
    I.makeInstalledGame(games.Lineage2classic.serviceId);
    I.setGameMaintenanceFor(games.Lineage2classic.serviceId, false)
    I.waitForVisible(gamePanelPage.index.locators.buttons.play_blocked.locator)
    I.waitForVisible(gamePanelPage.buttons.buySubscription);
    I.dontSeeElement(gamePanelPage.buttons.switchUbersecurityOn);
    I.click(gamePanelPage.buttons.buySubscription)
    I.acceptLicenseIfPresents()
    I.waitInUrl(premiumPopup.url, gamePanelPage.timeout)
    I.setGameMaintenanceFor(games.Lineage2classic.serviceId, false)
    I.waitAndClick(premiumPopup.buyButton)
    I.waitForVisible(gamePanelPage.index.locators.main_section);
    I.makeInstalledGame(games.Lineage2classic.serviceId);
    I.setGameMaintenanceFor(games.Lineage2classic.serviceId, false)
    I.waitForVisible(gamePanelPage.index.locators.buttons.play.locator);
});
