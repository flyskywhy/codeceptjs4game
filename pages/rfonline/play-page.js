'use strict';
/**
 * Элементы и методы для работы со страницей play - RF Online — сайт сообщества.
 */

let I;

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    /**
     * Элементы основной страницы play и общих элементов подстраниц
     */
    url: "/rf/play/",
    title: "RF Online — сайт сообщества",
    ratingsTitle: "Point Blank — сайт сообщества: клановый рейтинг",
    forumTitle: "RF Online | 4Game",
    content: "#GlobalContent",
    playVkButton: "[data-enable='play_vk']",
    playTwitterButton: "[data-enable='play_twitter']",
    activeVkButton: ".bTabSwitcher__eButton__mState_active[data-enable='play_vk']",
    activeTwitterButton: ".bTabSwitcher__eButton__mState_active[data-enable='play_twitter']",
    vkFeeds: ".bGamePageFeeds__eFeed__mState_active[data-type='vk']",
    twitterFeeds: ".bGamePageFeeds__eFeed__mState_active[data-type='twitter']",
    notesLink: ".bPlayLayout__eMenuItem[href='/rf/play/servermerge/']",
    ratingsLink: ".bPlayLayout__eMenuItem[href='/rf/play/ratings/']",
    forumLink: ".bPlayLayout__eMenuItem[href='https://4gameforum.com/categories/593/']",
    promoLink: ".bPlayLayout__eMenuItem[href='/rf/install/']",
    
    /**
     * Элементы страницы, которые мы исключаем из проверки верстки из-за диинамики
     */
    exclude: [
        ".footer-4game__social-item",       // содержит конпки вк и фб с количеством лайков
        ".bTimer__mGame_RF",                          // таймер
        ".jsServiceControl",                          // геймпанель
        ".bGamePageFeeds__eFeed__mState_active",      // твиттер и ВК
        ".userbar-tray"                               // юзербар
    ]
}