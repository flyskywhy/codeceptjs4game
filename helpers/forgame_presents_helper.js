'use strict';

const assert = require('assert');

class ForGamePresents extends Helper {

    _failed(test) {
        return;
    }

    /*
    принимает попап с лицензией, если он вдруг появился
    */
    acceptLicenseIfPresents(timeout) {
        timeout = timeout || 15;
        let client = this.helpers['WebDriverIO'].browser;
        let WebdriverIOExtra = this.helpers['WebdriverIOExtra'];
        let WebDriverIO = this.helpers['WebDriverIO']
        return client.waitUntil(function() {
            return WebdriverIOExtra.grabElementVisibleStatus("//body[contains(@class, 'bGlobalLayout bGlobalLayout__mWithPopup_true')]//*[@id='jsLicensePopup-btnPlay']");
        }, timeout * 1000).catch((e) => {
            if (e.message === 'Promise never resolved with an truthy value') {
                return false
            } else {
                throw e;
            }
        }).then(function(status) {
            if (status) {
                return WebDriverIO.click("//*[@id='jsLicensePopup-btnPlay']");
            } else {
                return
            }
        });
    }

}

module.exports = ForGamePresents;
