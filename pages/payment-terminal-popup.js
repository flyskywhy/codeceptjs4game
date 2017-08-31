'use strict';


let I;
let assert = require('assert');

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    timeout: 30,

    index: {
        url: '/?popupWidget=PaymentTerminalWidget',

        locators: {
            terminal: "#bPaymentTerminal",
            popup_locator: ".bUIPopup__eWin",

            header: {
                locator: ".terminal_achievements",
                achievements_list: ".terminal_achievements-list",
                title: {
                    locator: ".terminal_achievements-title",
                    text: "Достижение с денежными наградами:"
                }
            },
            left_block: {
                locator: ".bPaymentTerminal__eCol__mType_Left",
                menu: ".bPaymentTerminal__eCol__mType_Left .bPaymentTerminal__eMenu",
                menu_item: ".bPaymentTerminal__eCol__mType_Left .bPaymentTerminal__eMenu li[data-section-modifier='bPaymentTerminal__mSection_%s']",
                menu_item_link: " .bPaymentTerminal__eMenuItemLink"
            },
            right_block: {
                locator: ".bPaymentTerminal__eCol__mType_Right",
                section: ".bPaymentTerminal__eCol__mType_Right .bPaymentTerminal__eItem__mType_%s",
                section_title: " .bPaymentTerminal__eItemHeader",
                section_content: " .bPaymentTerminal__eItemContent",
                section_amount_input: " .bPaymentTerminalAmountBlock__eInput",
                section_amount_help: " .jsPaymentTerminalAmountBlock__eHelpAmount",
                section_pay_button: " .bPaymentTerminal__ePayButton",
                section_pay_button_disabled: " .bUIButton__mState_disabled",
                section_phone_input: " .bPaymentTerminalPhoneBlock__eInput",
                section_item_fee: " .bPaymentTerminal__eItemFee",
                section_amount_error: " .jsPaymentPopup__eAmount__Error",
                section_min_amount_text: "Минимальная сумма платежа: 10 руб.",
                terminal_qiwi_section: ".bPaymentTerminal__eTabs li[data-section='bPaymentTerminal__mTerminalType_RuQiwi']",
                terminal_qiwi_content: ".bPaymentTerminalTerminals__eTerminal__mType_RuQiwi",
                terminal_compay_section: ".bPaymentTerminal__eTabs li[data-section='bPaymentTerminal__mTerminalType_RuComepay']",
                terminal_compay_content: ".bPaymentTerminalTerminals__eTerminal__mType_RuComepay",
                yandex_card_iframe: "#yandex_bank_card-iframe"
            },
            footer: {
                locator: ".bPaymentTerminal__eFooter",
                active_state: {
                    locator: ".bPaymentTerminal__eFooter__mState_Active",
                    text: "Под термином «комиссия» понимаются дополнительные расходы Администрации, связанные с обслуживанием платежей в соответствии с Пользовательским Соглашением."
                },
                sub_info: {
                    locator: ".bPaymentTerminal__eFooterHandler",
                    text: "Дополнительная информация"
                }
            },
            payment_systems: {
                yandex_card: {
                    card_number: "input[name='skr_card-number']",
                    card_month: "input[name='skr_month']",
                    card_year: "input[name='skr_year']",
                    card_cvc: "input[name='skr_cardCvc']",
                    submit_button: ".payment-submit__forward-button",
                    success_message: ".payment-scenario__success-title",
                    iframe: "yandex_bank_card-iframe"
                },
                yandex_money: {
                    submit_button: "#challenge-submit",
                    login_field: ".b-domik__username .b-form-input__input",
                    password_field: ".b-domik__password .b-form-input__input",
                    login_button: ".b-domik__button",
                    payment_password_field: "#passwd",
                    success_message: ".b-payment-success__title",
                    back_link: ".b-hint-whatNext__link .b-link__text"
                }
            }
        },
        exclude: {
            achievement_coin: ".achievement-coin",
            achievement_bonuses: ".bPaymentTerminalAchievements__bonuses",
            amount_block: ".bPaymentTerminal__eAmountBlock",
            item_list: ".bPaymentTerminal__eItemList li:nth-child(2)"
        }
    },

    /* кликает по ссылке на платежную систему в левом блоке */
    clickOnPaymentSystemLink(paymentSystem) {
        I.click(this.index.locators.left_block.menu_item.replace("%s", paymentSystem.id) + this.index.locators.left_block.menu_item_link);
    },

    /* сделать платеж */
    makeAndValidatePayment(paymentSystem, amount) {
        var section = this.index.locators.right_block.section.replace("%s", paymentSystem.id);
        I.waitForVisible(section + this.index.locators.right_block.section_amount_input);
        I.waitForVisible(section + this.index.locators.right_block.section_pay_button);
        switch (paymentSystem.id) {
            case 'Yandex_bank_card':
                this.makeAndValidateYandexCardPayment(paymentSystem, amount);
                break;
            case 'Osmppull':
                I.waitForVisible(section + this.index.locators.right_block.section_phone_input);
                this.makeAndValidateQiwiPayment(paymentSystem, amount);
                break;
            case 'Yandex_money':
                this.makeAndValidateYandexMoneyPayment(paymentSystem, amount);
                break;
            case 'Webmoney':
                this.makeAndValidateWebmoneyPayment(paymentSystem, amount);
                break;
            case 'Yandex_sbol':
                this.makeAndValidateSbolPayment(paymentSystem, amount);
                break;
            default:
                break;
        }
    },

    /* выполнить и проверить платеж через Яндекс-карту (без айфрейма) */
    makeAndValidateYandexCardPayment(paymentSystem, amount) {
        var section = this.index.locators.right_block.section.replace("%s", paymentSystem.id);
        I.click(section + this.index.locators.right_block.section_amount_input);
        for (var i = 0; i < amount.length; i++) {
            I.pressKey(amount[i]);
        }
        I.click(section + this.index.locators.right_block.section_pay_button);
        I.waitInUrl(paymentSystem.payment_data.url);
        I.waitForVisible(this.index.locators.payment_systems.yandex_card.card_number);
        I.waitForVisible(this.index.locators.payment_systems.yandex_card.card_month);
        I.waitForVisible(this.index.locators.payment_systems.yandex_card.card_year);
        I.waitForVisible(this.index.locators.payment_systems.yandex_card.card_cvc);
        I.waitForVisible(this.index.locators.payment_systems.yandex_card.submit_button);
        I.fillField(this.index.locators.payment_systems.yandex_card.card_number, paymentSystem.payment_data.card);
        I.fillField(this.index.locators.payment_systems.yandex_card.card_month, paymentSystem.payment_data.exp_month);
        I.fillField(this.index.locators.payment_systems.yandex_card.card_year, paymentSystem.payment_data.exp_year);
        I.fillField(this.index.locators.payment_systems.yandex_card.card_cvc, paymentSystem.payment_data.cvc);
        I.click(this.index.locators.payment_systems.yandex_card.submit_button);
        I.waitForVisible(this.index.locators.payment_systems.yandex_card.success_message);
        I.waitForVisible(this.index.locators.payment_systems.yandex_card.submit_button);
        I.click(this.index.locators.payment_systems.yandex_card.submit_button);
        I.waitInUrl('4game');
    },

    /* выполнить и проверить платеж через Киви*/
    makeAndValidateQiwiPayment(paymentSystem, amount) {
        var section = this.index.locators.right_block.section.replace("%s", paymentSystem.id);
        I.click(section + this.index.locators.right_block.section_amount_input);
        for (var i = 0; i < amount.length; i++) {
            I.pressKey(amount[i]);
        }
        I.click(section + this.index.locators.right_block.section_phone_input);
        for (var i = 0; i < paymentSystem.payment_data.phone.length; i++) {
            I.pressKey(paymentSystem.payment_data.phone[i]);
        }
        I.click(section + this.index.locators.right_block.section_pay_button);
        I.waitInUrl(paymentSystem.payment_data.url);
        //TODO выяснить, возможно ли провести тестовый платеж в QIWI
    },

    /* выполнить и проверить платеж через Яндекс-деньги */
    makeAndValidateYandexMoneyPayment(paymentSystem, amount) {
        var section = this.index.locators.right_block.section.replace("%s", paymentSystem.id);
        I.click(section + this.index.locators.right_block.section_amount_input);
        for (var i = 0; i < amount.length; i++) {
            I.pressKey(amount[i]);
        }
        I.click(section + this.index.locators.right_block.section_pay_button);
        I.waitInUrl(paymentSystem.payment_data.url);
        I.waitForVisible(this.index.locators.payment_systems.yandex_money.login_field);
        I.waitForVisible(this.index.locators.payment_systems.yandex_money.password_field);
        I.waitForVisible(this.index.locators.payment_systems.yandex_money.login_button);
        I.fillField(this.index.locators.payment_systems.yandex_money.login_field, paymentSystem.payment_data.login);
        I.fillField(this.index.locators.payment_systems.yandex_money.password_field, paymentSystem.payment_data.password);
        I.click(this.index.locators.payment_systems.yandex_money.login_button);
        I.waitForVisible(this.index.locators.payment_systems.yandex_money.submit_button);
        I.click(this.index.locators.payment_systems.yandex_money.submit_button);
        I.waitForVisible(this.index.locators.payment_systems.yandex_money.payment_password_field);
        I.fillField(this.index.locators.payment_systems.yandex_money.payment_password_field, paymentSystem.payment_data.payment_password);
        I.waitForVisible(this.index.locators.payment_systems.yandex_money.submit_button);
        I.click(this.index.locators.payment_systems.yandex_money.submit_button);
        I.waitForVisible(this.index.locators.payment_systems.yandex_money.success_message);
        I.waitForVisible(this.index.locators.payment_systems.yandex_money.back_link);
        I.click(this.index.locators.payment_systems.yandex_money.back_link);
        I.waitInUrl('4game');
    },

    /* выполнить и проверить платеж через Вебмани*/
    makeAndValidateWebmoneyPayment(paymentSystem, amount) {
        var section = this.index.locators.right_block.section.replace("%s", paymentSystem.id);
        I.click(section + this.index.locators.right_block.section_amount_input);
        for (var i = 0; i < amount.length; i++) {
            I.pressKey(amount[i]);
        }
        I.click(section + this.index.locators.right_block.section_pay_button);
        I.waitInUrl(paymentSystem.payment_data.url);
        //TODO выяснить, возможно ли провести тестовый платеж в Webmoney
    },

    /* выполнить и проверить платеж через Яндекс-Сбербанк-онлайн*/
    makeAndValidateSbolPayment(paymentSystem, amount) {
        var section = this.index.locators.right_block.section.replace("%s", paymentSystem.id);
        I.click(section + this.index.locators.right_block.section_amount_input);
        for (var i = 0; i < amount.length; i++) {
            I.pressKey(amount[i]);
        }
        I.click(section + this.index.locators.right_block.section_pay_button);
        I.waitInUrl(paymentSystem.payment_data.url);
        //TODO выяснить, возможно ли провести тестовый платеж в Яндекс.Сбербанколнайн
    },

    /* проверяет постоянный контент Хедера платежного теоминала */
    validateHeader() {
        I.waitForVisible(this.index.locators.terminal);
        I.waitForVisible(this.index.locators.header.locator);
        I.waitForVisible(this.index.locators.header.title.locator);
        I.waitForText(this.index.locators.header.title.text, this.timeout, this.index.locators.header.title.locator);
        I.waitForVisible(this.index.locators.header.achievements_list);
    },

    /* проверяет постоянный контент Левой колонки платежного теоминала */
    validateLeftBlock() {
        I.waitForVisible(this.index.locators.terminal);
        I.waitForVisible(this.index.locators.left_block.locator);
        I.waitForVisible(this.index.locators.left_block.menu);
    },

    /* проверяет контент Левой колонки платежного теоминала для платежной системы */
    validateLeftBlockForPaymentSystem(paymentSystem) {
        this.validateLeftBlock();
        var menu_item = this.index.locators.left_block.menu_item.replace("%s", paymentSystem.id);
        I.waitForVisible(menu_item);
        I.waitForVisible(menu_item + this.index.locators.left_block.menu_item_link);
        I.waitForText(paymentSystem.title, this.timeout, menu_item + this.index.locators.left_block.menu_item_link);
    },

    /* проверяет постоянный контент Правой колонки платежного теоминала */
    validateRightBlock() {
        I.waitForVisible(this.index.locators.terminal);
        I.waitForVisible(this.index.locators.right_block.locator);
    },

    /* проверяет контент Правой колонки платежного теоминала  для платежной системы */
    validateRightBlockForPaymentSystem(paymentSystem) {
        this.validateRightBlock();
        var section = this.index.locators.right_block.section.replace("%s", paymentSystem.id);
        I.waitForVisible(section + this.index.locators.right_block.section_title);
        I.waitForText(paymentSystem.title, this.timeout, this.index.locators.right_block.section_title);
        if (paymentSystem.is_iframe == true) {
            this.validateYandexIframe();
        } else if (paymentSystem.can_replenish == true) {
            I.waitForVisible(section + this.index.locators.right_block.section_content);
            I.waitForVisible(section + this.index.locators.right_block.section_amount_input);
            I.waitForVisible(section + this.index.locators.right_block.section_amount_help);
            I.waitForVisible(section + this.index.locators.right_block.section_pay_button);
            I.waitForVisible(section + this.index.locators.right_block.section_item_fee);
            I.waitForText(paymentSystem.fee_text, this.timeout, section + this.index.locators.right_block.section_item_fee);
            if (paymentSystem.id == "Osmppull") {
                I.waitForVisible(section + this.index.locators.right_block.section_phone_input);
            }
        }
    },

    /* проверка минимальной суммы платежа */
    validateMinAmount(paymentSystem) {
        this.clickOnPaymentSystemLink(paymentSystem);
        var section = this.index.locators.right_block.section.replace("%s", paymentSystem.id);
        if (paymentSystem.need_phone == true) {
            I.click(section + this.index.locators.right_block.section_phone_input);
            for (var i = 0; i < paymentSystem.payment_data.phone.length; i++) {
                I.pressKey(paymentSystem.payment_data.phone[i]);
            }
        }
        I.click(section + this.index.locators.right_block.section_amount_input);
        I.pressKey('1');
        I.waitForVisible(this.index.locators.right_block.section_amount_error);
        I.waitForText(this.index.locators.right_block.section_min_amount_text, this.timeout, this.index.locators.right_block.section_amount_error);
        I.waitForVisible(this.index.locators.right_block.section_pay_button_disabled);
        I.click(section + this.index.locators.right_block.section_amount_input);
        I.pressKey('1', '1');
        I.dontSeeElement(this.index.locators.right_block.section_amount_error);
        I.dontSeeElement(this.index.locators.right_block.section_pay_button_disabled);
        I.waitForVisible(section + this.index.locators.right_block.section_pay_button);
    },

    /* проверяет отображение айфрейма яндекса для пластиковой карты */
    validateYandexIframe() {
        I.waitForVisible(this.index.locators.right_block.yandex_card_iframe);
    },

    /* проверяет постоянный контент Футера платежного теоминала */
    validateFooter() {
        I.waitForVisible(this.index.locators.terminal);
        I.waitForVisible(this.index.locators.footer.sub_info.locator);
        I.waitForText(this.index.locators.footer.sub_info.text, this.timeout, this.index.locators.footer.sub_info.locator);
        I.dontSeeElement(this.index.locators.footer.active_state.locator);
        I.click(this.index.locators.footer.sub_info.locator);
        I.waitForVisible(this.index.locators.footer.active_state.locator);
        I.waitForText(this.index.locators.footer.active_state.text, this.timeout, this.index.locators.footer.active_state.locator);
    },

    /* Проверяет постоянный контент */
    validateImmutableContent() {
        this.validateHeader();
        this.validateLeftBlock();
        this.validateRightBlock();
        this.validateFooter();
    },

    /* проверяет отображение платежной системы в терминале */
    validatePaymentSystem(paymentSystem) {
        this.validateLeftBlockForPaymentSystem(paymentSystem);
        this.clickOnPaymentSystemLink(paymentSystem);
        this.validateRightBlockForPaymentSystem(paymentSystem);
    }
}
