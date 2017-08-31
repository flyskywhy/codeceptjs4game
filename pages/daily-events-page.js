'use strict';
/**
 * Элементы и методы для работы со страницей Задание дня
 */

let I;

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    /**
     * Элементы страницы Задание дня
     */
    url: "/pointblank/play/daily-events/",
    title: "Point Blank — официальный сайт онлайн-игры",
    gameLink: ".pPb_bDailyEvents__ePblink",
    authLink: ".daily-event [data-action='auth']",
    FAQLink: ".pPb_bDailyEvents__eFAQ .pPb_bDailyEvents__eFAQLink",

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
        closeInfoButton: ".daily-event-info__content .daily-event-info__link",
        collapsedInfoButton: ".daily-event-info.daily-event-info_collapsed .daily-event-info__icon-help"
    }
}