Feature('giftcodes-common-acc-2-qa-gift-page. Тесты страницы подарочных кодов фогейма.');

var data = require('./data/codes');

BeforeSuite((I) => {
    I.syncDown('giftcodes', 'acc-2-qa-gift-page');
});

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

AfterSuite((I) => {
    I.createTar('giftcodes', 'acc-2-qa-gift-page');
    I.syncUp('giftcodes', 'acc-2-qa-gift-page');
    I.clearDir('giftcodes', 'acc-2-qa-gift-page');
})

Scenario('Проверка страницы подарочных кодов (неавторизованый пользователь)', function*(I, giftCodePage) {
    I.amOnPage(giftCodePage.url);
    I.waitInUrl('?popupWidget=AuthPopupWidget', giftCodePage.timeout);
});

Scenario('Проверка верстки страницы подарочных кодов', function*(I, giftCodePage, genericPage) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, giftCodePage.url);
    I.checkLayout('gift-code-page-auth', [{
        name: 'body',
        exclude: [giftCodePage.balance_block.locator, genericPage.userBar.background]
    }], 0.1, 'giftcodes', "acc-2-qa-gift-page");
});

Scenario('Проверка формы покупки кодов', function*(I, giftCodePage) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, giftCodePage.url);
    giftCodePage.validateBuyCodesForm();
});

Scenario('Проверка блока подсказок ', function*(I, giftCodePage) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, giftCodePage.url);
    giftCodePage.validateInternalContentBlock();
});

Scenario('Проверка блока баланса', function*(I, giftCodePage) {
    var user = yield I.createUser();
    I.setBalance(user.id, 100, 33);
    I.amOnPageForAuthUser(user, giftCodePage.url);
    giftCodePage.validateBalanceCodesBlock(100, 33);
});

Scenario('Проверка блока навигации', function*(I, giftCodePage) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, giftCodePage.url);
    giftCodePage.validateNavigationBlock();
});
