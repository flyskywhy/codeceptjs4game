'use strict';


let I;
let assert = require('assert');

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    timeout: 30,

    url: "?popupWidget=NotificationPopupWidget&popupName=bonus-on-payment-buffs-reminder",

    title: "//h2[contains(@class, 'bonus-on-payment-buffs-reminder__title')]",
    buffValue: "//bonus-on-payment-buffs-reminder-view//div[contains(@class, 'bonus-on-payment-buffs-reminder__bonus')]",
    buffDesc: "//bonus-on-payment-buffs-reminder-view//p[contains(@class, 'bonus-on-payment-buffs-reminder__text')]",
    listBonusNormal: "//tr[@class = 'buff-expires-list__item']//td[contains(@class, 'buff-expires-list__bonus')]",
    listExpiresNormal: "//tr[@class = 'buff-expires-list__item']//td[contains(@class, 'buff-expires-list__expires')]",
    listBonusExpiresSoon: "//tr[contains(@class, 'buff-expires-list__item_warn')]//td[contains(@class, 'buff-expires-list__bonus')]",
    listExpiresExpiresSoon: "//tr[contains(@class, 'buff-expires-list__item_warn')]//td[contains(@class, 'buff-expires-list__expires')]",
    button: "//bonus-on-payment-buffs-reminder-view//a[contains(@class, bUIButton)]",

    webdriverCSS: {
        elem: "//div[contains(@class, 'bUIPopup__eBg bUIPopup__ePadding')]"

    },

    text: {
        titleNormal: "Используй бафф",
        titleNormalMany: "Используй баффы",
        titleExpireSoon: "Заканчивается бафф",
        buffValue: "+$sна счет",
        expireTime: "осталось $s"

    },

    validateBuffsPopupOnURL(url) {
        I.waitForVisible(this.title, this.timeout);
        I.waitForVisible(this.buffValue, this.timeout);
        I.waitForVisible(this.buffDesc, this.timeout);
        I.waitForVisible(this.listExpiresNormal, this.timeout);
        I.waitForVisible(this.button, this.timeout);
        I.waitInUrl(url, this.timeout);
    },

    addBuffToRevault(userId, maxSum, buffsArray) {
        I.insertRevault(userId, "available-bonus-on-payment-buffs", 2, null, {
            "maxSum": maxSum,
            "buffs": buffsArray
        })
    }
}
