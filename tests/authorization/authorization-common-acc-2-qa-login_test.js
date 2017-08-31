Feature("authorization-common-acc-2-qa-login. Тесты авторизации на 4game.");

var data = require('./data/accounts');

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage("/");
});

Scenario("Авторизуемся через яндекс", function*(I, userbar) {
    I.waitForVisible(userbar.loginYAButton);
    I.click(userbar.loginYAButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(userbar.loginYAField);
    I.waitForVisible(userbar.passwordYAField);
    I.fillField(userbar.loginYAField, data.yandex.email);
    I.fillField(userbar.passwordYAField, data.yandex.password);
    I.waitForVisible(userbar.submitYAButton);
    I.click(userbar.submitYAButton);
    I.changeTab(1);
    I.hideAchievementsNotifications();
    I.waitForVisible(userbar.barUserName);
    var login = yield I.grabTextFrom(userbar.barUserName);
    I.textShouldBeSameAs(login, data.yandex.email);
});

Scenario("Авторизуемся через facebook", function*(I, userbar) {
    I.waitForVisible(userbar.loginFBButton);
    I.click(userbar.loginFBButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(userbar.loginFBField);
    I.waitForVisible(userbar.passwordFBField);
    I.fillField(userbar.loginFBField, data.fb.email);
    I.fillField(userbar.passwordFBField, data.fb.password);
    I.waitForVisible(userbar.submitFBButton);
    I.click(userbar.submitFBButton);
    I.changeTab(1);
    I.hideAchievementsNotifications();
    I.waitForVisible(userbar.barUserName);
    var login = yield I.grabTextFrom(userbar.barUserName);
    I.textShouldBeSameAs(login, data.fb.id);
});

Scenario("Авторизуемся через vkontakte", function*(I, userbar) {
    I.waitForVisible(userbar.loginVKButton);
    I.click(userbar.loginVKButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(userbar.loginVKField);
    I.waitForVisible(userbar.passwordVKField);
    I.fillField(userbar.loginVKField, data.vk.email);
    I.fillField(userbar.passwordVKField, data.vk.email);
    I.waitForVisible(userbar.submitVKButton);
    I.click(userbar.submitVKButton);
    I.changeTab(1);
    I.hideAchievementsNotifications();
    I.waitForVisible(userbar.barUserName);
    var login = yield I.grabTextFrom(userbar.barUserName);
    I.textShouldBeSameAs(login, data.vk.login);
});

Scenario("Авторизуемся пользователем 4game с помощью email", function*(I, userbar, authPopup) {
    I.waitForVisible(userbar.authAndRegButton);
    I.click(userbar.authAndRegButton);
    I.waitForVisible(authPopup.loginField);
    I.waitForVisible(authPopup.passwordField);
    I.fillField(authPopup.loginField, data.forgame.email);
    I.fillField(authPopup.passwordField, data.forgame.password);
    I.waitForVisible(authPopup.signInButton);
    I.click(authPopup.signInButton);
    I.hideAchievementsNotifications();
    I.waitForVisible(userbar.barUserName);
    var login = yield I.grabTextFrom(userbar.barUserName);
    I.textShouldBeSameAs(login, data.forgame.login);
});

Scenario("Авторизуемся пользователем 4game с помощью логина", function*(I, userbar, authPopup) {
    I.waitForVisible(userbar.authAndRegButton);
    I.click(userbar.authAndRegButton);
    I.waitForVisible(authPopup.loginField);
    I.waitForVisible(authPopup.passwordField);
    I.fillField(authPopup.loginField, data.forgame.login);
    I.fillField(authPopup.passwordField, data.forgame.email);
    I.waitForVisible(authPopup.signInButton);
    I.click(authPopup.signInButton);
    I.hideAchievementsNotifications();
    I.waitForVisible(userbar.barUserName);
    var login = yield I.grabTextFrom(userbar.barUserName);
    I.textShouldBeSameAs(login, data.forgame.login);
});

Scenario("Авторизуемся с неправильным паролем, проверяем защиту от брутфорса - появление капчи", (I, userbar, authPopup) => {
    I.waitForVisible(userbar.authAndRegButton);
    I.click(userbar.authAndRegButton);
    I.waitForVisible(authPopup.loginField);
    I.waitForVisible(authPopup.passwordField);
    I.fillField(authPopup.loginField, "qa53031710@test.inn.ru");
    I.fillField(authPopup.passwordField, "1234567");
    I.waitForVisible(authPopup.signInButton);
    I.click(authPopup.signInButton);
    I.waitForVisible(authPopup.error);
    I.fillField(authPopup.passwordField, "1234568");
    I.click(authPopup.signInButton);
    I.waitForVisible(authPopup.error);
    I.fillField(authPopup.passwordField, "12345678");
    I.click(authPopup.signInButton);
    I.waitForVisible(authPopup.error);
    I.fillField(authPopup.passwordField, "123456789");
    I.click(authPopup.signInButton);
    I.waitForVisible(authPopup.error);
    authPopup.captchaShouldBePresent();
});

Scenario("Авторизуемся с функцией - показать пароль", function*(I, userbar, authPopup) {
    I.waitForVisible(userbar.authAndRegButton);
    I.click(userbar.authAndRegButton);
    I.waitForVisible(authPopup.loginField);
    I.waitForVisible(authPopup.passwordField);
    I.waitForVisible(authPopup.passwordOpenEye);
    I.click(authPopup.passwordOpenEye);
    I.waitForVisible(authPopup.passwordFieldWithOpenEye);
    I.fillField(authPopup.loginField, data.forgame.login);
    I.fillField(authPopup.passwordFieldWithOpenEye, data.forgame.password);
    I.waitForVisible(authPopup.signInButton);
    I.click(authPopup.signInButton);
    I.hideAchievementsNotifications();
    I.waitForVisible(userbar.barUserName);
    var login = yield I.grabTextFrom(userbar.barUserName);
    I.textShouldBeSameAs(login, data.forgame.login);
});

Scenario("Авторизация с неправильным паролем. Проверяем текст ошибки", function*(I, userbar, authPopup) {
    I.waitForVisible(userbar.authAndRegButton);
    I.click(userbar.authAndRegButton);
    I.waitForVisible(authPopup.loginField);
    I.waitForVisible(authPopup.passwordField);
    I.fillField(authPopup.loginField, "qa53031716@test.inn.ru");
    I.fillField(authPopup.passwordField, "1234567");
    I.waitForVisible(authPopup.signInButton);
    I.click(authPopup.signInButton);
    I.waitForVisible(authPopup.error);
    var error = yield I.grabTextFrom(authPopup.error);
    I.textShouldBeSameAs(error, authPopup.errorMessageLoginOrPassword);
});

Scenario("Авторизация с длинным паролем. Проверяем текст ошибки", function*(I, userbar, authPopup) {
    I.waitForVisible(userbar.authAndRegButton);
    I.click(userbar.authAndRegButton);
    I.waitForVisible(authPopup.loginField);
    I.waitForVisible(authPopup.passwordField);
    I.fillField(authPopup.loginField, "qa530@test.inn.ru");
    I.fillField(authPopup.passwordField, data.long.password);
    I.waitForVisible(authPopup.signInButton);
    I.click(authPopup.signInButton);
    I.waitForVisible(authPopup.error);
    var error = yield I.grabTextFrom(authPopup.error);
    I.textShouldBeSameAs(error, authPopup.errorMessagePassword);
});

Scenario("Авторизация с длинным емейлом. Проверяем текст ошибки", function*(I, userbar, authPopup) {
    I.waitForVisible(userbar.authAndRegButton);
    I.click(userbar.authAndRegButton);
    I.waitForVisible(authPopup.loginField);
    I.waitForVisible(authPopup.passwordField);
    I.fillField(authPopup.loginField, data.long.email);
    I.fillField(authPopup.passwordField, "qaTest");
    I.waitForVisible(authPopup.signInButton);
    I.click(authPopup.signInButton);
    I.waitForVisible(authPopup.error);
    var error = yield I.grabTextFrom(authPopup.error);
    I.textShouldBeSameAs(error, authPopup.errorMessageLoginOrPassword);
});

Scenario("Авторизация с коротким логином. Проверяем текст ошибки", function*(I, userbar, authPopup) {
    I.waitForVisible(userbar.authAndRegButton);
    I.click(userbar.authAndRegButton);
    I.waitForVisible(authPopup.loginField);
    I.waitForVisible(authPopup.passwordField);
    I.fillField(authPopup.loginField, data.short.email);
    I.fillField(authPopup.passwordField, "qaTest");
    I.waitForVisible(authPopup.signInButton);
    I.click(authPopup.signInButton);
    I.waitForVisible(authPopup.error);
    var error = yield I.grabTextFrom(authPopup.error);
    I.textShouldBeSameAs(error, authPopup.errorMessageLoginOrPassword);
});

Scenario("Авторизация с длинным логином. Проверяем текст ошибки", function*(I, userbar, authPopup) {
    I.waitForVisible(userbar.authAndRegButton);
    I.click(userbar.authAndRegButton);
    I.waitForVisible(authPopup.loginField);
    I.waitForVisible(authPopup.passwordField);
    I.fillField(authPopup.loginField, data.long.login);
    I.fillField(authPopup.passwordField, "qaTest");
    I.waitForVisible(authPopup.signInButton);
    I.click(authPopup.signInButton);
    I.waitForVisible(authPopup.error);
    var error = yield I.grabTextFrom(authPopup.error);
    I.textShouldBeSameAs(error, authPopup.errorMessageLoginOrPassword);
});

Scenario("Авторизация с пустым полем пароль. Проверяем текст ошибки", function*(I, authPopup, userbar) {
    I.waitForVisible(userbar.authAndRegButton);
    I.click(userbar.authAndRegButton);
    I.waitForVisible(authPopup.loginField);
    I.waitForVisible(authPopup.passwordField);
    I.fillField(authPopup.loginField, "qa530@test.inn.ru");
    I.fillField(authPopup.passwordField, "");
    I.waitForVisible(authPopup.signInButton);
    I.click(authPopup.signInButton);
    I.waitForVisible(authPopup.error);
    var error = yield I.grabTextFrom(authPopup.error);
    I.textShouldBeSameAs(error, authPopup.errorMessageEmptyPassword);
});

Scenario("Авторизация с пустым полем логин. Проверяем текст ошибки", function*(I, authPopup, userbar) {
    I.waitForVisible(userbar.authAndRegButton);
    I.click(userbar.authAndRegButton);
    I.waitForVisible(authPopup.loginField);
    I.waitForVisible(authPopup.passwordField);
    I.fillField(authPopup.loginField, "");
    I.fillField(authPopup.passwordField, "123456");
    I.waitForVisible(authPopup.signInButton);
    I.click(authPopup.signInButton);
    I.waitForVisible(authPopup.error);
    var error = yield I.grabTextFrom(authPopup.error);
    I.textShouldBeSameAs(error, authPopup.errorMessageEmptyLogin);
});

Scenario("Авторизация с пустыми полями пароль и логин. Проверяем текст ошибки", function*(I, authPopup, userbar) {
    I.waitForVisible(userbar.authAndRegButton);
    I.click(userbar.authAndRegButton);
    I.waitForVisible(authPopup.loginField);
    I.waitForVisible(authPopup.passwordField);
    I.fillField(authPopup.loginField, "");
    I.fillField(authPopup.passwordField, "");
    I.waitForVisible(authPopup.signInButton);
    I.click(authPopup.signInButton);
    I.waitForVisible(authPopup.errorLogin);
    var error = yield I.grabTextFrom(authPopup.errorLogin);
    I.textShouldBeSameAs(error, authPopup.errorMessageEmptyLogin);
    I.waitForVisible(authPopup.errorPassword);
    var error = yield I.grabTextFrom(authPopup.errorPassword);
    I.textShouldBeSameAs(error, authPopup.errorMessageEmptyPassword);
});
