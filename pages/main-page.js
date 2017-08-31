'use strict';

let I;
let assert = require('assert');

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    timeout: 30,

    toogleDesktopGames: "//li[.//input[@id='platform_mmo_trigger']]",
    toogleMobileGames: "//li[.//input[@id='platform_mobile_trigger']]",
    toogleHitsGames: "//li[.//input[@id='platform_hits_trigger']]",
    toogleDesktopGamesCheck: "#platform_mmo_trigger",
    toogleMobileGamesCheck: "#platform_mobile_trigger",
    toogleHitsGamesCheck: "#platform_hits_trigger",
    gameCell: "//div[@data-service-id='%s']",
    gameCellHover: "//div[contains(@class, 'bGamesPromoListItem__eDesc') and ancestor-or-self::div[@data-service-id = '8']]",
    buttonInstall: "//button[@id = 'bGamesPromoListItem__eControlsInstallButton__%s']",
    gameCellGameTitle: "//a[@id='GamesPromoListItemTitle_%s']",
    gameCellProgressStatus: "//div[@id = 'GamesPromoListItemStatus_%s']//span[contains(@class, 'bGamesPromoListItemProgress__eStatusText')]",
    gameCellProgressBarStatus: "//div[@id = 'GamesPromoListItemTrackStatus_%s']",
    gameCellProgressBar: "//div[@id = 'bGamesPromoListItem__eProgress__%s']//div[@class = 'bGamesPromoListItemProgress__eTrack']"

}
