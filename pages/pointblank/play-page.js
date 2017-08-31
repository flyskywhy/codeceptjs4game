'use strict';
/**
 * Элементы и методы для работы со страницей play - Point Blank — сайт сообщества.
 */

let I;

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    /**
     * Элементы основной страницы play и общих элементов подстраниц
     */
    url: "/pointblank/play/",
    title: "Point Blank — сайт сообщества",
    shootingTitle: "Point Blank — сайт сообщества: Тир Удачи",
    ratingsTitle: "Point Blank — сайт сообщества: клановый рейтинг",
    summonTitle: "Приглашение в Point Blank",
    arenaTitle: "Point Blank",
    forumTitle: "Point Blank | 4Game",
    content: "#GlobalContent",
    playVkButton: "[data-enable='play_vk']",
    playEsportButton: "[data-enable='play_vk_esport']",
    activeVkButton: "[data-enable='play_vk'].bTabSwitcher__eButton__mState_active",
    vkFeeds: ".bGamePageFeeds__eFeed__mType_vk.bGamePageFeeds__eFeed__mState_active",
    activeVkEsportButton: "[data-enable='play_vk_esport'].bTabSwitcher__eButton__mState_active",
    vkEsportFeeds: ".bGamePageFeeds__eFeed__mType_vk.bGamePageFeeds__eFeed__mState_active",
    shootingLink: ".bPlayLayout__eMenuItem[href='/pointblank/play/shooting/']",
    ratingsLink: ".bPlayLayout__eMenuItem[href='/pointblank/play/ratings/']",
    summonLink: ".bPlayLayout__eMenuItem[href='/summon/pointblank/']",
    arenaLink: ".bPlayLayout__eMenuItem[href='http://arena4game.com/']",
    forumLink: ".bPlayLayout__eMenuItem[href='https://4gameforum.com/categories/1112/']",
    promoLink: ".bPlayLayout__eMenuItem[href='/pointblank/install/']",

    vidget: {
        eventsElement: ".pb-daily-events__title",
        text: "Выполни три задания дня и получи награду",
        url: "/daily-events/",
        firstControl: ".daily-event-list__controls-item[data-id='event0']",
        secondControl: ".daily-event-list__controls-item[data-id='event1']",
        lastControl: ".daily-event-list__controls-item[data-id='event2']",
        firstActiveControl: ".daily-event-list__controls-item_selected[data-id='event0']",
        secondActiveControl: ".daily-event-list__controls-item_selected[data-id='event1']",
        lastActiveControl: ".daily-event-list__controls-item_selected[data-id='event2']",
        firstEvent: ".daily-event-list__item[data-id='event0']",
        secondEvent: ".daily-event-list__item[data-id='event1']",
        lastEvent: ".daily-event-list__item[data-id='event2']",
        firstActiveEvent: ".daily-event-list__item_selected[data-id='event0']",
        secondActiveEvent: ".daily-event-list__item_selected[data-id='event1']",
        lastActiveEvent: ".daily-event-list__item_selected[data-id='event2']",
        authLink: ".daily-event [data-action='auth']",
    }
}