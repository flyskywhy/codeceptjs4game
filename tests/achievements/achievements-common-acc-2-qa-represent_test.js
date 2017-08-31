Feature('achievements-common-acc-2-qa-represent. Тесты страницы достижений фогейма.');

var data = require('./data/achievements');

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

Scenario('Проверка отображения ачивок (все нескрытые ачивки отображаются)', function*(I, achievementsPage, genericPage) {
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateLockedAchievements(data);
    I.clearCookie();
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateLockedAchievements(data);
});

Scenario('Проверка отображения ачивок (все скрытые ачивки не отображаются)', function*(I, achievementsPage, genericPage) {
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateHiddenAchevements(data);
    I.clearCookie();
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateHiddenAchevements(data);
});

Scenario('Проверка отображения ачивок (отображение подсказки при наведении на ачивку)', function*(I, achievementsPage, genericPage) {
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementsHover(data);
    I.clearCookie();
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementsHover(data);
});

Scenario('Проверка отображения ачивок (проверка попапа при клике на ачивку)', function*(I, achievementsPage, genericPage) {
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementsPopup(data);
    I.clearCookie();
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementsPopup(data);
});

Scenario('Проверка отображения прогресса по ачивкам (дуги)', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementRingsCount("pc-master-race", 3);
    achievementsPage.validateAchievementFilledRingsCount("pc-master-race", 0);
    I.insertAchievement(user.id, "pc-master-race", false, 0, 1, 3);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementFilledRingsCount("pc-master-race", 1);
    I.insertAchievement(user.id, "pc-master-race", false, 0, 2, 3);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementFilledRingsCount("pc-master-race", 2);
    I.insertAchievement(user.id, "pc-master-race", true, 1, 0, 3);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementFilledRingsCount("pc-master-race", 3);
});

Scenario('Проверка отображения нескрытой анлокнутой ачивки', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementLocked("durov");
    I.insertAchievement(user.id, "durov", true, 1);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementUnlocked("durov");
});

Scenario('Проверка отображения анлокнутой ачивки (ачивка анлокнута несколько раз)', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.insertAchievement(user.id, "plus-500", true, 2);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementLevel("plus-500", "2");
});

Scenario('Проверка отображения анлокнутой скрытой ачивки', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementIsNotVisible("loyal-friend");
    I.insertAchievement(user.id, "loyal-friend", true, 1, 2);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementUnlocked("loyal-friend");
});

Scenario('Проверка отображения прогресса и анлока псевдоскрытой ачивки', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementIsNotVisible("loyal-friend");
    I.insertAchievement(user.id, "loyal-friend", false, 0, 1, 2);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementVisible("loyal-friend");
    achievementsPage.validateAchievementRingsCount("loyal-friend", 2);
    achievementsPage.validateAchievementFilledRingsCount("loyal-friend", 1);
    I.insertAchievement(user.id, "loyal-friend", true, 1, 2);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementUnlocked("loyal-friend");
});

Scenario('Проверка отображения анлокнутой законсервированной ачивки', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementIsNotVisible("dp-rip");
    I.insertAchievement(user.id, "dp-rip", true, 1);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementUnlocked("dp-rip");
});

Scenario('Проверка анлока ачивки Знание-сила!', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    var achievement = data.groups['forgame']['knowledge-is-power'];
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(achievementsPage.url);
    I.waitForVisible(achievementsPage.about_link, achievementsPage.timeout);
    I.waitForText(achievementsPage.about_link, achievementsPage.timeout, achievementsPage.about_link);
    I.click(achievementsPage.about_link);
    I.seeCurrentUrlEquals('/achievements/what-it-is/');
    I.scrollToBotton();
    achievementsPage.validateAchievementUnlockedBuble(achievement);
    achievementsPage.clickOnBuble(achievement.id);
    I.seeInCurrentUrl('/achievements/#' + achievement.id);
    achievementsPage.validateAchievementUnlocked(achievement.id);
});

Scenario('Проверка прогресс-бара в ховере ачивки', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    var referenceAchievement = data.groups['pointblank']['pb-first-blood'];
    var achievement = data.groups['pointblank']['pb-first-blood-2'];
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.insertAchievement(user.id, referenceAchievement.id, false, 0, 1, referenceAchievement.maxProgress);
    I.insertAchievement(user.id, achievement.id, false, 0, 1, achievement.maxProgress, null, achievement.step1_context);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateProgressBarInHoverVisible(achievement.id);
    I.insertAchievement(user.id, referenceAchievement.id, false, 0, 20, 200);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateProgressBarInHoverStarted(achievement.id);
    I.insertAchievement(user.id, referenceAchievement.id, true, 1, 0, referenceAchievement.maxProgress);
    I.insertAchievement(user.id, achievement.id, true, 1, 0, 2, null, achievement.unlock_context);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateProgressBarInHoverCompleted(achievement.id);
});

Scenario('Проверка отображения количества анлокнутых ачивок в группе', function*(I, achievementsPage, genericPage) {
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateVisibilityOfAchievementsGroups();
    achievementsPage.validateUnlockedCountInGroup(achievementsPage.groups.forgame, 0);
    var user = yield I.createUser();
    var achievement = data.groups['forgame']['durov'];
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.insertAchievement(user.id, achievement.id, true, 1, 0, achievement.maxProgress);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateUnlockedCountInGroup(achievementsPage.groups.forgame, 1);
});

Scenario('Только что взятая многоразовая ачивка отображается анлокнутой', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    var achievement = data.groups['pointblank']['pb-best-of-the-best'];
    I.insertAchievement(user.id, achievement.id, true, 1, 0, achievement.maxProgress);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementUnlocked(achievement.id);
});

Scenario('Многоразовая ачивка в процессе повторного получения отображается анлокнутой', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    var achievement = data.groups['pointblank']['pb-best-of-the-best'];
    I.insertAchievement(user.id, achievement.id, false, 1, 3, achievement.maxProgress);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementUnlocked(achievement.id);
    achievementsPage.validateAchievementFilledRingsCount(achievement.id, 3);
});

Scenario('Не взятая многоразовая ачивка в процессе выполнения отображается локнутой', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    var achievement = data.groups['pointblank']['pb-best-of-the-best'];
    I.insertAchievement(user.id, achievement.id, false, 0, 3, achievement.maxProgress);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementLocked(achievement.id);
    achievementsPage.validateAchievementFilledRingsCount(achievement.id, 3);
});

Scenario('Условия с прогрессом у уже взятых многоразовых ачивок отображаются корректно', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    var achievement = data.groups['pointblank']['pb-best-of-the-best'];
    I.insertAchievement(user.id, achievement.id, false, 1, 3, achievement.maxProgress);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateProgressBarInHoverStarted(achievement.id);
});
