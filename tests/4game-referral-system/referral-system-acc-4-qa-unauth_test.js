Feature('referral-system-acc-4-qa-unauth. Тесты состояний и функционала для незалогиненного пользователя');
var data = require('./data/referral');
var testGame = data[data.common.testingGame];

BeforeSuite((I) => {
    I.syncDown('4game-referral-system', 'acc-4-qa-unauth');
});

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

AfterSuite((I) => {
    I.createTar('4game-referral-system', 'acc-4-qa-unauth');
    I.syncUp('4game-referral-system', 'acc-4-qa-unauth');
    I.clearDir('4game-referral-system', 'acc-4-qa-unauth');
})

Scenario('Незалогиненный заходит на summon. Видим предложение залогиниться', (I, referralPage, genericPage) => {
    I.amOnPage('/summon/');
    I.waitForVisible(referralPage.referrer_unauth.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referrer_unauth.headers.text, referralPage.timeout, referralPage.referrer_unauth.headers.selector);
    I.seeCurrentUrlEquals('/summon/');
    I.seeInTitle(data.common.title);
    I.checkPageDescription(data.common.description);
    I.hideAchievementsNotifications();
    I.checkLayout('referrer_unauth', [{
        name: 'body',
        elem: referralPage.webdriverCSS.referrer_unauth,
        exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB]
    }], 0.1, '4game-referral-system', 'acc-4-qa-unauth');
});

Scenario('Незалогиненный заходит на страницу реф системы и хочет почитать юрдок. Видим правильный Юр док', (I, referralPage, genericPage) => {
    I.amOnPage('/summon/');
    I.waitForVisible(referralPage.footer.main, referralPage.timeout);
    I.click(referralPage.footer.main);
    I.waitForVisible(referralPage.footer.refRules, referralPage.timeout);
    I.click(referralPage.footer.refRules);
    I.waitTabsLoading(2, referralPage.timeout);
    I.changeTab(2);
    I.waitForText('Правила Программы «Приведи или верни друга»', referralPage.timeout, '//h1');
    I.seeCurrentUrlEquals('/docs/legal/referral-rules/');
});

Scenario('Незалогиненный пытается зайти на summon game и логинится. После логина юзер видит страницу для приглашающего для своей игры', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amOnPage('/summon/' + testGame.gameId + '/');
    I.waitForVisible(referralPage.referrer_unauth.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referrer_unauth.headers.text, referralPage.timeout, referralPage.referrer_unauth.headers.selector);
    I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/');
    I.seeInTitle(testGame.title);
    I.checkPageDescription(testGame.description);
    I.hideAchievementsNotifications();
    I.checkLayout('referrer_unauth_fromGame', [{
        name: 'body',
        elem: referralPage.webdriverCSS.referrer_unauth,
        exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB]
    }], 0.1, '4game-referral-system', 'acc-4-qa-unauth');
    I.waitForVisible(referralPage.referrer_unauth.button, referralPage.timeout);
    I.click(referralPage.referrer_unauth.button);
    I.waitForVisible(genericPage.authPopup, referralPage.timeout);
    I.waitForVisible(genericPage.authFormLogin, referralPage.timeout);
    I.fillField(genericPage.authFormLogin, user.email);
    I.fillField(genericPage.authFormPassword, user.password);
    I.click(genericPage.authFormLoginButton);
    I.waitForVisible(referralPage.referrer_old.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referrer_old.headers.text, referralPage.timeout, referralPage.referrer_old.headers.selector);
    I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/' + user.id + '/');
});

Scenario('Незалогиненный логинится на summon. После логина пользователь видит страницу для приглашающего для дефолтной игры', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amOnPage('/summon/');
    I.waitForVisible(referralPage.referrer_unauth.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referrer_unauth.headers.text, referralPage.timeout, referralPage.referrer_unauth.headers.selector);
    I.waitForVisible(referralPage.referrer_unauth.button, referralPage.timeout);
    I.click(referralPage.referrer_unauth.button);
    I.waitForVisible(genericPage.authPopup, referralPage.timeout);
    I.waitForVisible(genericPage.authFormLogin, referralPage.timeout);
    I.fillField(genericPage.authFormLogin, user.email);
    I.fillField(genericPage.authFormPassword, user.password);
    I.click(genericPage.authFormLoginButton);
    I.waitForVisible(referralPage.referrer_old.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referrer_old.headers.text_defaultGame, referralPage.timeout, referralPage.referrer_old.headers.selector);
    I.seeCurrentUrlEquals('/summon/' + data.common.commonGame + '/' + user.id + '/');
});

