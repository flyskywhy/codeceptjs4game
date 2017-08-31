'use strict';


let I;
let assert = require('assert');

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    timeout: 30,

    url: "/?popupWidget=PaymentTerminalWidget",

    terminal: "//div[@class = 'bPaymentTerminal__eCols']",

    yandexAmount: "//input[@id='PaymentPopup__eAmount_Yandex_money']",
    achievementWantPrize: "//div[contains(@class, 'bPaymentTerminalAchievements__amount bPaymentTerminalAchievements__amount_visible')]/h3[contains(@class, 'bPaymentTerminalAchievements__wantPrize')]",
    achievementAddMore: "//div[contains(@class, 'bPaymentTerminalAchievements__amount bPaymentTerminalAchievements__amount_visible')]/p[contains(@class, 'bPaymentTerminalAchievements__addMore')]",
    bonusesVisible: "//div[contains(@class, 'bPaymentTerminalAchievements__bonuses bPaymentTerminalAchievements__bonuses_visible')]",

    buffs: {
        yandexMoneyTip: "//form[contains(@action, 'yandex_money')]//div[contains(@id, 'buff')]",
        yandexMoneyTooltip: "//form[contains(@action, 'yandex_money')]//div[contains(@class, 'wc-tooltip-indent')]",
        yandexMoneyTooltipHeader: "//form[contains(@action, 'yandex_money')]//div[contains(@class, 'wc-tooltip-indent')]//div[contains(@class, 'buff-terminal-notification__tooltip-label')]",
        yandexMoneyTooltipExpiring: "//form[contains(@action, 'yandex_money')]//div[contains(@class, 'wc-tooltip-indent')]//div[contains(@class, 'desc-expiring')]",
        yandexMoneyTooltipDesc: "//form[contains(@action, 'yandex_money')]//div[contains(@class, 'wc-tooltip-indent')]//div[contains(@class, 'desc-max-summ')]",

        text: {
            maxValue: "максимальная сумма\nнадбавки — $s руб."
        }
    }

}
