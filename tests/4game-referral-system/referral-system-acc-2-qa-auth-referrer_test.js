Feature('referral-system-acc-2-qa-auth-referrer. Тесты состояний и функционала для залогиненного реферерра (того, кто приглашает на 4game)');
var data = require('./data/referral');
var testGame = data[data.common.testingGame];

BeforeSuite((I) => {
    I.syncDown('4game-referral-system', 'acc-2-qa-auth-referrer');
});

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

AfterSuite((I) => {
    I.createTar('4game-referral-system', 'acc-2-qa-auth-referrer');
    I.syncUp('4game-referral-system', 'acc-2-qa-auth-referrer');
    I.clearDir('4game-referral-system', 'acc-2-qa-auth-referrer');
})

Scenario('Залогиненный заходит на summon. Видим страницу для приглашения дефолтной игры', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/summon/');
    I.waitForVisible(referralPage.referrer_old.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referrer_old.headers.text_defaultGame, referralPage.timeout, referralPage.referrer_old.headers.selector);
    I.seeInTitle(data[data.common.commonGame].title);
    I.checkPageDescription(data[data.common.commonGame].description);
    I.seeCurrentUrlEquals('/summon/' + data.common.commonGame + '/' + user.id + '/');
    I.hideAchievementsNotifications();
    I.checkLayout(data.common.commonGame + '_referrer_auth_old_summon', [{
        name: 'body',
        exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB, referralPage.exclude.referrerLink]
    }], 0.1, '4game-referral-system', 'acc-2-qa-auth-referrer');
});

Scenario('Залогиненный заходит на страницу реф системы игры. Видим страницу для приглашения выбранной игры', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/summon/' + testGame.gameId);
    I.waitForVisible(referralPage.referrer_old.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referrer_old.headers.text, referralPage.timeout, referralPage.referrer_old.headers.selector);
    I.seeInTitle(testGame.title);
    I.checkPageDescription(testGame.description);
    I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/' + user.id + '/');
    I.waitForText(referralPage.referrer_old.step1.text, referralPage.timeout, referralPage.referrer_old.step1.selector)
    I.waitForText(testGame.snippets.referrer_old_step2_title, referralPage.timeout, referralPage.referrer_old.step2.selector)
    I.hideAchievementsNotifications();
    I.checkLayout(testGame.gameId + '_referrer_auth_old_fromGame', [{
        name: 'body',
        exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB, referralPage.exclude.referrerLink]
    }], 0.1, '4game-referral-system', 'acc-2-qa-auth-referrer');
});

Scenario('Залогиненный заходит на страницу реф системы под своим userId. Видим страницу для приглашения выбранной игры', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/summon/' + testGame.gameId + '/' + user.id);
    I.waitForVisible(referralPage.referrer_old.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referrer_old.headers.text, referralPage.timeout, referralPage.referrer_old.headers.selector);
    I.seeInTitle(testGame.title);
    I.checkPageDescription(testGame.description);
    I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/' + user.id + '/');
    I.hideAchievementsNotifications();
    I.checkLayout(testGame.gameId + '_referrer_auth_old_fromGameAndId', [{
        name: 'body',
        exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB, referralPage.exclude.referrerLink]
    }], 0.1, '4game-referral-system', 'acc-2-qa-auth-referrer');
});

Scenario('Залогиненный копирует ссылку с помощью кнопки и вставляет ее в браузер. Ссылка должна оказаться в буфере обмена', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.clearCookie();
    I.amOnPage('/summon/' + testGame.gameId + '/' + user.id);
    I.waitForVisible(referralPage.referral_unauth_new.button, referralPage.timeout);
    //Очищаем буфер обмена
    I.click(referralPage.referral_unauth_new.button);
    I.waitForVisible(genericPage.authPopup, referralPage.timeout);
    I.waitForVisible(genericPage.authFormLogin, referralPage.timeout);
    I.fillField(genericPage.authFormLogin, 'BadTextToClipBoard');
    I.seeInField(genericPage.authFormLogin, 'BadTextToClipBoard');
    I.pressKey(['Control', 'a']);
    I.pressKey(['Control', 'c']);
    I.clearField(genericPage.authFormLogin);
    I.dontSeeInField(genericPage.authFormLogin, 'BadTextToClipBoard');
    I.pressKey(['Control', 'v']);
    I.seeInField(genericPage.authFormLogin, 'BadTextToClipBoard');
    //идем за ссылкой
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/summon/' + testGame.gameId + '/' + user.id);
    I.waitForVisible(referralPage.share.button, referralPage.timeout);
    I.waitForText('Скопировать ссылку', referralPage.timeout, referralPage.share.button);
    I.clickClipboardButton(referralPage.share.button, referralPage.timeout, 'Ссылка скопирована');
    //проверяем что в буфере обмена правильная ссылка
    I.clearCookie('inn-user');
    I.amOnPage('/summon/' + testGame.gameId + '/' + user.id);
    I.waitForVisible(referralPage.referral_unauth_new.button, referralPage.timeout);
    I.click(referralPage.referral_unauth_new.button);
    I.waitForVisible(genericPage.authPopup, referralPage.timeout);
    I.waitForVisible(genericPage.authFormLogin, referralPage.timeout);
    I.pressKey(['Control', 'v']);
    I.seeInField(genericPage.authFormLogin, 'ru.4game.com/summon/' + testGame.gameId + '/' + user.id + '/');
});

