Feature("credit-common-acc-1-qa-main. Тесты кредита");

Before((I) => {
    I.closeTabsExceptForOne();
    I.clearCookie();
});

Scenario("Юзер видит включенный кредит", function*(I, creditPage) {
    var user = yield I.createUser();
    I.turnOnCredit(user.id, 10000);
    I.amOnPageForAuthUser(user, "/licence/credit/");
    I.waitForVisible(creditPage.mainForm);
    I.waitForVisible(creditPage.labelCreditOn);
    I.waitForVisible(creditPage.buttonCreditStatusOn);
    I.waitForText("Текущий размер кредита: 10000 руб.", creditPage.timeout, creditPage.labelCreditOn);
    I.waitForText("Вкл", creditPage.timeout, creditPage.buttonCreditTurnOff);
});

Scenario("Юзер может переключать состояния кредита, в юзербаре обновляется мнгновенно", function*(I, creditPage, userbar) {
    var user = yield I.createUser();
    I.turnOnCredit(user.id, 10000);
    I.amOnPageForAuthUser(user, "/licence/credit/");
    I.waitForVisible(creditPage.mainForm);
    I.waitForVisible(creditPage.labelCreditOn);
    I.waitForVisible(creditPage.buttonCreditStatusOn);
    I.click(creditPage.buttonCreditTurnOff);
    I.waitForVisible(creditPage.labelCreditOff);
    I.waitForVisible(creditPage.buttonCreditStatusOff);
    I.waitForText("Выкл", creditPage.timeout, creditPage.buttonCreditTurnOn);
    I.waitForText("Текущий размер кредита: 10000 руб.", creditPage.timeout, creditPage.labelCreditOff);
    I.hideAchievementsNotifications();
    I.waitAndClick(userbar.balanceDataArrow);
    I.waitForVisible(userbar.ballancePopup.labelCreditOff);
    I.click(creditPage.buttonCreditTurnOn);
    I.waitForVisible(creditPage.labelCreditOn);
    I.waitForVisible(creditPage.buttonCreditStatusOn);
    I.waitForText("Текущий размер кредита: 10000 руб.", creditPage.timeout, creditPage.labelCreditOn);
    I.waitForText("Вкл", creditPage.timeout, creditPage.buttonCreditTurnOff);
    I.waitAndClick(userbar.balanceDataArrow);
    I.waitForVisible(userbar.ballancePopup.labelCreditOn);
});
