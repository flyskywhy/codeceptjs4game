Feature("userbar-common-acc-3-qa-navigation. Тесты навигации в юзербаре");

var games = require('../../data/games');
var config = require('../../codecept.conf').config

Before((I) => {
    I.closeTabsExceptForOne();
    I.clearCookie();
});

Scenario("Проверяем позицию установленной игры без плагина", function*(I, userbar) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, games[config.testGame].play_url);
    I.makeInstalledGame(games[config.testGame].serviceId)
    I.waitForVisible(userbar.gameInstalled.replace("%s", games[config.testGame].serviceId))
});

Scenario("Проверяем что игра меняет положение из неустановленных в установленные", function*(I, userbar) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, games[config.testGame].play_url);
    I.makeNotInstalledGame(games[config.testGame].serviceId)
    I.waitForVisible(userbar.gameUninstalled.replace("%s", games[config.testGame].serviceId))
    I.makeInstalledGame(games[config.testGame].serviceId)
    I.waitForVisible(userbar.gameInstalled.replace("%s", games[config.testGame].serviceId))
});

Scenario("Проверяем навигацию в попапе платежей", function*(I, userbar) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    userbar.checkBallancePopupNavigationFor(games[config.testGame].play_url, userbar.ballancePopup.linkGiftCode, ".com/giftcode/");
    userbar.checkBallancePopupNavigationFor(games[config.testGame].play_url, userbar.ballancePopup.linkCredit, ".com/licence/credit/");
    userbar.checkBallancePopupNavigationFor(games[config.testGame].play_url, userbar.ballancePopup.replenish, games[config.testGame].play_url + "?popupWidget=PaymentTerminalWidget");
});

Scenario("Проверяем переход на страницу install по иконке", function*(I, userbar) {
    I.amOnPage(games[config.testGame].play_url);
    //Ставим куку для пб, чтобы нас гарантированно кидало на install, а не на лэндинг
    I.clearCookie('pb-landing-flow');
    I.clearCookie('pb-landing-ab-test');
    I.setCookieWithoutDot('pb-landing-flow', "2", "/pointblank/");
    I.setCookieWithoutDot('pb-landing-ab-test', "2", "/pointblank/");
    I.makeNotInstalledGame(games[config.testGame].serviceId)
    I.waitAndClick(userbar.gameUninstalled.replace("%s", games[config.testGame].serviceId))
    I.waitInUrl(games[config.testGame].install_url, userbar.timeout);
});

Scenario("Проверяем тултип игры, у которой установка в прогрессе", function*(I, userbar) {
    I.amOnPage(games[config.testGame].play_url);
    I.makeInProgressGame(games[config.testGame].serviceId)
    I.waitForVisible(userbar.badgeProgress.replace("%s", games[config.testGame].serviceId));
    I.moveCursorTo(userbar.gameInstalled.replace("%s", games[config.testGame].serviceId));
    I.waitForVisible(userbar.progressTooltip.replace("%s", games[config.testGame].serviceId));
});

Scenario("Проверяем навигацию в userData", function*(I, userbar) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    userbar.checkUserDataPopupNavigationFor(games[config.testGame].play_url, userbar.userDataPopup.linkSettings, ".com/settings/");
    userbar.checkUserDataPopupNavigationFor(games[config.testGame].play_url, userbar.userDataPopup.linkPersonalData, ".com/settings/personal/");
    userbar.checkUserDataPopupNavigationFor(games[config.testGame].play_url, userbar.userDataPopup.linkNotifications, ".com/settings/notifications/");
    userbar.checkUserDataPopupNavigationFor(games[config.testGame].play_url, userbar.userDataPopup.linkEvents, ".com/events/");
    userbar.checkUserDataPopupNavigationFor(games[config.testGame].play_url, userbar.userDataPopup.linkSecurity, ".com/settings/security/");
    userbar.checkUserDataPopupNavigationFor(games[config.testGame].play_url, userbar.userDataPopup.superSecurityOn, ".com/settings/security/");
    userbar.checkUserDataPopupNavigationFor(games[config.testGame].play_url, userbar.userDataPopup.linkLogout, ".com" + games[config.testGame].play_url);
    I.waitForVisible(userbar.barAchievementLink);
    I.dontSeeElement(userbar.userDataArrow);
});

Scenario("Проверяем желтый бордер у активной игры", function*(I, userbar) {
    I.amOnPage(games[config.testGame].play_url);
    I.waitForVisible(userbar.yellowBorderForActiveGame.replace("%s", games[config.testGame].serviceId));
});

Scenario("Проверяем ссылку на 4gamer", function*(I, userbar) {
    userbar.check4gamerLinkFor(games[config.testGame].play_url);
    userbar.check4gamerLinkFor(games[config.testGame].install_url);
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    userbar.check4gamerLinkFor(games[config.testGame].play_url);
    userbar.check4gamerLinkFor(games[config.testGame].install_url);
});

Scenario("Проверяем все бэйджи у игры в юзербаре", function*(I, userbar) {
    I.amOnPage(games[config.testGame].play_url);
    I.makeNotUpdatedGame(games[config.testGame].serviceId);
    I.waitForVisible(userbar.badgeUpdateRequired.replace("%s", games[config.testGame].serviceId));
    I.makePauseInGameInstall(games[config.testGame].serviceId);
    I.waitForVisible(userbar.badgePaused.replace("%s", games[config.testGame].serviceId));
    I.makeRepairGame(games[config.testGame].serviceId);
    I.waitForVisible(userbar.badgeProgress.replace("%s", games[config.testGame].serviceId));
    I.makeInstalledGame(games[config.testGame].serviceId)
    I.setGameMaintenanceFor(games[config.testGame].serviceId, 'true')
    I.waitForVisible(userbar.badgeMaintenance.replace("%s", games[config.testGame].serviceId));
    //TODO: добавить бейдж ошибки, когда его пофиксят
});

Scenario("Выставляем профилактику для всех игр", function*(I, userbar) {
    I.amOnPage(games[config.testGame].play_url);
    I.setInstalledForAllGames(games);
    I.setMaintForAllGames(games);
    userbar.checkAllGamesHaveMaint(games)
});

Scenario("Проверяем, что все игры представлены в юзербаре", function*(I, userbar) {
    I.amOnPage(games[config.testGame].play_url);
    userbar.checkAllGamesAreInUserbar(games)
});

Scenario("Проверяем, что установленные игры в куках находятся в правильной секции юзербара", function*(I, userbar) {
    I.amOnPage(games[config.testGame].play_url);
    var cookies = yield I.grabCookie();
    userbar.checkInstalledGamesByCookie(cookies)
});
