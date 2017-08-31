'use strict';


let I;
let assert = require('assert');

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    timeout: 30,

    url: "/?popupWidget=PremiumUpgradeWidget",
    buttonBuy: "//body[contains(@class, 'bGlobalLayout bGlobalLayout__mWithPopup_true')]//button[@id='premium-buy']"
}
