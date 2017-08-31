'use strict';
/**
 * Элементы и методы для работы со страницей События
 */

let I;

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    /**
     * Элементы страницы Задание дня
     */
    url: "/events/",
    title: "События — Фогейм",
    buyPremiumCouponMonthly1: 'Покупка 30 дней (1 ед.) в "Aion" на сумму 300 руб.',
    buyPremiumCouponMonthly3: 'Покупка 90 дней (1 ед.) в "Aion" на сумму 599 руб.',
    buyPremiumCouponMonthly12: 'Покупка 360 дней (1 ед.) в "Aion" на сумму 2900 руб.',
}