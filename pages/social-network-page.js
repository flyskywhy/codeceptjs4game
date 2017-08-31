'use strict';

let I;

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    authPopupElement: "#bAuthPopupWidget",
    vkAuthUrl: "https://oauth.vk.com/authorize?client_id=2405070&redirect_uri=https://api2.4gametest.com/auth/oauth/vk/2405070&response_type=code&state=9ae33a83-ccc9-44fd-b0ae-a1f015017a11&scope=email&display=popup",
    vkButton: ".bUIButton__eShine_type_vk",
    vkEmailField: "[name='email']",
    vkPasswordField: "[name='pass']",
    vkSubmitButton: "[type='submit']",

    fbAuthUrl: "https://www.facebook.com/login",
    fbEmailField: "#email",
    fbPasswordField: "#pass",
    fbSubmitButton: "#loginbutton",

    yaAuthUrl: "https://passport.yandex.ru/auth?",
    yaButton: ".bUIButton__eShine_type_yandex",
    yaEmailField: "#login",
    yaPasswordField: "#passwd",
    yaSubmitButton: ".domik-submit",
    yaSubmit: "#nb-2",

    okAuthUrl: "https://connect.ok.ru/dk?st.cmd=OAuth2Login",
    okButton: ".bUIButton__eShine_type_odnoklassniki",
    okEmailField: "#field_email",
    okPasswordField: "#field_password",
    okSubmitButton: "[type='submit']",
    okGeneralSubmitButton: ".toolbar_ac[type='submit']",

    loginInFacebook(email, password){
        I.amOnPage(this.fbAuthUrl);
        I.waitForVisible(this.fbEmailField);
        I.waitForVisible(this.fbPasswordField);
        I.fillField(this.fbEmailField, email);
        I.fillField(this.fbPasswordField, password);
        I.waitForElement(this.fbSubmitButton);
        I.click(this.fbSubmitButton);
    },

    loginInYandex(email, password){
        I.amOnPage(this.yaAuthUrl);
        I.waitForVisible(this.yaEmailField);
        I.waitForVisible(this.yaPasswordField);
        I.fillField(this.yaEmailField, email);
        I.fillField(this.yaPasswordField, password);
        I.waitForElement(this.yaSubmitButton);
        I.click(this.yaSubmitButton);
    },

    loginInVk(email, password){
        I.amOnPage(this.vkAuthUrl);
        I.waitForVisible(this.vkEmailField);
        I.waitForVisible(this.vkPasswordField);
        I.fillField(this.vkEmailField, email);
        I.fillField(this.vkPasswordField, password);
        I.waitForElement(this.vkSubmitButton);
        I.click(this.vkSubmitButton);
    },

    loginInOk(email, password){
        I.amOnPage(this.okAuthUrl);
        I.waitForVisible(this.okEmailField);
        I.waitForVisible(this.okPasswordField);
        I.fillField(this.okEmailField, email);
        I.fillField(this.okPasswordField, password);
        I.waitForElement(this.okSubmitButton);
        I.click(this.okSubmitButton);
    },

    confirmSignUpWithOk(){
        I.waitForVisible(this.authPopupElement);
        I.waitForVisible(this.okButton);
        I.click(this.okButton);
        I.waitTabsLoading(2, 15);
        I.changeTab(2);
        I.waitForVisible(this.okGeneralSubmitButton);
        I.click(this.okGeneralSubmitButton);
        I.changeTab(1);
        I.waitForElement("body");
    }
}