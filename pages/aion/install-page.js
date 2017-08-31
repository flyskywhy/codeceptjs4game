'use strict';
/**
 * Элементы и методы для работы со страницей install- Aion — официальный сайт онлайн-игры
 */

let I;

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    /**
     * Элементы основной страницы install и общих элементов подстраниц
     */
    install: {
        url: "/aion/install",
        title: "Aion — официальный сайт онлайн-игры",
        gamePanel: "#GamePanel",
        userbar: "[class='userbar-tray']",
        content: ".bPageLayout",
        galleryVideoElement: ".pAionGL_bGallery .pAionGL_bGallery__eItem:nth-child(1)",
        galleryFirstImg: ".pAionGL_bGallery .pAionGL_bGallery__eItem:nth-child(2)",
        galleryLastImg: ".pAionGL_bGallery .pAionGL_bGallery__eItem:nth-child(6)",
        galleryCloseButton: ".pAionGL_bGallery__ePopupClose",
        galleryNextArrow: ".pAionGL_bGallery__ePopupRewind__mType_next",
        galleryPrevArrow: ".pAionGL_bGallery__ePopupRewind__mType_prev",
        galleryPopup: ".pAionGL_bGallery__ePopup__mState_active",
        galleryFirstImgActive: ".pAionGL_bGallery__ePopupImage[src='/aion/b/pAionGL/pAionGL_bFlight/screenshots/1.jpg']",
        firstImgActive: ".pAionGL_bGallery__ePopupImage[src='/aion/b/pAionGL/pAionGL_bFlight/screenshots/1.jpg']",
        secondImgActive: ".pAionGL_bGallery__ePopupImage[src='/aion/b/pAionGL/pAionGL_bFlight/screenshots/2.jpg']",
        thirdImgActive: ".pAionGL_bGallery__ePopupImage[src='/aion/b/pAionGL/pAionGL_bFlight/screenshots/3.jpg']",
        fourthImgActiveActive: ".pAionGL_bGallery__ePopupImage[src='/aion/b/pAionGL/pAionGL_bFlight/screenshots/4.jpg']",
        lastImgActiveActive: ".pAionGL_bGallery__ePopupImage[src='/aion/b/pAionGL/pAionGL_bFlight/screenshots/5.jpg']"
    },

    menu: {
        flight: "//*[contains(@class, 'pAionGL_bMenu__eItemIcon__mPart_flight')]//..//*[@class='pAionGL_bMenu__eItemLink']",
        world: "//*[contains(@class, 'pAionGL_bMenu__eItemIcon__mPart_world')]//..//*[@class='pAionGL_bMenu__eItemLink']",
        classes: "//*[contains(@class, 'pAionGL_bMenu__eItemIcon__mPart_classes')]//..//*[@class='pAionGL_bMenu__eItemLink']",
        characters: "//*[contains(@class, 'pAionGL_bMenu__eItemIcon__mPart_characters')]//..//*[@class='pAionGL_bMenu__eItemLink']",
        players: "//*[contains(@class, 'pAionGL_bMenu__eItemIcon__mPart_players')]//..//*[@class='pAionGL_bMenu__eItemLink']",
        cataclism: "//*[contains(@class, 'pAionGL_bMenu__eSubItemIcon__mPart_cataclism')]//..//*[@class='pAionGL_bMenu__eSubitemPseudolink']",
        split: "//*[contains(@class, 'pAionGL_bMenu__eSubItemIcon__mPart_split')]//..//*[@class='pAionGL_bMenu__eSubitemPseudolink']",
        abyss: "//*[contains(@class, 'pAionGL_bMenu__eSubItemIcon__mPart_abyss')]//..//*[@class='pAionGL_bMenu__eSubitemPseudolink']",
        today: "//*[contains(@class, 'pAionGL_bMenu__eSubItemIcon__mPart_today')]//..//*[@class='pAionGL_bMenu__eSubitemPseudolink']"
    },

    world: {
        cataclismActiveElement: ".pAionGL_bMenu__eSubitem__mState_active .pAionGL_bMenu__eSubItemIcon__mPart_cataclism",
        splitActiveElement: ".pAionGL_bMenu__eSubitem__mState_active .pAionGL_bMenu__eSubItemIcon__mPart_split",
        abyssActiveElement: ".pAionGL_bMenu__eSubitem__mState_active .pAionGL_bMenu__eSubItemIcon__mPart_abyss",
        todayActiveElement: ".pAionGL_bMenu__eSubitem__mState_active .pAionGL_bMenu__eSubItemIcon__mPart_today",
        todayFirstGalleryImage: ".pAionGL_bGallery .pAionGL_bWorld__eGalleryItem:nth-child(1) .pAionGL_bGallery__eItemImage",
        todayFirstImagePopup: ".pAionGL_bGallery__ePopupImage[src='/aion/b/pAionGL/pAionGL_bWorld/today/1.jpg']",
        todayMidleGalleryImage: ".pAionGL_bGallery .pAionGL_bWorld__eGalleryItem:nth-child(5) .pAionGL_bGallery__eItemImage",
        todayMidleImagePopup: ".pAionGL_bGallery__ePopupImage[src='/aion/b/pAionGL/pAionGL_bWorld/today/5.jpg']",
        todayLastGalleryImage: ".pAionGL_bGallery .pAionGL_bWorld__eGalleryItem:nth-child(10) .pAionGL_bGallery__eItemImage",
        todayLastImagePopup: ".pAionGL_bGallery__ePopupImage[src='/aion/b/pAionGL/pAionGL_bWorld/today/10.jpg']",
        galleryCloseButton: ".pAionGL_bGallery__ePopupClose",
        galleryPrevArrow: ".pAionGL_bGallery__ePopupRewind__mType_prev",
        galleryNextArrow: ".pAionGL_bGallery__ePopupRewind__mType_next",
        galleryPrevImage: ".pAionGL_bGallery__ePopupImage[src='/aion/b/pAionGL/pAionGL_bWorld/today/4.jpg']",
        galleryNextImage: ".pAionGL_bGallery__ePopupImage[src='/aion/b/pAionGL/pAionGL_bWorld/today/6.jpg']",
    },

    classes: {
        activeElement: ".pAionGL_bMenu__eItem__mState_active .pAionGL_bMenu__eItemIcon__mPart_classes"
    },

    characters: {
        activeElement: ".pAionGL_bMenu__eItem__mState_active .pAionGL_bMenu__eItemIcon__mPart_characters"
    },

    players: {
        activeElement: ".pAionGL_bMenu__eItem__mState_active .pAionGL_bMenu__eItemIcon__mPart_players"
    },
    
    cataclismAnimation: ".pAionGL_bWorld__ePlanetRotation",

    /**
     * Элементы страницы, которые мы исключаем из проверки верстки из-за диинамики
     */
    exclude: [
        ".footer-4game__social-item",       // содержит конпки вк и фб с количеством лайков
        ".bGamePanelFlipper",
        ".bGamePanelCommon",                // геймпанель
        "#GamePanel",
        ".userbar-tray",                    // юзербар
    ]
}