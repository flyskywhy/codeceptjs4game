'use strict';

let I;

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    timeout: 30,

    licencePopup: {
        locator: "//iframe[@id = 'A4GFrame']",
        iframe: "A4GFrame",
        header: "//h1",
        button: "//button",
        licenceText: "//iframe[@id = 'WidgetDownloadPopupLicence']",
        text: {
            header: "Новое соглашение",
            button: "Я согласен"
        }
    },


    locators: {
        Aion: {
            licenceText: "div.bLicenseText",
            licenceHeader: "//h1[@id='-']",
            userAgreementText: "div.bLicenseText",
            userAgreementHeader: "//h1[@id='-']"
        },
        Pointblank: {
            licenceText: "div.bLicenseText",
            licenceHeader: "//h1[@id='-']",
            userAgreementText: "div.bLicenseText",
            userAgreementHeader: "//h1[@id='-']"
        },
        Lineage2: {
            licenceText: "div.bLicenseText",
            licenceHeader: "//h1[@id='-']",
            userAgreementText: "div.bLicenseText",
            userAgreementHeader: "//h1[@id='-']"
        },
        Lineage2classic: {
            licenceText: "div.bLicenseText",
            licenceHeader: "//h1[@id='-']",
            userAgreementText: "div.bLicenseText",
            userAgreementHeader: "//h1[@id='-']"
        },
        RFOnline: {
            licenceText: "div.bLicenseText",
            licenceHeader: "//h1[@id='-']",
            userAgreementText: "div.bLicenseText",
            userAgreementHeader: "//h1[@id='-']"
        },
        R2Online: {
            licenceText: "div.bLicenseText",
            licenceHeader: "//h1[@id='-']",
            userAgreementText: "div.bLicenseText",
            userAgreementHeader: "//h1[@id='-']"
        },
        APB: {
            licenceText: "div.bLicenseText",
            licenceHeader: "//h1[@id='-']",
            userAgreementText: "div.bLicenseText",
            userAgreementHeader: "//h1[@id='-']"
        },
        BnS: {
            licenceText: "div.bLicenseText",
            licenceHeader: "//h1[@id='-br-nbsp-blade-nbsp-amp-soul-']",
            userAgreementText: "div.bLicenseText",
            userAgreementHeader: "//h1[@id='-']"
        },
        Drakensang: {
            licenceText: "div.bLicenseText",
            licenceHeader: "//h1[@id='-']",
            userAgreementText: "//div[contains(@class, 'content_box')]",
            userAgreementHeader: "//h1"
        },
        DevilsThirdOnline: {
            licenceText: "div.bLicenseText",
            licenceHeader: "//h1[@id='-nbsp-2-br-nbsp-devil-s-third-online-']",
            userAgreementText: "div.bLicenseText",
            userAgreementHeader: "//h1[@id='-br-nbsp-nbsp-nbsp-nbsp-laquo-devil-rsquo-s-third-online-raquo-']"
        }
    },

    validateLicencePopup() {
        I.waitForVisible(this.licencePopup.header);
        I.waitForVisible(this.licencePopup.button);
        I.waitForVisible(this.licencePopup.licenceText);
        I.waitForText(this.licencePopup.text.header, this.timeout, this.licencePopup.header);
        I.waitForText(this.licencePopup.text.button, this.timeout, this.licencePopup.button);
    }

}
