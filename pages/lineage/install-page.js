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
        url: "/lineage2/install",
        title: "Lineage 2 — официальный сайт онлайн-игры",
        gamePanel: "#GamePanel",
        userbar: "[class='userbar-tray']",
        content: "#GlobalContent",
        classicLink: "[data-lineage='classic'] a:nth-child(2)",
        playLink: "[data-lineage='ertheia'] .l2-logo__link[data-href='preserve']",
        body: "body",
        slide1: ".L2ErtheiaPromo_Slide1__title",
        slide2: ".L2ErtheiaPromo_Slide2__title",
        slide3: ".L2ErtheiaPromo_Slide3__title",
        slide4: ".L2ErtheiaPromo_Slide4__title",
        slide5: ".L2ErtheiaPromo_Slide5__title",
        slide1Title: "Играй бесплатно в обновленную версию Lineage 2: Helios",
        slide2Title: "7 рас и 8 архетипов с отточенным балансом способностей",
        slide3Title: "Ускоренная прокачка и Тренировочный лагерь",
        slide4Title: "Алхимия и игровой аукцион",
        slide5Title: "Межсерверные осады",
        racesPeopleElement: ".L2ErtheiaPromo_Slide2__racesarchetypes-items [data-filter-name='people']",
        racesPeopleActiveElement: ".L2ErtheiaPromo_Slide2__racesarchetypes-items [data-filter-name='people'][data-filter-active='true']",
        racesArtheiaElement: ".L2ErtheiaPromo_Slide2__racesarchetypes-items [data-filter-name='artheia']",
        racesArtheiaActiveElement: ".L2ErtheiaPromo_Slide2__racesarchetypes-items [data-filter-name='artheia'][data-filter-active='true']",
        archetypeEuraActiveElement: ".L2ErtheiaPromo_Slide2__racesarchetypes-items .archetype-icon_eura",
        archetypeEuraInfoPopup: ".L2ErtheiaPromo_Slide2__racesarchetypes-items .archetype-icon_eura",
        archetypeEuraText: "Избегает ближнего боя, но очень опасен на больших дистанциях",
        archetypeFeoActiveElement: ".L2ErtheiaPromo_Slide2__racesarchetypes-items .archetype-icon_feo",
        archetypeFeoInfoPopup: ".L2ErtheiaPromo_Slide2__racesarchetypes-items .archetype-icon_feo",
        archetypeFeoText: "Наносит мощнейшие магические удары, используя силу стихий",
        archetypeTiraActiveElement: ".L2ErtheiaPromo_Slide2__racesarchetypes-items .archetype-icon_tira",
        archetypeTiraInfoPopup: ".L2ErtheiaPromo_Slide2__racesarchetypes-items .archetype-icon_tira",
        archetypeTiraText: "Последний из Берсерков. Сражается, не зная усталости и боли"
    },


    /**
     * Тексты для основной страницы install Europe
     */
    installEuro: {
        title: "Lineage 2 Europe — official site of the online game",
        slide1Title: "Play the renewed Lineage 2:",
        slide2Title: "7 races and 8 awakening classes with well-designed skills",
        slide3Title: "Faster levelling and Training Camp",
        slide4Title: "Auction House and Alchemy",
        slide5Title: "More ways to gain power than ever",
        archetypeEuraText: "Avoids close combat, but deadly in distance",
        archetypeTiraText: "Restless fighter who knows no pain"
    },

    /**
     * Элементы классической версии страницы install и общих элементов подстраниц
     */
    classicInstall: {
        url: "/lineage2classic/install",
        title: "Lineage 2 Classic — официальный сайт онлайн-игры",
        promoLink: "[data-lineage='ertheia'] a:nth-child(2)",
        playLink: "[data-lineage='classic'] .l2-logo__link[data-href='preserve']",
        slide1: ".L2ClassicPromo_Slide1__title",
        slide2: ".L2ClassicPromo_Slide2__title",
        slide3: ".L2ClassicPromo_Slide3__title",
        slide4: ".L2ClassicPromo_Slide4__title",
        slide5: ".L2ClassicPromo_Slide5__title",
        slide1Title: "Lineage 2 Classic — подпишись на легендарный хардкор",
        slide2Title: "5 рас и 31 уникальный класс",
        slide3Title: "Та самая хардкорная прокачка",
        slide4Title: "Классическая система экономики",
        slide5Title: "Клановые войны на своем сервере",
        racesPeopleElement: ".L2ClassicPromo_Slide2__racesclasses-items [data-filter-name='people']",
        racesPeopleActiveElement: ".L2ClassicPromo_Slide2__racesclasses-items [data-filter-name='people'][data-filter-active='true']",
        classPaladinActiveElement: ".L2ClassicPromo_Slide2__racesclasses-items .class-icon_paladin",
        classPaladinInfoPopup: ".L2ClassicPromo_Slide2__racesclasses-items .class-icon_paladin",
        classPaladinText: "Самоотверженный защитник, лечащий союзников за счет своего здоровья",
        racesGnomesElement: ".L2ClassicPromo_Slide2__racesclasses-items [data-filter-name='gnomes']",
        racesGnomesActiveElement: ".L2ClassicPromo_Slide2__racesclasses-items [data-filter-name='gnomes'][data-filter-active='true']",
        classBountyHunterActiveElement: ".L2ClassicPromo_Slide2__racesclasses-items .class-icon_bounty-hunter",
        classBountyHunterInfoPopup: ".L2ClassicPromo_Slide2__racesclasses-items .class-icon_bounty-hunter",
        classBountyHunterText: "Бесценный воин, увеличивающий ресурсы с поверженных монстров",
        classBlacksmithActiveElement: ".L2ClassicPromo_Slide2__racesclasses-items .class-icon_blacksmith",
        classBlacksmithInfoPopup: ".L2ClassicPromo_Slide2__racesclasses-items .class-icon_blacksmith",
        classBlacksmithText: "Искусный мастер, создающий уникальные предметы и оружие"

    },

    /**
     * Тексты для основной страницы install classic Europe
     */
    classicInstallEuro: {
        title: "Lineage 2 Europe — official site of the online game",
        slide1Title: "Lineage 2 Classic — epic adventures await",
        slide2Title: "5 races and 31 unique classes",
        slide3Title: "Hard levelling for those who missed the real hardcore",
        slide4Title: "Classical trading system",
        slide5Title: "Clan wars and castle sieges",
        classPaladinText: "A selfless defender sacrificing himself to heal allies",
        classBountyHunterText: "An invaluable warrior plundering additional values from defeated monsters",
        classBlacksmithText: "Skilled craftsman creating gear and weapons for himself and other players"
    },

    /**
     * Элементы футера для новой и классической версии страницы install
     */
    footer: {
        langButton: "[data-lineage='ertheia'] .footer-4game__lang-picker",
        langPopup: "[data-lineage='ertheia'] .footer-4game__lang-popup",
        languageRussian: "[data-lineage='ertheia'] .footer-4game__lang-list-item [href='/settings/setLanguage/?languageCode=ru']",
        russianUrl: "https://ru.4gametest.com/",
        languageEnglish: "[data-lineage='ertheia'] .footer-4game__lang-list-item [href='/settings/setLanguage/?languageCode=en']",
        foreignUrl: "https://eu.4gametest.com/lineage2classic/install/",
        languageDeutsch: "[data-lineage='ertheia'] .footer-4game__lang-list-item [href='/settings/setLanguage/?languageCode=de']",
        languagePolski: "[data-lineage='ertheia'] .footer-4game__lang-list-item [href='/settings/setLanguage/?languageCode=pl']",
        docsLink: "[data-lineage='ertheia'] .footer-4game__docs-picker",
        docsList: "[data-lineage='ertheia'] .footer-4game__docs",
        licenceLink: "[data-lineage='ertheia'] .footer-4game__docs-item [href='/licence/view/serviceId/6/type/2/']",
        licenceUrl: "/licence/view/serviceId/6/type/2/",
        violationsLink: "[data-lineage='ertheia'] .footer-4game__docs-item [href='/l2ru-violations/']",
        violationsUrl: "/l2ru-violations/",
        requirementsLink: "[data-lineage='ertheia'] .footer-4game__docs-item [href='/docs/legal/system-requirements/']",
        requirementsUrl: "/docs/legal/system-requirements/",
        licenceUserLink: "[data-lineage='ertheia'] .footer-4game__docs-item [href='/licence/view/serviceId/6/type/1/']",
        licenceUserUrl: "/licence/view/serviceId/6/type/1/",
        policyLink: "[data-lineage='ertheia'] .footer-4game__docs-item [href='/docs/legal/components-policy/']",
        policyUrl: "/docs/legal/components-policy/",

        langButtonClassic: "[data-lineage='classic'] .footer-4game__lang-picker",
        langPopupClassic: "[data-lineage='classic'] .footer-4game__lang-popup",
        languageRussianClassic: "[data-lineage='classic'] .footer-4game__lang-list-item [href='/settings/setLanguage/?languageCode=ru']",
        languageEnglishClassic: "[data-lineage='classic'] .footer-4game__lang-list-item [href='/settings/setLanguage/?languageCode=en']",
        languageDeutschClassic: "[data-lineage='classic'] .footer-4game__lang-list-item [href='/settings/setLanguage/?languageCode=de']",
        languagePolskiClassic: "[data-lineage='classic'] .footer-4game__lang-list-item [href='/settings/setLanguage/?languageCode=pl']",
        docsLinkClassic: "[data-lineage='classic'] .footer-4game__docs-picker",
        docsListClassic: "[data-lineage='classic'] .footer-4game__docs",
        licenceLinkClassic: "[data-lineage='classic'] .footer-4game__docs-item [href='/licence/view/serviceId/33/type/2/']",
        licenceUrlClassic: "/licence/view/serviceId/33/type/2/",
        violationsLinkClassic: "[data-lineage='classic'] .footer-4game__docs-item [href='/l2cru-violations/']",
        violationsUrlClassic: "/l2cru-violations/",
        requirementsLinkClassic: "[data-lineage='classic'] .footer-4game__docs-item [href='/docs/legal/system-requirements/']",
        licenceUserLinkClassic: "[data-lineage='classic'] .footer-4game__docs-item [href='/licence/view/serviceId/33/type/1/']",
        licenceUserUrlClassic: "/licence/view/serviceId/33/type/1/",
        policyLinkClassic: "[data-lineage='classic'] .footer-4game__docs-item [href='/docs/legal/components-policy/']"
    },

    /**
     * Элементы футера для новой и классической Европейской версии страницы install
     */
    footerEuro: {
        licenceLink: "[data-lineage='ertheia'] .footer-4game__docs-item [href='/licence/view/serviceId/1006/type/2/']",
        licenceUrl: "/licence/view/serviceId/1006/type/2/",
        policyLink: "[data-lineage='ertheia'] .footer-4game__docs-item [href='/payment-policy/']",
        policyUrl: "/payment-policy/",
        violationsLink: "[data-lineage='ertheia'] .footer-4game__docs-item [href='/l2eu-violations/']",
        violationsUrl: "/l2eu-violations/",
        licenceUserLink: "[data-lineage='ertheia'] .footer-4game__docs-item [href='/licence/view/serviceId/1006/type/1/']",
        licenceUserUrl: "/licence/view/serviceId/1006/type/1/",
        contactsLink: "[data-lineage='ertheia'] .footer-4game__docs-item [href='/contacts/']",
        contactsUrl: "/contacts/",
        useLink: "[data-lineage='ertheia'] .footer-4game__docs-item [href='/terms-of-use/']",
        useUrl: "/terms-of-use/",
        privacyLink: "[data-lineage='ertheia'] .footer-4game__docs-item [href='/privacy/']",
        privacyUrl: "/privacy/",
        newsLink: "[data-lineage='ertheia'] .footer-4game__docs-item [href='https://4gameforum.com/categories/380/']",
        newsUrl: "https://4gameforum.com/categories/380/",
        casesLink: "[data-lineage='ertheia'] .footer-4game__docs-item [href='/l2eu-cases/']",
        casesUrl: "/l2eu-cases/",

        licenceLinkClassic: "[data-lineage='classic'] .footer-4game__docs-item [href='/l2ceu-license-agreement/']",
        licenceUrlClassic: "/l2ceu-license-agreement/",
        licenceUserLinkClassic: "[data-lineage='classic'] .footer-4game__docs-item [href='/l2ceu-user-agreement/']",
        licenceUserUrlClassic: "/l2ceu-user-agreement/",
        useLinkClassic: "[data-lineage='classic'] .footer-4game__docs-item [href='/terms-of-use/']",
        useUrlClassic: "/terms-of-use/",
        policyLinkClassic: "[data-lineage='classic'] .footer-4game__docs-item [href='/l2ceu-payment-policy/']",
        policyUrlClassic: "/l2ceu-payment-policy/",
        contactsLinkClassic: "[data-lineage='classic'] .footer-4game__docs-item [href='/contacts/']",
        contactsUrlClassic: "/contacts/",
        privacyLinkClassic: "[data-lineage='classic'] .footer-4game__docs-item [href='/privacy/']",
        privacyUrlClassic: "/privacy/",
        newsLinkClassic: "[data-lineage='classic'] .footer-4game__docs-item [href='https://4gameforum.com/categories/380/']",
        newsUrlClassic: "https://4gameforum.com/categories/380/"
    },

    /**
     * Элементы страницы, которые мы исключаем из проверки верстки из-за диинамики
     */
    exclude: [
        ".L2ClassicPromo_Slide1__title",
        ".L2ClassicPromo_Slide2__title",
        ".L2ClassicPromo_Slide3__title",
        ".L2ClassicPromo_Slide4__title",
        ".L2ClassicPromo_Slide5__title"
    ],

    moveToSlide2() {
        I.click(this.install.body);
        I.waitForText(this.install.slide1Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.install.slide2Title);
    },

    moveToSlide3() {
        I.click(this.install.body);
        I.waitForText(this.install.slide1Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.install.slide2Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.install.slide3Title);
    },

    moveToSlide4() {
        I.click(this.install.body);
        I.waitForText(this.install.slide1Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.install.slide2Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.install.slide3Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.install.slide4Title);
    },

    moveToSlide5() {
        I.click(this.install.body);
        I.waitForText(this.install.slide1Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.install.slide2Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.install.slide3Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.install.slide4Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.install.slide5Title);
    },

    moveToClassicSlide2() {
        I.click(this.install.body);
        I.waitForText(this.classicInstall.slide1Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstall.slide2Title);
    },

    moveToClassicSlide3() {
        I.click(this.install.body);
        I.waitForText(this.classicInstall.slide1Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstall.slide2Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstall.slide3Title);
    },

    moveToClassicSlide4() {
        I.click(this.install.body);
        I.waitForText(this.classicInstall.slide1Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstall.slide2Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstall.slide3Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstall.slide4Title);
    },

    moveToClassicSlide5() {
        I.click(this.install.body);
        I.waitForText(this.classicInstall.slide1Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstall.slide2Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstall.slide3Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstall.slide4Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstall.slide5Title);
    },

    moveToEuroSlide2() {
        I.click(this.install.body);
        I.waitForText(this.installEuro.slide1Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.installEuro.slide2Title);
    },

    moveToEuroSlide3() {
        I.click(this.install.body);
        I.waitForText(this.installEuro.slide1Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.installEuro.slide2Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.installEuro.slide3Title);
    },

    moveToEuroSlide4() {
        I.click(this.install.body);
        I.waitForText(this.installEuro.slide1Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.installEuro.slide2Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.installEuro.slide3Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.installEuro.slide4Title);
    },

    moveToEuroSlide5() {
        I.click(this.install.body);
        I.waitForText(this.installEuro.slide1Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.installEuro.slide2Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.installEuro.slide3Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.installEuro.slide4Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.installEuro.slide5Title);
    },

    moveToClassicEuroSlide2() {
        I.click(this.install.body);
        I.waitForText(this.classicInstallEuro.slide1Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstallEuro.slide2Title);
    },

    moveToClassicEuroSlide3() {
        I.click(this.install.body);
        I.waitForText(this.classicInstallEuro.slide1Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstallEuro.slide2Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstallEuro.slide3Title);
    },

    moveToClassicEuroSlide4() {
        I.click(this.install.body);
        I.waitForText(this.classicInstallEuro.slide1Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstallEuro.slide2Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstallEuro.slide3Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstallEuro.slide4Title);
    },

    moveToClassicEuroSlide5() {
        I.click(this.install.body);
        I.waitForText(this.classicInstallEuro.slide1Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstallEuro.slide2Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstallEuro.slide3Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstallEuro.slide4Title);
        I.pressKey('Arrow_Down');
        I.waitForText(this.classicInstallEuro.slide5Title);
    },
}