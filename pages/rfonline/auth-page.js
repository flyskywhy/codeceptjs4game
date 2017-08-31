'use strict';
/**
 * Элементы и методы для работы с авторизованным пользователем - RF Online — сайт сообщества.
 */

let I;

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    /**
     * Элементы основной страницы play и общих элементов подстраниц
     */
    playurl: "/rf/play/",
    playtitle: "RF Online — сайт сообщества",
    ratingsTitle: "Point Blank — сайт сообщества: клановый рейтинг",
    forumTitle: "RF Online | 4Game",
    content: "#GlobalContent",
    prolongPremium: "[data-text='Продлить']",
    daysPremium: "#premium-coupon-daily-1 .bUIRadiobutton__eFakeRadioContainer",
    autoOff: "//span[@id='bPremiumActions__eAutoImprovement' and text()='выключено']",
    autoOn: "//span[@id='bPremiumActions__eAutoImprovement' and text()='включено']",
    autoCheckbox: "[type='checkbox'][name='SubscribeForm[autopay]']",
    maintenance: "#jsBigMaintenanceMessage",
    playButton: ".bUIButton__eLabel [data-text='Играть']",
    agreeButton: ".bLicensePopup__eButton",
    // возвращает локатор Radio-кнопки с заданным количестовм месяцев
    monthsRadio: function(months){
        return {xpath:"//input[@data-coupon-months='" + months + "']/parent::span"};
    },
    // возвращает локатор оставшегося времени премиума с заданным количеством дней
    premiumDays: function(days){
        return {xpath:"//span[@id='premiumDurationInfo']/span[contains(.,'Премиум включен,осталось " + days + " дней')]"};
    },
    // возвращает локатор поля ввода суммы с заданным числом
    moneyAmount: function(amount){
        return {css:"[id='PaymentPopup__eAmount_Osmppull'][value='" + amount + "']"};
    },
    installed: {
        "status":"0",
        "stat_version":"46.5",
        "last_version":"46.5",
        "path":"C:\\Games\\RFOnline",
        "stat_guid":"{06b3d28e-9161-11e6-8032-00241dd058d7}",
        "stat_install_start":"1476375659",
        "stat_attempts":"1",
        "stat_downloaded_size":"2054160364",
        "stat_size":"2470219756",
        "icon_lmd":"Wed, 06 Jul 2016 09:59:15 GMT",
        "new_updater":"1"
    }

}