Scenario('Незалогиненный пытается зайти на страницу реф системы игры другого игрока. Видим состояние новичка', (I, referralPage, genericPage) => {
    I.amOnPage('/summon/' + testGame.gameId + '/123123/');
    I.waitForVisible(referralPage.referral_unauth_new.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_unauth_new.headers.text, referralPage.timeout, referralPage.referral_unauth_new.headers.selector);
    I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/123123/');
    I.seeInTitle(testGame.title);
    I.checkPageDescription(testGame.description);
    I.waitForVisible(referralPage.referral_unauth_old.tab, referralPage.timeout);
    I.dontSeeElement(referralPage.referral_unauth_new.tab);
    I.hideAchievementsNotifications();
    I.checkLayout(testGame.gameId + '_referral_unauth_new', [{
        name: 'body',
        exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB]
    }], 0.1, '4game-referral-system', 'acc-4-qa-unauth');
});

Scenario('Незалогиненный переключает вкладки. Контент вкладок должен изменяться корректно', (I, referralPage, genericPage) => {
    I.amOnPage('/summon/' + testGame.gameId + '/123123/');
    I.waitForVisible(referralPage.referral_unauth_new.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_unauth_new.headers.text, referralPage.timeout, referralPage.referral_unauth_new.headers.selector);
    I.waitForText(referralPage.referral_unauth_new.step1.text, referralPage.timeout, referralPage.referral_unauth_new.step1.selector)
    I.waitForText(testGame.snippets.referral_new_step2_title, referralPage.timeout, referralPage.referral_unauth_new.step2.selector)
    I.seeElement(referralPage.referral_unauth_old.tab);
    I.dontSeeElement(referralPage.referral_unauth_new.tab);
    I.click(referralPage.referral_unauth_old.tab);
    I.seeElement(referralPage.referral_unauth_new.tab);
    I.dontSeeElement(referralPage.referral_unauth_old.tab);
    I.waitForText(referralPage.referral_unauth_old.headers.text, referralPage.timeout, referralPage.referral_unauth_old.headers.selector);
    I.waitForText(referralPage.referral_unauth_old.step1.text, referralPage.timeout, referralPage.referral_unauth_old.step1.selector)
    I.waitForText(testGame.snippets.referral_old_step2_title, referralPage.timeout, referralPage.referral_unauth_old.step2.selector)
    I.hideAchievementsNotifications();
    I.checkLayout(testGame.gameId + '_referral_unauth_old', [{
        name: 'body',
        exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB]
    }], 0.1, '4game-referral-system', 'acc-4-qa-unauth');
    I.click(referralPage.referral_unauth_new.tab);
    I.seeElement(referralPage.referral_unauth_old.tab);
    I.dontSeeElement(referralPage.referral_unauth_new.tab);
});

Scenario('Незалогиненный кликает на тултип. Тултип с правильным текстом появляется и закрывается', (I, referralPage, genericPage) => {
    I.amOnPage('/summon/' + testGame.gameId + '/123123/');
    I.waitForVisible(referralPage.referral_unauth_new.tooltip.open, referralPage.timeout);
    //кликаем на тултип в состоянии новичка
    I.click(referralPage.referral_unauth_new.tooltip.open);
    I.waitForText(referralPage.referral_unauth_new.tooltip.text, referralPage.timeout, referralPage.referral_unauth_new.tooltip.tooltip);
    I.hideAchievementsNotifications();
    I.checkLayout(testGame.gameId + '_referral_unauth_new_tooltip', [{
        name: 'referral_unauth_new_tooltip',
        elem: referralPage.webdriverCSS.referral_tabs_new
    }], 0.1, '4game-referral-system', 'acc-4-qa-unauth');
    //закрываем тултип с помощью клика вне области тултипа
    I.click(referralPage.referral_unauth_new.tooltip.tooltipOut);
    I.dontSeeElement(referralPage.referral_unauth_new.tooltip.tooltip);
    //Переключаемся на состояние возвращенца
    I.click(referralPage.referral_unauth_old.tab);
    //кликаем на тултип в состоянии возвращенца
    I.click(referralPage.referral_unauth_old.tooltip.open);
    I.waitForText(referralPage.referral_unauth_old.tooltip.text, referralPage.timeout, referralPage.referral_unauth_old.tooltip.tooltip);
    I.hideAchievementsNotifications();
    I.checkLayout(testGame.gameId + '_referral_unauth_old_tooltip', [{
        name: 'referral_unauth_old_tooltip',
        elem: referralPage.webdriverCSS.referral_tabs_old
    }], 0.1, '4game-referral-system', 'acc-4-qa-unauth');
    //закрываем тултип с помощью клика вне области тултипа
    I.click(referralPage.referral_unauth_old.tooltip.tooltipOut);
    I.dontSeeElement(referralPage.referral_unauth_old.tooltip.tooltip);
    //снова открываем тултип
    I.click(referralPage.referral_unauth_old.tooltip.open);
    I.waitForText(referralPage.referral_unauth_old.tooltip.text, referralPage.timeout, referralPage.referral_unauth_old.tooltip.tooltip);
    //закрываем тултип с помощью открытия другого таба
    I.click(referralPage.referral_unauth_new.tab);
    I.dontSeeElement(referralPage.referral_unauth_old.tooltip.tooltip);
});

