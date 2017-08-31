Feature('achievements-common-acc-1-qa-about-achievements. Тесты страницы достижений фогейма.');

var data = require('./data/achievements');

BeforeSuite((I) => {
    I.syncDown('achievements', 'acc-1-qa-about-achievements');
});

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

AfterSuite((I) => {
    I.createTar('achievements', 'acc-1-qa-about-achievements');
    I.syncUp('achievements', 'acc-1-qa-about-achievements');
    I.clearDir('achievements', 'acc-1-qa-about-achievements');
})

Scenario('Проверка страницы ачивок (неавторизованый пользователь)', function*(I, achievementsPage, genericPage) {
    I.amOnPage(achievementsPage.url);
    I.waitForVisible(achievementsPage.auth_link, achievementsPage.timeout);
    achievementsPage.validateImmutableContent();
    achievementsPage.validateVisibilityOfAchievementsGroups();
    achievementsPage.validateLockedAchievements(data);
    I.checkLayout('achievements_unauth', [{
        name: 'body',
        exclude: [achievementsPage.footer_vk, achievementsPage.footer_fb]
    }], 0.1, 'achievements', "acc-1-qa-about-achievements");
});

Scenario('Проверка страницы ачивок (авторизованый пользователь)', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(achievementsPage.url);
    achievementsPage.validateImmutableContent();
    achievementsPage.validateVisibilityOfAchievementsGroups();
    I.checkLayout('achievements_auth', [{
        name: 'body',
        exclude: [achievementsPage.userbar, achievementsPage.footer_vk, achievementsPage.footer_fb]
    }], 0.1, 'achievements', "acc-1-qa-about-achievements");
});

Scenario('Проверка перехода на страницу О достижениях (неавторизованый)', function*(I, achievementsPage, genericPage) {
    I.amOnPage(achievementsPage.url);
    I.waitForVisible(achievementsPage.about_link, achievementsPage.timeout);
    I.waitForText(achievementsPage.about_link, achievementsPage.timeout, achievementsPage.about_link);
    I.click(achievementsPage.about_link);
    I.seeCurrentUrlEquals(achievementsPage.what_it_is.url);
});

Scenario('Проверка перехода на страницу достижений со страницы О достижениях (неавторизованый)', function*(I, achievementsPage, genericPage) {
    I.amOnPage(achievementsPage.what_it_is.url);
    I.waitForVisible(achievementsPage.what_it_is.locators.button_to_achievements, achievementsPage.timeout);
    I.click(achievementsPage.what_it_is.locators.button_to_achievements);
    I.seeCurrentUrlEquals(achievementsPage.url);
});

Scenario('Проверка верстки страницы О достижениях (неавторизованый юзер)', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.amOnPage(achievementsPage.what_it_is.url);
    I.waitForVisible(achievementsPage.userbar, achievementsPage.timeout);
    I.checkLayout('achievements_what-it-is_unauth', [{
        name: 'body',
        exclude: [achievementsPage.footer_vk, achievementsPage.footer_fb]
    }], 0.1, 'achievements', "acc-1-qa-about-achievements");
});

Scenario('Проверка верстки страницы О достижениях (авторизованый, ачивка не получена)', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(achievementsPage.what_it_is.url);
    I.waitForVisible(achievementsPage.userbar, achievementsPage.timeout);
    I.checkLayout('achievements_what-it-is_auth_locked', [{
        name: 'body',
        exclude: [achievementsPage.userbar, achievementsPage.footer_vk, achievementsPage.footer_fb]
    }], 0.1, 'achievements', "acc-1-qa-about-achievements");
});

Scenario('Проверка верстки страницы О достижениях (авторизованый, ачивка получена)', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.insertAchievement(user.id, 'knowledge-is-power', true, 1, 0, 1);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage(achievementsPage.what_it_is.url);
    I.waitForVisible(achievementsPage.userbar, achievementsPage.timeout);
    I.checkLayout('achievements_what-it-is_auth_unlocked', [{
        name: 'body',
        exclude: [achievementsPage.userbar, achievementsPage.footer_vk, achievementsPage.footer_fb]
    }], 0.1, 'achievements', "acc-1-qa-about-achievements");
});

Scenario('Проверка авторизации со страницы ачивок', function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amOnPage(achievementsPage.url);
    I.waitForVisible(achievementsPage.auth_link, achievementsPage.timeout);
    I.click(achievementsPage.auth_link);
    I.waitForVisible(genericPage.authFormLogin, achievementsPage.timeout);
    I.fillField(genericPage.authFormLogin, user.email);
    I.fillField(genericPage.authFormPassword, user.password);
    I.click(genericPage.authFormLoginButton);
    I.waitForVisible(genericPage.barUserName, achievementsPage.timeout);
    I.seeInCurrentUrl(achievementsPage.url);
});
