Feature("settings-common-acc-1-qa-notification. Тесты для настроек нотификаций");

Before((I) => {
    I.closeTabsExceptForOne();
    I.clearCookie();
});

Scenario("Юзер может отключить нотификации об акке и новостях по почте", function*(I, settings) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, "/settings/notifications/");
    I.waitForVisible(settings.main.settingsFormContent, settings.timeout);
    I.waitForVisible(settings.notifications.checkboxAccountMailChecked, settings.timeout);
    I.waitForVisible(settings.main.buttonSaveSettingsDisabled, settings.timeout);
    I.waitAndClick(settings.notifications.checkboxNewsMailChecked, settings.timeout);
    I.waitAndClick(settings.notifications.checkboxAccountMailChecked, settings.timeout);
    I.waitForVisible(settings.notifications.checkboxNewsMailUnchecked, settings.timeout);
    I.waitAndClick(settings.main.buttonSaveSettingsEnabled, settings.timeout);
    I.waitForVisible(settings.main.successSettingsChangeMessage.locator, settings.timeout);
    I.waitForText(settings.main.successSettingsChangeMessage.text, settings.timeout, settings.main.successSettingsChangeMessage.locator);
    I.refreshPage();
    I.waitForVisible(settings.notifications.checkboxAccountMailUnchecked, settings.timeout);
    I.waitForVisible(settings.notifications.checkboxNewsMailUnchecked, settings.timeout);
});
