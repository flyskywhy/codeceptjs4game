Feature("authorization-common-acc-3-qa-social-network. Тесты авторизации и работы через социальные сети.");

var data = require('./data/accounts');

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

Scenario("Привязываем аккаунт facebook к сайту, проверяем дефолтный аватар", function*(I, socialNetworkPage, socialRegisterPopup, userbar) {
    I.deleteFbAccount(data.fb.id);
    socialNetworkPage.loginInFacebook(data.fb.email, data.fb.password);
    I.amOnPage("/");
    I.waitForVisible(userbar.loginFBButton);
    I.click(userbar.loginFBButton);
    socialRegisterPopup.avatarShouldBePresent();
});

Scenario("Привязываем аккаунт vkontakte к сайту, проверяем дефолтный аватар", function*(I, socialNetworkPage, socialRegisterPopup, userbar) {
    I.deleteVkAccount(data.vk.id);
    socialNetworkPage.loginInVk(data.vk.email, data.vk.password);
    I.amOnPage("/");
    I.waitForVisible(userbar.loginVKButton);
    I.click(userbar.loginVKButton);
    socialRegisterPopup.avatarShouldBePresent();
});

Scenario("Привязываем аккаунт ok к сайту, проверяем дефолтный аватар", function*(I, socialRegisterPopup, userbar, socialNetworkPage) {
    I.deleteOkAccount(data.ok.id);
    socialNetworkPage.loginInOk(data.ok.email, data.ok.password);
    I.amOnPage("/");
    I.waitForVisible(userbar.authAndRegButton);
    I.click(userbar.authAndRegButton);
    socialNetworkPage.confirmSignUpWithOk();
    socialRegisterPopup.avatarShouldBePresent();
});

Scenario("Проверяем возможность связать facebook с существующей учетной записью 4game", function*(I, socialNetworkPage, socialRegisterPopup, userbar) {
    I.deleteFbAccount(data.fb.id);
    socialNetworkPage.loginInFacebook(data.fb.email, data.fb.password);
    I.amOnPage("/");
    I.waitForVisible(userbar.loginFBButton);
    I.click(userbar.loginFBButton);
    socialRegisterPopup.linkAccount();
    socialRegisterPopup.loginAndLinkAccount(data.forgame.email, data.forgame.password);
    I.waitForVisible(userbar.generalElement);
    I.waitForVisible(userbar.barUserName);
    var login = yield I.grabTextFrom(userbar.barUserName);
    I.textShouldBeSameAs(login, data.forgame.login);
});

Scenario("Проверяем возможность связать яндекс аккаунт с существующей учетной записью 4game", function*(I, socialNetworkPage, socialRegisterPopup, userbar) {
    I.deleteYaAccount(data.yandex.id);
    socialNetworkPage.loginInYandex(data.yandex.email, data.yandex.password);
    I.amOnPage("/");
    I.waitForVisible(userbar.loginYAButton);
    I.click(userbar.loginYAButton);
    socialRegisterPopup.linkAccount();
    socialRegisterPopup.loginAndLinkAccount(data.game.email, data.game.password);
    I.waitForVisible(userbar.generalElement);
    I.waitForVisible(userbar.barUserName);
    var login = yield I.grabTextFrom(userbar.barUserName);
    I.textShouldBeSameAs(login, data.game.email);
});

Scenario("Проверяем возможность связать ok с существующей учетной записью 4game", function*(I, socialNetworkPage, socialRegisterPopup, userbar, authPopup) {
    I.deleteOkAccount(data.ok.id);
    socialNetworkPage.loginInOk(data.ok.email, data.ok.password);
    I.amOnPage("/");
    I.waitForVisible(userbar.authAndRegButton);
    I.click(userbar.authAndRegButton);
    socialNetworkPage.confirmSignUpWithOk();
    socialRegisterPopup.linkAccount();
    socialRegisterPopup.loginAndLinkAccount(data.forgame.email, data.forgame.password);
    I.waitForVisible(userbar.generalElement);
    I.waitForVisible(userbar.barUserName);
    var login = yield I.grabTextFrom(userbar.barUserName);
    I.textShouldBeSameAs(login, data.forgame.login);
});