Scenario('Залогиненный шарит информацию о рефералке в VK. В окне шаринга должен быть правильный url', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/summon/' + testGame.gameId + '/' + user.id);
    I.waitForVisible(referralPage.share.vk, referralPage.timeout);
    I.click(referralPage.share.vk);
    I.waitTabsLoading(2, referralPage.timeout);
    I.changeTab(2);
    referralPage.checkSharingUrlVk(testGame.sharing.title, testGame.sharing.description, testGame.sharing.image, user.id, testGame.gameId, referralPage.timeout);
});

Scenario('Залогиненный шарит информацию о рефералке в FB. В окне шаринга должен быть правильный url', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/summon/' + testGame.gameId + '/' + user.id);
    I.waitForVisible(referralPage.share.fb, referralPage.timeout);
    I.click(referralPage.share.fb);
    I.waitTabsLoading(2, referralPage.timeout);
    I.changeTab(2);
    referralPage.checkSharingUrlFb(testGame.sharing.title, testGame.sharing.description, testGame.sharing.image, user.id, testGame.gameId, referralPage.timeout);
});

Scenario('Залогиненный шарит информацию о рефералке в OK. В окне шаринга должен быть правильный url', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/summon/' + testGame.gameId + '/' + user.id);
    I.waitForVisible(referralPage.share.ok, referralPage.timeout);
    I.click(referralPage.share.ok);
    I.waitTabsLoading(2, referralPage.timeout);
    I.changeTab(2);
    referralPage.checkSharingUrlOk(testGame.gameId, user.id, referralPage.timeout);
});

Scenario('Залогиненный копирует ссылку с помощью клика по ссылке и вставляет ее в браузер. Ссылка должна оказаться в буфере обмена', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.clearCookie();
    I.amOnPage('/summon/' + testGame.gameId + '/' + user.id);
    I.waitForVisible(referralPage.referral_unauth_new.button, referralPage.timeout);
    //Очищаем буфер обмена
    I.click(referralPage.referral_unauth_new.button);
    I.waitForVisible(genericPage.authPopup, referralPage.timeout);
    I.waitForVisible(genericPage.authFormLogin, referralPage.timeout);
    I.fillField(genericPage.authFormLogin, 'BadTextToClipBoard');
    I.seeInField(genericPage.authFormLogin, 'BadTextToClipBoard');
    I.pressKey(['Control', 'a']);
    I.pressKey(['Control', 'c']);
    I.clearField(genericPage.authFormLogin);
    I.dontSeeInField(genericPage.authFormLogin, 'BadTextToClipBoard');
    I.pressKey(['Control', 'v']);
    I.seeInField(genericPage.authFormLogin, 'BadTextToClipBoard');
    //идем за ссылкой
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/summon/' + testGame.gameId + '/' + user.id);
    I.waitForVisible(referralPage.share.line, referralPage.timeout);
    I.click(referralPage.share.line);
    I.pressKey(['Control', 'c']);
    //проверяем что в буфере обмена правильная ссылка
    I.clearCookie('inn-user');
    I.amOnPage('/summon/' + testGame.gameId + '/' + user.id);
    I.waitForVisible(referralPage.referral_unauth_new.button, referralPage.timeout);
    I.click(referralPage.referral_unauth_new.button);
    I.waitForVisible(genericPage.authPopup, referralPage.timeout);
    I.waitForVisible(genericPage.authFormLogin, referralPage.timeout);
    I.pressKey(['Control', 'v']);
    I.seeInField(genericPage.authFormLogin, 'ru.4game.com/summon/' + testGame.gameId + '/' + user.id + '/');
});

