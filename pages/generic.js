'use strict';

let I;
let assert = require('assert');

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    timeout: 30,

    authPopup: '#bAuthPopupWidget',
    authPopupClose: {
        css: 'i.bUIPopup__eCloseIcon'
    },
    authAndRegButton: {
        css: '#userBar-button-authAndReg'
    },
    logoutLink: {
        css: '#userBar-link-Logout'
    },
    authFormLogin: {
        css: '#AuthFormLogin'
    },
    authFormPassword: {
        css: '#AuthFormPassword'
    },
    authFormLoginButton: {
        css: '#jsLoginPopupWidget__SignIn'
    },
    authFormErrorMessageLogin: "#AuthForm_loginOrEmail",
    userBar: {
        css: '#UserBar4Game',
        background: ".userbar-bg"
    },
    barUserName: '#userBar-div-LoginName',
    barBalance: {
        css: '#userBar-div-UserBalanceData'
    },  
    barAchievementLink: ".userbar-list-item--achievement-link",
    jsOverlayContainer: {
        css: '#jsOverlayContainer'
    },
    licencePopupIframe: "A4GFrame",
    licencePopup: "#LicencePopup",
    licensePopupPlayButton: "#jsLicensePopup-btnPlay",
    body: 'body',
    content: "#GlobalContent",
    error404: "404 Error",
    premiumBuyButton: "#premium-buy",
    terminalAchievements: ".terminal_achievements",
    priceYear: "[id='PaymentPopup__eAmount_Osmppull'][value='2900']",
    premiumCouponMonthly1: "//*[@class='bUIRadiobutton__eLabel']//*[@data-coupon-months='1']//..//..",
    premiumCouponMonthly3: "//*[@class='bUIRadiobutton__eLabel']//*[@data-coupon-months='3']//..//..",
    premiumCouponMonthly12: "//*[@class='bUIRadiobutton__eLabel']//*[@data-coupon-months='12']//..//..",
    premiumCouponCheckedMonthly1: "//*[@class='bUIRadiobutton__eLabel bUIRadiobutton__mChecked']//*[@data-coupon-months='1']/../..",
    premiumCouponCheckedMonthly3: "//*[@class='bUIRadiobutton__eLabel bUIRadiobutton__mChecked']//*[@data-coupon-months='3']/../..",
    premiumCouponCheckedMonthly12: "//*[@class='bUIRadiobutton__eLabel bUIRadiobutton__mChecked']//*[@data-coupon-months='12']/../..",
    premiumAutopayCheckbox: ".jsUICheckbox[for='premium-autopay']",
    premiumAutopayChecked: ".jsUICheckbox[for='premium-autopay'] .bUICheckbox__eFakeCheckbox__mChecked_True",
    autoImprovementTrue: "#bPremiumActions__eAutoImprovement[data-improvement-state='true]",
    autoImprovementFalse: "#bPremiumActions__eAutoImprovement[data-improvement-state='false]",
    closePopupButton: ".bUIPopup__eClose",

    barSpgLink: {
        css: '.userbar-control--desktop'
    },
    barSpgList: {
        css: '.userbar-games--desktop'
    },

    gamePanel: {
        gameName: {
            css: 'div.bGamePanelCommon__eTitleName.jsServiceTitle'
        },
        gamePanel: ".bUIButton__eShine",
        generalElement: "#GamePanel",
        mini: ".bGamePanelMini",
        buyPremiumButton: "#jsBtnBuyPremiumInGamePanel",
        
    },

    videoIframe: {
        playButton: ".ytp-large-play-button",
        streamSelector: ".playing-mode"
    },

    footer: {
        supportLink: {
            css: 'p.footer-4game__support > a'
        },
        footer: "[class='bFooter']",
        support: ".footer-4game__support [href='https://ru.4gamesupport.com']",
        forum: ".footer-4game__support [href='https://4gameforum.com/']",
        appBtn: ".footer-4game__app-btn",
        supportUrl: "https://ru.4game.com/support/",
        forumUrl: "https://4gameforum.com/",
        vkButton: ".footer-4game__social-item_vk",
        fbButton: ".footer-4game__social-item_fb",
        docsLink: ".footer-4game__docs-picker",
        docsList: ".footer-4game__docs",
        licenceLink: ".footer-4game__docs-item [href='/licence/view/serviceId/9/type/2/']",
        licenceUrl: "/licence/view/serviceId/9/type/2/",
        violationsLink: ".footer-4game__docs-item [href='/aion-violations/']",
        violationsUrl: "/aion-violations/",
        requirementsLink: ".footer-4game__docs-item [href='/docs/legal/system-requirements/']",
        requirementsUrl: "/docs/legal/system-requirements/",
        licenceUserLink: ".footer-4game__docs-item [href='/licence/view/serviceId/9/type/1/']",
        licenceUserUrl: "/licence/view/serviceId/9/type/1/",
        policyLink: ".footer-4game__docs-item [href='/docs/legal/components-policy/']",
        policyUrl: "/docs/legal/components-policy/",
        langButton: ".footer-4game__lang-picker",
        langPopup: ".footer-4game__lang-popup",
        languageEnglish: ".footer-4game__lang-list-item [href='/settings/setLanguage/?languageCode=en']",
        foreignUrl: "https://eu.4gametest.com/lineage2classic/install/",
        languageDeutsch: ".footer-4game__lang-list-item [href='/settings/setLanguage/?languageCode=de']",
        languagePolski: ".footer-4game__lang-list-item [href='/settings/setLanguage/?languageCode=pl']"
    },

    exclude: [
        ".footer-4game__social-section", // соцсети в футере
        ".bGamePanelCommon", // геймпанель
        ".userbar-tray" // юзербар
    ],

    excludeWithGamePanel: [
        ".footer-4game__social-section", // соцсети в футере
        ".bGamePanelCommon", // геймпанель
        ".userbar-tray" // юзербар
    ],


    // insert your locators and methods here
    login(login, password) {
        I.waitForElement(this.authAndRegButton, 30);
        I.click(this.authAndRegButton);
        I.waitForVisible(this.authFormLogin, 30);
        I.fillField(this.authFormLogin, login);
        I.fillField(this.authFormPassword, password);
        I.click(this.authFormLoginButton);
    },

    logout() {
        I.waitAndClick(this.barUserName, 30);
        //I.waitForElement(this.barUserName, 30);
        //I.click(this.barUserName);
        I.waitAndClick(this.logoutLink, 10);
        //I.waitForElement(this.logoutLink, 10);
        //I.click(this.logoutLink);
    },

    openSignUpPopup() {
        I.waitForVisible(this.authAndRegButton);
        I.click(this.authAndRegButton);
    }
}
