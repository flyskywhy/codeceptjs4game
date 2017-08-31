Feature("super-security-common-acc-2-qa-email. Тесты супер-безопасности (email).");

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

Scenario('Проверка включения СБ (емейл)', function*(I, superSecurityPage) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, superSecurityPage.url);
    I.waitAndClick(superSecurityPage.turn_on_button, superSecurityPage.huge_timeout);
    I.waitAndClick(superSecurityPage.popup.link_use_mail);
    superSecurityPage.validateTurnOnPopupMail(user.email);
    var messages = yield I.getMessages(user.email);
    var countBefore = Object.keys(messages).length;
    I.waitForVisible(superSecurityPage.popup.send_mail_code_button);
    I.click(superSecurityPage.popup.send_mail_code_button);
    var newMessage = yield I.getNewMessage(user.email, countBefore);
    var code = yield I.getConfirmCode(newMessage);
    I.waitForVisible(superSecurityPage.popup.input_code);
    I.fillField(superSecurityPage.popup.input_code, code);
    I.click(superSecurityPage.popup.button_switch_on);
    I.waitForVisible(superSecurityPage.account_security_settings_widget.low_level.locator);
});

Scenario('Проверка включения СБ (емейл) -- некорректный код', function*(I, superSecurityPage) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, superSecurityPage.url);
    I.waitAndClick(superSecurityPage.turn_on_button, superSecurityPage.huge_timeout);
    I.waitAndClick(superSecurityPage.popup.link_use_mail);
    superSecurityPage.validateTurnOnPopupMail(user.email);
    var messages = yield I.getMessages(user.email);
    var countBefore = Object.keys(messages).length;
    I.waitForVisible(superSecurityPage.popup.send_mail_code_button);
    I.click(superSecurityPage.popup.send_mail_code_button);
    var newMessage = yield I.getNewMessage(user.email, countBefore);
    var code = yield I.getConfirmCode(newMessage);
    I.waitForVisible(superSecurityPage.popup.input_code);
    I.waitForVisible(superSecurityPage.popup.button_switch_on);
    I.fillField(superSecurityPage.popup.input_code, '0000');
    I.click(superSecurityPage.popup.button_switch_on);
    I.waitForVisible(superSecurityPage.popup.wrong_code_message.locator);
});

Scenario('Проверка выключения СБ (емейл)', function*(I, superSecurityPage) {
    var user = yield I.createUser();
    I.setSuperSecurityON(user.id);
    I.amOnPageForAuthUser(user, superSecurityPage.url);
    var messages = yield I.getMessages(user.email);
    var countBefore = Object.keys(messages).length;
    I.waitAndClick(superSecurityPage.trusted_computers.footer.turn_off_link);
    var newMessage = yield I.getNewMessage(user.email, countBefore);
    var code = yield I.getConfirmCode(newMessage);
    I.waitForVisible(superSecurityPage.popup.input_code);
    I.waitForVisible(superSecurityPage.popup.button_switch_off);
    I.fillField(superSecurityPage.popup.input_code, code);
    I.click(superSecurityPage.popup.button_switch_off);
    I.waitForVisible(superSecurityPage.turn_on_button);
});

Scenario('Проверка выключения СБ (емейл) -- некорректный код', function*(I, superSecurityPage) {
    var user = yield I.createUser();
    I.setSuperSecurityON(user.id);
    I.amOnPageForAuthUser(user, superSecurityPage.url);
    var messages = yield I.getMessages(user.email);
    var countBefore = Object.keys(messages).length;
    I.waitAndClick(superSecurityPage.trusted_computers.footer.turn_off_link);
    var newMessage = yield I.getNewMessage(user.email, countBefore);
    var code = yield I.getConfirmCode(newMessage);
    I.waitForVisible(superSecurityPage.popup.input_code);
    I.waitForVisible(superSecurityPage.popup.button_switch_off);
    I.fillField(superSecurityPage.popup.input_code, '0000');
    I.click(superSecurityPage.popup.button_switch_off);
    I.waitForVisible(superSecurityPage.popup.wrong_code_message.locator);
});

Scenario('Проверка СБ при запуске игры (емейл)', function*(I, superSecurityPage, gamePanelPage) {
    var defaultGame = I.getGames().default_game;
    var user = yield I.createUser();
    I.setSuperSecurityON(user.id);
    I.amOnPageForAuthUser(user, defaultGame.play_url);
    var messages = yield I.getMessages(user.email);
    var countBefore = Object.keys(messages).length;
    yield I.makeInstalledGame(defaultGame.serviceId);
    I.waitAndClick(gamePanelPage.buttons.play.locator);
    gamePanelPage.acceptFinalFormalitiesIfVisible();
    superSecurityPage.validatePopupEmailOnPlay(user.email);
    var newMessage = yield I.getNewMessage(user.email, countBefore);
    var code = yield I.getConfirmCode(newMessage);
    I.fillField(superSecurityPage.popup.input_code, code);
    I.click(superSecurityPage.play.popup.play_button);
    I.waitForVisible(superSecurityPage.play.popup.play_button);
    //TODO клик по кнопке плей, проверить и убить процесс
});

Scenario('Проверка СБ при запуске игры (емейл) - некорректный код', function*(I, superSecurityPage, gamePanelPage) {
    var defaultGame = I.getGames().default_game;
    var user = yield I.createUser();
    I.setSuperSecurityON(user.id);
    I.amOnPageForAuthUser(user, defaultGame.play_url);
    var messages = yield I.getMessages(user.email);
    var countBefore = Object.keys(messages).length;
    yield I.makeInstalledGame(defaultGame.serviceId);
    I.waitAndClick(gamePanelPage.buttons.play.locator);
    gamePanelPage.acceptFinalFormalitiesIfVisible();
    superSecurityPage.validatePopupEmailOnPlay(user.email);
    var newMessage = yield I.getNewMessage(user.email, countBefore);
    var code = yield I.getConfirmCode(newMessage);
    I.fillField(superSecurityPage.popup.input_code, '0000');
    I.click(superSecurityPage.play.popup.play_button);
    I.waitForVisible(superSecurityPage.popup.wrong_code_message.locator);
});
