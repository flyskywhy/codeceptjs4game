Feature("payments-common-acc-1-qa-buffs-terminal. Тесты отображения баффов в терминале оплаты.");

BeforeSuite((I) => {
    I.syncDown('payments', 'acc-1-qa-buffs-terminal');
});

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

AfterSuite((I) => {
    I.createTar('payments', 'acc-1-qa-buffs-terminal');
    I.syncUp('payments', 'acc-1-qa-buffs-terminal');
    I.clearDir('payments', 'acc-1-qa-buffs-terminal');
})

Scenario("У юзера без баффов нет подсказки", function*(I, paymentTerminal) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, paymentTerminal.url);
    I.waitForVisible(paymentTerminal.yandexAmount, paymentTerminal.timeout);
    I.dontSeeElement(paymentTerminal.buffs.yandexMoneyTip);
});

Scenario("У юзера с активным баффом есть подсказка", function*(I, paymentTerminal, buffsPopup) {
    var user = yield I.createUser();
    buffsPopup.addBuffToRevault(user.id, 500.0, [{
        "buffPercent": 10,
        "expiresAt": Date.now() + 432000000
    }, {
        "buffPercent": 20,
        "expiresAt": Date.now() + 432000000
    }]);
    I.amOnPageForAuthUser(user, paymentTerminal.url);
    I.waitForVisible(paymentTerminal.buffs.yandexMoneyTip, paymentTerminal.timeout);
    I.waitForText("+ 30%", paymentTerminal.timeout, paymentTerminal.buffs.yandexMoneyTip);
    I.click(paymentTerminal.buffs.yandexMoneyTip)
    I.waitForVisible(paymentTerminal.buffs.yandexMoneyTooltip, paymentTerminal.timeout)
    I.waitForText(buffsPopup.text.buffValue.replace('$s', '30% '), paymentTerminal.timeout, paymentTerminal.buffs.yandexMoneyTooltipHeader);
    I.waitForText(buffsPopup.text.expireTime.replace('$s', '5 дней'), paymentTerminal.timeout, paymentTerminal.buffs.yandexMoneyTooltipExpiring);
    I.validateCssStyle(paymentTerminal.buffs.yandexMoneyTooltipExpiring, "color", "rgba(102,102,102,1)")
    I.waitForText(paymentTerminal.buffs.text.maxValue.replace('$s', '500'), paymentTerminal.timeout, paymentTerminal.buffs.yandexMoneyTooltipDesc);
    I.checkLayout('buffs_terminal', [{
        name: 'popup',
        elem: paymentTerminal.terminal
    }], 0.1, 'payments', 'acc-1-qa-buffs-terminal');
});

Scenario("У юзера с активным баффом, который скоро закончиться есть warn", function*(I, paymentTerminal, buffsPopup) {
    var user = yield I.createUser();
    buffsPopup.addBuffToRevault(user.id, 400.0, [{
        "buffPercent": 19000,
        "expiresAt": Date.now() + 432000000
    }, {
        "buffPercent": 20,
        "expiresAt": Date.now() + 86300000
    }, {
        "buffPercent": 20,
        "expiresAt": Date.now() - 1000
    }]);
    I.amOnPageForAuthUser(user, paymentTerminal.url);
    I.waitForVisible(paymentTerminal.buffs.yandexMoneyTip, paymentTerminal.timeout);
    I.waitForText("+ 19020%", paymentTerminal.timeout, paymentTerminal.buffs.yandexMoneyTip);
    I.click(paymentTerminal.buffs.yandexMoneyTip)
    I.waitForVisible(paymentTerminal.buffs.yandexMoneyTooltip, paymentTerminal.timeout)
    I.waitForText(buffsPopup.text.buffValue.replace('$s', '19020% '), paymentTerminal.timeout, paymentTerminal.buffs.yandexMoneyTooltipHeader);
    I.waitForText(buffsPopup.text.expireTime.replace('$s', '24 часа'), paymentTerminal.timeout, paymentTerminal.buffs.yandexMoneyTooltipExpiring);
    I.validateCssStyle(paymentTerminal.buffs.yandexMoneyTooltipExpiring, "color", "rgba(255,0,0,1)")
    I.waitForText(paymentTerminal.buffs.text.maxValue.replace('$s', '400'), paymentTerminal.timeout, paymentTerminal.buffs.yandexMoneyTooltipDesc);
    I.checkLayout('buffs_terminal_warn', [{
        name: 'popup',
        elem: paymentTerminal.terminal
    }], 0.1, 'payments', 'acc-1-qa-buffs-terminal');
});

