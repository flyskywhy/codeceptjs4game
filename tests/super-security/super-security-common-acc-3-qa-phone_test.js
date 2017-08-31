Feature("super-security-common-acc-3-qa-phone. Тесты супер-безопасности (телефон).");

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

Scenario('Проверка включения СБ  (телефон)', function*(I, superSecurityPage) {
    var user = yield I.createUser();
    var mobileNumber = '+00' + Math.random().toString(10).substring(3, 11);
    I.addMobileNumber(user.id, mobileNumber);
    I.amOnPageForAuthUser(user, superSecurityPage.url);
    var messages = yield I.getMessages(mobileNumber);
    var countBefore = Object.keys(messages).length;
    I.waitAndClick(superSecurityPage.turn_on_button, superSecurityPage.huge_timeout);
    var newMessage = yield I.getNewMessage(mobileNumber, countBefore);
    var code = yield I.getConfirmCode(newMessage);
    I.waitForVisible(superSecurityPage.popup.input_code);
    I.waitForVisible(superSecurityPage.popup.button_switch_on);
    I.fillField(superSecurityPage.popup.input_code, code);
    I.click(superSecurityPage.popup.button_switch_on);
    I.waitForVisible(superSecurityPage.account_security_settings_widget.high_level.locator);
});

Scenario('Проверка включения СБ  (телефон) -- некорректный код', function*(I, superSecurityPage) {
    var user = yield I.createUser();
    var mobileNumber = '+00' + Math.random().toString(10).substring(3, 11);
    I.addMobileNumber(user.id, mobileNumber);
    I.amOnPageForAuthUser(user, superSecurityPage.url);
    var messages = yield I.getMessages(mobileNumber);
    var countBefore = Object.keys(messages).length;
    I.waitAndClick(superSecurityPage.turn_on_button, superSecurityPage.huge_timeout);
    var newMessage = yield I.getNewMessage(mobileNumber, countBefore);
    var code = yield I.getConfirmCode(newMessage);
    I.waitForVisible(superSecurityPage.popup.input_code);
    I.waitForVisible(superSecurityPage.popup.button_switch_on);
    I.fillField(superSecurityPage.popup.input_code, '0000');
    I.click(superSecurityPage.popup.button_switch_on);
    I.waitForVisible(superSecurityPage.popup.wrong_code_message.locator);
});

Scenario('Проверка выключения СБ (телефон)', function*(I, superSecurityPage) {
    var user = yield I.createUser();
    var mobileNumber = '+00' + Math.random().toString(10).substring(3, 11);
    I.addMobileNumber(user.id, mobileNumber);
    I.setSuperSecurityON(user.id);
    I.amOnPageForAuthUser(user, superSecurityPage.url);
    var messages = yield I.getMessages(mobileNumber);
    var countBefore = Object.keys(messages).length;
    I.waitAndClick(superSecurityPage.trusted_computers.footer.turn_off_link);
    var newMessage = yield I.getNewMessage(mobileNumber, countBefore);
    var code = yield I.getConfirmCode(newMessage);
    I.waitForVisible(superSecurityPage.popup.input_code);
    I.waitForVisible(superSecurityPage.popup.button_switch_off);
    I.fillField(superSecurityPage.popup.input_code, code);
    I.click(superSecurityPage.popup.button_switch_off);
    I.waitForVisible(superSecurityPage.turn_on_button);
});

Scenario('Проверка выключения СБ (телефон) -- некорректный код', function*(I, superSecurityPage) {
    var user = yield I.createUser();
    var mobileNumber = '+00' + Math.random().toString(10).substring(3, 11);
    I.addMobileNumber(user.id, mobileNumber);
    I.setSuperSecurityON(user.id);
    I.amOnPageForAuthUser(user, superSecurityPage.url);
    var messages = yield I.getMessages(mobileNumber);
    var countBefore = Object.keys(messages).length;
    I.waitAndClick(superSecurityPage.trusted_computers.footer.turn_off_link);
    var newMessage = yield I.getNewMessage(mobileNumber, countBefore);
    var code = yield I.getConfirmCode(newMessage);
    I.waitForVisible(superSecurityPage.popup.input_code);
    I.waitForVisible(superSecurityPage.popup.button_switch_off);
    I.fillField(superSecurityPage.popup.input_code, '0000');
    I.click(superSecurityPage.popup.button_switch_off);
    I.waitForVisible(superSecurityPage.popup.wrong_code_message.locator);
});

Scenario('Проверка СБ при запуске игры (телефон)', function*(I, superSecurityPage, gamePanelPage) {
    var defaultGame = I.getGames().default_game;
    var user = yield I.createUser();
    var mobileNumber = '+00' + Math.random().toString(10).substring(3, 11);
    I.addMobileNumber(user.id, mobileNumber);
    I.setSuperSecurityON(user.id);
    I.amOnPageForAuthUser(user, defaultGame.play_url);
    var messages = yield I.getMessages(mobileNumber);
    var countBefore = Object.keys(messages).length;
    yield I.makeInstalledGame(defaultGame.serviceId);
    I.waitAndClick(gamePanelPage.buttons.play.locator);
    gamePanelPage.acceptFinalFormalitiesIfVisible();
    superSecurityPage.validatePopupPhoneOnPlay(mobileNumber);
    var newMessage = yield I.getNewMessage(mobileNumber, countBefore);
    var code = yield I.getConfirmCode(newMessage);
    I.fillField(superSecurityPage.popup.input_code, code);
    I.click(superSecurityPage.play.popup.play_button);
    I.waitForVisible(superSecurityPage.play.popup.play_button);
    //TODO клик по кнопке плей, проверить и убить процесс
});

Scenario('Проверка СБ при запуске игры (телефон) -- некорректный код', function*(I, superSecurityPage, gamePanelPage) {
    var user = yield I.createUser();
    var defaultGame = I.getGames().default_game;
    var mobileNumber = '+00' + Math.random().toString(10).substring(3, 11);
    I.addMobileNumber(user.id, mobileNumber);
    I.setSuperSecurityON(user.id);
    I.amOnPageForAuthUser(user, defaultGame.play_url);
    var messages = yield I.getMessages(mobileNumber);
    var countBefore = Object.keys(messages).length;
    yield I.makeInstalledGame(defaultGame.serviceId);
    I.waitAndClick(gamePanelPage.buttons.play.locator);
    gamePanelPage.acceptFinalFormalitiesIfVisible();
    superSecurityPage.validatePopupPhoneOnPlay(mobileNumber);
    var newMessage = yield I.getNewMessage(mobileNumber, countBefore);
    var code = yield I.getConfirmCode(newMessage);
    I.fillField(superSecurityPage.popup.input_code, '0000');
    I.click(superSecurityPage.play.popup.play_button);
    I.waitForVisible(superSecurityPage.popup.wrong_code_message.locator);
});
