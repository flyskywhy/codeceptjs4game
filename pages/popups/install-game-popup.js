'use strict';


let I;
let assert = require('assert');

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    timeout: 30,

    popup: "//div[@class='bWidgetDownload jsServiceInstall']",
    checkAgreeLicence: "#chbAcceptLicence",
    buttonBeginInstall: "#btnBeginInstall"
}
