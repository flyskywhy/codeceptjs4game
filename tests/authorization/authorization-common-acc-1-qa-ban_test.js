Feature("authorization-common-acc-1-qa-ban. Тесты бана юзера на сайте.");

Before((I) => {
    I.closeTabsExceptForOne();
    I.clearCookie();
});

Scenario("Забаненный не может залогиниться на фогейме", function*(I, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.banUser(user.id, "0", "36000");
    I.amOnPage("/");
    genericPage.login(user.email, user.password);
    I.waitForVisible(genericPage.authFormErrorMessageLogin, genericPage.timeout);
    I.waitForText("Аккаунт заблокирован", genericPage.timeout, genericPage.authFormErrorMessageLogin)
});

Scenario("Забаненный, а позже разбаненный может залогиниться на фогейме", function*(I, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.banUser(user.id, "0", "36000");
    I.amOnPage("/");
    genericPage.login(user.email, user.password);
    I.waitForVisible(genericPage.authFormErrorMessageLogin, genericPage.timeout);
    I.waitForText("Аккаунт заблокирован", genericPage.timeout, genericPage.authFormErrorMessageLogin)
    I.unbanUser(user.id, "0");
    I.click(genericPage.authFormLoginButton);
    I.waitForVisible(genericPage.barUserName, genericPage.timeout);
    I.waitForText(user.email, genericPage.timeout, genericPage.barUserName);
});

Scenario("Забаненный в игре может залогиниться на фогейме", function*(I, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.banUser(user.id, "8", "36000");
    I.amOnPage("/");
    genericPage.login(user.email, user.password);
    I.waitForVisible(genericPage.barUserName, genericPage.timeout);
    I.waitForText(user.email, genericPage.timeout, genericPage.barUserName);
});

Scenario("Залогиненного банят на фогейме, должен произойти разлогин", function*(I, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage("/");
    I.banUser(user.id, "0", "36000");
    I.amOnPage("/pointblank/play/")
    I.waitForVisible(genericPage.authPopup, 60);
    I.waitForVisible(genericPage.authFormLogin, 60);
    I.fillField(genericPage.authFormLogin, user.email);
    I.fillField(genericPage.authFormPassword, user.password);
    I.click(genericPage.authFormLoginButton);
    I.waitForVisible(genericPage.authFormErrorMessageLogin, genericPage.timeout);
    I.waitForText("Аккаунт заблокирован", genericPage.timeout, genericPage.authFormErrorMessageLogin)
});