Scenario('Залогиненный переключается между вкладками. Контент вкладок должен изменяться корректно', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/summon/' + testGame.gameId + '/' + user.id);
    I.waitForVisible(referralPage.referrer_old.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referrer_old.headers.text, referralPage.timeout, referralPage.referrer_old.headers.selector);
    I.waitForText(referralPage.referrer_old.step1.text, referralPage.timeout, referralPage.referrer_old.step1.selector)
    I.waitForText(testGame.snippets.referrer_old_step2_title, referralPage.timeout, referralPage.referrer_old.step2.selector)
    I.seeElement(referralPage.referrer_new.tab);
    I.dontSeeElement(referralPage.referrer_old.tab);
    I.click(referralPage.referrer_new.tab);
    I.seeElement(referralPage.referrer_old.tab);
    I.dontSeeElement(referralPage.referrer_new.tab);
    I.waitForText(referralPage.referrer_new.headers.text, referralPage.timeout, referralPage.referrer_new.headers.selector);
    I.waitForText(referralPage.referrer_new.step1.text, referralPage.timeout, referralPage.referrer_new.step1.selector)
    I.waitForText(testGame.snippets.referrer_new_step2_title, referralPage.timeout, referralPage.referrer_new.step2.selector)
    I.hideAchievementsNotifications();
    I.checkLayout(testGame.gameId + '_referrer_auth_new', [{
        name: 'body',
        exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB, referralPage.exclude.referrerLink]
    }], 0.1, '4game-referral-system', 'acc-2-qa-auth-referrer');
    I.click(referralPage.referrer_old.tab);
    I.seeElement(referralPage.referrer_new.tab);
    I.dontSeeElement(referralPage.referrer_old.tab);
});

Scenario('Залогиненный кликает тултип. Тултип с правильным текстом появляется и закрывается', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/summon/' + testGame.gameId + '/' + user.id);
    I.waitForVisible(referralPage.referrer_old.tooltip.open, referralPage.timeout);
    //кликаем на тултип в состоянии старичка
    I.click(referralPage.referrer_old.tooltip.open);
    I.waitForText(referralPage.referrer_old.tooltip.text, referralPage.timeout, referralPage.referrer_old.tooltip.tooltip);
    I.hideAchievementsNotifications();
    I.checkLayout(testGame.gameId + '_referrer_auth_old_tooltip', [{
        name: 'referral_auth_new_tooltip',
        elem: referralPage.webdriverCSS.referrer_tabs_old
    }], 0.1, '4game-referral-system', 'acc-2-qa-auth-referrer');
    //закрываем тултип с помощью клика вне области тултипа
    I.click(referralPage.referrer_old.tooltip.tooltipOut);
    I.dontSeeElement(referralPage.referrer_old.tooltip.tooltip);
    //Переключаемся на состояние новичка
    I.click(referralPage.referrer_new.tab);
    //кликаем на тултип в состоянии новичка
    I.click(referralPage.referrer_new.tooltip.open);
    I.waitForText(referralPage.referrer_new.tooltip.text, referralPage.timeout, referralPage.referrer_new.tooltip.tooltip);
    I.hideAchievementsNotifications();
    I.checkLayout(testGame.gameId + '_referrer_auth_new_tooltip', [{
        name: 'referral_auth_old_tooltip',
        elem: referralPage.webdriverCSS.referrer_tabs_new
    }], 0.1, '4game-referral-system', 'acc-2-qa-auth-referrer');
    //закрываем тултип с помощью клика вне области тултипа
    I.click(referralPage.referrer_new.tooltip.tooltipOut);
    I.dontSeeElement(referralPage.referrer_new.tooltip.tooltip);
    //снова открываем тултип
    I.click(referralPage.referrer_new.tooltip.open);
    I.waitForText(referralPage.referrer_new.tooltip.text, referralPage.timeout, referralPage.referrer_new.tooltip.tooltip);
    //закрываем тултип с помощью открытия другого таба
    I.click(referralPage.referrer_old.tab);
    I.dontSeeElement(referralPage.referrer_new.tooltip.tooltip);
});

Scenario('Залогиненный переходит на страницу игры. Видим правильную страницу игры', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/summon/' + testGame.gameId + '/' + user.id);
    I.waitForVisible(referralPage.referrer_old.gameLink, referralPage.timeout);
    //кликаем на ссылку игры в состоянии старичка
    I.click(referralPage.referrer_old.gameLink);
    I.waitTabsLoading(2, referralPage.timeout);
    I.changeTab(2);
    I.waitInUrl('.com/' + testGame.gameId, referralPage.timeout)
    I.seeInTitle(testGame.gameTitle);
    I.closeTab();
    //Переключаемся на состояние новичка
    I.click(referralPage.referrer_new.tab);
    //кликаем на ссылку игры в состоянии новичка
    I.click(referralPage.referrer_new.gameLink);
    I.waitTabsLoading(2, referralPage.timeout);
    I.changeTab(2);
    I.waitInUrl('.com/' + testGame.gameId, referralPage.timeout)
    I.seeInTitle(testGame.gameTitle);
});

Scenario('Залогиненный кликает на FAQ. Видим правильный FAQ', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/summon/' + testGame.gameId + '/' + user.id);
    I.waitForVisible(referralPage.faq.link, referralPage.timeout);
    //кликаем на ссылку faq
    I.click(referralPage.faq.link);
    I.waitTabsLoading(2, referralPage.timeout);
    I.changeTab(2);
    I.waitForVisible('.titleBar', referralPage.timeout);
    I.waitForText(testGame.faqText, referralPage.timeout, '.titleBar');
    I.seeCurrentUrlEquals(testGame.faq);
});
