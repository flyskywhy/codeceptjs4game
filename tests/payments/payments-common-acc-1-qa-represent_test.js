Feature('payments-common-acc-1-qa-represent. Тесты отображения платежного терминала.');

var data = require('./data/payments');

BeforeSuite((I) => {
    I.syncDown('payments', 'acc-1-qa-represent');
});

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

AfterSuite((I) => {
    I.createTar('payments', 'acc-1-qa-represent');
    I.syncUp('payments', 'acc-1-qa-represent');
    I.clearDir('payments', 'acc-1-qa-represent');
})

Scenario('Проверка верстки платежного терминала (Яндекс-деньги)', function*(I, paymentTerminalPopup) {
    var paymentSystem = data.yandex_money;
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, paymentTerminalPopup.index.url);
    paymentTerminalPopup.validatePaymentSystem(paymentSystem);
    I.checkLayout('payment-terminal-' + paymentSystem.id, [{
        name: 'popup',
        elem: paymentTerminalPopup.index.locators.popup_locator,
        exclude: [paymentTerminalPopup.index.exclude.achievement_bonuses,
            paymentTerminalPopup.index.exclude.achievement_coin,
            paymentTerminalPopup.index.exclude.amount_block
        ]
    }], 0.1, 'payments', "acc-1-qa-represent");
});

Scenario('Проверка верстки платежного терминала (Qiwi)', function*(I, paymentTerminalPopup) {
    var paymentSystem = data.qiwi_wallet;
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, paymentTerminalPopup.index.url);
    paymentTerminalPopup.validatePaymentSystem(paymentSystem);
    I.checkLayout('payment-terminal-' + paymentSystem.id, [{
        name: 'popup',
        elem: paymentTerminalPopup.index.locators.popup_locator,
        exclude: [paymentTerminalPopup.index.exclude.achievement_bonuses,
            paymentTerminalPopup.index.exclude.achievement_coin,
            paymentTerminalPopup.index.exclude.amount_block
        ]
    }], 0.1, 'payments', "acc-1-qa-represent");
});

Scenario('Проверка верстки платежного терминала (Терминалы)', function*(I, paymentTerminalPopup) {
    var paymentSystem = data.terminal;
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, paymentTerminalPopup.index.url);
    paymentTerminalPopup.validatePaymentSystem(paymentSystem);
    I.waitForVisible(paymentTerminalPopup.index.locators.right_block.terminal_qiwi_section, paymentTerminalPopup.timeout);
    I.waitForVisible(paymentTerminalPopup.index.locators.right_block.terminal_compay_section, paymentTerminalPopup.timeout);
    I.click(paymentTerminalPopup.index.locators.right_block.terminal_qiwi_section);
    I.checkLayout('payment-terminal-' + paymentSystem.id + '-qiwi', [{
        name: 'popup',
        elem: paymentTerminalPopup.index.locators.popup_locator,
        exclude: [paymentTerminalPopup.index.exclude.achievement_bonuses,
            paymentTerminalPopup.index.exclude.achievement_coin,
            paymentTerminalPopup.index.exclude.amount_block,
            paymentTerminalPopup.index.locators.right_block.terminal_qiwi_content + ' ' + paymentTerminalPopup.index.exclude.item_list
        ]
    }], 0.1, 'payments', "acc-1-qa-represent");
    I.click(paymentTerminalPopup.index.locators.right_block.terminal_compay_section);
    I.checkLayout('payment-terminal-' + paymentSystem.id + '-compay', [{
        name: 'popup',
        elem: paymentTerminalPopup.index.locators.popup_locator,
        exclude: [paymentTerminalPopup.index.exclude.achievement_bonuses,
            paymentTerminalPopup.index.exclude.achievement_coin,
            paymentTerminalPopup.index.exclude.amount_block,
            paymentTerminalPopup.index.locators.right_block.terminal_compay_content + ' ' + paymentTerminalPopup.index.exclude.item_list
        ]
    }], 0.1, 'payments', "acc-1-qa-represent");
});

