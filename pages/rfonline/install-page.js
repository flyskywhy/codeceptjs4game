'use strict';
/**
 * Элементы и методы для работы со страницей install - RF Online — официальный сайт онлайн-игры
 */

let I;

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    /**
     * Элементы основной страницы install и общих элементов подстраниц
     */
    url: "/rf/install/",
    title: "RF Online — официальный сайт онлайн-игры",
    description: "RF Online сочетает в себе то, что в других проектах показалось бы совершенно несочетаемым — далеко шагнувшие вперед технологии уживаются здесь с романтическим миром приключений. Основой RF Online являются яркие и запоминающиеся битвы между игроками, грандиозность которых не оставит равнодушным никого. Не только отдельные гильдии, но и вся раса сражается плечом к плечу для достижения победы над врагом.",
    content: "#GlobalContent",
    textContainer: ".bInstallPageDescription__eDescriptionText__mGame_Rf",
    slidesElement: ".pPb_bSlidesSelectorWrapper",
    bulletImage: "img[src*='bullet.png']",
    firstScreen: "img[src*='screen1.jpg']",
    secondScreen: "img[src*='screen2.jpg']",
    thirdScreen: "img[src*='screen3.jpg']",
    fourthScreen: "img[src*='screen4.jpg']",
    lastScreen: "img[src*='screen5.jpg']",
    activeFirstScreen: "img[src*='img1.jpg']",
    activeSecondScreen: "img[src*='img2.jpg']",
    activeThirdScreen: "img[src*='img3.jpg']",
    activeFourthScreen: "img[src*='img4.jpg']",
    activeLastScreen: "img[src*='img5.jpg']",
    navLeft: ".bInstallPageScreenshots__eNavLeft",
    navRight: ".bInstallPageScreenshots__eNavRight",
    navClose: ".bInstallPageScreenshots__eCloseBtn",
    videoButton: ".bInstallPageVideo__eWrapper__mGame_Rf",
    videoPopup: ".bInstallPageVideo__eVideo",
    videoEmbed: "embed[src='//www.youtube.com/v/G8uf3cFYoNw?version=3&hl=en_GB&wmode=transparent']",
    closePopupButton: ".bInstallPageScreenshots__eCloseBtn"
}