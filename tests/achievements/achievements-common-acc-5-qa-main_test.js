Feature('achievements-common-acc-5-qa-main. Тесты страницы достижений фогейма.');

var data = require('./data/achievements');

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

Scenario('Проверка, что когда в револте есть непрочитаная нотификация, ачивка прыгает и подсвечивается', function*(I, achievementsPage) {
    var achievement = data.groups['forgame']['pc-master-race'];
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.insertAchievement(user.id, achievement.id, true, 1, 0, achievement.maxProgress);
    achievementsPage.insertUnlockNotification(user.id, achievement.id, 1, 0, achievement.maxProgress);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementBounced(achievement.id);
    achievementsPage.validateAchievementYellowLight(achievement.id);
    achievementsPage.moveCursorToAchievement(achievement.id);
    I.waitForVisible(achievementsPage.about_link_locator);
    I.moveCursorTo(achievementsPage.about_link_locator);
    achievementsPage.validateAchievementNotBounced(achievement.id);
    achievementsPage.validateAchievementNoYellowLight(achievement.id);
});