Scenario('Проверка верстки платежного терминала (Мобильный)', function*(I, paymentTerminalPopup) {
    var paymentSystem = data.mobile;
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, paymentTerminalPopup.index.url);
    paymentTerminalPopup.validatePaymentSystem(paymentSystem);
    I.checkLayout('payment-terminal-' + paymentSystem.id, [{
        name: 'popup',
        elem: paymentTerminalPopup.index.locators.popup_locator,
        exclude: [paymentTerminalPopup.index.exclude.achievement_bonuses,
            paymentTerminalPopup.index.exclude.achievement_coin,
            paymentTerminalPopup.index.exclude.amount_block
        ]
    }], 0.1, 'payments', "acc-1-qa-represent");
});

Scenario('Проверка верстки платежного терминала (Пластиковая карта)', function*(I, paymentTerminalPopup) {
    var paymentSystem = data.yandex_card;
    var user = yield I.createUserWithEvenId();
    I.amOnPageForAuthUser(user, paymentTerminalPopup.index.url);
    paymentTerminalPopup.validatePaymentSystem(paymentSystem);
    I.checkLayout('payment-terminal-' + paymentSystem.id, [{
        name: 'popup',
        elem: paymentTerminalPopup.index.locators.popup_locator,
        exclude: [paymentTerminalPopup.index.exclude.achievement_bonuses,
            paymentTerminalPopup.index.exclude.achievement_coin,
            paymentTerminalPopup.index.exclude.amount_block
        ]
    }], 0.1, 'payments', "acc-1-qa-represent");
});

Scenario('Проверка верстки платежного терминала (Пластиковая карта - Iframe)', function*(I, paymentTerminalPopup) {
    var paymentSystem = data.yandex_card_iframe;
    var user = yield I.createUserWithOddId();
    I.amOnPageForAuthUser(user, paymentTerminalPopup.index.url);
    paymentTerminalPopup.validatePaymentSystem(paymentSystem);
    I.checkLayout('payment-terminal-' + paymentSystem.id + "_iframe", [{
        name: 'popup',
        elem: paymentTerminalPopup.index.locators.popup_locator,
        exclude: [paymentTerminalPopup.index.exclude.achievement_bonuses,
            paymentTerminalPopup.index.exclude.achievement_coin,
            paymentTerminalPopup.index.exclude.amount_block
        ]
    }], 0.1, 'payments', "acc-1-qa-represent");
});

Scenario('Проверка верстки платежного терминала (Сбербанк Онлайн)', function*(I, paymentTerminalPopup) {
    var paymentSystem = data.sbol;
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, paymentTerminalPopup.index.url);
    paymentTerminalPopup.validatePaymentSystem(paymentSystem);
    I.checkLayout('payment-terminal-' + paymentSystem.id, [{
        name: 'popup',
        elem: paymentTerminalPopup.index.locators.popup_locator,
        exclude: [paymentTerminalPopup.index.exclude.achievement_bonuses,
            paymentTerminalPopup.index.exclude.achievement_coin,
            paymentTerminalPopup.index.exclude.amount_block
        ]
    }], 0.1, 'payments', "acc-1-qa-represent");
});

Scenario('Проверка верстки платежного терминала (Вебмани)', function*(I, paymentTerminalPopup) {
    var paymentSystem = data.webmoney;
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, paymentTerminalPopup.index.url);
    paymentTerminalPopup.validatePaymentSystem(paymentSystem);
    I.checkLayout('payment-terminal-' + paymentSystem.id, [{
        name: 'popup',
        elem: paymentTerminalPopup.index.locators.popup_locator,
        exclude: [paymentTerminalPopup.index.exclude.achievement_bonuses,
            paymentTerminalPopup.index.exclude.achievement_coin,
            paymentTerminalPopup.index.exclude.amount_block
        ]
    }], 0.1, 'payments', "acc-1-qa-represent");
});
