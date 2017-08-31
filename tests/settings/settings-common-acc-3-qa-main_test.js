Feature("settings-common-acc-3-qa-main. Тесты параметров входа");

var accounts = require('../../data/accounts');

Before((I) => {
    I.closeTabsExceptForOne();
    I.clearCookie();
});

Scenario("Юзер может сменить почту без телефона", function*(I, settings) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, settings.loginData.url);
    I.waitForVisible(settings.main.settingsFormContent);
    I.waitForVisible(settings.loginData.mailLabel);
    I.waitForText(user.email, settings.timeout, settings.loginData.mailLabel);
    I.waitAndClick(settings.loginData.linkChangeMainMail, settings.timeout)
    I.waitForVisible(settings.loginData.fieldChangeMail);
    var mail = yield I.getEmail();
    I.fillField(settings.loginData.fieldChangeMail, mail);
    I.waitAndClick(settings.loginData.buttonAcceptChangeEmail, settings.timeout);
    var setContactLink = yield I.silentlyGetSetContactLink(mail);
    I.amOnPage(setContactLink);
    I.waitForVisible(settings.main.settingsFormContent);
    var confirmContactLink = yield I.silentlyGetConfirmContactLink(user.email);
    I.amOnPage(confirmContactLink);
    I.waitForVisible(settings.loginData.mailLabel);
    I.waitForText(mail, settings.timeout, settings.loginData.mailLabel);
});

Scenario("Юзер может сменить почту с помощью телефона", function*(I, settings) {
    var user = yield I.createUser();
    var phone = yield I.addRandomMobileNumber(user.id);
    I.amOnPageForAuthUser(user, settings.loginData.url);
    I.waitForVisible(settings.main.settingsFormContent);
    I.waitForVisible(settings.loginData.mailLabel);
    I.waitForText(user.email, settings.timeout, settings.loginData.mailLabel);
    I.waitAndClick(settings.loginData.linkChangeMainMail, settings.timeout)
    I.waitForVisible(settings.loginData.fieldChangeMail);
    var mail = yield I.getEmail();
    I.fillField(settings.loginData.fieldChangeMail, mail);
    I.waitAndClick(settings.loginData.buttonAcceptChangeEmail, settings.timeout);
    var setContactLink = yield I.silentlyGetSetContactLink(mail);
    I.amOnPage(setContactLink);
    I.waitForVisible(settings.main.settingsFormContent);
    var confirmCode = yield I.silentlyGetMobileConfirmCode(phone, 0)
    I.waitForVisible(settings.loginData.fieldSmSCodeChangeMail);
    I.fillField(settings.loginData.fieldSmSCodeChangeMail, confirmCode);
    I.waitAndClick(settings.loginData.buttonChangeMailAfterSmsCode, settings.timeout);
    I.waitForVisible(settings.loginData.mailLabel);
    I.waitForText(mail, settings.timeout, settings.loginData.mailLabel);
});

Scenario("При вводе неправильного кода из смс появляется ошибка", function*(I, settings) {
    var user = yield I.createUser();
    var phone = yield I.addRandomMobileNumber(user.id);
    I.amOnPageForAuthUser(user, settings.loginData.url);
    I.waitForVisible(settings.main.settingsFormContent);
    I.waitForVisible(settings.loginData.mailLabel);
    I.waitForText(user.email, settings.timeout, settings.loginData.mailLabel);
    I.waitAndClick(settings.loginData.linkChangeMainMail, settings.timeout)
    I.waitForVisible(settings.loginData.fieldChangeMail);
    var mail = yield I.getEmail();
    I.fillField(settings.loginData.fieldChangeMail, mail);
    I.waitAndClick(settings.loginData.buttonAcceptChangeEmail, settings.timeout);
    var setContactLink = yield I.silentlyGetSetContactLink(mail);
    I.amOnPage(setContactLink);
    I.waitForVisible(settings.main.settingsFormContent);
    I.waitForVisible(settings.loginData.fieldSmSCodeChangeMail);
    I.fillField(settings.loginData.fieldSmSCodeChangeMail, "0000");
    I.waitAndClick(settings.loginData.buttonChangeMailAfterSmsCode, settings.timeout);
    I.waitForVisible(settings.loginData.errorMessageSmsCode);
});

Scenario("Пользователь видит корректный уровень защиты", function*(I, settings) {
    var user = yield I.createUser();
    var phone = yield I.addRandomMobileNumber(user.id);
    I.amOnPageForAuthUser(user, settings.loginData.url);
    I.waitForVisible(settings.main.settingsFormContent);
    I.waitForVisible(settings.main.accountMediumSecurity);
    I.setSuperSecurityON(user.id);
    I.refreshPage();
    I.waitForVisible(settings.main.accountHighSecurity);
    I.waitForVisible(settings.main.superSecurityIsOn);
    I.deleteMobileNumber(user.id);
    I.refreshPage();
    I.waitForVisible(settings.main.accountLowSecurity);
    I.setSuperSecurityOFF(user.id);
    I.refreshPage();
    I.waitForVisible(settings.main.accountLowSecurity);
});

