'use strict';

let I;

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    registerForm: "[data-text='Регистрация нового пользователя']",
    passwordField: "[type='password'][name='RegisterForm[password]']",
    emailField: "[name='ConfirmMainEmailForm[email]']",
    passwordWithOpenEyeField: "[type='text'][name='RegisterForm[password]']",
    acceptLicenseCheckbox: "[name='RegisterForm[acceptLicense]']",
    submitButton: "#jsRegistration__LoginAndPlay",
    createAccountButton: "#jsRegistration__CreateAccount",
    openEyeElement: ".jsUIInput__ePasswordEye",
    brandingElement: ".bBrandingLine",

    signUp(password){
        I.waitForVisible(this.registerForm);
        I.waitForVisible(this.passwordField);
        I.fillField(this.passwordField, password);
        I.waitForElement(this.acceptLicenseCheckbox);
        I.click(this.acceptLicenseCheckbox);
        I.waitForElement(this.submitButton);
        I.click(this.submitButton);
    },

    signUpWithOpenEye(password){
        I.waitForVisible(this.registerForm);
        I.waitForVisible(this.openEyeElement);
        I.click(this.openEyeElement);
        I.waitForVisible(this.passwordWithOpenEyeField);
        I.fillField(this.passwordWithOpenEyeField, password);
        I.waitForElement(this.acceptLicenseCheckbox);
        I.click(this.acceptLicenseCheckbox);
        I.waitForElement(this.submitButton);
        I.click(this.submitButton);
    },

    createAccount(email){
        I.waitForVisible(this.registerForm);
        I.waitForVisible(this.emailField);
        I.fillField(this.emailField, email);
        I.waitForElement(this.createAccountButton);
        I.click(this.createAccountButton);
    },
}