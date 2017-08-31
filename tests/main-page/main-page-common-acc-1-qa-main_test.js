Feature("main-page-common-acc-1-qa-main. Тесты главной страницы фогейма");

var games = require('../../data/games');
var mobile = require('../../data/mobile');
var hits = require('../../data/hits');
var config = require('../../codecept.conf').config

Before((I) => {
    I.closeTabsExceptForOne();
    I.clearCookie();
    I.amOnPage("/");
});

Scenario("Проверяем переключение c MMO на Мобилки", function*(I, mainPage) {
    I.waitForVisible(mainPage.toogleDesktopGames);
    I.seeCheckboxIsChecked(mainPage.toogleDesktopGamesCheck);
    I.waitAndClick(mainPage.toogleMobileGames);
    I.seeCheckboxIsChecked(mainPage.toogleMobileGamesCheck);
    I.waitForVisible(mainPage.gameCell.replace("%s", mobile[config.testMobileGame].serviceId))
});

Scenario("Проверяем переключение c MMO на Хиты", function*(I, mainPage) {
    I.waitForVisible(mainPage.toogleDesktopGames);
    I.seeCheckboxIsChecked(mainPage.toogleDesktopGamesCheck);
    I.waitAndClick(mainPage.toogleHitsGames);
    I.seeCheckboxIsChecked(mainPage.toogleHitsGamesCheck);
    I.waitForVisible(mainPage.gameCell.replace("%s", hits[config.testHitsGame].serviceId))
});

Scenario("Проверяем переход на /play с плитки", function*(I, mainPage) {
    I.waitForVisible(mainPage.gameCell.replace("%s", games[config.testGame].serviceId));
    I.wait(5);
    I.makeInstalledGame(games[config.testGame].serviceId);
    I.click(mainPage.gameCell.replace("%s", games[config.testGame].serviceId));
    I.waitInUrl(games[config.testGame].play_url, mainPage.timeout);
});

Scenario("Проверяем переход на /install с плитки", function*(I, mainPage) {
    //Ставим куку для пб, чтобы нас гарантированно кидало на install, а не на лэндинг
    I.clearCookie('pb-landing-flow');
    I.clearCookie('pb-landing-ab-test');
    I.setCookieWithoutDot('pb-landing-flow', "2", "/pointblank/");
    I.setCookieWithoutDot('pb-landing-ab-test', "2", "/pointblank/");
    I.waitForVisible(mainPage.gameCell.replace("%s", games[config.testGame].serviceId));
    I.wait(5);
    I.makeNotInstalledGame(games[config.testGame].serviceId);
    I.click(mainPage.gameCell.replace("%s", games[config.testGame].serviceId));
    I.waitInUrl(games[config.testGame].install_url, mainPage.timeout);
});

Scenario("Проверяем прогресс установки на плитке", function*(I, mainPage) {
    I.waitForVisible(mainPage.gameCell.replace("%s", games[config.testGame].serviceId));
    I.wait(5);
    I.makeInProgressGame(games[config.testGame].serviceId);
    I.waitForVisible(mainPage.gameCellProgressBar.replace("%s", games[config.testGame].serviceId));
    I.waitForVisible(mainPage.gameCellGameTitle.replace("%s", games[config.testGame].serviceId));
    I.waitForText(games[config.testGame].name, mainPage.timeout, mainPage.gameCellGameTitle.replace("%s", games[config.testGame].serviceId));
    I.waitForVisible(mainPage.gameCellProgressStatus.replace("%s", games[config.testGame].serviceId));
    I.waitForText("Установка:", mainPage.timeout, mainPage.gameCellProgressStatus.replace("%s", games[config.testGame].serviceId));
});

Scenario("Проверяем статус паузы на плитке", function*(I, mainPage) {
    I.waitForVisible(mainPage.gameCell.replace("%s", games[config.testGame].serviceId));
    I.wait(5);
    I.makePauseInGameInstall(games[config.testGame].serviceId);
    I.waitForVisible(mainPage.gameCellProgressBar.replace("%s", games[config.testGame].serviceId));
    I.waitForVisible(mainPage.gameCellGameTitle.replace("%s", games[config.testGame].serviceId));
    I.waitForText(games[config.testGame].name, mainPage.timeout, mainPage.gameCellGameTitle.replace("%s", games[config.testGame].serviceId));
    I.waitForVisible(mainPage.gameCellProgressStatus.replace("%s", games[config.testGame].serviceId));
    I.waitForText("Установка (на паузе):", mainPage.timeout, mainPage.gameCellProgressStatus.replace("%s", games[config.testGame].serviceId));
});

Scenario("Проверяем статус распаковки на плитке", function*(I, mainPage) {
    I.waitForVisible(mainPage.gameCell.replace("%s", games[config.testGame].serviceId));
    I.wait(5);
    I.makeUnpackingGame(games[config.testGame].serviceId);
    I.waitForVisible(mainPage.gameCellProgressBar.replace("%s", games[config.testGame].serviceId));
    I.waitForVisible(mainPage.gameCellGameTitle.replace("%s", games[config.testGame].serviceId));
    I.waitForText(games[config.testGame].name, mainPage.timeout, mainPage.gameCellGameTitle.replace("%s", games[config.testGame].serviceId));
    I.waitForVisible(mainPage.gameCellProgressStatus.replace("%s", games[config.testGame].serviceId));
    I.waitForText("Установка:", mainPage.timeout, mainPage.gameCellProgressStatus.replace("%s", games[config.testGame].serviceId));
    I.waitForText("Распаковка файлов", mainPage.timeout, mainPage.gameCellProgressBarStatus.replace("%s", games[config.testGame].serviceId));
});

Scenario("Проверяем кнопку установить на плитке", function*(I, mainPage, installGamePopup) {
    I.waitForVisible(mainPage.gameCell.replace("%s", games[config.testGame].serviceId));
    I.wait(5);
    I.makeNotInstalledGame(games[config.testGame].serviceId);
    I.moveCursorTo(mainPage.gameCellHover.replace("%s", games[config.testGame].serviceId));
    I.waitAndClick(mainPage.buttonInstall.replace("%s", games[config.testGame].serviceId));
    I.waitForVisible(installGamePopup.popup);
    I.waitForVisible(installGamePopup.checkAgreeLicence);
    I.waitForVisible(installGamePopup.buttonBeginInstall)
});
