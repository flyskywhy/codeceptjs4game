'use strict';

let I;

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    timeout: 30,

    main: {
        settingsFormContent: '#SettingsContent',
        buttonSaveSettingsDisabled: "//button[@id='jsPersonalData__SaveSettings' and contains(@class, 'bUIButton__mState_disabled')]",
        buttonSaveSettingsEnabled: "//button[@id='jsPersonalData__SaveSettings' and not(contains(@class, 'bUIButton__mState_disabled'))]",
        successSettingsChangeMessage: {
            locator: '.bFormSubmitBlock.mSuccessSave .bSaveOperationMessage.mSuccess',
            text: 'Изменения сохранены,\nты можешь продолжить настройку. Скрыть'
        },
        accountIsNotProtected: "#security_widget_level_none",
        accountLowSecurity: "#security_widget_level_low",
        accountMediumSecurity: "#security_widget_level_medium",
        accountHighSecurity: "#security_widget_level_high",
        superSecurityIsOn: "#security_widget_ubersecurity_block",
        linkAddMail: "#link_add_email",
        fieldPassword: "#jsPersonalData__PasswordInput"
    },

    loginData: {
        url: "/settings/",
        mailLabel: "#login_options_email",
        linkChangeMainMail: "#change_login_options_email",
        fieldChangeMail: "#jsSetContactWidget__ChangeEmail__InitEmailInput",
        buttonAcceptChangeEmail: "#jsSetContactWidget__ChangeEmail__InitButton",
        fieldSmSCodeChangeMail: "#jsSetContactWidget__ChangeEmail__SmsCodeInput",
        buttonChangeMailAfterSmsCode: "#jsSetContactWidget__ChangeEmail__SmsCodeButton",
        errorMessageSmsCode: ".bUIErrorMessage__mDisplay_Block",
        fieldLogin: "//input[contains(@name, 'ProfileLoginForm[login]')]",
        fieldNewPassword: "//input[@name='ProfileLoginForm[newPassword]' and @type = 'password']",
        addYaContact: ".bSocialsBlock__mType_ya .bSocialsBlock__eConnect",
        delYaContact: "#del_ya_contact",
        addFbContact: ".bSocialsBlock__mType_fb .bSocialsBlock__eConnect",
        delFbContact: "#del_fb_contact",
        addVkContact: ".bSocialsBlock__mType_vk .bSocialsBlock__eConnect",
        delVkContact: "#del_vk_contact",
        addOkContact: ".bSocialsBlock__mType_ok .bSocialsBlock__eConnect",
        delOkContact: "#del_ok_contact",
        linkAddMobile: "#link_add_mobile",
        fieldMobileNumber: "//input[contains(@type,'tel')]",
        buttonAddMobileNumber: "#jsSetContactWidget__AddMobile__InitButton",
        fieldForCodeAddMobile: "//input[contains(@id,'SmsCodeInput')]",
        buttonAddNumberAfterCode: "#jsSetContactWidget__AddMobile__SmsCodeButton",
        linkChangeMobile: "#link_change_mobile",
        buttonChangeMobile: "#jsSetContactWidget__ChangeMobile__InitButton",
        fieldChangeMobileNewCode: "#jsSetContactWidget__ChangeMobile__SmsNewCodeInput",
        buttonChangeMobileNewCode: "#jsSetContactWidget__ChangeMobile__SmsNewCodeButton",
        fieldChangeMobileOldCode: "#jsSetContactWidget__ChangeMobile__SmsOldCodeInput",
        buttonChangeMobileOldCode: "#jsSetContactWidget__ChangeMobile__SmsOldCodeButton",
        mobilePhone: "#security_widget_mobile",
        linkDeleteMobile: "#link_delete_mobile",
        fieldDeleteMobile: "#jsSetContactWidget__DeleteMobile__InitPhoneInput",
        buttonDeleteMobile: "#jsSetContactWidget__DeleteMobile__InitButton",
        fieldDeleteMobileCode: "#jsSetContactWidget__DeleteMobile__SmsCodeInput",
        buttonDeleteMobileAccept: "#jsSetContactWidget__DeleteMobile__SmsCodeButton"
    },

    notifications: {
        checkboxAccountMailChecked: "//span[.//input[@id='NotificationsSettingsForm_notificationEmail_264'] and contains(@class, 'bUICheckbox__eFakeCheckbox__mChecked_True')]",
        checkboxAccountMailUnchecked: "//span[.//input[@id='NotificationsSettingsForm_notificationEmail_264'] and @class='jsUICheckbox__eFakeCheckbox bUICheckbox__eFakeCheckbox']",
        checkboxNewsMailChecked: "//span[.//input[@id='NotificationsSettingsForm_notificationEmail_128'] and contains(@class, 'bUICheckbox__eFakeCheckbox__mChecked_True')]",
        checkboxNewsMailUnchecked: "//span[.//input[@id='NotificationsSettingsForm_notificationEmail_128'] and @class='jsUICheckbox__eFakeCheckbox bUICheckbox__eFakeCheckbox']"
    },

    personalInfo: {
        fieldNameAndSurname: "//input[@name = 'ProfilePersonalForm[name]']",
        filledNameAndSurname: "//div[contains(@class, 'bFormItemValue bFormItemValue__mType_Name')]",
        radioButtonMan: "//span[./input[@id = 'ProfilePersonalForm[sex]_1']]",
        radioButtonWoman: "//span[./input[@id = 'ProfilePersonalForm[sex]_2']]",
        choosenMan: "//label[.//input[@id = 'ProfilePersonalForm[sex]_1'] and @class = 'bUIRadiobutton__eLabel bUIRadiobutton__mChecked']",
        choosenWoman: "//label[.//input[@id = 'ProfilePersonalForm[sex]_2'] and @class = 'bUIRadiobutton__eLabel bUIRadiobutton__mChecked']",
        fieldDocNumber: "//input[@name = 'ProfilePersonalForm[identDocNumber0New]']",
        fieldLastDocNumber: "//input[@name = 'ProfilePersonalForm[identDocNumber1New]']",
        filledDoc: "//span[contains(@class, 'bChangeableLabel__eCurrentValue')]"
    },

    external: {
        ya: {
            url: "https://yandex.ru",
            login: "//input[@name = 'login']",
            password: "//input[@name = 'passwd']",
            button: "//button[contains(@class, 'button auth__button')]",
            checkAuth: "//div[contains(@class, 'mail-User-Name')]"
        },
        fb: {
            url: "https://facebook.com",
            login: "#email",
            password: "#pass",
            button: "//label[@id = 'loginbutton']",
            checkAuth: "#mainContainer"
        },
        vk: {
            url: "https://vk.com",
            login: "#index_email",
            password: "#index_pass",
            button: "#index_login_button",
            checkAuth: "//div[@id='wide_column']"
        },
        ok: {
            url: "https://ok.ru/",
            login: "//input[@id='field_email']",
            password: "//input[@id='field_password']",
            button: "//form/div[contains(@class, 'form-actions')]//input[contains(@type, 'submit')]",
            checkAuth: "//div[@id='hook_Block_MiddleColumnTopCard']"
        }
    },

    loginInSocialNetwork(type, login, password) {
        I.amOnPage(this.external[type].url);
        I.waitForVisible(this.external[type].login);
        I.fillField(this.external[type].login, login);
        I.fillField(this.external[type].password, password);
        I.waitAndClick(this.external[type].button, this.timeout);
        I.waitForVisible(this.external[type].checkAuth);
    }
}
