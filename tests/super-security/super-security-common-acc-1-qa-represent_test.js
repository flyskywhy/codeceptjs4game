Feature("super-security-common-acc-1-qa-represent. Тесты супер-безопасности (верстка и отображение различных состояний страницы).");

BeforeSuite((I) => {
    I.syncDown('super-security', 'acc-1-qa-represent');
});

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

AfterSuite((I) => {
    I.createTar('super-security', 'acc-1-qa-represent');
    I.syncUp('super-security', 'acc-1-qa-represent');
    I.clearDir('super-security', 'acc-1-qa-represent');
})

Scenario('Проверка верстки страницы супербезопасности (выключена)', function*(I, superSecurityPage) {
    var user = yield I.createUser();
    I.setSuperSecurityOFF(user.id);
    I.amOnPageForAuthUser(user, superSecurityPage.url);
    I.checkLayout('super-securiry', [{
        name: 'off',
        exclude: [superSecurityPage.exclude.games_list, superSecurityPage.exclude.userbar]
    }], 0.05, 'super-security', "acc-1-qa-represent");
});

Scenario('Проверка верстки списка доверенных компьютеров (пустой список)', function*(I, superSecurityPage) {
    var user = yield I.createUser();
    I.setSuperSecurityON(user.id);
    I.amOnPageForAuthUser(user, superSecurityPage.url);
    superSecurityPage.validateTrustedList();
    I.checkLayout('super-securiry', [{
        name: 'trusted-list',
        elem: superSecurityPage.trusted_computers.locator,
        exclude: superSecurityPage.trusted_computers.list.new_computer_info
    }], 0.05, 'super-security', "acc-1-qa-represent");
});

Scenario('Проверка верстки виджета статуса супербезопасности (низкий уровень)', function*(I, superSecurityPage) {
    var user = yield I.createUser();
    I.setSuperSecurityON(user.id);
    I.amOnPageForAuthUser(user, superSecurityPage.url);
    superSecurityPage.validateLowLevelState();
    I.checkLayout('super-securiry', [{
        name: 'low-level',
        elem: superSecurityPage.account_security_settings_widget.low_level.locator
    }], 0.05, 'super-security', "acc-1-qa-represent");
});

Scenario('Проверка верстки виджета статуса супербезопасности (высокий уровень)', function*(I, superSecurityPage) {
    var user = yield I.createUser();
    I.setSuperSecurityON(user.id);
    I.amOnPageForAuthUser(user, superSecurityPage.url);
    var mobileNumber = '+1' + Math.random().toString(10).substring(3, 12);
    I.addMobileNumber(user.id, mobileNumber);
    I.amOnPage(superSecurityPage.url);
    superSecurityPage.validateHighLevelState(mobileNumber);
    I.checkLayout('super-securiry', [{
        name: 'high-level',
        elem: superSecurityPage.account_security_settings_widget.high_level.locator,
        exclude: superSecurityPage.account_security_settings_widget.high_level.mobile_phone
    }], 0.05, 'super-security', "acc-1-qa-represent");
});

Scenario('Проверка верстки попапа включения СБ (телефон)', function*(I, superSecurityPage) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, superSecurityPage.url);
    I.waitForVisible(superSecurityPage.turn_on_button, superSecurityPage.huge_timeout);
    I.click(superSecurityPage.turn_on_button);
    superSecurityPage.validateTurnOnPopupPhone();
    I.checkLayout('super-securiry-on', [{
        name: 'popup-mobile',
        elem: superSecurityPage.popup.locator,
        exclude: superSecurityPage.popup.identity_input
    }], 0.05, 'super-security', "acc-1-qa-represent");
    I.waitForVisible(superSecurityPage.popup.close_button);
    I.click(superSecurityPage.popup.close_button);
    I.dontSeeElement(superSecurityPage.popup.locator);
});

Scenario('Проверка верстки попапа включения СБ (емейл)', function*(I, superSecurityPage) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, superSecurityPage.url);
    I.waitForVisible(superSecurityPage.turn_on_button, superSecurityPage.huge_timeout);
    I.click(superSecurityPage.turn_on_button);
    I.waitForVisible(superSecurityPage.popup.link_use_mail);
    I.click(superSecurityPage.popup.link_use_mail);
    superSecurityPage.validateTurnOnPopupMail(user.email);
    I.checkLayout('super-securiry-on', [{
        name: 'popup-mail',
        elem: superSecurityPage.popup.locator,
        exclude: superSecurityPage.popup.mail_label
    }], 0.05, 'super-security', "acc-1-qa-represent");
    I.waitForVisible(superSecurityPage.popup.close_button);
    I.click(superSecurityPage.popup.close_button);
    I.dontSeeElement(superSecurityPage.popup.locator);
});
