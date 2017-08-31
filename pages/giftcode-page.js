'use strict';

let I;

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    url: "/giftcode/",
    title: "Подарочные коды — Фогейм",
    timeout: 30,

    balance_block: {
        locator: ".bInternalSidebarBalance",
        overall_sum: "#bInternalSidebarBalance__eOverall",
        money_sum: "#bInternalSidebarBalance__eMoney",
        bonuses_sum: "#bInternalSidebarBalance__eBonuses",
        replenish_button: ".bInternalSidebarBalance__eButton"
    },
    buy_codes_form: {
        locator: ".bInternalContent__eForm",
        title: {
            locator: ".bInternalContent__eHeader",
            text: "Покупка кодов"
        },
        tickets: ".bTickets",
        tickets_top: ".bTickets .bTickets__eTicketTop",
        tickets_bottom: ".bTickets .bTickets__eTicketBottom",
        payments: ".bGiftCodesPayments",
        payments_select_mode: {
            locator: ".bGiftCodesPayments .bInternalContent__eSubheader",
            text: "Выбери способ оплаты",
            list: ".bGiftCodesPayments .bGiftCodesPaymentsList"
        },
        buy_widget: {
            locator: ".bGiftCodes__eBottomWrap",
            auto_activate_checkbox: ".bGiftCodes__eBottomWrap .bGiftCodes__eBottomActivate",
            button: ".bGiftCodes__eBottomWrap .bGiftCodes__eBottomButton",
            hint_button: ".bGiftCodes__eBottomWrap .bGiftCodes__eBottomHint",
            hint_popup: ".bGiftCodes__eBottomWrap .jsUIHint__ePopup"
        }
    },
    internal_content_block: {
        locator: ".bInternalContent__eBlock",
        promo_action_item: ".bBonusesCodesPromoActionItem"
    },
    navigation_block: {
        locator: ".bInternalOptionsPageLayoutNav",
        giftcodes_link: ".bInternalOptionsPageLayoutNav__eItem .bInternalOptionsPageLayoutNav__eItemNotLink",
        giftcodes_text: "Подарочные коды",
        my_codes_link: "div[class='bInternalOptionsPageLayoutNav__eItem'] > a[href='/giftcode/my/']",
        my_codes_text: "Мои коды",
        credit_link: "div[class='bInternalOptionsPageLayoutNav__eItem'] > a[href='/licence/credit/']",
        credit_text: "Кредит"
    },
    voucher_form: {
        title_locator: ".my-voucher-form h3",
        title_text: "Активация кодов",
        input: "input.base-input.voucher-input",
        button: ".base-button_base-button",
        button_text: "Активировать",
        error_message: ".error-message",
        success_message: ".success-message",
        success_message_text: "Код успешно активирован",
        select_characters: ".characters_select",
        select_characters_item_aion: "span[title='%s'] > span"
    },
    captcha: {
        locator: ".captcha-context-popup",
        text_locator: ".captcha-context-popup h3 span",
        text: "С вашего аккаунта замечена подозрительная активность. Введите код, указанный на картинке, чтобы продолжить.",
        image: ".captcha-context-popup .captcha"
    },

    /* активировать подарочный код без выбора персонажа/сервера */
    activateCodeWithoutChar(code) {
        this.fillCode(code);
        I.waitForVisible(this.voucher_form.button);
        I.waitForText(this.voucher_form.button_text, this.timeout, this.voucher_form.button);
        I.checkAttributeValue(this.voucher_form.button, 'disabled', null);
        I.click(this.voucher_form.button);
        I.dontSeeElement(this.voucher_form.error_message);
    },

    /* активировать подарочный код с выбором персонажа/сервера */
    activateCodeWithCharAndServer(code, charName, serverName) {
        var itemTitle = serverName + ' / ' + charName;
        this.fillCode(code);
        I.waitForVisible(this.voucher_form.button);
        I.waitForText(this.voucher_form.button_text, this.timeout, this.voucher_form.button);
        I.waitForVisible(this.voucher_form.select_characters);
        I.click(this.voucher_form.select_characters);
        I.waitForVisible(this.voucher_form.select_characters_item_aion.replace("%s", itemTitle));
        I.click(this.voucher_form.select_characters_item_aion.replace("%s", itemTitle));
        I.click(this.voucher_form.button);
        I.dontSeeElement(this.voucher_form.error_message);
    },

    /* очистить поле ввода и посимвольно ввести код */
    fillCode(code) {
        I.waitForVisible(this.voucher_form.input);
        I.fillField(this.voucher_form.input, '');
        I.click(this.voucher_form.input);
        for (var i = 0; i < code.length; i++) {
            I.wait(1); //Ожидание, т.к. ввода каждого символа в это поле система проверяет значене уже введенного текста
            I.pressKey(code[i]);
        }
        I.wait(5); //Ожидаем, пока выполнится запрос на корректность введенного кода
    },

    /* проверить капчу */
    validateCaptcha() {
        this.fillCode('999999999999990');
        I.waitAndClick(this.voucher_form.button);
        this.fillCode('999999999999991');
        I.waitAndClick(this.voucher_form.button);
        this.fillCode('999999999999992');
        I.waitAndClick(this.voucher_form.button);
        this.fillCode('999999999999993');
        I.seeElement(this.captcha.text_locator);
        I.seeElement(this.captcha.image);
        I.waitForText(this.captcha.text, this.timeout, this.captcha.text_locator);
    },

    /* проверка успешной активации */
    validateSuccessActivation() {
        I.dontSeeElement(this.voucher_form.error_message);
        //не проверяем отображение сообщения о успешной активации, т.к. оно быстро пропадает
    },

    /* проверка отобраения формы активации кодов (ее начальное состояние) */
    validateVoucherInputForm() {
        I.waitForVisible(this.voucher_form.title_locator);
        I.waitForVisible(this.voucher_form.input);
        I.waitForVisible(this.voucher_form.button);
        I.waitForText(this.voucher_form.title_text, this.timeout, this.voucher_form.title_locator);
        I.waitForText(this.voucher_form.button_text, this.timeout, this.voucher_form.button);
        I.checkAttributeValue(this.voucher_form.button, 'disabled', 'true');
    },

    /* проверка блока отображения баланса */
    validateBalanceCodesBlock(money, bonuses) {
        I.waitForVisible(this.balance_block.locator);
        I.waitForVisible(this.balance_block.overall_sum);
        I.waitForVisible(this.balance_block.money_sum);
        I.waitForVisible(this.balance_block.bonuses_sum);
        I.waitForVisible(this.balance_block.replenish_button);
        I.waitForText(money + bonuses, this.timeout, this.balance_block.overall_sum);
        I.waitForText(money, this.timeout, this.balance_block.money_sum);
        I.waitForText(bonuses, this.timeout, this.balance_block.bonuses_sum);
        I.click(this.balance_block.replenish_button);
        I.waitInUrl('?popupWidget=PaymentTerminalWidget');
    },

    /* проверка формы покупки кодов */
    validateBuyCodesForm() {
        I.waitForVisible(this.buy_codes_form.locator);
        I.waitForVisible(this.buy_codes_form.title.locator);
        I.waitForVisible(this.buy_codes_form.tickets);
        I.waitForVisible(this.buy_codes_form.tickets_top);
        I.waitForVisible(this.buy_codes_form.tickets_bottom);
        I.waitForVisible(this.buy_codes_form.payments);
        I.waitForVisible(this.buy_codes_form.payments_select_mode.locator);
        I.waitForVisible(this.buy_codes_form.payments_select_mode.list);
        I.waitForVisible(this.buy_codes_form.buy_widget.locator);
        I.waitForVisible(this.buy_codes_form.buy_widget.auto_activate_checkbox);
        I.waitForVisible(this.buy_codes_form.buy_widget.button);
        I.waitForText(this.buy_codes_form.title.text, this.timeout, this.buy_codes_form.title.locator);
        I.waitForText(this.buy_codes_form.payments_select_mode.text, this.timeout, this.buy_codes_form.payments_select_mode.locator);
        I.waitForVisible(this.buy_codes_form.buy_widget.hint_button);
        I.dontSeeElement(this.buy_codes_form.buy_widget.hint_popup);
        I.click(this.buy_codes_form.buy_widget.hint_button);
        I.waitForVisible(this.buy_codes_form.buy_widget.hint_popup);
    },

    /* проверка блока навигации */
    validateNavigationBlock() {
        I.waitForVisible(this.navigation_block.locator);
        I.waitForVisible(this.navigation_block.giftcodes_link);
        I.waitForVisible(this.navigation_block.my_codes_link);
        I.waitForVisible(this.navigation_block.credit_link);
        I.waitForText(this.navigation_block.giftcodes_text, this.timeout, this.navigation_block.giftcodes_link);
        I.waitForText(this.navigation_block.my_codes_text, this.timeout, this.navigation_block.my_codes_link);
        I.waitForText(this.navigation_block.credit_text, this.timeout, this.navigation_block.credit_link);
    },

    /* проверка блока подсказок */
    validateInternalContentBlock() {
        I.waitForVisible(this.internal_content_block.locator);
        I.waitForVisible(this.internal_content_block.promo_action_item);
        I.validateCountOfElements(this.internal_content_block.promo_action_item, 3);
    }
}
