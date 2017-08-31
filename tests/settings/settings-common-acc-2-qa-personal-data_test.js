Feature("settings-common-acc-2-qa-personal-data. Тесты для настроек персонализации");

Before((I) => {
    I.closeTabsExceptForOne();
    I.clearCookie();
});

Scenario("Юзер может внести персональные данные", function*(I, settings) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, "/settings/personal/");
    I.waitForVisible(settings.main.settingsFormContent, settings.timeout);
    I.waitForVisible(settings.main.buttonSaveSettingsDisabled, settings.timeout);
    I.waitAndFillField("Testing Name", settings.personalInfo.fieldNameAndSurname, settings.timeout);
    I.waitAndClick(settings.personalInfo.radioButtonMan, settings.timeout);
    I.waitAndFillField("1234", settings.personalInfo.fieldDocNumber, settings.timeout);
    I.waitAndFillField("56", settings.personalInfo.fieldLastDocNumber, settings.timeout);
    I.waitAndFillField("123456", settings.main.fieldPassword, settings.timeout);
    I.waitAndClick(settings.main.buttonSaveSettingsEnabled, settings.timeout);
    I.waitForVisible(settings.main.successSettingsChangeMessage.locator, settings.timeout);
    I.waitForText(settings.main.successSettingsChangeMessage.text, settings.timeout, settings.main.successSettingsChangeMessage.locator);
    I.refreshPage();
    I.waitForVisible(settings.personalInfo.filledNameAndSurname, settings.timeout);
    I.waitForText("T•••••• ••••", settings.timeout, settings.personalInfo.filledNameAndSurname);
    I.waitForVisible(settings.personalInfo.radioButtonMan, settings.timeout)
    I.waitForVisible(settings.personalInfo.filledDoc, settings.timeout);
    I.waitForText("12•• ••", settings.timeout, settings.personalInfo.filledDoc);
});

Scenario("Проверка что настройки на ru форейме и eu совпадают", function*(I, settings) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, "/settings/personal/");
    I.waitForVisible(settings.main.settingsFormContent);
    I.waitForVisible(settings.main.buttonSaveSettingsDisabled);
    I.waitAndClick(settings.personalInfo.radioButtonMan);
    I.waitAndFillField(user.password, settings.main.fieldPassword);
    I.waitAndClick(settings.main.buttonSaveSettingsEnabled);
    I.waitForVisible(settings.main.successSettingsChangeMessage.locator);
    I.waitForText(settings.main.successSettingsChangeMessage.text, settings.timeout, settings.main.successSettingsChangeMessage.locator);
    I.amOnPageOnOtherPlatform("/settings/personal/");
    I.waitForVisible(settings.main.settingsFormContent);
    I.waitForVisible(settings.personalInfo.choosenMan);
});
