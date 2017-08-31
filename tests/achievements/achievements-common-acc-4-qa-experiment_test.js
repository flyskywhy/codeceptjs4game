Feature('achievements-common-acc-4-qa-experiment. Тесты Эксперимента с донатными достижениями');

var data = require('./data/donate');

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

Scenario('Проверяем, что для незалогиненного юзера донатная ачивка отображается как для группы А', function*(I, achievementsPage, genericPage) {
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementVisible(data.forgame.experimental_donate_a.id);
    achievementsPage.validateAchievementHoverContent(data.forgame.experimental_donate_a.id, data.forgame.experimental_donate_a.title, data.forgame.experimental_donate_a.conditions, data.forgame.experimental_donate_a.prize)
    achievementsPage.validateAchievementPopupContent(data.forgame.experimental_donate_a.id, data.forgame.experimental_donate_a.title, data.forgame.experimental_donate_a.conditions, data.forgame.experimental_donate_a.prize)
});

Scenario('Проверяем, что для залогиненного юзера без ачивки в кассандре донатная ачивка отображается как для группы А', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementVisible(data.forgame.experimental_donate_a.id);
    achievementsPage.validateAchievementHoverContent(data.forgame.experimental_donate_a.id, data.forgame.experimental_donate_a.title, data.forgame.experimental_donate_a.conditions, data.forgame.experimental_donate_a.prize)
    achievementsPage.validateAchievementPopupContent(data.forgame.experimental_donate_a.id, data.forgame.experimental_donate_a.title, data.forgame.experimental_donate_a.conditions, data.forgame.experimental_donate_a.prize)
});

Scenario('Проверяем, что для всех групп отображается корректные данные по ачивке в ховере и попапе', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    achievementsPage.validateAchivementsExperimentalDonate(data, user);
});

Scenario('Проверяем, что для всех групп отображается корректные данные по ачивке в ховере и попапе если ачивка анлокнута', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    achievementsPage.validateUnlockedAchivementsExperimentalDonate(data, user);
});

Scenario('Проверяем, что для всех групп отображается корректные данные про плюшку при пополнении счета', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    achievementsPage.validatePaymentTerminalExperimentalDonate(data, user);
});

Scenario('Проверяем, что для всех групп отображается корректные данные при анлоке ачивки в нотификациях', function*(I, achievementsPage, genericPage, userbar) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    achievementsPage.validateBoobleExperimentalDonate(data, userbar);
});
