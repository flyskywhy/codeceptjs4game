Feature("aion-acc-4-qa-premium. Тесты на премиум AION.");

BeforeSuite((I) => {
    I.syncDown('4game-aion', "acc-4-qa-premium");
});

Before((I, aionPlayPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

AfterSuite((I) => {
    I.createTar('4game-aion', "acc-4-qa-premium");
    I.syncUp('4game-aion', "acc-4-qa-premium");
    I.clearDir('4game-aion', "acc-4-qa-premium");
})

Scenario("Покупка премиума (недостаточно средств)", function*(I, aionPlayPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.acceptAionAgreements(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(aionPlayPage.play.url);
    I.seeInTitle(aionPlayPage.play.title);
    I.waitForVisible(genericPage.gamePanel.buyPremiumButton);
    I.click(genericPage.gamePanel.buyPremiumButton);
    I.waitForVisible(genericPage.licensePopupPlayButton);
    I.click(genericPage.licensePopupPlayButton);
    I.waitForVisible(genericPage.premiumBuyButton);
    I.click(genericPage.premiumBuyButton);
    I.waitForVisible(genericPage.terminalAchievements);
    I.waitForVisible(genericPage.priceYear);
});

Scenario("Покупка премиума на 1 месяц", function*(I, aionPlayPage, genericPage, eventsPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.setBalanceForUser(user.id, 300);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(aionPlayPage.play.url);
    I.seeInTitle(aionPlayPage.play.title);
    I.waitForVisible(genericPage.gamePanel.buyPremiumButton);
    I.click(genericPage.gamePanel.buyPremiumButton);
    I.waitForVisible(genericPage.licensePopupPlayButton);
    I.click(genericPage.licensePopupPlayButton);
    I.waitForVisible(genericPage.premiumCouponMonthly1);
    I.click(genericPage.premiumCouponMonthly1);
    I.waitForVisible(genericPage.premiumCouponCheckedMonthly1);
    I.waitForVisible(genericPage.premiumBuyButton);
    I.click(genericPage.premiumBuyButton);
    // здесь есть баг, что состояние ГП меняется не сразу
    I.waitForText(aionPlayPage.play.premiumOnText.replace("%s", "30 дней"));
    I.amOnPage(aionPlayPage.play.url);
    I.seeInTitle(aionPlayPage.play.title);
    I.amOnPage(eventsPage.url);
    I.waitForText(eventsPage.buyPremiumCouponMonthly1);
});

Scenario("Покупка премиума на 3 месяца", function*(I, aionPlayPage, genericPage, eventsPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.setBalanceForUser(user.id, 600);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(aionPlayPage.play.url);
    I.seeInTitle(aionPlayPage.play.title);
    I.waitForVisible(genericPage.gamePanel.buyPremiumButton);
    I.click(genericPage.gamePanel.buyPremiumButton);
    I.waitForVisible(genericPage.licensePopupPlayButton);
    I.click(genericPage.licensePopupPlayButton);
    I.waitForVisible(genericPage.premiumCouponMonthly3);
    I.click(genericPage.premiumCouponMonthly3);
    I.waitForVisible(genericPage.premiumCouponCheckedMonthly3);
    I.waitForVisible(genericPage.premiumBuyButton);
    I.click(genericPage.premiumBuyButton);
    // здесь есть баг, что состояние ГП меняется не сразу
    I.waitForText(aionPlayPage.play.premiumOnText.replace("%s", "90 дней"));
    I.amOnPage(aionPlayPage.play.url);
    I.seeInTitle(aionPlayPage.play.title);
    I.amOnPage(eventsPage.url);
    I.waitForText(eventsPage.buyPremiumCouponMonthly3);
});

Scenario("Покупка премиума на 12 месяцев", function*(I, aionPlayPage, genericPage, eventsPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.setBalanceForUser(user.id, 2900);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(aionPlayPage.play.url);
    I.seeInTitle(aionPlayPage.play.title);
    I.waitForVisible(genericPage.gamePanel.buyPremiumButton);
    I.click(genericPage.gamePanel.buyPremiumButton);
    I.waitForVisible(genericPage.licensePopupPlayButton);
    I.click(genericPage.licensePopupPlayButton);
    I.waitForVisible(genericPage.premiumCouponCheckedMonthly12);
    I.waitForVisible(genericPage.premiumBuyButton);
    I.click(genericPage.premiumBuyButton);
    // здесь есть баг, что состояние ГП меняется не сразу
    I.waitForText(aionPlayPage.play.premiumOnText.replace("%s", "360 дней"));
    I.amOnPage(aionPlayPage.play.url);
    I.seeInTitle(aionPlayPage.play.title);
    I.amOnPage(eventsPage.url);
    I.waitForText(eventsPage.buyPremiumCouponMonthly12);
});

Scenario("Не указана страна юзера. Кнопка Купить премиум не отображается", function*(I, aionPlayPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.setBalanceForUser(user.id, 200);
    I.setEmptyCountryForUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(aionPlayPage.play.url);
    I.seeInTitle(aionPlayPage.play.title);
    I.waitForVisible(genericPage.gamePanel.generalElement);
    I.dontSeeElementInDOM(genericPage.gamePanel.buyPremiumButton);
});

Scenario("Не указана почта юзера. Кнопка Купить премиум не отображается", function*(I, aionPlayPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.setBalanceForUser(user.id, 200);
    I.amAuthorizedUser(user.email, user.password);
    I.deleteEmail(user.id);
    I.amOnPage(aionPlayPage.play.url);
    I.seeInTitle(aionPlayPage.play.title);
    I.waitForVisible(genericPage.gamePanel.generalElement);
    I.dontSeeElementInDOM(genericPage.gamePanel.buyPremiumButton);
});

Scenario("Продление премиума", function*(I, aionPlayPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.setBalanceForUser(user.id, 600);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(aionPlayPage.play.url);
    I.seeInTitle(aionPlayPage.play.title);
    I.waitForVisible(genericPage.gamePanel.buyPremiumButton);
    I.click(genericPage.gamePanel.buyPremiumButton);
    I.waitForVisible(genericPage.licensePopupPlayButton);
    I.click(genericPage.licensePopupPlayButton);
    I.waitForVisible(genericPage.premiumCouponMonthly1);
    I.click(genericPage.premiumCouponMonthly1);
    I.waitForVisible(genericPage.premiumCouponCheckedMonthly1);
    I.waitForVisible(genericPage.premiumBuyButton);
    I.click(genericPage.premiumBuyButton);
    I.waitForVisible(genericPage.closePopupButton);
    I.click(genericPage.closePopupButton);
    // здесь есть баг, что состояние ГП меняется не сразу
    I.waitForText(aionPlayPage.play.premiumOnText.replace("%s", "30 дней"));
    I.waitForVisible(genericPage.gamePanel.buyPremiumButton);
    I.click(genericPage.gamePanel.buyPremiumButton);
    I.waitForVisible(genericPage.premiumCouponMonthly1);
    I.click(genericPage.premiumCouponMonthly1);
    I.waitForVisible(genericPage.premiumCouponCheckedMonthly1);
    I.waitForVisible(genericPage.premiumBuyButton);
    I.click(genericPage.premiumBuyButton);
    I.waitForText(aionPlayPage.play.premiumOnText.replace("%s", "30 дней"));
});

Scenario("Опция автопродления премиума", function*(I, aionPlayPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.setBalanceForUser(user.id, 600);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(aionPlayPage.play.url);
    I.seeInTitle(aionPlayPage.play.title);
    I.waitForVisible(genericPage.gamePanel.buyPremiumButton);
    I.click(genericPage.gamePanel.buyPremiumButton);
    I.waitForVisible(genericPage.licensePopupPlayButton);
    I.click(genericPage.licensePopupPlayButton);
    I.waitForVisible(genericPage.premiumCouponMonthly1);
    I.click(genericPage.premiumCouponMonthly1);
    I.waitForVisible(genericPage.premiumCouponCheckedMonthly1);
    I.waitForVisible(genericPage.premiumAutopayCheckbox);
    I.click(genericPage.premiumAutopayCheckbox);
    I.waitForVisible(genericPage.premiumAutopayChecked);
    I.waitForVisible(genericPage.premiumBuyButton);
    I.click(genericPage.premiumBuyButton);
    // здесь есть баг, что состояние ГП меняется не сразу
    I.amOnPage(aionPlayPage.play.url);
    I.seeInTitle(aionPlayPage.play.title);
    I.waitForText(aionPlayPage.play.premiumOnText.replace("%s", "30 дней"));
    I.waitForVisible(genericPage.autoImprovementTrue);
    I.click(genericPage.autoImprovementTrue);
    I.waitForVisible(genericPage.autoImprovementFalse);
    I.refreshPage();
    I.waitForVisible(genericPage.autoImprovementFalse);
});

Scenario("Состояние залогиненного пользователя без премиума", function*(I, aionPlayPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(aionPlayPage.play.url);
    I.seeInTitle(aionPlayPage.play.title);
    I.waitForVisible(genericPage.gamePanel.generalElement);
    I.waitForVisible(genericPage.gamePanel.buyPremiumButton);
    I.checkLayout('without', [{
            name: 'main',
            elem: ".bPlayLayout__eGamepanel",
            exclude: ".bGamePanelCommon__ePremiumFeatures"
        }],
        0.05,
        '4game-aion', "acc-4-qa-premium");
});

// I.setEndedPremiumForAion(user.id); - должен робрасывать статус премиуму - закончился, но не срабатывает
xScenario("Состояние залогиненного пользователя с премиумом (скоро закончится)", function*(I, aionPlayPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.setEndedPremiumForAion(user.id);
    I.amOnPage(aionPlayPage.play.url);
    I.seeInTitle(aionPlayPage.play.title);
    I.waitForVisible(genericPage.gamePanel.generalElement);
    I.checkLayout('soon-end', [{
            name: 'body',
            elem: ".bPlayLayout__eGamepanel",
            exclude: ".bGamePanelCommon__ePremiumFeatures"
        }],
        0.05,
        '4game-aion', "acc-4-qa-premium");
});

// I.setEndedPremiumForAion(user.id); - должен робрасывать статус премиуму - закончился, но не срабатывает
xScenario("Состояние залогиненного пользователя без премиума (закончился)", function*(I, aionPlayPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.setEndedPremiumForAion(user.id);
    I.amOnPage(aionPlayPage.play.url);
    I.seeInTitle(aionPlayPage.play.title);
    I.waitForVisible(genericPage.gamePanel.generalElement);
    I.checkLayout('ended', [{
            name: 'body',
            elem: ".bPlayLayout__eGamepanel",
            exclude: ".bGamePanelCommon__ePremiumFeatures"
        }],
        0.05,
        '4game-aion', "acc-4-qa-premium");
});