Scenario("У юзера с просроченным бафом нет подсказки", function*(I, paymentTerminal, buffsPopup) {
    var user = yield I.createUser();
    buffsPopup.addBuffToRevault(user.id, 400.0, [{
        "buffPercent": 19000,
        "expiresAt": Date.now() - 1000
    }, {
        "buffPercent": 20,
        "expiresAt": Date.now() - 1000
    }]);
    I.amOnPageForAuthUser(user, paymentTerminal.url);
    I.waitForVisible(paymentTerminal.yandexAmount, paymentTerminal.timeout);
    I.dontSeeElement(paymentTerminal.buffs.yandexMoneyTip);
});

Scenario("У юзера с активным бафом при вводе суммы, достаточной для ачивки отображается бафф и ачивка", function*(I, paymentTerminal, buffsPopup) {
    var user = yield I.createUser();
    buffsPopup.addBuffToRevault(user.id, 500.0, [{
        "buffPercent": 10,
        "expiresAt": Date.now() + 432000000
    }, {
        "buffPercent": 20,
        "expiresAt": Date.now() + 432000000
    }]);
    I.amOnPageForAuthUser(user, paymentTerminal.url);
    I.waitForVisible(paymentTerminal.buffs.yandexMoneyTip, paymentTerminal.timeout);
    I.fillField(paymentTerminal.yandexAmount, "500")
    I.waitForText("+ 30%", paymentTerminal.timeout, paymentTerminal.buffs.yandexMoneyTip);
    I.waitForVisible(paymentTerminal.bonusesVisible, paymentTerminal.timeout);
    I.waitForText("+25 руб. в награду\nпри пополнении счета", paymentTerminal.timeout, paymentTerminal.bonusesVisible);
    I.checkLayout('buffs_terminal_bonus', [{
        name: 'popup',
        elem: paymentTerminal.terminal
    }], 0.1, 'payments', 'acc-1-qa-buffs-terminal');
});

Scenario("У юзера с неактивированным баффом нет подсказки", function*(I, paymentTerminal, buffsPopup) {
    var user = yield I.createUser();
    buffsPopup.addBuffToRevault(user.id, 500.0, [{
        "buffPercent": 10,
        "buffDurationInMillis": 432000000
    }, {
        "buffPercent": 20,
        "buffDurationInMillis": 432000000
    }]);
    I.amOnPageForAuthUser(user, paymentTerminal.url);
    I.waitForVisible(paymentTerminal.yandexAmount, paymentTerminal.timeout);
    I.dontSeeElement(paymentTerminal.buffs.yandexMoneyTip);
});

Scenario("У юзера с активными и неактивным баффом, отображается только активный", function*(I, paymentTerminal, buffsPopup) {
    var user = yield I.createUser();
    buffsPopup.addBuffToRevault(user.id, 400.0, [{
        "buffPercent": 19000,
        "expiresAt": Date.now() + 432000000
    }, {
        "buffPercent": 20,
        "buffDurationInMillis": 86300000
    }, {
        "buffPercent": 20,
        "buffDurationInMillis": -1000
    }]);
    I.amOnPageForAuthUser(user, paymentTerminal.url);
    I.waitForVisible(paymentTerminal.buffs.yandexMoneyTip, paymentTerminal.timeout);
    I.waitForText("+ 19000%", paymentTerminal.timeout, paymentTerminal.buffs.yandexMoneyTip);
    I.click(paymentTerminal.buffs.yandexMoneyTip)
    I.waitForVisible(paymentTerminal.buffs.yandexMoneyTooltip, paymentTerminal.timeout)
    I.waitForText(buffsPopup.text.buffValue.replace('$s', '19000% '), paymentTerminal.timeout, paymentTerminal.buffs.yandexMoneyTooltipHeader);
    I.waitForText(buffsPopup.text.expireTime.replace('$s', '5 дней'), paymentTerminal.timeout, paymentTerminal.buffs.yandexMoneyTooltipExpiring);
    I.validateCssStyle(paymentTerminal.buffs.yandexMoneyTooltipExpiring, "color", "rgba(102,102,102,1)")
    I.waitForText(paymentTerminal.buffs.text.maxValue.replace('$s', '400'), paymentTerminal.timeout, paymentTerminal.buffs.yandexMoneyTooltipDesc);
});
