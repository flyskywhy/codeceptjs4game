Feature("rfonline-acc-5-qa-auth. Тесты для авторизованного пользователя.");

Before((I, rfonlineAuthPage, genericPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

Scenario("Запуск игры", function*(I, rfonlineAuthPage, gamePanelPage) {
    var user = yield I.createUser();
    I.stopGameService();
    I.writeValuesToRegistry('HKLM',
        '\\Software\\4game\\4gameservice\\Games\\RFOnline',
        rfonlineAuthPage.installed);
    I.startGameService();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(rfonlineAuthPage.playurl);
    I.waitForVisible("#bGamePanel__status");
    I.setGameMaintenanceFor(1, false);
    I.waitForVisible(rfonlineAuthPage.playButton);
    I.click(rfonlineAuthPage.playButton);
    gamePanelPage.acceptFinalFormalitiesIfVisible();
    I.waitForProcess('4updater.exe', 10);
    I.waitForProcess('rf.exe', 15);
    I.waitForProcessClose('frostupdater.exe', 10);
    I.waitForProcessClose('rf.exe', 10);
});

Scenario("Проверяем покупку премиума (недостаточно средств)", function*(I, rfonlineAuthPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(rfonlineAuthPage.playurl);
    I.setGameMaintenanceFor(1, false);
    I.waitForVisible(genericPage.gamePanel.buyPremiumButton);
    I.click(genericPage.gamePanel.buyPremiumButton);
    I.waitForVisible(genericPage.licensePopupPlayButton);
    I.click(genericPage.licensePopupPlayButton);
    I.waitForVisible(genericPage.premiumBuyButton);
    I.click(rfonlineAuthPage.monthsRadio(1));
    I.click(genericPage.premiumBuyButton);
    I.waitForVisible(rfonlineAuthPage.moneyAmount(270));
});

Scenario("Проверяем покупку премиума (не указана страна)", function*(I, rfonlineAuthPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.setCountry(user.id, "0");
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(rfonlineAuthPage.playurl);
    I.setGameMaintenanceFor(1, false);
    I.dontSeeElement(genericPage.gamePanel.buyPremiumButton);
});

Scenario("Проверяем покупку премиума (не указана почта)", function*(I, rfonlineAuthPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.deleteEmail(user.id);
    I.amOnPage(rfonlineAuthPage.playurl);
    I.setGameMaintenanceFor(1, false);
    I.dontSeeElement(genericPage.gamePanel.buyPremiumButton);
});

Scenario("Проверяем покупку премиума на 1 месяц", function*(I, rfonlineAuthPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.setBalanceForUser(user.id, 270);
    I.amOnPage(rfonlineAuthPage.playurl);
    I.setGameMaintenanceFor(1, false);
    I.waitForVisible(genericPage.gamePanel.buyPremiumButton);
    I.click(genericPage.gamePanel.buyPremiumButton);
    I.waitForVisible(genericPage.licensePopupPlayButton);
    I.click(genericPage.licensePopupPlayButton);
    I.waitForVisible(genericPage.premiumBuyButton);
    I.click(rfonlineAuthPage.monthsRadio(1));
    I.click(genericPage.premiumBuyButton);
    I.waitForVisible(rfonlineAuthPage.premiumDays(30));
});

Scenario("Проверяем покупку премиума на 3 месяца", function*(I, rfonlineAuthPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.setBalanceForUser(user.id, 729);
    I.amOnPage(rfonlineAuthPage.playurl);
    I.setGameMaintenanceFor(1, false);
    I.waitForVisible(genericPage.gamePanel.buyPremiumButton);
    I.click(genericPage.gamePanel.buyPremiumButton);
    I.waitForVisible(genericPage.licensePopupPlayButton);
    I.click(genericPage.licensePopupPlayButton);
    I.waitForVisible(genericPage.premiumBuyButton);
    I.click(rfonlineAuthPage.monthsRadio(3));
    I.click(genericPage.premiumBuyButton);
    I.waitForVisible(rfonlineAuthPage.premiumDays(90));
});

Scenario("Проверяем покупку премиума на 6 месяцев", function*(I, rfonlineAuthPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.setBalanceForUser(user.id, 1350);
    I.amOnPage(rfonlineAuthPage.playurl);
    I.setGameMaintenanceFor(1, false);
    I.waitForVisible(genericPage.gamePanel.buyPremiumButton);
    I.click(genericPage.gamePanel.buyPremiumButton);
    I.waitForVisible(genericPage.licensePopupPlayButton);
    I.click(genericPage.licensePopupPlayButton);
    I.waitForVisible(genericPage.premiumBuyButton);
    I.click(rfonlineAuthPage.monthsRadio(6));
    I.click(genericPage.premiumBuyButton);
    I.waitForVisible(rfonlineAuthPage.premiumDays(180));
});

Scenario("Проверяем покупку премиума на 3 месяца и продление на 7 дней", function*(I, rfonlineAuthPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.setBalanceForUser(user.id, 827);
    I.amOnPage(rfonlineAuthPage.playurl);
    I.setGameMaintenanceFor(1, false);
    I.waitForVisible(genericPage.gamePanel.buyPremiumButton);
    I.click(genericPage.gamePanel.buyPremiumButton);
    I.waitForVisible(genericPage.licensePopupPlayButton);
    I.click(genericPage.licensePopupPlayButton);
    I.waitForVisible(genericPage.premiumBuyButton);
    I.click(rfonlineAuthPage.monthsRadio(3));
    I.click(genericPage.premiumBuyButton);
    I.waitForVisible(rfonlineAuthPage.premiumDays(90));
    I.click(rfonlineAuthPage.prolongPremium);
    I.waitForVisible(genericPage.premiumBuyButton);
    I.click(rfonlineAuthPage.daysPremium);
    I.click(genericPage.premiumBuyButton);
    I.waitForVisible(rfonlineAuthPage.premiumDays(97));
});

Scenario("Проверяем автопродление", function*(I, rfonlineAuthPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.setBalanceForUser(user.id, 1097);
    I.amOnPage(rfonlineAuthPage.playurl);
    I.setGameMaintenanceFor(1, false);
    I.waitForVisible(genericPage.gamePanel.buyPremiumButton);
    I.click(genericPage.gamePanel.buyPremiumButton);
    I.waitForVisible(genericPage.licensePopupPlayButton);
    I.click(genericPage.licensePopupPlayButton);
    I.waitForVisible(genericPage.premiumBuyButton);
    I.click(rfonlineAuthPage.daysPremium);
    I.click(genericPage.premiumBuyButton);
    I.waitForVisible(rfonlineAuthPage.premiumDays(7));
    I.waitForVisible(rfonlineAuthPage.autoOff);
    I.click(rfonlineAuthPage.prolongPremium);
    I.waitForVisible(genericPage.premiumBuyButton);
    I.click(rfonlineAuthPage.monthsRadio(3));
    I.click(rfonlineAuthPage.autoCheckbox);
    I.click(genericPage.premiumBuyButton);
    I.waitForVisible(rfonlineAuthPage.premiumDays(97));
    I.seeElement(rfonlineAuthPage.autoOn);
    I.click(rfonlineAuthPage.prolongPremium);
    I.waitForVisible(genericPage.premiumBuyButton);
    I.seeCheckboxIsChecked(rfonlineAuthPage.autoCheckbox);
    I.click(rfonlineAuthPage.autoCheckbox);
    I.click(rfonlineAuthPage.monthsRadio(1));
    I.click(genericPage.premiumBuyButton);
    I.waitForVisible(rfonlineAuthPage.premiumDays(127));
    I.seeElement(rfonlineAuthPage.autoOff);
    I.click(rfonlineAuthPage.autoOff);
    I.waitForVisible(rfonlineAuthPage.autoOn);
    I.click(rfonlineAuthPage.prolongPremium);
    I.waitForVisible(genericPage.premiumBuyButton);
    I.seeCheckboxIsChecked(rfonlineAuthPage.autoCheckbox);
});
