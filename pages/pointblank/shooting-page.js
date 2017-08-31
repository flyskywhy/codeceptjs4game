'use strict';
/**
 * Элементы и методы для работы со страницей shooting - Point Blank — сайт сообщества: Тир Удачи.
 */

let I;

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    timeout: 30,

    /**
     * Элементы основной страницы shooting
     */
    url: "/pointblank/play/shooting/",
    title: "Point Blank — сайт сообщества: Тир Удачи",
    content: "#GlobalContent",
    preloadText: "#game_preloader_text",
    errorMessage: ".bInfoMessage.bInfoMessage__mType_error",
    buyButton: "//div[contains(@class, 'b_bShootingRange')]//button[@class = 'jsUIButton bUIButton bUIButton__eFrame']",
    buyButtonDisabled: "//div[contains(@class, 'b_bShootingRange')]//button[contains(@class, 'bUIButton__mState_disabled')]",
    collimatorImage: "//div[@id = 'collimator_element']//img",
    buyButtonText: "Стрелять за 30 руб",
    noCharacterText: "У тебя нет персонажа в Point Blank",

    exclude: [
        ".footer-4game__social-section", // соцсети в футере
        ".bGamePanelCommon", // геймпанель
        ".userbar-tray", // юзербар
        ".pPb_bShootingRange__eGame" // динамический тир
    ]
}
