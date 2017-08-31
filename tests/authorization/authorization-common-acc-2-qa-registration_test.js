Feature("authorization-common-acc-2-qa-registration. Тесты регистрации различными способами.");

BeforeSuite((I) => {
    I.syncDown('authorization', 'acc-2-qa-registration');
});

Before((I) => {
    I.closeTabsExceptForOne();
    I.clearCookie();
});

AfterSuite((I) => {
    I.createTar('authorization', 'acc-2-qa-registration');
    I.syncUp('authorization', 'acc-2-qa-registration');
    I.clearDir('authorization', 'acc-2-qa-registration');
})

Scenario("Регистрация нового пользователя", function*(I, genericPage, authPopup, registrationConfirmPage) {
    I.amOnPage("/");
    genericPage.openSignUpPopup();
    var email = yield I.getEmail();
    authPopup.signUp(email);
    I.waitForText(authPopup.regText);
    var regLink = yield I.getRegisterLink(email);
    I.amOnPage(regLink);
    registrationConfirmPage.signUp('123456');
    I.waitForVisible(genericPage.userBar);
    I.waitForVisible(genericPage.barUserName);
    var login = yield I.grabTextFrom(genericPage.barUserName);
    I.textShouldBeSameAs(login, email);
});

Scenario("Регистрация нового пользователя c открытым паролем в форме регистрации", function*(I, genericPage, authPopup, registrationConfirmPage) {
    I.amOnPage("/");
    genericPage.openSignUpPopup();
    var email = yield I.getEmail();
    authPopup.signUp(email);
    I.waitForText(authPopup.regText);
    var regLink = yield I.getRegisterLink(email);
    I.amOnPage(regLink);
    registrationConfirmPage.signUpWithOpenEye('123456');
    I.waitForVisible(genericPage.userBar);
    I.waitForVisible(genericPage.barUserName);
    var login = yield I.grabTextFrom(genericPage.barUserName);
    I.textShouldBeSameAs(login, email);
});

Scenario("Регистрация нового пользователя со страницы игры (Aion)", function*(I, genericPage, authPopup, aionInstallPage, registrationConfirmPage, aionPlayPage) {
    I.amOnPage(aionInstallPage.install.url);
    genericPage.openSignUpPopup();
    var email = yield I.getEmail();
    authPopup.signUp(email);
    I.waitForText(authPopup.regText);
    var regLink = yield I.getRegisterLink(email);
    I.amOnPage(regLink);
    var game = yield I.grabTextFrom(registrationConfirmPage.brandingElement);
    I.textShouldBeSameAs(game, "Aion");
    registrationConfirmPage.signUp('123456');
    I.waitForVisible(genericPage.userBar);
    I.waitForVisible(genericPage.barUserName);
    var login = yield I.grabTextFrom(genericPage.barUserName);
    I.textShouldBeSameAs(login, email);
});

Scenario("Попытка регистрации. Капча не должна отображаться", function*(I, genericPage, authPopup) {
    I.amOnPage("/");
    genericPage.openSignUpPopup();
    var email = yield I.getEmail();
    authPopup.signUp(email);
    I.dontSeeElementInDOM(authPopup.captcha);
});

Scenario("Попытки регистрации. Капча должна отображаться", function*(I, genericPage, authPopup) {
    I.amOnPage("/");
    genericPage.openSignUpPopup();
    var email = yield I.getEmail();
    authPopup.signUp(email);
    I.dontSeeElementInDOM(authPopup.captcha);
    authPopup.closePopup();
    genericPage.openSignUpPopup();
    authPopup.signUp(email);
    I.dontSeeElementInDOM(authPopup.captcha);
    authPopup.closePopup();
    genericPage.openSignUpPopup();
    authPopup.signUp(email);
    I.waitForElement(authPopup.captcha);
});

Scenario("Регистрация для линейки c PID", function*(I, genericPage, authPopup, registrationConfirmPage) {
    I.amOnPage("/registration/lineage2classic/?pid=5115351");
    var game = yield I.grabTextFrom(registrationConfirmPage.brandingElement);
    I.textShouldBeSameAs(game, "Lineage 2 Classic");
    var email = yield I.getEmail();
    registrationConfirmPage.createAccount(email);
    I.waitForText(authPopup.regText);
    var regLink = yield I.getRegisterLink(email);
    I.amOnPage(regLink);
    I.seeInCurrentUrl('partner_id=5115351');
    registrationConfirmPage.signUp('123456');
    I.waitForVisible(genericPage.userBar);
    I.waitForVisible(genericPage.barUserName);
    var login = yield I.grabTextFrom(genericPage.barUserName);
    I.textShouldBeSameAs(login, email);
});

