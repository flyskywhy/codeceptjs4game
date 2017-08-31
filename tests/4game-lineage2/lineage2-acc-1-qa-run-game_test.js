Feature("lineage2-acc-1-qa-run-game. Тесты запуска l2ru");

var games = require('../../data/games');

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

Scenario("Проверяем, что для запуска не нужна сб", function*(I, gamePanelPage) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, games.Lineage2.play_url);
    I.waitForVisible(gamePanelPage.index.locators.main_section);
    I.makeInstalledGame(games.Lineage2.serviceId);
    I.setGameMaintenanceFor(games.Lineage2.serviceId, false)
    I.waitForVisible(gamePanelPage.index.locators.buttons.play.locator);
});