Scenario('Незалогиненный переходит на страницу игры. Видим правильную страницу игры', (I, referralPage, genericPage) => {
    I.amOnPage('/summon/' + testGame.gameId + '/123123/');
    I.waitForVisible(referralPage.referral_unauth_new.gameLink, referralPage.timeout);
    //кликаем на ссылку игры в состоянии новичка
    I.click(referralPage.referral_unauth_new.gameLink);
    I.waitTabsLoading(2, referralPage.timeout);
    I.changeTab(2);
    I.waitInUrl('.com/' + testGame.gameId, referralPage.timeout)
    I.seeInTitle(testGame.gameTitle);
    I.closeTab();
    //Переключаемся на состояние возвращенца
    I.click(referralPage.referral_unauth_old.tab);
    //кликаем на ссылку игры в состоянии возвращенца
    I.click(referralPage.referral_unauth_old.gameLink);
    I.waitTabsLoading(2, 10);
    I.changeTab(2);
    I.waitInUrl('.com/' + testGame.gameId, referralPage.timeout)
    I.seeInTitle(testGame.gameTitle);
});

Scenario('Незалогиненный переключает награды. Заголовок и содержимое наград корректно меняется', (I, referralPage, genericPage) => {
    I.amOnPage('/summon/' + testGame.gameId + '/123123/');
    I.waitForVisible(referralPage.referral_unauth_new.step3.titleSelf, referralPage.timeout);
    I.waitForText('Получи награду', referralPage.timeout, referralPage.referral_unauth_new.step3.titleSelf);
    I.waitForText('Что получит друг?', referralPage.timeout, referralPage.referral_unauth_new.step3.linkSelf)
        //переключаем на награды друга
    I.click(referralPage.referral_unauth_new.step3.linkSelf)
    I.waitForVisible(referralPage.referral_unauth_new.step3.titleFriend, referralPage.timeout);
    I.waitForText('Награда другу', referralPage.timeout, referralPage.referral_unauth_new.step3.titleFriend);
    I.waitForText('Что получу я?', referralPage.timeout, referralPage.referral_unauth_new.step3.linkFriend)
    I.hideAchievementsNotifications();
    I.checkLayout('referrer_unauth_friend_reward', [{
        name: 'body',
        elem: referralPage.webdriverCSS.referrer_unauth,
        exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB]
    }], 0.1, '4game-referral-system', 'acc-4-qa-unauth');
    //переключаем обратно на свои награды
    I.click(referralPage.referral_unauth_new.step3.linkFriend)
    I.waitForText('Получи награду', referralPage.timeout, referralPage.referral_unauth_new.step3.titleSelf);
    //открываем попап ачивки
    I.click(referralPage.referral_unauth_new.step3.achieveSelf);
    I.waitForVisible(referralPage.referral_unauth_new.step3.achieveSelfPopup, referralPage.timeout);
    I.waitForText(testGame.achievementNewbieReferralStep3, referralPage.timeout, referralPage.referral_unauth_new.step3.achieveSelfPopup);
    I.seeInCurrentUrl('/summon/' + testGame.gameId + '/123123/?popupWidget=AchievementPopupWidget&name=' + testGame.snippets.referral_new_step3_id);
});

