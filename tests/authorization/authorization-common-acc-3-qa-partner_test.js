Feature("authorization-common-acc-3-qa-partner. Тесты авторизации и регистрации для партнера arena4game.com.");

var url = "http://arena4game.com/";
var data = require('./data/accounts');

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

Scenario("Регистрируемся и проверяем редирект", function*(I, genericPage, authPopup, registrationConfirmPage) {
    I.amOnPage("/auth/arena/?returnUrl=" + url);
    I.waitForVisible(authPopup.popupElement);
    I.waitForVisible(authPopup.loginField);
    I.waitForVisible(authPopup.passwordField);
    var email = yield I.getEmail();
    authPopup.signUp(email);
    var regLink = yield I.getRegisterLink(email);
    I.amOnPage(regLink);
    I.seeInCurrentUrl(url);
    registrationConfirmPage.signUp('123456');
    I.waitForVisible(genericPage.userBar);
    I.waitForVisible(genericPage.barUserName);
    var login = yield I.grabTextFrom(genericPage.barUserName);
    I.textShouldBeSameAs(login, email);
    I.waitForText(authPopup.regText);
    I.seeInCurrentUrl(url);
});

Scenario("Авторизуемся и проверяем редирект", function*(I, genericPage, authPopup) {
    I.amOnPage("/auth/arena/?returnUrl=" + url);
    I.waitForVisible(authPopup.popupElement);
    I.waitForVisible(authPopup.loginField);
    I.waitForVisible(authPopup.passwordField);
    I.fillField(authPopup.loginField, data.partner.forgame.email);
    I.fillField(authPopup.passwordField, data.partner.forgame.password);
    I.waitForVisible(authPopup.signInButton);
    I.click(authPopup.signInButton);
    I.waitForElement(genericPage.body);
    I.seeInCurrentUrl(url);
});

Scenario("Авторизуемся через facebook и проверяем редирект", function*(I, authPopup, genericPage) {
    I.amOnPage("/auth/arena/?returnUrl=" + url);
    I.waitForVisible(authPopup.popupElement);
    I.waitForVisible(authPopup.fbButton);
    I.click(authPopup.fbButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(authPopup.fbEmailField);
    I.fillField(authPopup.fbEmailField, data.partner.fb.email);
    I.fillField(authPopup.fbPasswordField, data.partner.fb.password);
    I.waitForVisible(authPopup.fbSubmitButton);
    I.click(authPopup.fbSubmitButton);
    I.changeTab(1);
    I.waitForElement(genericPage.body);
    I.waitForText(data.partner.fb.nick);
    I.seeInCurrentUrl(url);
});

Scenario("Авторизуемся через vkontakte и проверяем редирект", function*(I, authPopup, genericPage) {
    I.amOnPage("/auth/arena/?returnUrl=" + url);
    I.waitForVisible(authPopup.popupElement);
    I.waitForVisible(authPopup.vkButton);
    I.click(authPopup.vkButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(authPopup.vkEmailField);
    I.fillField(authPopup.vkEmailField, data.partner.vk.email);
    I.fillField(authPopup.vkPasswordField, data.partner.vk.password);
    I.waitForVisible(authPopup.vkSubmitButton);
    I.click(authPopup.vkSubmitButton);
    I.changeTab(1);
    I.waitForElement(genericPage.body);
    I.waitForText(data.partner.vk.nick);
    I.seeInCurrentUrl(url);
});

Scenario("Авторизуемся через yandex и проверяем редирект", function*(I, authPopup, genericPage) {
    I.amOnPage("/auth/arena/?returnUrl=" + url);
    I.waitForVisible(authPopup.popupElement);
    I.waitForVisible(authPopup.yaButton);
    I.click(authPopup.yaButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(authPopup.yaEmailField);
    I.fillField(authPopup.yaEmailField, data.partner.yandex.email);
    I.fillField(authPopup.yaPasswordField, data.partner.yandex.password);
    I.waitForVisible(authPopup.yaSubmitButton);
    I.click(authPopup.yaSubmitButton);
    I.changeTab(1);
    I.waitForElement(genericPage.body);
    I.waitForText(data.partner.yandex.nick);
    I.seeInCurrentUrl(url);
});

Scenario("Авторизуемся через OK и проверяем редирект", function*(I, authPopup, genericPage) {
    I.amOnPage("/auth/arena/?returnUrl=" + url);
    I.waitForVisible(authPopup.popupElement);
    I.waitForVisible(authPopup.okButton);
    I.click(authPopup.okButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(authPopup.okEmailField);
    I.fillField(authPopup.okEmailField, data.partner.ok.email);
    I.fillField(authPopup.okPasswordField, data.partner.ok.password);
    I.waitForVisible(authPopup.okSubmitButton);
    I.click(authPopup.okSubmitButton);
    I.waitForVisible(authPopup.okSubmitButton);
    I.click(authPopup.okSubmitButton);
    I.changeTab(1);
    I.waitForElement(genericPage.body);
    I.waitForText(data.partner.ok.nick);
    I.seeInCurrentUrl(url);
});

// тест не работает, т.к. баг на куа
xScenario("Проверяем редирект в службу поддержки и отказ в авторизации", function*(I, authPopup) {
    var urlSupport = "https://ru.4gamesupport.com/";
    I.amOnPage("/auth/arena/?returnUrl=" + urlSupport);
    I.waitForVisible(authPopup.popupElement);
    I.waitForVisible(authPopup.loginField);
    I.waitForVisible(authPopup.passwordField);
    I.fillField(authPopup.loginField, data.partner.forgame.email);
    I.fillField(authPopup.passwordField, data.partner.forgame.password);
    I.waitForVisible(authPopup.signInButton);
    I.click(authPopup.signInButton);
    // баг на qa, снова открывается попап авторизации вместо саппорта
    I.seeInCurrentUrl(urlSupport);
});
