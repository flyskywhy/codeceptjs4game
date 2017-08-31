'use strict';
/**
 * Элементы и методы для работы со страницей play Aion — сайт сообщества
 */

let I;

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    /**
     * Элементы основной страницы play и общих элементов подстраниц
     */
    play: {
        url: "/aion/play",
        title: "Aion — сайт сообщества",
        gamePanel: "#GamePanel",
        userbar: "[class='userbar-tray']",
        content: ".bPageLayout",
        playVkButton: "[data-enable='play_vk']",
        playTwitterButton: "[data-enable='play_twitter']",
        activeVkButton: "[data-enable='play_vk'].bTabSwitcher__eButton__mState_active",
        activeTwitterButton: "[data-enable='play_twitter'].bTabSwitcher__eButton__mState_active",
        twitterFeeds: ".bGamePageFeeds__eFeed__mType_twitter.bGamePageFeeds__eFeed__mState_active",
        vkFeeds: ".bGamePageFeeds__eFeed__mType_vk.bGamePageFeeds__eFeed__mState_active",
        openTwitterButton: ".timeline-Footer .u-floatRight",
        openVkButton: ".join_community",
        body: "body",
        vkIframe: "vkwidget1",
        twitterIframe: "twitter-widget-1",
        gameStoreFirstItem: "[data-ft='gameStoreItem1'] .bShopBlock__eInfo",
        gameStoreFirstItemDescription: ".bShopBlock__eShopItems__mType_adaptive article:nth-child(1)",
        premiumOnText: "Премиум включен, осталось %s"
    },

    menu: {
        index: ".bPlayLayout__eMenu [href='/aion/play/']",
        discount: ".bPlayLayout__eMenu [href='/aion/play/newcomers_discount/']",
        ratings: ".bPlayLayout__eMenu [href='/aion/play/ratings/']",
        updates: ".bPlayLayout__eMenu [href='/aion/play/updates/5.1/']",
        free: ".bPlayLayout__eMenu [href='/aion/play/4free/']",
        summon: ".bPlayLayout__eMenu [href='/summon/aion/']",
        forum: ".bPlayLayout__eMenu [href='https://4gameforum.com/categories/484/']",
        install: ".bPlayLayout__eMenu [href='/aion/install/']",
        store: ".bPlayLayout__eMenu [href='https://ru-store.4game.com/aion/store/index.html']",
    },

    discount: {
        activeElement: ".bPlayLayout__eMenuItem__mState_active",
        url: "/aion/play/newcomers_discount/",
        title: "Aion — сайт сообщества: выгодный Премиум для новичков",
        buyButton: ".bUIButton__eLabel",

        packages: {
            premiumForYearLink: "[href='/aion/play/annual-package2016/']",
            premiumForYearUrl: "/aion/play/annual-package2016/",
            premiumForYearText: "Радость на целый год",

            winterPackage2015Link: "[href='/aion/play/winter-package2015/']",
            winterPackage2015Url: "/aion/play/winter-package2015/",
            winterPackage2015Text: "Зимний пакет",

            winterPackage2014Link: "[href='/aion/play/winter-package2014/']",
            winterPackage2014Url: "/aion/play/winter-package2014/",
            winterPackage2014Text: "Зимний пакет",

            summerPackageLink: "[href='/aion/play/summer-package/']",
            summerPackageUrl: "/aion/play/summer-package/",
            summerPackageText: "Летний пакет",

            marchLink: "[href='/aion/play/8march/']",
            marchUrl: "/aion/play/8march/",
            marchText: "Праздник весенних скидок",

            valentinesDayLink: "[href='/aion/play/valentines_day/']",
            valentinesDayUrl: "/aion/play/valentines_day/",
            valentinesDayText: "Марафон подарков",

            cybermondayLink: "[href='/aion/play/cybermonday/']",
            cybermondayUrl: "/aion/play/cybermonday/",
            cybermondayText: "Киберпонедельник"
        },
    },

    ratings: {
        activeElement: ".bPlayLayout__eMenuItem__mState_active",
        url: "/aion/play/ratings/",
        title: "Aion — сайт сообщества: рейтинги",
        reputationButton: ".pRatings--controls--radiolist [data-reactid='.3.$0.1']",
        reputationActiveElement: ".pRatings--table--header-cell-glory_point",
        pvpButton: ".pRatings--controls--radiolist [data-reactid='.3.$1.1']",
        pvpActiveElement: ".pRatings--table--header-cell-total_pvp_cnt",
        experienceButton: ".pRatings--controls--radiolist [data-reactid='.3.$2.1']",
        experienceActiveElement: ".pRatings--table--header-cell-exp",
        server: ".pRatings--controls--selector--caption[data-reactid='.0.0']",
        serverPopup: ".pRatings--controls--selector--popup[data-reactid='.0.1']",
        rases: ".pRatings--controls--selector--caption[data-reactid='.1.0']",
        rasesPopup: ".pRatings--controls--selector--popup[data-reactid='.1.1']",
        classes: ".pRatings--controls--selector--caption[data-reactid='.2.0']",
        classesPopup: ".pRatings--controls--selector--popup[data-reactid='.2.1']"
    },

    free: {
        activeElement: ".bPlayLayout__eMenuItem__mState_active",
        url: "/aion/play/4free/",
        title: "Aion — сайт сообщества: переход на free-to-play",
        playButton: ".bUIButton__eLabel",
        slide1: ".AION_newBM__slide1",
        slide2: ".AION_newBM__slide2",
        slide3: ".AION_newBM__slide3",
        slide1Active: ".AION_newBM__slide1.AION_newBM__slide-active",
        slide2Active: ".AION_newBM__slide2.AION_newBM__slide-active",
        slide3Active: ".AION_newBM__slide3.AION_newBM__slide-active",
    },

    updates: {
        activeElement: ".bPlayLayout__eMenuItem__mState_active",
        url: "/aion/play/updates/5.1/",
        title: "AION: Обновление 5.1 «Тени прошлого»",
        timezoneMenu: ".bPatchnoteMenuContainer li:nth-child(1)",
        objectsMenu: ".bPatchnoteMenuContainer li:nth-child(2)",
        environMenu: ".bPatchnoteMenuContainer li:nth-child(3)",
        skillsMenu: ".bPatchnoteMenuContainer li:nth-child(4)",
        timezoneActiveMenu: ".bPatchnoteMenuContainer li:nth-child(1).bPatchnote__menuItem_active",
        objectsActiveMenu: ".bPatchnoteMenuContainer li:nth-child(2).bPatchnote__menuItem_active",
        environActiveMenu: ".bPatchnoteMenuContainer li:nth-child(3).bPatchnote__menuItem_active",
        skillsActiveMenu: ".bPatchnoteMenuContainer li:nth-child(4).bPatchnote__menuItem_active",
        prev51Page: ".pAionPatchnotes51__layout__link",
        prev50Page: ".pAionPatchnotes50__layout__link",
        prev491Page: ".pAionPatchnotes491__layout__link",
        prev49Page: ".pAionPatchnotes49__layout__link",
        prev48Page: ".pAionUpdate48-update-link",
        prev475Page: ".pAionPatchnotes475__layout__link",

        url50: "/aion/play/updates/5.0/",
        title50: "AION: Обновление 5.0 «Начало высшего пути»",
        url491: "/aion/play/updates/4.91/",
        title491: "AION: Обновление 4.91 «6 лет в Атрее — все только начинается»",
        url49: "/aion/play/updates/4.9/",
        title49: "Aion — сайт сообщества: обновление 4.9 «Эра льда»",
        url48: "/aion/play/updates/4.8/",
        title48: "Aion — сайт сообщества: обновление 4.8 «Новый рассвет»",
        url475: "/aion/play/updates/4.75/",
        title475: "Aion — сайт сообщества: обновление 4.75 «Ярость дракона»",
        url47: "/aion/play/updates/4.70/",
        title47: "Aion — сайт сообщества: обновление 4.7 «Война древних»"
    },

    /**
     * Элементы страницы, которые мы исключаем из проверки верстки из-за диинамики
     */
    exclude: [
        ".footer-4game__social-item", // содержит конпки вк и фб с количеством лайков
        ".bPlayLayout__eColumn", // новости и акции
        ".bPremiumActions__eActionControl",
        ".bRatings",
        ".bGamePanelCommon",                // геймпанель
        "#GamePanel",
        ".userbar-tray",                     // юзербар
        ".pAionPatchnotes50__video_container",
        ".pAionPatchnotes__portal",
        ".pAionPatchnotes49__header__head_bg"
    ]
}