Scenario("Пользователь видит уведомление, если у него нет email", function*(I, settings) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, settings.loginData.url);
    I.deleteEmail(user.id);
    I.refreshPage();
    I.waitForVisible(settings.main.accountIsNotProtected);
    I.waitForVisible(settings.main.linkAddMail);
});

Scenario("Пользователь может задать логин", function*(I, settings) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, settings.loginData.url);
    var login = yield I.grabNewLogin();
    I.waitForVisible(settings.loginData.fieldLogin);
    I.fillField(settings.loginData.fieldLogin, login);
    I.waitForVisible(settings.main.fieldPassword);
    I.fillField(settings.main.fieldPassword, user.password);
    I.waitAndClick(settings.main.buttonSaveSettingsEnabled)
    I.waitForVisible(settings.main.successSettingsChangeMessage.locator, settings.timeout);
    I.waitForText(settings.main.successSettingsChangeMessage.text, settings.timeout, settings.main.successSettingsChangeMessage.locator);
});

Scenario("Пользователь может изменить пароль", function*(I, settings) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, settings.loginData.url);
    var password = yield I.grabNewPassword();
    I.waitForVisible(settings.loginData.fieldNewPassword);
    I.fillField(settings.loginData.fieldNewPassword, password);
    I.waitForVisible(settings.main.fieldPassword);
    I.fillField(settings.main.fieldPassword, user.password);
    I.waitAndClick(settings.main.buttonSaveSettingsEnabled)
    I.waitForVisible(settings.main.successSettingsChangeMessage.locator, settings.timeout);
    I.waitForText(settings.main.successSettingsChangeMessage.text, settings.timeout, settings.main.successSettingsChangeMessage.locator);
});

Scenario("Пользователь может привязать и отвязать Yandex", function*(I, settings) {
    I.deleteSocialAccountIfExists(accounts.yandex.id, accounts.yandex.type);
    var user = yield I.createUser();
    settings.loginInSocialNetwork("ya", accounts.yandex.email, accounts.yandex.password)
    I.amOnPageForAuthUser(user, settings.loginData.url);
    I.waitAndClick(settings.loginData.addYaContact, settings.timeout);
    I.waitAndClick(settings.loginData.delYaContact, settings.timeout);
});

Scenario("Пользователь может привязать и отвязать Facebook", function*(I, settings) {
    I.deleteSocialAccountIfExists(accounts.fb.id, accounts.fb.type);
    var user = yield I.createUser();
    settings.loginInSocialNetwork("fb", accounts.fb.email, accounts.fb.password)
    I.amOnPageForAuthUser(user, settings.loginData.url);
    I.waitAndClick(settings.loginData.addFbContact, settings.timeout);
    I.waitAndClick(settings.loginData.delFbContact, settings.timeout);
});

Scenario("Пользователь может привязать и отвязать VK", function*(I, settings) {
    I.deleteSocialAccountIfExists(accounts.vk.id, accounts.vk.type);
    var user = yield I.createUser();
    settings.loginInSocialNetwork("vk", accounts.vk.email, accounts.vk.password)
    I.amOnPageForAuthUser(user, settings.loginData.url);
    I.waitAndClick(settings.loginData.addVkContact, settings.timeout);
    I.waitAndClick(settings.loginData.delVkContact, settings.timeout);
});

Scenario("Пользователь может привязать и отвязать OK", function*(I, settings) {
    I.deleteSocialAccountIfExists(accounts.ok.id, accounts.ok.type);
    var user = yield I.createUser();
    settings.loginInSocialNetwork("ok", accounts.ok.email, accounts.ok.password)
    I.amOnPageForAuthUser(user, settings.loginData.url);
    I.waitAndClick(settings.loginData.addOkContact, settings.timeout);
    I.waitTabsLoading(2, settings.timeout);
    I.changeTab(2);
    I.waitAndClick("//button[@type = 'submit']");
    I.changeTab(1);
    I.waitAndClick(settings.loginData.delOkContact, settings.timeout);
});

Scenario("Пользователь может добавить телефон", function*(I, settings) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, settings.loginData.url);
    var phone = yield I.grabRandomMobileNumber();
    I.waitAndClick(settings.loginData.linkAddMobile, settings.timeout);
    I.waitForVisible(settings.loginData.fieldMobileNumber);
    I.fillField(settings.loginData.fieldMobileNumber, phone);
    I.waitAndClick(settings.loginData.buttonAddMobileNumber, settings.timeout);
    I.waitForVisible(settings.loginData.fieldForCodeAddMobile);
    var confirmCode = yield I.silentlyGetMobileConfirmCode(phone, 0)
    I.fillField(settings.loginData.fieldForCodeAddMobile, confirmCode);
    I.waitAndClick(settings.loginData.buttonAddNumberAfterCode, settings.timeout);
    var addPhoneLink = yield I.silentlyGetConfirmContactLink(user.email);
    I.amOnPage(addPhoneLink);
    I.waitForVisible(settings.loginData.linkChangeMobile);
});

