'use strict';
/**
 * Элементы и методы для работы со страницей install - Point Blank — официальный сайт онлайн-игры
 */

let I;

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    /**
     * Элементы основной страницы install и общих элементов подстраниц
     */
    url: "/pointblank/install-current/",
    title: "Point Blank — официальный сайт онлайн-игры",
    description: "Point Blank — онлайн-шутер, где ты можешь отлично провести время с друзьями и получить ударную дозу адреналина. Вступи в командный бой на стороне миротворцев или повстанцев — и оцени динамичный геймплей со 150 видами вооружения. 8,5 миллионов игроков уже выбрали Point Blank!",
    content: "#GlobalContent",
    slidesElement: ".pPb_bSlidesSelectorWrapper",
    firstSlide: ".pPb_bSlidesSelector__Item_mPos_1 .pPb_bSlidesSelector__ItemImg",
    secondSlide: ".pPb_bSlidesSelector__Item_mPos_2",
    thirdSlide: ".pPb_bSlidesSelector__Item_mPos_3",
    lastSlide: ".pPb_bSlidesSelector__Item_mPos_4",
    activeFirstSlide: ".pPb_bSlidesSelector__Item_mPos_1.js-pPb_slidesSelector__Item_active_true",
    activeSecondSlide: ".pPb_bSlidesSelector__Item_mPos_2.js-pPb_slidesSelector__Item_active_true",
    activeThirdSlide: ".pPb_bSlidesSelector__Item_mPos_3.js-pPb_slidesSelector__Item_active_true",
    activeLastSlide: ".pPb_bSlidesSelector__Item_mPos_4.js-pPb_slidesSelector__Item_active_true",
    videoSlide: ".pPb_bSlidesVideoLink",
    videoPopup: ".bUIPopup__mType_Video",
    videoTitle: "Онлайн-шутер Point Blank - YouTube",
    closePopupButton: ".bUIPopup__mType_Video .bUIPopup__eClose.jsEscKey",
    iframe: "#player",
    playButton: ".ytp-large-play-button",
    streamSelector: ".playing-mode"
}