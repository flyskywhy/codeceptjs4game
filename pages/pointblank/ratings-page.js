'use strict';
/**
 * Элементы и методы для работы со страницей ratings - Point Blank — сайт сообщества: клановый рейтинг.
 */

let I;

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    /**
     * Элементы основной страницы ratings
     */
    url: "/pointblank/play/ratings/",
    title: "Point Blank — сайт сообщества: клановый рейтинг",
    content: "#GlobalContent",
    ratingsButton: "#jsRatingSelector",
    ratingsListPopup: ".pRatings--controls--choice--popup",
    allTimeElement: "[data-reactid='.0.2.0:$за все время']",
    julyElement: "[data-reactid='.0.2.0:$Июль-16']",
    augustElement: "[data-reactid='.0.2.0:$Август-16']",
    allTimeActiveElement: ".pRatings--controls--choice--item-selected[data-reactid='.0.2.0:$за все время']",
    julyActiveElement: ".pRatings--controls--choice--item-selected[data-reactid='.0.2.0:$Июль-16']",
    augustActiveElement: ".pRatings--controls--choice--item-selected[data-reactid='.0.2.0:$Август-16']",
    topAugust: ".top__slide [data-reactid='.3.2.0.$0.0']",
    topJuly: ".top__slide [data-reactid='.3.2.0.$1.0']",
    arrowLeft: ".top__arrow.top__arrow_left ",
    arrowRightDisabled: ".top__arrow.top__arrow_right.top__arrow_disabled",
    arrowRight: ".top__arrow.top__arrow_right",

    exclude: [
        ".footer-4game__social-section",    // соцсети в футере
        ".userbar-tray",                    // юзербар
        ".bRatings"                         // динамическая таблица
    ]
}