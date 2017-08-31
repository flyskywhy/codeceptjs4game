Feature('achievements-common-acc-3-qa-bubble-popups. Тесты страницы достижений фогейма.');

var data = require('./data/achievements');

BeforeSuite((I) => {
    I.syncDown('achievements', 'acc-3-qa-bubble-popups');
});

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

AfterSuite((I) => {
    I.createTar('achievements', 'acc-3-qa-bubble-popups');
    I.syncUp('achievements', 'acc-3-qa-bubble-popups');
    I.clearDir('achievements', 'acc-3-qa-bubble-popups');
})

Scenario('Проверка отображения баблов при анлоке ачивки', function*(I, achievementsPage, genericPage) {
    I.amOnPage('/');
    achievementsPage.validateAchievemensUnlockedBubles(data);
});

Scenario('Проверка отображения текстовых наград', function*(I, achievementsPage, genericPage) {
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementsPrize(data);
});

Scenario('Проверка отображения денежных наград', function*(I, achievementsPage, genericPage) {
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementsMoneyPrize(data);
});

Scenario('Проверка поведения в случае, если призов больше, чем умещается в ховер (проверка количества в попапе)', function*(I, achievementsPage, genericPage) {
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateAchievementsMorePrizesInHover(data);
});

Scenario('Проверка верстки попапа (нескрытая ачивка с нулевым прогрессом)', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/');
    var achievement = data.groups['forgame']['evangelist'];
    achievementsPage.openPopup(achievement.id);
    I.checkLayout(achievement.id + '_locked-achievement-popup', [{
        name: 'body',
        elem: '//div[@data-popup-name="achievement-popup"]',
        exclude: []
    }], 0.1, 'achievements', "acc-3-qa-bubble-popups");
});

Scenario('Проверка верстки попапа (нескрытая ачивка с ненулевым прогрессом)', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/');
    var achievement = data.groups['forgame']['evangelist'];
    I.insertAchievement(user.id, achievement.id, false, 0, 10, 50);
    achievementsPage.openPopup(achievement.id);
    I.checkLayout(achievement.id + '_in-progress-achievement-popup', [{
        name: 'body',
        elem: '//div[@data-popup-name="achievement-popup"]',
        exclude: []
    }], 0.1, 'achievements', "acc-3-qa-bubble-popups");
});

Scenario('Проверка верстки попапа (нескрытая ачивка анлокнута)', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/');
    var achievement = data.groups['forgame']['evangelist'];
    I.insertAchievement(user.id, achievement.id, true, 1, 0, 50);
    achievementsPage.openPopup(achievement.id);
    I.checkLayout(achievement.id + '_unlocked-achievement-popup', [{
        name: 'body',
        elem: '//div[@data-popup-name="achievement-popup"]',
        exclude: []
    }], 0.1, 'achievements', "acc-3-qa-bubble-popups");
});

Scenario('Проверка верстки попапа (скрытая ачивка с нулевым прогрессом)', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/');
    var achievement = data.groups['forgame']['witness'];
    achievementsPage.openPopup(achievement.id);
    I.checkLayout(achievement.id + '_hidden-locked-achievement-popup', [{
        name: 'body',
        elem: '//div[@data-popup-name="achievement-popup"]',
        exclude: []
    }], 0.1, 'achievements', "acc-3-qa-bubble-popups");
});

Scenario('Проверка верстки попапа (скрытая ачивка анлокнута)', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/');
    var achievement = data.groups['forgame']['witness'];
    I.insertAchievement(user.id, achievement.id, true, 1, 0, 50);
    achievementsPage.openPopup(achievement.id);
    I.checkLayout(achievement.id + '_hidden-unlocked-achievement-popup', [{
        name: 'body',
        elem: '//div[@data-popup-name="achievement-popup"]',
        exclude: []
    }], 0.1, 'achievements', "acc-3-qa-bubble-popups");
});
