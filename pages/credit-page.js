'use strict';

let I;

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    timeout: 30,

    mainForm: ".bCredit",

    labelCreditOn: "#bCredit__eSum__mSwitch_On",
    labelCreditOff: "#bCredit__eSum__mSwitch_Off",

    buttonCreditTurnOn: ".bUISwitcher__eAreaRightSide",
    buttonCreditTurnOff: ".bUISwitcher__eAreaLeftSide",

    buttonCreditStatusOn: "//div[contains(@class, 'bUISwitcher__eButton') and @data-switch = 'right']",
    buttonCreditStatusOff: "//div[contains(@class, 'bUISwitcher__eButton') and @data-switch = 'left']"
}
