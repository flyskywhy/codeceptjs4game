'use strict';

let I;

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    reg: {
        popup: ".bFBConnectWidget__eCreate__mSocialRegisterPopup",
        userPic: ".bFBConnectWidget__eUserPic",
        linkAccount: "[data-ft='ft_linkAccountLinkRegistrationSocial']",
        checkbox: "#jsAuthPopupWidgetLayout__eAccept4gameLicense",
        submitButton: "[data-ft='ft_submitButtonRegistrationSocial']"
    },

    link: {
        popup: ".bFBConnectWidget__eCreate__mSocialLinkPopup",
        loginField: "[name='AuthForm[loginOrEmail]']",
        passwordField: "[type='password'][name='AuthForm[password]']",
        submitButton: "[data-ft='ft_submitButtonLinkSocial']"
    },

    /**
     * Авторизуемся аккаунтом 4game и привязываем к соцсети 
     * @param email
     * @param password
     */
    loginAndLinkAccount(email, password) {
        I.waitForVisible(this.link.popup);
        I.waitForVisible(this.link.loginField);
        I.fillField(this.link.loginField, email);
        I.waitForVisible(this.link.passwordField);
        I.fillField(this.link.passwordField, password);
        I.waitForVisible(this.link.submitButton);
        I.click(this.link.submitButton);
    },

    /**
     * Привязать аккаунт к соцсети
     */
    linkAccount() {
        I.waitForVisible(this.reg.popup);
        I.waitForVisible(this.reg.linkAccount);
        I.click(this.reg.linkAccount);
    },

    /**
     * Создать аккаунт и войти
     */
    createAccount() {
        I.waitForVisible(this.reg.popup);
        I.waitForElement(this.reg.checkbox);
        I.click(this.reg.checkbox);
        I.waitForVisible(this.reg.submitButton);
        I.click(this.reg.submitButton);
    },

    /**
     * Проверяем наличие аватара в попапе
     */
    avatarShouldBePresent() {
        I.waitForVisible(this.reg.popup);
        I.waitForVisible(this.reg.userPic);
    }
}
