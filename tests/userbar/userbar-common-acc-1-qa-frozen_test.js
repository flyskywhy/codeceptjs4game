Feature("userbar-common-acc-1-qa-frozen. Тесты юзербара (замороженные бонусы).");

Before((I) => {
    I.closeTabsExceptForOne();
    I.clearCookie();
});

Scenario('Проверка, что у нового юзера нет замороженных бонусов', function*(I, userbar) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/');
    I.waitForVisible(userbar.barBalance);
    I.waitForText('0', userbar.timeout, userbar.barBalance);
    I.dontSeeElement(userbar.barFrozenBalance.css);
});

Scenario('Проверка, что замороженные бонусы отображаются в юзербаре', function*(I, userbar) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.addFrozenBonuses(user, 100);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/');
    I.waitForVisible(userbar.barFrozenBalance.css);
    I.waitForText('100', userbar.timeout, userbar.barFrozenBalance.css);
});

Scenario('Проверка, что при клике на замороженные бонусы отображается корректный текст', function*(I, userbar) {
    var user = yield I.createUser();
    var summToUnlock = 50;
    var bonusesAdded = 100;
    I.acceptAgreementsForNewUser(user.id);
    I.addFrozenBonuses(user, bonusesAdded);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/');
    I.waitForVisible(userbar.barFrozenBalance.css);
    I.waitForText(bonusesAdded, userbar.timeout, userbar.barFrozenBalance.css);
    I.click(userbar.barFrozenBalance.css);
    I.waitForVisible(userbar.barFrozenBonusesReplenishText.locator);
    I.waitForVisible(userbar.barFrozenBonusesReplenishText.locatorCanUse);
    var unlock = yield I.grabTextFrom(userbar.barFrozenBonusesReplenishText.locator);
    I.textShouldBeSameAs(unlock, userbar.barFrozenBonusesReplenishText.text.replace(new RegExp("%s", 'g'), summToUnlock));
    var use = yield I.grabTextFrom(userbar.barFrozenBonusesReplenishText.locatorCanUse);
    I.textShouldBeSameAs(use, userbar.barFrozenBonusesReplenishText.textCanUse.replace(new RegExp("%s", 'g'), bonusesAdded));
});

Scenario('После платежа меньше 50 рублей отображается корректный текст в попапе', function*(I, userbar) {
    var user = yield I.createUser();
    var summToUnlock = 50;
    var summPayment = 25;
    var bonusesAdded = 100;
    I.acceptAgreementsForNewUser(user.id);
    I.addFrozenBonuses(user, bonusesAdded);
    I.addPayment(user.id, summPayment, 243, 'RUB');
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/');
    I.waitForText(bonusesAdded, userbar.timeout, userbar.barFrozenBalance.css);
    I.waitAndClick(userbar.barFrozenBalance.css);
    I.waitForVisible(userbar.barFrozenBonusesReplenishText.locator);
    I.waitForVisible(userbar.barFrozenBonusesReplenishText.locatorCanUse);
    var unlock = yield I.grabTextFrom(userbar.barFrozenBonusesReplenishText.locator);
    I.textShouldBeSameAs(unlock, userbar.barFrozenBonusesReplenishText.text.replace(new RegExp("%s", 'g'), summToUnlock - summPayment));
    var use = yield I.grabTextFrom(userbar.barFrozenBonusesReplenishText.locatorCanUse);
    I.textShouldBeSameAs(use, userbar.barFrozenBonusesReplenishText.textCanUse.replace(new RegExp("%s", 'g'), bonusesAdded));
});

Scenario('Проверка, что после разморозки бонусы зачисляются на счет', function*(I, userbar) {
    var user = yield I.createUser();
    var summToUnlock = 50;
    var summPayment = 25;
    var bonusesAdded = 100;
    I.acceptAgreementsForNewUser(user.id);
    I.addFrozenBonuses(user, bonusesAdded);
    I.addPayment(user.id, summPayment, 243, 'RUB');
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/');
    I.waitForVisible(userbar.barFrozenBalance.css);
    I.waitForText(bonusesAdded, userbar.timeout, userbar.barFrozenBalance.css);
    I.click(userbar.barFrozenBalance.css);
    I.waitForVisible(userbar.barFrozenBonusesReplenishText.locator);
    I.waitForVisible(userbar.barFrozenBonusesReplenishText.locatorCanUse);
    var unlock = yield I.grabTextFrom(userbar.barFrozenBonusesReplenishText.locator);
    I.textShouldBeSameAs(unlock, userbar.barFrozenBonusesReplenishText.text.replace(new RegExp("%s", 'g'), summToUnlock - summPayment));
    var use = yield I.grabTextFrom(userbar.barFrozenBonusesReplenishText.locatorCanUse);
    I.textShouldBeSameAs(use, userbar.barFrozenBonusesReplenishText.textCanUse.replace(new RegExp("%s", 'g'), bonusesAdded));
    I.addPayment(user.id, summPayment, 243, 'RUB');
    I.amOnPage('/');
    I.waitForVisible(userbar.barBalance);
    var balance = yield I.grabTextFrom(userbar.barBalance);
    I.textShouldBeSameAs(balance, bonusesAdded + summPayment + summPayment);
    I.dontSeeElement(userbar.barFrozenBalance.css);
});
