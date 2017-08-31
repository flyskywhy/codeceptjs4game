'use strict';

let I;

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    timeout: 30,
    huge_timeout: 60,

    url: "/settings/security",
    trusted_computers: {
        locator: ".bInternalContent",
        header: {
            locator: ".bInternalContent__eHeader",
            text: "Твои доверенные компьютеры"
        },
        list: {
            locator: ".bUberSecurity",
            new_computer: ".bUberSecurity__eNewComputer",
            new_computer_info: ".bUberSecurity__eList__eInfo",
            new_computer_info_text: "%s сейчас",
            button_make_trusted: ".bUIButton__eShine_type_micro",
            description: {
                locator: ".bUberSecurity__eDesc",
                text: "В твоем списке может быть до 5 компьютеров. Если компьютер неактивен более 40 дней, он автоматически перестает быть доверенным."
            }
        },
        footer: {
            locator: ".bInternalContent .mLast",
            title: {
                locator: ".bInternalContent .mLast .bUberSecurity__eTitle",
                text: "Отключение функции «Доверенные компьютеры»"
            },
            description: {
                locator: ".bInternalContent .mLast .bUberSecurity__eDesc",
                text: "Функция «Доверенные компьютеры» создана для дополнительной безопасности твоего аккаунта, мы не рекомендуем отключать ее. Отключив функцию, ты не будешь получать оповещения о попытках запустить твои игры с неизвестных устройств, а твой список доверенных компьютеров обнулится. Это значит, что у мошенников будет больше шансов взломать твой аккаунт"
            },
            turn_off_link: "#uber_security_link_turn_off"
        }
    },
    account_security_settings_widget: {
        locator: "#AccountSecuritySettingsWidget",
        low_level: {
            locator: "#security_widget_level_low",
            message: "#security_widget_level_low .bInfoMessage__mType_error",
            text: "Низкий уровень безопасности",
            add_mobile: {
                link: "#link_add_mobile",
                info_locator: "#security_widget_level_low .bAccountSecuritySettingsWidget__eInfo__eDesc",
                info_text: "Пользователи с мобильными в 80 раз меньше жалуются на взломы аккаунта"
            }
        },
        high_level: {
            locator: "#security_widget_level_high",
            message: "#AccountSecuritySettingsWidget .bInfoMessage__mType_success",
            text: "Высокий уровень безопасности",
            title: {
                locator: "#security_widget_level_high .bAccountSecuritySettingsWidget__eInfo__eTitle",
                text: "Мобильный телефон привязан"
            },
            mobile_phone: "#security_widget_mobile",
            change_mobile: {
                link: "#link_change_mobile",
                text: "Изменить номер"
            },
            delete_mobile: {
                link: "#link_delete_mobile",
                text: "отвязать"
            }
        }
    },
    popup: {
        locator: "#bUIPopup__eLayout",
        title: {
            locator: "#bUIPopup__eLayout .bUIPopup__eHeader",
            text: "Введи номер мобильного"
        },
        wrong_code_message: {
            locator: ".bUIErrorMessage",
            text: "Неверный код"
        },
        identity_input: "#bUIPopup__eLayout .bExternalPageFormItem",
        send_sms_code_button: "#uber_security_botton_send_sms_code",
        send_mail_code_button: "#uber_security_botton_send_mail_code",
        link_use_mail: "#uber_security_link_use_mail",
        mail_label: "#bUIPopup__eLayout .bExternalPageFormItem__mText_identity",
        mail_label_text: "Письмо будет выслано на %s",
        close_button: ".bUIPopup__eClose",
        input_code: "input[name='code']",
        button_switch_on: "#uber_security_botton_switch_on",
        button_switch_off: "#uber_security_botton_switch_off"
    },
    turn_on_button: "#uber_security_top_btn_turn_on",
    play: {
        popup: {
            title: "Вход с незнакомого компьютера",
            identity: {
                locator: ".bExternalPageFormItem",
                text: "Введи код, высланный на %s"
            },
            confirm_code_input: "#jsAppBindWidget__ConfirmCode",
            add_trusted_checkbox: "#bUIPopup__eLayout .jsUICheckbox__eFakeCheckbox",
            add_trusted_tooltip: {
                locator: "#bUIPopup__eLayout .jsAppBind_rememberComputer_hintHandler",
                text: "Компьютер, который ты сейчас используешь, будет добавлен в список доверенных. При запуске игры с этого компьютера мы не будем спрашивать код подтверждения."
            },
            play_button: "#jsAppBindWidget__ConfirmCode__Button",
            footer: {
                locator: "#bUIPopup__eLayout .bUIPopup__eFooter"
            }
        }
    },
    exclude: {
        games_list: ".userbar-games-list",
        userbar: ".userbar-bg"
    },

    validatePopupEmailOnPlay(email) {
        I.waitForVisible(this.popup.locator, this.timeout);
        I.waitForVisible(this.popup.title.locator, this.timeout);
        I.waitForText(this.play.popup.title, this.timeout, this.popup.title.locator);
        I.waitForVisible(this.play.popup.identity.locator, this.timeout);
        I.waitForVisible(this.popup.close_button, this.timeout);
        I.waitForVisible(this.play.popup.confirm_code_input, this.timeout);
        I.waitForVisible(this.play.popup.add_trusted_checkbox, this.timeout);
        I.waitForVisible(this.play.popup.add_trusted_tooltip.locator, this.timeout);
        I.waitForVisible(this.play.popup.play_button, this.timeout);
        I.waitForVisible(this.play.popup.footer.locator, this.timeout);
    },

    validatePopupPhoneOnPlay(phone) {
        I.waitForVisible(this.popup.locator, this.timeout);
        I.waitForVisible(this.popup.title.locator, this.timeout);
        I.waitForText(this.play.popup.title, this.timeout, this.popup.title.locator);
        I.waitForVisible(this.play.popup.identity.locator, this.timeout);
        I.waitForVisible(this.popup.close_button, this.timeout);
        I.waitForVisible(this.play.popup.confirm_code_input, this.timeout);
        I.waitForVisible(this.play.popup.add_trusted_checkbox, this.timeout);
        I.waitForVisible(this.play.popup.add_trusted_tooltip.locator, this.timeout);
        I.waitForVisible(this.play.popup.play_button, this.timeout);
        I.waitForVisible(this.play.popup.footer.locator, this.timeout);
    },

    /* Проверяет список доверенных компьютеров */
    validateTrustedList() {
        I.waitForVisible(this.trusted_computers.locator, this.timeout);
        I.waitForVisible(this.trusted_computers.header.locator, this.timeout);
        I.waitForText(this.trusted_computers.header.text, this.timeout, this.trusted_computers.header.locator);
        I.waitForVisible(this.trusted_computers.list.locator, this.timeout);
        I.waitForVisible(this.trusted_computers.list.new_computer, this.timeout);
        I.waitForVisible(this.trusted_computers.list.new_computer_info, this.timeout);
        I.waitForVisible(this.trusted_computers.list.button_make_trusted, this.timeout);
        I.waitForVisible(this.trusted_computers.list.description.locator, this.timeout);
        I.waitForText(this.trusted_computers.list.description.text, this.timeout, this.trusted_computers.list.description.locator);
        I.waitForVisible(this.trusted_computers.footer.locator, this.timeout);
        I.waitForVisible(this.trusted_computers.footer.title.locator, this.timeout);
        I.waitForText(this.trusted_computers.footer.title.text, this.timeout, this.trusted_computers.footer.title.locator);
        I.waitForVisible(this.trusted_computers.footer.description.locator, this.timeout);
        I.waitForText(this.trusted_computers.footer.description.text, this.timeout, this.trusted_computers.footer.description.locator);
        I.waitForVisible(this.trusted_computers.footer.turn_off_link, this.timeout);
    },

    /* Проверяет виджет низкого уровня безопасности */
    validateLowLevelState() {
        I.waitForVisible(this.account_security_settings_widget.low_level.locator, this.timeout);
        I.waitForVisible(this.account_security_settings_widget.low_level.message, this.timeout);
        I.waitForText(this.account_security_settings_widget.low_level.text, this.timeout, this.account_security_settings_widget.low_level.message);
        I.waitForVisible(this.account_security_settings_widget.low_level.add_mobile.link, this.timeout);
        I.waitForVisible(this.account_security_settings_widget.low_level.add_mobile.info_locator, this.timeout);
        I.waitForText(this.account_security_settings_widget.low_level.add_mobile.info_text, this.timeout, this.account_security_settings_widget.low_level.add_mobile.info_locator);
    },

    /* Проверяет виджет высокого уровня безопасности */
    validateHighLevelState(mobilePhone) {
        I.waitForVisible(this.account_security_settings_widget.high_level.locator, this.timeout);
        I.waitForVisible(this.account_security_settings_widget.high_level.message, this.timeout);
        I.waitForText(this.account_security_settings_widget.high_level.text, this.timeout, this.account_security_settings_widget.high_level.message);
        I.waitForVisible(this.account_security_settings_widget.high_level.title.locator, this.timeout);
        I.waitForText(this.account_security_settings_widget.high_level.title.text, this.timeout, this.account_security_settings_widget.high_level.title.locator);
        I.waitForVisible(this.account_security_settings_widget.high_level.mobile_phone, this.timeout);
        I.waitForText(mobilePhone.substring(0, 2) + '*******' + mobilePhone.substring(mobilePhone.length - 2), this.timeout, this.account_security_settings_widget.high_level.mobile_phone);
        I.waitForVisible(this.account_security_settings_widget.high_level.change_mobile.link, this.timeout);
        I.waitForText(this.account_security_settings_widget.high_level.change_mobile.text, this.timeout, this.account_security_settings_widget.high_level.change_mobile.link);
        I.waitForVisible(this.account_security_settings_widget.high_level.delete_mobile.link, this.timeout);
        I.waitForText(this.account_security_settings_widget.high_level.delete_mobile.text, this.timeout, this.account_security_settings_widget.high_level.delete_mobile.link);
    },

    /* Проверяет отображение попапа включения СБ (емейл) */
    validateTurnOnPopupMail(email) {
        I.waitForVisible(this.popup.mail_label, this.timeout);
        I.waitForVisible(this.popup.send_mail_code_button, this.timeout);
        I.waitForText(this.popup.mail_label_text.replace('%s', email), this.timeout, this.popup.mail_label);
        I.waitForVisible(this.popup.close_button, this.timeout);
    },

    /* Проверяет отображение попапа включения СБ (телефон) */
    validateTurnOnPopupPhone() {
        I.waitForVisible(this.popup.locator, this.timeout);
        I.waitForVisible(this.popup.title.locator, this.timeout);
        I.waitForText(this.popup.title.text, this.timeout, this.popup.title.locator);
        I.waitForVisible(this.popup.identity_input, this.timeout);
        I.waitForVisible(this.popup.send_sms_code_button, this.timeout);
        I.waitForVisible(this.popup.link_use_mail, this.timeout);
        I.waitForVisible(this.popup.close_button, this.timeout);
    }

}