Scenario('Незалогиненный кликает на ссылку ачивки. Видим попап ачивки', (I, referralPage, genericPage) => {
    I.amOnPage('/summon/' + testGame.gameId + '/123123/');
    I.waitForVisible(referralPage.referral_unauth_new.achievement.link, referralPage.timeout);
    //кликаем на ссылку ачивки в состоянии новичка
    I.click(referralPage.referral_unauth_new.achievement.link);
    I.waitForVisible(referralPage.referral_unauth_new.achievement.popup, referralPage.timeout);
    I.waitForText(testGame.achievementNewbieTitle, referralPage.timeout, referralPage.referral_unauth_new.achievement.popup);
    I.seeInCurrentUrl('/summon/' + testGame.gameId + '/123123/?popupWidget=AchievementPopupWidget&name=' + testGame.snippets.referral_new_step2_id);
});

Scenario('Незалогиненный кликает на BnS в информации о фогейме. Видим страницу BnS', (I, referralPage, genericPage) => {
    I.amOnPage('/summon/' + testGame.gameId + '/123123/');
    I.waitForVisible(referralPage.about4game.bns, referralPage.timeout);
    //кликаем на ссылку игры в состоянии новичка
    I.click(referralPage.about4game.bns);
    I.waitInUrl('.com/bns', referralPage.timeout)
    I.seeInTitle(data.bns.gameTitle);
});

Scenario('Незалогиненный кликает на ссылку FAQ. Видим правильный FAQ', (I, referralPage, genericPage) => {
    I.amOnPage('/summon/' + testGame.gameId + '/123123/');
    I.waitForVisible(referralPage.faq.link, referralPage.timeout);
    //кликаем на ссылку faq
    I.click(referralPage.faq.link);
    I.waitTabsLoading(2, referralPage.timeout);
    I.changeTab(2);
    I.waitForVisible('.titleBar', referralPage.timeout);
    I.waitForText(testGame.faqText, referralPage.timeout, '.titleBar');
    I.seeCurrentUrlEquals(testGame.faq);
});

Scenario('Незалогиненный заходит на страницу реферальной системы игры другого игрока и входит в 4game. После логина пользователь должен увидеть страницу приглашения', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amOnPage('/summon/' + testGame.gameId + '/123123/');
    I.waitForVisible(referralPage.referral_unauth_new.button, referralPage.timeout);
    I.click(referralPage.referral_unauth_new.button);
    I.waitForVisible(genericPage.authPopup, referralPage.timeout);
    I.waitForVisible(genericPage.authFormLogin, referralPage.timeout);
    I.fillField(genericPage.authFormLogin, user.email);
    I.click(genericPage.authPopupClose);
    I.waitToHide(genericPage.jsOverlayContainer, referralPage.timeout);
    //Переключаемся на состояние возвращенца
    I.click(referralPage.referral_unauth_old.tab);
    I.click(referralPage.referral_unauth_old.button);
    I.waitForVisible(genericPage.authPopup, referralPage.timeout);
    I.waitForVisible(genericPage.authFormLogin, referralPage.timeout);
    I.fillField(genericPage.authFormLogin, user.email);
    I.fillField(genericPage.authFormPassword, user.password);
    I.click(genericPage.authFormLoginButton);
    I.waitForVisible(referralPage.referral_auth_new.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_auth_new.headers.text, referralPage.timeout, referralPage.referral_auth_new.headers.selector);
    I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/123123/');
    I.dontSeeElement(referralPage.referral_unauth_new.tab);
    I.dontSeeElement(referralPage.referral_unauth_old.tab);
});

Scenario('Незалогиненный регистрируется на странице рефералки. После регистрации он должен увидеть страницу приглашения', function*(I, referralPage, genericPage, authPopup, registrationConfirmPage) {
    I.amOnPage('/summon/' + testGame.gameId + '/123123/');
    I.waitForVisible(referralPage.referral_unauth_new.button, referralPage.timeout);
    I.click(referralPage.referral_unauth_new.button);
    I.waitForVisible(genericPage.authPopup, referralPage.timeout);
    var email = yield I.getEmail();
    authPopup.signUp(email);
    I.waitForText(authPopup.regText);
    var regLink = yield I.silentlyGetRegistrationLink(email);
    I.amOnPage(regLink);
    registrationConfirmPage.signUpWithOpenEye('123456');
    I.waitForVisible(genericPage.userBar);
    I.waitForVisible(genericPage.barUserName);
    var login = yield I.grabTextFrom(genericPage.barUserName);
    I.textShouldBeSameAs(login, email);
    I.waitInUrl('/summon/' + testGame.gameId + '/123123/', referralPage.timeout);
});

xScenario('Незалогиненный пользователь заходит на страницу реферальной системы игры другого игрока и восстанавливает пароль к 4game. После окончания регистрации пользователь должен увидеть страницу приглашения', function*(I, referralPage, genericPage) {});
