'use strict';
/**
 * Элементы и методы для работы со страницей install - Pocket Fort
 */

let I;

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    /**
     * Элементы основной страницы install
     */
    url: "/pocket-fort/",
    brandName: "Pocket Fort"
}