Scenario("Авторизация с помощью facebook на registration lineage2, проверяем редирект", function*(I, socialNetworkPage, socialRegisterPopup, userbar) {
    I.amOnPage("/registration/lineage2/");
    I.waitForVisible(".jsFacebookConnect");
    I.click(".jsFacebookConnect");
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(socialNetworkPage.fbEmailField);
    I.waitForVisible(socialNetworkPage.fbPasswordField);
    I.fillField(socialNetworkPage.fbEmailField, data.fb_for_auth.email);
    I.fillField(socialNetworkPage.fbPasswordField, data.fb_for_auth.password);
    I.waitForVisible(socialNetworkPage.fbSubmitButton);
    I.click(socialNetworkPage.fbSubmitButton);
    I.changeTab(1);
    I.waitForVisible(userbar.generalElement);
    I.waitForVisible(userbar.barUserName);
    I.seeInCurrentUrl("lineage2/play");
    var login = yield I.grabTextFrom(userbar.barUserName);
    I.textShouldBeSameAs(login, data.fb_for_auth.email);
});

Scenario("Авторизация с помощью ok на registration lineage2, проверяем редирект", function*(I, authPopup, socialNetworkPage, socialRegisterPopup, userbar) {
    I.amOnPage("/registration/lineage2/");
    I.waitForVisible(".jsOKConnect");
    I.click(".jsOKConnect");
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(socialNetworkPage.okEmailField);
    I.waitForVisible(socialNetworkPage.okPasswordField);
    I.fillField(socialNetworkPage.okEmailField, data.ok.email);
    I.fillField(socialNetworkPage.okPasswordField, data.ok.password);
    I.waitForVisible(socialNetworkPage.okSubmitButton);
    I.click(socialNetworkPage.okSubmitButton);
    I.waitForVisible(authPopup.okSubmitButton);
    I.click(authPopup.okSubmitButton);
    I.changeTab(1);
    I.waitForVisible("body");
    I.waitForVisible(userbar.generalElement);
    I.waitForVisible(userbar.barUserName);
    I.seeInCurrentUrl("lineage2/play");
    var login = yield I.grabTextFrom(userbar.barUserName);
    I.textShouldBeSameAs(login, data.ok.login);
});

Scenario("Проверяем регистрацию с помощью vk", function*(I, socialNetworkPage, socialRegisterPopup, userbar) {
    I.deleteVkAccount(data.vk.id);
    socialNetworkPage.loginInVk(data.vk.email, data.vk.password);
    I.amOnPage("/");
    I.waitForVisible(userbar.generalElement);
    I.waitForVisible(userbar.loginVKButton);
    I.click(userbar.loginVKButton);
    socialRegisterPopup.createAccount();
    I.waitForVisible(userbar.generalElement);
    I.waitForVisible(userbar.barUserName);
    var login = yield I.grabTextFrom(userbar.barUserName);
    I.textShouldBeSameAs(login, data.vk.login);
});

Scenario("Проверяем регистрацию с помощью ok", function*(I, socialNetworkPage, socialRegisterPopup, userbar) {
    I.deleteOkAccount(data.ok.id);
    socialNetworkPage.loginInOk(data.ok.email, data.ok.password);
    I.amOnPage("/");
    I.waitForVisible(userbar.authAndRegButton);
    I.click(userbar.authAndRegButton);
    socialNetworkPage.confirmSignUpWithOk();
    socialRegisterPopup.createAccount();
    I.waitForVisible(userbar.generalElement);
    I.waitForVisible(userbar.barUserName);
    var login = yield I.grabTextFrom(userbar.barUserName);
    I.textShouldBeSameAs(login, data.ok.login);
});

Scenario("Проверяем регистрацию с помощью yandex", function*(I, socialNetworkPage, socialRegisterPopup, userbar) {
    I.deleteYaAccount(data.yandex.id);
    socialNetworkPage.loginInYandex(data.yandex.email, data.yandex.password);
    I.amOnPage("/");
    I.waitForVisible(userbar.generalElement);
    I.waitForVisible(userbar.loginYAButton);
    I.click(userbar.loginYAButton);
    socialRegisterPopup.createAccount();
    I.waitForVisible(userbar.generalElement);
    I.waitForVisible(userbar.barUserName);
    var login = yield I.grabTextFrom(userbar.barUserName);
    I.textShouldBeSameAs(login, data.yandex.email);
});

Scenario("Проверяем регистрацию с помощью fb", function*(I, socialNetworkPage, socialRegisterPopup, userbar) {
    I.deleteFbAccount(data.fb.id);
    socialNetworkPage.loginInFacebook(data.fb.email, data.fb.password);
    I.amOnPage("/");
    I.waitForVisible(userbar.generalElement);
    I.waitForVisible(userbar.loginFBButton);
    I.click(userbar.loginFBButton);
    socialRegisterPopup.createAccount();
    I.waitForVisible(userbar.generalElement);
    I.waitForVisible(userbar.barUserName);
    var login = yield I.grabTextFrom(userbar.barUserName);
    I.textShouldBeSameAs(login, data.fb.login);
});