Scenario("Регистрация c PID", function*(I, genericPage, authPopup, registrationConfirmPage) {
    I.amOnPage("/registration/?pid=5115351");
    var game = yield I.grabTextFrom(registrationConfirmPage.brandingElement);
    I.textShouldBeSameAs(game, "Фогейм");
    var email = yield I.getEmail();
    registrationConfirmPage.createAccount(email)
    I.waitForText(authPopup.regText);
    var regLink = yield I.getRegisterLink(email);
    I.amOnPage(regLink);
    I.seeInCurrentUrl('partner_id=5115351');
    registrationConfirmPage.signUp('123456');
    I.waitForVisible(genericPage.userBar);
    I.waitForVisible(genericPage.barUserName);
    var login = yield I.grabTextFrom(genericPage.barUserName);
    I.textShouldBeSameAs(login, email);
});

// отличается поведение в бою и на куа
// для куа есть брендирование регистрации https://ru.4gametest.com/registration/9/
// для боя - редиректит на плей https://ru.4game.com/registration/9/
Scenario("Брендирование регистрации. Проверяем иконку при регистрации в игрe (Aion)", function*(I, registrationConfirmPage) {
    I.amOnPage("/registration/9");
    I.waitForVisible(registrationConfirmPage.registerForm);
    var game = yield I.grabTextFrom(registrationConfirmPage.brandingElement);
    I.textShouldBeSameAs(game, "Aion");
    I.checkLayout('branding-for-registration', [{
            name: 'game-icon',
            elem: registrationConfirmPage.brandingElement
        }],
        0.05,
        'authorization', 'acc-2-qa-registration');
});

Scenario.only("Регистрация нового пользователя на странице мобильной игры Pocket Fort", function*(I, registrationConfirmPage, genericPage, registrationConfirmPage, authPopup, pocketFortInstallPage) {
    I.amOnPage(pocketFortInstallPage.url);
    genericPage.openSignUpPopup();
    var email = yield I.getEmail();
    authPopup.signUp(email);
    I.waitForText(authPopup.regText);
    var regLink = yield I.getRegisterLink(email);
    I.amOnPage(regLink);
    var game = yield I.grabTextFrom(registrationConfirmPage.brandingElement);
    I.textShouldBeSameAs(game, pocketFortInstallPage.brandName);
    registrationConfirmPage.signUp('123456');
    I.waitForVisible(genericPage.userBar);
    I.waitForVisible(genericPage.barUserName);
    var login = yield I.grabTextFrom(genericPage.barUserName);
    I.textShouldBeSameAs(login, email);
});

Scenario("Брендирование регистрации. Проверяем иконку при регистрации в игрe (Pocket Fort)", function*(I, pocketFortInstallPage, registrationConfirmPage, genericPage, registrationConfirmPage, authPopup) {
    I.amOnPage(pocketFortInstallPage.url);
    genericPage.openSignUpPopup();
    var email = yield I.getEmail();
    authPopup.signUp(email);
    I.waitForText(authPopup.regText);
    var regLink = yield I.getRegisterLink(email);
    I.amOnPage(regLink);
    I.waitForVisible(registrationConfirmPage.registerForm);
    var game = yield I.grabTextFrom(registrationConfirmPage.brandingElement);
    I.textShouldBeSameAs(game, pocketFortInstallPage.brandName);
    I.checkLayout('branding-for-mobile-registration', [{
            name: 'game-icon',
            elem: registrationConfirmPage.brandingElement
        }],
        0.05,
        'authorization', 'acc-2-qa-registration');
});

Scenario("Регистрация со страницы покупки серийного кода", function*(I, genericPage, authPopup, registrationConfirmPage) {
    I.amOnPage("/doom/");
    genericPage.openSignUpPopup();
    var email = yield I.getEmail();
    authPopup.signUp(email);
    I.waitForText(authPopup.regText);
    var regLink = yield I.getRegisterLink(email);
    I.amOnPage(regLink);
    registrationConfirmPage.signUp('123456');
    I.waitForVisible(genericPage.userBar);
    I.waitForVisible(genericPage.barUserName);
    var login = yield I.grabTextFrom(genericPage.barUserName);
    I.textShouldBeSameAs(login, email);
});

Scenario("Проверка что зарегистрированный на ru форейме может залогиниться на eu и наоборот", function*(I, genericPage, authPopup, registrationConfirmPage, userbar) {
    I.amOnPage("/");
    genericPage.openSignUpPopup();
    var email = yield I.getEmail();
    authPopup.signUp(email);
    I.waitForText(authPopup.regText);
    var regLink = yield I.silentlyGetRegistrationLink(email);
    I.amOnPage(regLink);
    registrationConfirmPage.signUp('123456');
    I.waitForVisible(genericPage.userBar);
    I.waitForVisible(genericPage.barUserName);
    var login = yield I.grabTextFrom(genericPage.barUserName);
    I.textShouldBeSameAs(login, email);
    I.clearCookie();
    I.amOnPageOnOtherPlatform("/");
    I.waitAndClick(userbar.authAndRegButton);
    I.waitAndFillField(email, authPopup.loginField);
    I.waitAndFillField('123456', authPopup.passwordField);
    I.waitAndClick(authPopup.signInButton);
    I.waitForVisible(userbar.barUserName);
    var login = yield I.grabTextFrom(userbar.barUserName);
    I.textShouldBeSameAs(login, email);
});
