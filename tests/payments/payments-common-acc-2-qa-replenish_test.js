Feature('payments-common-acc-2-qa-replenish. Тесты пополнения счета.');

var data = require('./data/payments');

Before((I) => {
    I.clearCookie();
});

Scenario('Проверка выполнения платежа (Яндекс-деньги)', function*(I, paymentTerminalPopup, genericPage) {
    var paymentSystem = data.yandex_money;
    var user = yield I.createUser();
    var amount = '10';
    I.amOnPageForAuthUser(user, paymentTerminalPopup.index.url);
    paymentTerminalPopup.validatePaymentSystem(paymentSystem);
    paymentTerminalPopup.makeAndValidatePayment(paymentSystem, amount);
    I.waitForText(amount, genericPage.timeout, genericPage.barBalance.css);
});

Scenario('Проверка выполнения платежа (Яндекс-карта)', function*(I, paymentTerminalPopup, genericPage) {
    var paymentSystem = data.yandex_card;
    var user = yield I.createUserWithEvenId();
    var amount = '10';
    I.amOnPageForAuthUser(user, paymentTerminalPopup.index.url);
    paymentTerminalPopup.validatePaymentSystem(paymentSystem);
    paymentTerminalPopup.makeAndValidatePayment(paymentSystem, amount);
    I.waitForText(amount, genericPage.timeout, genericPage.barBalance.css);
});

Scenario('Проверка выполнения платежа (Яндекс-СБОЛ) -- только до момента редиректа', function*(I, paymentTerminalPopup) {
    var paymentSystem = data.sbol;
    var user = yield I.createUser();
    var amount = '10';
    I.amOnPageForAuthUser(user, paymentTerminalPopup.index.url);
    paymentTerminalPopup.validatePaymentSystem(paymentSystem);
    paymentTerminalPopup.makeAndValidatePayment(paymentSystem, amount);
});

Scenario('Проверка выполнения платежа (Вебмани) -- только до момента редиректа', function*(I, paymentTerminalPopup) {
    var paymentSystem = data.webmoney;
    var user = yield I.createUser();
    var amount = '10';
    I.amOnPageForAuthUser(user, paymentTerminalPopup.index.url);
    paymentTerminalPopup.validatePaymentSystem(paymentSystem);
    paymentTerminalPopup.makeAndValidatePayment(paymentSystem, amount);
});

Scenario('Проверка выполнения платежа (Киви) -- только до момента редиректа', function*(I, paymentTerminalPopup) {
    var paymentSystem = data.qiwi_wallet;
    var user = yield I.createUser();
    var amount = '10';
    I.amOnPageForAuthUser(user, paymentTerminalPopup.index.url);
    paymentTerminalPopup.validatePaymentSystem(paymentSystem);
    paymentTerminalPopup.makeAndValidatePayment(paymentSystem, amount);
});

Scenario('Проверка минимальной суммы платежа (Яндекс-деньги)', function*(I, paymentTerminalPopup) {
    var user = yield I.createUser();
    var paymentSystem = data.yandex_money;
    I.amOnPageForAuthUser(user, paymentTerminalPopup.index.url);
    paymentTerminalPopup.validateMinAmount(paymentSystem);
});

Scenario('Проверка минимальной суммы платежа (Яндекс-карта)', function*(I, paymentTerminalPopup) {
    var paymentSystem = data.yandex_card;
    var user = yield I.createUserWithEvenId();
    I.amOnPageForAuthUser(user, paymentTerminalPopup.index.url);
    paymentTerminalPopup.validateMinAmount(paymentSystem);
});

Scenario('Проверка минимальной суммы платежа (Яндекс-СБОЛ)', function*(I, paymentTerminalPopup) {
    var user = yield I.createUser();
    var paymentSystem = data.sbol;
    I.amOnPageForAuthUser(user, paymentTerminalPopup.index.url);
    paymentTerminalPopup.validateMinAmount(paymentSystem);
});

Scenario('Проверка минимальной суммы платежа (Вебмани)', function*(I, paymentTerminalPopup) {
    var user = yield I.createUser();
    var paymentSystem = data.webmoney;
    I.amOnPageForAuthUser(user, paymentTerminalPopup.index.url);
    paymentTerminalPopup.validateMinAmount(paymentSystem);
});

Scenario('Проверка минимальной суммы платежа (Киви)', function*(I, paymentTerminalPopup) {
    var user = yield I.createUser();
    var paymentSystem = data.qiwi_wallet;
    I.amOnPageForAuthUser(user, paymentTerminalPopup.index.url);
    paymentTerminalPopup.validateMinAmount(paymentSystem);
});
