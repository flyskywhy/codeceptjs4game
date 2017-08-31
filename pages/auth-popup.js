'use strict';

let I;

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    popupElement: "#bAuthPopupWidget",
    closeButton: "i.bUIPopup__eCloseIcon",
    logoutLink: "#userBar-link-Logout",
    loginField: "#AuthFormLogin",
    passwordField: "#AuthFormPassword",
    signInButton: "#jsLoginPopupWidget__SignIn",
    passwordFieldWithOpenEye: "#AuthFormPassword__PlainText",
    error: ".bUIErrorMessage__mVisible_True",
    errorLogin: "#AuthForm_loginOrEmail.bUIErrorMessage__mVisible_True",
    errorPassword: "#AuthForm_password.bUIErrorMessage__mVisible_True",
    errorMessageLoginOrPassword: "Неверный логин или пароль",
    errorMessagePassword: "Минимум 6 символов",
    errorMessageEmptyPassword: "Введи пароль",
    errorMessageEmptyLogin: "Введи логин или почту",
    captcha: ".bUICaptcha",
    captchaImage: ".bUICaptcha__eImage",
    captchaField: "[name='AuthForm[captcha]']",
    captchaReloadButton: ".bUICaptcha__eReload",
    passwordOpenEye: ".bUIInput__ePasswordEye",
    emailField: "[name='ConfirmMainEmailForm[email]']",
    createAccountButton: "#jsLoginPopupWidget__Registration .bUIButton__eShine ",
    regText: "Письмо со ссылкой для завершения регистрации",
    
    vkButton: ".bUIButton__eShine_type_vk",
    vkEmailField: "[name='email']",
    vkPasswordField: "[name='pass']",
    vkSubmitButton: "[type='submit']",
    
    fbButton: ".bUIButton__eShine_type_facebook",
    fbEmailField: "#email",
    fbPasswordField: "#pass",
    fbSubmitButton: "#loginbutton",
    
    yaButton: ".bUIButton__eShine_type_yandex",
    yaEmailField: "#login",
    yaPasswordField: "#passwd",
    yaSubmitButton: ".domik-submit",
    
    okButton: ".bUIButton__eShine_type_odnoklassniki",
    okEmailField: "#field_email",
    okPasswordField: "#field_password",
    okSubmitButton: "[type='submit']",

    signUp(email){
        I.waitForVisible(this.popupElement);
        I.waitForVisible(this.emailField);
        I.fillField(this.emailField, email);
        I.waitForElement(this.createAccountButton);
        I.click(this.createAccountButton);
    },

    closePopup(){
        I.waitForElement(this.closeButton);
        I.click(this.closeButton);
        I.dontSeeElement(this.popupElement);
    },

    captchaShouldBePresent(){
        I.waitAndClick(this.captcha);
        I.waitAndClick(this.captchaImage);
        I.waitAndClick(this.captchaField);
        I.waitAndClick(this.captchaReloadButton);
    }
}