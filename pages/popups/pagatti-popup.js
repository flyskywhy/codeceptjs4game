'use strict';


let I;
let assert = require('assert');

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    timeout: 30,

    url: "/?popupWidget=PromoPopupWidget",
    close: "//body[contains(@class, 'bGlobalLayout bGlobalLayout__mWithPopup_true')]//div[contains(@class, 'aion_pagati')]//a[@class = 'bUIPopup__eClose jsEscKey']",
    learnMore: "//body[contains(@class, 'bGlobalLayout bGlobalLayout__mWithPopup_true')]//div[contains(@class, 'aion_pagati')]//button",
    popupContent: "//body[contains(@class, 'bGlobalLayout bGlobalLayout__mWithPopup_true')]//div[contains(@class, 'aion_pagati')]//div[@id = 'bUIPopup__eLayout']"
}