Scenario("Пользователь может изменить телефон", function*(I, settings) {
    var user = yield I.createUser();
    var phone = yield I.addRandomMobileNumber(user.id);
    var newPhone = yield I.grabRandomMobileNumber();
    I.amOnPageForAuthUser(user, settings.loginData.url);
    I.waitAndClick(settings.loginData.linkChangeMobile, settings.timeout);
    I.waitForVisible(settings.loginData.fieldMobileNumber);
    I.fillField(settings.loginData.fieldMobileNumber, newPhone);
    I.waitAndClick(settings.loginData.buttonChangeMobile, settings.timeout);
    I.waitForVisible(settings.loginData.fieldChangeMobileNewCode);
    var confirmCodeNew = yield I.silentlyGetMobileConfirmCode(newPhone, 0)
    I.fillField(settings.loginData.fieldChangeMobileNewCode, confirmCodeNew);
    I.waitAndClick(settings.loginData.buttonChangeMobileNewCode, settings.timeout);
    var confirmCodeOld = yield I.silentlyGetMobileConfirmCode(phone, 0);
    I.waitForVisible(settings.loginData.fieldChangeMobileOldCode);
    I.fillField(settings.loginData.fieldChangeMobileOldCode, confirmCodeOld);
    I.waitAndClick(settings.loginData.buttonChangeMobileOldCode, settings.timeout);
    I.waitForVisible(settings.loginData.mobilePhone);
    I.waitForText(newPhone.substring(0, 2) + newPhone.substr(2).replace(/.(?!.{0,1}$)/g, "*"), settings.timeout, settings.loginData.mobilePhone)
});

Scenario("Пользователь хочет сменить телефон, но вводит неправильный код", function*(I, settings) {
    var user = yield I.createUser();
    var phone = yield I.addRandomMobileNumber(user.id);
    var newPhone = yield I.grabRandomMobileNumber();
    I.amOnPageForAuthUser(user, settings.loginData.url);
    I.waitAndClick(settings.loginData.linkChangeMobile, settings.timeout);
    I.waitForVisible(settings.loginData.fieldMobileNumber);
    I.fillField(settings.loginData.fieldMobileNumber, newPhone);
    I.waitAndClick(settings.loginData.buttonChangeMobile, settings.timeout);
    I.waitForVisible(settings.loginData.fieldChangeMobileNewCode);
    var confirmCodeNew = yield I.silentlyGetMobileConfirmCode(newPhone, 0)
    I.fillField(settings.loginData.fieldChangeMobileNewCode, confirmCodeNew);
    I.waitAndClick(settings.loginData.buttonChangeMobileNewCode, settings.timeout);
    I.waitForVisible(settings.loginData.fieldChangeMobileOldCode);
    I.fillField(settings.loginData.fieldChangeMobileOldCode, "0000");
    I.waitAndClick(settings.loginData.buttonChangeMobileOldCode, settings.timeout);
    I.waitForVisible(settings.loginData.errorMessageSmsCode);
});

Scenario("Пользователь может удалить телефон", function*(I, settings) {
    var user = yield I.createUser();
    var phone = yield I.addRandomMobileNumber(user.id);
    I.amOnPageForAuthUser(user, settings.loginData.url);
    I.waitAndClick(settings.loginData.linkDeleteMobile, settings.timeout);
    I.waitForVisible(settings.loginData.fieldDeleteMobile);
    I.fillField(settings.loginData.fieldDeleteMobile, phone);
    I.waitAndClick(settings.loginData.buttonDeleteMobile, settings.timeout);
    I.waitForVisible(settings.loginData.fieldDeleteMobileCode);
    var confirmCode = yield I.silentlyGetMobileConfirmCode(phone, 0)
    I.fillField(settings.loginData.fieldDeleteMobileCode, confirmCode);
    I.waitAndClick(settings.loginData.buttonDeleteMobileAccept, settings.timeout);
    I.waitForVisible(settings.loginData.linkAddMobile);
});

Scenario("Пользователь хочет удалить телефон? но вводит непрвильный код", function*(I, settings) {
    var user = yield I.createUser();
    var phone = yield I.addRandomMobileNumber(user.id);
    I.amOnPageForAuthUser(user, settings.loginData.url);
    I.waitAndClick(settings.loginData.linkDeleteMobile, settings.timeout);
    I.waitForVisible(settings.loginData.fieldDeleteMobile);
    I.fillField(settings.loginData.fieldDeleteMobile, phone);
    I.waitAndClick(settings.loginData.buttonDeleteMobile, settings.timeout);
    I.waitForVisible(settings.loginData.fieldDeleteMobileCode);
    I.fillField(settings.loginData.fieldDeleteMobileCode, "0000");
    I.waitAndClick(settings.loginData.buttonDeleteMobileAccept, settings.timeout);
    I.waitForVisible(settings.loginData.errorMessageSmsCode);
});
