Feature('giftcodes-common-acc-1-qa-activation. Тесты активации кодов фогейма.');

var data = require('./data/codes');

Before((I) => {
    I.closeTabsExceptForOne();
    I.clearCookie();
});

Scenario('Проверка активации кода (Деньги и бонусы)', function*(I, giftCodePage) {
    var user = yield I.createUser();
    var code = yield I.addVoucherByEmission(user.id, data.money_and_bonus.emission);
    I.amOnPageForAuthUser(user, giftCodePage.url);
    giftCodePage.validateVoucherInputForm();
    giftCodePage.activateCodeWithoutChar(code);
    giftCodePage.validateSuccessActivation();
});

Scenario('Проверка активации кода (Деньги, бонусы и предмет в игре с выбором персонажа)', function*(I, giftCodePage) {
    var user = yield I.createUser();
    var code = yield I.addVoucherByEmission(user.id, data.money_and_bonus_and_item_with_char.emission);
    I.createServiceAccount(user.id, '9');
    I.createCharacter(user.id, '9', 'charName');
    I.amOnPageForAuthUser(user, giftCodePage.url);
    giftCodePage.validateVoucherInputForm();
    giftCodePage.activateCodeWithCharAndServer(code, 'charName', 'Гардарика');
    giftCodePage.validateSuccessActivation();
});

Scenario('Проверка активации кода (Предмет без выбора персонажа)', function*(I, giftCodePage) {
    var user = yield I.createUser();
    var code = yield I.addVoucherByEmission(user.id, data.item_without_char.emission);
    I.amOnPageForAuthUser(user, giftCodePage.url);
    giftCodePage.validateVoucherInputForm();
    giftCodePage.activateCodeWithoutChar(code);
    giftCodePage.validateSuccessActivation();
});

Scenario('Проверка активации кода (Подписка)', function*(I, giftCodePage) {
    var user = yield I.createUser();
    var code = yield I.addVoucherByEmission(user.id, data.subscription.emission);
    I.amOnPageForAuthUser(user, giftCodePage.url);
    giftCodePage.validateVoucherInputForm();
    giftCodePage.activateCodeWithoutChar(code);
    giftCodePage.validateSuccessActivation();
});

Scenario('Проверка активации кода (Активация роли)', function*(I, giftCodePage) {
    var user = yield I.createUser();
    var code = yield I.addVoucherByEmission(user.id, data.role_tester.emission);
    I.amOnPageForAuthUser(user, giftCodePage.url);
    giftCodePage.validateVoucherInputForm();
    giftCodePage.activateCodeWithoutChar(code);
    giftCodePage.validateSuccessActivation();
});

Scenario('Проверка появления капчи при ошибочном вводе', function*(I, giftCodePage) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, giftCodePage.url);
    giftCodePage.validateVoucherInputForm();
    giftCodePage.validateCaptcha();
});
