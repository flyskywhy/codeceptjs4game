Feature("userbar-common-acc-2-qa-credit. Тесты кредита в юзербаре");

Before((I) => {
    I.closeTabsExceptForOne();
    I.clearCookie();
});

Scenario("Юзер без кредита не видит лейбл в юзербаре", function*(I, userbar) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, "/");
    I.hideAchievementsNotifications();
    I.waitAndClick(userbar.balanceDataArrow);
    I.waitForVisible(userbar.ballancePopup.replenish);
    I.dontSeeElement(userbar.ballancePopup.labelCreditOn);
    I.dontSeeElement(userbar.ballancePopup.labelCreditOff);
});

Scenario("Юзер с кредитом видит правильный лейбл в юзербаре", function*(I, userbar) {
    var user = yield I.createUser();
    I.turnOnCredit(user.id, 10000);
    I.amOnPageForAuthUser(user, "/");
    I.hideAchievementsNotifications();
    I.waitAndClick(userbar.balanceDataArrow);
    I.waitForVisible(userbar.ballancePopup.labelCreditOn);
});

Scenario("Юзер с выкл кредитом видит правильный лейбл в юзербаре", function*(I, userbar, creditPage) {
    var user = yield I.createUser();
    I.turnOnCredit(user.id, 10000);
    //TODO: после доработки метода убрать заход на страницу кредита и переключение статуса
    I.amOnPageForAuthUser(user, "/licence/credit/");
    I.waitForVisible(creditPage.buttonCreditStatusOn);
    I.click(creditPage.buttonCreditTurnOff);
    I.waitForVisible(creditPage.labelCreditOff);
    I.waitForVisible(creditPage.buttonCreditStatusOff);
    I.amOnPage('/');
    I.hideAchievementsNotifications();
    I.waitAndClick(userbar.balanceDataArrow);
    I.waitForVisible(userbar.ballancePopup.labelCreditOff);
});
