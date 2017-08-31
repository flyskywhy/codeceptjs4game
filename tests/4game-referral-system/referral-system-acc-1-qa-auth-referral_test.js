Feature('referral-system-acc-1-qa-auth-referral. Тесты состояний и функционала для залогиненного реферрала (того, кого приглашают на 4game)');
var data = require('./data/referral');
var testGame = data[data.common.testingGame];

BeforeSuite((I) => {
    I.syncDown('4game-referral-system', 'acc-1-qa-auth-referral');
});

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

AfterSuite((I) => {
    I.createTar('4game-referral-system', 'acc-1-qa-auth-referral');
    I.syncUp('4game-referral-system', 'acc-1-qa-auth-referral');
    I.clearDir('4game-referral-system', 'acc-1-qa-auth-referral');
})

Scenario('Новичок заходит на страницу реф системы. Нет реферера и игры. Видим состояние новичка и кнопку установить. 1 Пункт в прогрессе', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/summon/' + testGame.gameId + '/123123/');
    //Проверяем заголовок
    I.waitForVisible(referralPage.referral_auth_new.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_auth_new.headers.text, referralPage.timeout, referralPage.referral_auth_new.headers.selector);
    //I.setStatusForGame('pointblank', not_installed)
    //Проверяем URL
    I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/123123/');
    I.seeInTitle(testGame.title);
    I.checkPageDescription(testGame.description);
    //Проверяем, что табов переключения нет
    I.dontSeeElement(referralPage.referral_unauth_new.tab);
    I.dontSeeElement(referralPage.referral_unauth_old.tab);
    //Проверяем, что в 1 шаге правильное описание
    I.waitForText(referralPage.referral_auth_new.step1.text, referralPage.timeout, referralPage.referral_auth_new.step1.selector)
        //Проверяем, что во 2 шаге правильная ачивка
    I.waitForText(testGame.snippets.referral_new_step2_title, referralPage.timeout, referralPage.referral_auth_new.step2.selector)
        //Ждем когда прогрузиться кнопка
    I.waitForVisible(referralPage.referral_auth_new.button, referralPage.timeout)
        //TODO: раскоментить, когда сделают переключение статусов игры на страницах рефералки
        //I.waitForText('Установить игру', referralPage.timeout, referralPage.referral_auth_new.button)
        //referralPage.seeStepInProgress(referralPage.referral_auth_new.step1.checkboxSelector);
        //I.hideAchievementsNotifications();
        //I.checkLayout(testGame.gameId + '_referal_auth_new_install', [ {name: 'body', exclude: [ referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB ]} ], 0.1, '4game-referral-system', "acc-1-qa-auth-referral");
        //Кликаем на кнопку и оказываемся на странице /install
    I.click(referralPage.referral_auth_new.button);
    I.waitTabsLoading(2, referralPage.timeout);
    I.changeTab(2);
    I.waitInUrl('.com/' + testGame.gameId, referralPage.timeout) //когда добавим сеттеры состояния игры, добавить сюда + '/install/'
    I.seeInTitle(testGame.gameTitle);
});

xScenario('Новичок заходит на страницу реф системы. Нет реферера есть игра. Видим состояние новичка и кнопку играть. 1 пункт выполнен', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/summon/' + testGame.gameId + '/123123/');
    //Проверяем заголовок
    I.waitForVisible(referralPage.referral_auth_new.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_auth_new.headers.text, referralPage.timeout, referralPage.referral_auth_new.headers.selector);
    //I.setStatusForGame('pointblank', installed)
    //Проверяем урл
    I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/123123/');
    //Ждем когда загрузиться кнопка играть
    I.waitForText('Играть', referralPage.timeout, referralPage.referral_auth_new.button)
        //Проверяем, что первый пункт выполнен
    referralPage.seeStepCompleted(referralPage.referral_auth_new.step1.checkboxSelector);
    //Проверяем лэйаут страницы
    //I.hideAchievementsNotifications();
    I.checkLayout(testGame.gameId + '_referal_auth_new_play', [{
        name: 'body',
        exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB]
    }], 0.1, '4game-referral-system', 'acc-1-qa-auth-referral');
    //Кликаем на кнопку и оказываемся на /play
    I.click(referralPage.referral_auth_new.button);
    I.waitTabsLoading(2, referralPage.timeout);
    I.changeTab(2);
    I.waitInUrl('.com/' + testGame.gameId, referralPage.timeout) //потом добавить сюда /play/
    I.seeInTitle(testGame.gameTitle);
});

xScenario('Новичок заходит на страницу реф системы. Нет реферера игра не обновлена. Видим состояние новичка и кнопку играть. 1 пункт выполнен', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.amOnPage('/summon/' + testGame.gameId + '/123123/');
    //Проверяем заголовок
    I.waitForVisible(referralPage.referral_auth_new.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_auth_new.headers.text, referralPage.timeout, referralPage.referral_auth_new.headers.selector);
    //I.setStatusForGame('pointblank', update_required)
    //Проверяем url
    I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/123123/');
    //Проверяем, что на кнопке Играть
    I.waitForText('Играть', referralPage.timeout, referralPage.referral_auth_new.button)
        //Проверяем, что 1 пункт выполнен
    referralPage.seeStepCompleted(referralPage.referral_auth_new.step1.checkboxSelector);
    //Кликаем на кнопку и переходим на /play
    I.click(referralPage.referral_auth_new.button);
    I.waitTabsLoading(2, referralPage.timeout);
    I.changeTab(2);
    I.waitInUrl('.com/' + testGame.gameId, referralPage.timeout) //потом добавить сюда /play/
    I.seeInTitle(testGame.gameTitle);
});

Scenario('Новичок заходит на страницу реф системы, на страницу чужого реферрера. Видим редирект на страницу своего реферрера', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.insertRevault(user.id, testGame.revault_key, 2, null, {
        "activity": {
            "status": "newbie"
        },
        "referrer": {
            "referred-by": "123"
        }
    })
    I.amOnPage('/summon/' + testGame.gameId + '/123123/');
    I.waitForVisible(referralPage.referral_auth_new.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_auth_new.headers.text, referralPage.timeout, referralPage.referral_auth_new.headers.selector);
    I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/123/');
    //I.hideAchievementsNotifications();
    //I.checkLayout(testGame.gameId + '_referal_auth_new_other_referrer', [ {name: 'body', exclude: [ referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB ]} ], 0.1, '4game-referral-system', "acc-1-qa-auth-referral");
});

Scenario('Новичок заходит на страницу реф системы и переходит на страницу игры.  Видим правильную страницу игры', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.insertRevault(user.id, testGame.revault_key, 2, null, {
        "activity": {
            "status": "newbie"
        },
        "referrer": {
            "referred-by": "123"
        }
    })
    I.amOnPage('/summon/' + testGame.gameId + '/123/');
    I.waitForVisible(referralPage.referral_auth_new.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_auth_new.headers.text, referralPage.timeout, referralPage.referral_auth_new.headers.selector);
    //кликаем на ссылку игры в состоянии новичка
    I.click(referralPage.referral_auth_new.gameLink);
    I.waitTabsLoading(2, referralPage.timeout);
    I.changeTab(2);
    I.waitInUrl('.com/' + testGame.gameId, referralPage.timeout)
    I.seeInTitle(testGame.gameTitle);
});

Scenario('Новичок заходит на страницу реф системы и переходит в FAQ. Видим правильный FAQ', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.insertRevault(user.id, testGame.revault_key, 2, null, {
        "activity": {
            "status": "newbie"
        },
        "referrer": {
            "referred-by": "123"
        }
    })
    I.amOnPage('/summon/' + testGame.gameId + '/123/');
    I.waitForVisible(referralPage.referral_auth_new.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_auth_new.headers.text, referralPage.timeout, referralPage.referral_auth_new.headers.selector);
    //кликаем на ссылку faq
    I.click(referralPage.faq.link);
    I.waitTabsLoading(2, referralPage.timeout);
    I.changeTab(2);
    I.waitForVisible('.titleBar', referralPage.timeout);
    I.waitForText(testGame.faqText, referralPage.timeout, '.titleBar');
    I.seeCurrentUrlEquals(testGame.faq);
});

Scenario('Новичок заходит на страницу реф системы. Ачивка из 2 пункта в прогрессе. 2 пункт должен быть в состоянии прогресса', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.insertRevault(user.id, testGame.revault_key, 2, null, {
        "activity": {
            "status": "newbie"
        },
        "referrer": {
            "referred-by": "123"
        }
    })
    I.insertAchievement(user.id, testGame.snippets.referral_new_step2_id, false, 0, 1, 2);
    I.insertAchievement(user.id, testGame.snippets.referral_new_step3_id, false, 0, 1, 2);
    I.amOnPage('/summon/' + testGame.gameId + '/123/');
    I.waitForVisible(referralPage.referral_auth_new.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_auth_new.headers.text, referralPage.timeout, referralPage.referral_auth_new.headers.selector);
    referralPage.seeStepInProgress(referralPage.referral_auth_new.step2.checkboxSelector);
});

Scenario('Новичок заходит на страницу реф системы и у него выполнена реф ачивка. Видим состояние completed', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.insertRevault(user.id, testGame.revault_key, 2, null, {
        "activity": {
            "status": "newbie"
        },
        "referrer": {
            "referred-by": "123"
        }
    })
    I.insertAchievement(user.id, testGame.snippets.referral_new_step3_id, true, 1);
    I.amOnPage('/summon/' + testGame.gameId + '/123/');
    I.waitForVisible(referralPage.referral_completed.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_completed.headers.text, referralPage.timeout, referralPage.referral_completed.headers.selector);
    I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/123/');
    I.waitForVisible(referralPage.referral_completed.detailed.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_completed.detailed.text, referralPage.timeout, referralPage.referral_completed.detailed.selector);
    I.waitForVisible(referralPage.referral_completed.button.locator, referralPage.timeout);
    I.waitForText(referralPage.referral_completed.button.text, referralPage.timeout, referralPage.referral_completed.button.locator);
    referralPage.hideAchievementsNotifications();
    I.checkLayout(testGame.gameId + '_referral_completed', [{
        name: 'body',
        exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB]
    }], 0.1, '4game-referral-system', 'acc-1-qa-auth-referral');
    I.click(referralPage.referral_completed.button.locator);
    I.waitForVisible(referralPage.referrer_old.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referrer_old.headers.text, referralPage.timeout, referralPage.referrer_old.headers.selector);
    I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/' + user.id + '/');
});

Scenario('Новичок заходит на страницу игры реф системы и у него выполнена реф ачивка. Видим состояние приглашения', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.insertRevault(user.id, testGame.revault_key, 2, null, {
        "activity": {
            "status": "newbie"
        },
        "referrer": {
            "referred-by": "123"
        }
    })
    I.insertAchievement(user.id, testGame.snippets.referral_new_step3_id, true, 1);
    I.amOnPage('/summon/' + testGame.gameId);
    I.waitForVisible(referralPage.referrer_old.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referrer_old.headers.text_defaultGame, referralPage.timeout, referralPage.referrer_old.headers.selector);
    I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/' + user.id + '/');
});

Scenario('Cтаричок заходит на страницу реф системы. Нет реферера игра не обновлена. Видим состояние старичка и кнопку играть. 1 пункт выполнен', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.insertRevault(user.id, testGame.revault_key, 2, null, {
        "activity": {
            "status": "lost"
        }
    })
    I.amOnPage('/summon/' + testGame.gameId + '/123/');
    I.waitForVisible(referralPage.referral_auth_old.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_auth_old.headers.text, referralPage.timeout, referralPage.referral_auth_old.headers.selector);
    //I.setStatusForGame('pointblank', not_installed)
    I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/123/');
    I.seeInTitle(testGame.title);
    I.checkPageDescription(testGame.description);
    I.dontSeeElement(referralPage.referral_unauth_new.tab);
    I.dontSeeElement(referralPage.referral_unauth_old.tab);
    I.waitForText(referralPage.referral_auth_old.step1.text, referralPage.timeout, referralPage.referral_auth_old.step1.selector)
    I.waitForText(testGame.snippets.referral_old_step2_title, referralPage.timeout, referralPage.referral_auth_old.step2.selector)
    I.waitForVisible(referralPage.referral_auth_old.button, referralPage.timeout)
        //TODO: раскоментить, когда сделают переключения статусов игр на страницах рефералки
        //I.waitForText('Играть', referralPage.timeout, referralPage.referral_auth_old.button)
        //referralPage.seeStepCompleted(referralPage.referral_auth_old.step1.checkboxSelector);
        //I.hideAchievementsNotifications();
        //I.checkLayout(testGame.gameId + '_referal_auth_old_play', [ {name: 'body', exclude: [ referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB ]} ], 0.1, '4game-referral-system', "acc-1-qa-auth-referral");
    I.click(referralPage.referral_auth_old.button);
    I.waitTabsLoading(2, referralPage.timeout);
    I.changeTab(2);
    I.waitInUrl('.com/' + testGame.gameId, referralPage.timeout) //TODO: а сюда добавить + '/play/'
    I.seeInTitle(testGame.gameTitle);
});

Scenario('Старичок заходит на страницу реф системы, на страницу чужого реферрера. Видим редирект на страницу своего реферрера', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.insertRevault(user.id, testGame.revault_key, 2, null, {
        "activity": {
            "status": "lost"
        },
        "referrer": {
            "referred-by": "123"
        }
    })
    I.amOnPage('/summon/' + testGame.gameId + '/123123/');
    I.waitForVisible(referralPage.referral_auth_old.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_auth_old.headers.text, referralPage.timeout, referralPage.referral_auth_old.headers.selector);
    I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/123/');
});

Scenario('Старичок заходит на страницу реф системы и переходит на страницу игры. Видим правильную страницу игры', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    I.insertRevault(user.id, testGame.revault_key, 2, null, {
        "activity": {
            "status": "lost"
        },
        "referrer": {
            "referred-by": "123"
        }
    })
    I.amOnPage('/summon/' + testGame.gameId + '/123/');
    I.waitForVisible(referralPage.referral_auth_old.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_auth_old.headers.text, referralPage.timeout, referralPage.referral_auth_old.headers.selector);
    //кликаем на ссылку игры в состоянии новичка
    I.click(referralPage.referral_auth_old.gameLink);
    I.waitTabsLoading(2, referralPage.timeout);
    I.changeTab(2);
    I.waitInUrl('.com/' + testGame.gameId, referralPage.timeout)
    I.seeInTitle(testGame.gameTitle);
});

Scenario('Старичок заходит на страницу реф системы и переходит в FAQ. Видим правильный FAQ', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.insertRevault(user.id, testGame.revault_key, 2, null, {
        "activity": {
            "status": "lost"
        },
        "referrer": {
            "referred-by": "123"
        }
    })
    I.amOnPage('/summon/' + testGame.gameId + '/123/');
    I.waitForVisible(referralPage.referral_auth_old.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_auth_old.headers.text, referralPage.timeout, referralPage.referral_auth_old.headers.selector);
    //кликаем на ссылку faq
    I.click(referralPage.faq.link);
    I.waitTabsLoading(2, referralPage.timeout);
    I.changeTab(2);
    I.waitForVisible('.titleBar', referralPage.timeout);
    I.waitInUrl(testGame.faq, referralPage.timeout);
    I.waitForText(testGame.faqText, referralPage.timeout, '.titleBar');
});

Scenario('Старичок заходит на страницу реф системы. Ачивка из 2 пункта в прогрессе. 2 пункт должен быть в состоянии прогресса', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.insertRevault(user.id, testGame.revault_key, 2, null, {
        "activity": {
            "status": "lost"
        },
        "referrer": {
            "referred-by": "123"
        }
    })
    I.insertAchievement(user.id, testGame.snippets.referral_old_step2_id, false, 0, 1, 2);
    I.insertAchievement(user.id, testGame.snippets.referral_old_step3_id, false, 0, 1, 2);
    I.amOnPage('/summon/' + testGame.gameId + '/123/');
    I.waitForVisible(referralPage.referral_auth_old.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_auth_old.headers.text, referralPage.timeout, referralPage.referral_auth_old.headers.selector);
    referralPage.seeStepInProgress(referralPage.referral_auth_old.step2.checkboxSelector);
});

Scenario('Старичок заходит на страницу реф системы и у него выполнена реф ачивка. Видим состояние completed', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.insertRevault(user.id, testGame.revault_key, 2, null, {
        "activity": {
            "status": "lost"
        },
        "referrer": {
            "referred-by": "123"
        }
    })
    I.insertAchievement(user.id, testGame.snippets.referral_old_step3_id, true, 1);
    I.amOnPage('/summon/' + testGame.gameId + '/123/');
    I.waitInUrl('/summon/' + testGame.gameId + '/123/', referralPage.timeout);
    I.waitForVisible(referralPage.referral_completed.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_completed.headers.text, referralPage.timeout, referralPage.referral_completed.headers.selector);
    I.waitForVisible(referralPage.referral_completed.detailed.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_completed.detailed.text, referralPage.timeout, referralPage.referral_completed.detailed.selector);
    I.waitForVisible(referralPage.referral_completed.button.locator, referralPage.timeout);
    I.waitForText(referralPage.referral_completed.button.text, referralPage.timeout, referralPage.referral_completed.button.locator);
    I.click(referralPage.referral_completed.button.locator);
    I.waitForVisible(referralPage.referrer_old.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referrer_old.headers.text, referralPage.timeout, referralPage.referrer_old.headers.selector);
    I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/' + user.id + '/');
});

Scenario('Активный заходит на страницу реф системы другого игрока. Видим состояние rejected', function*(I, referralPage, genericPage) {
    var user = yield I.createUser();
    I.amAuthorizedUser(user.email, user.password);
    I.insertRevault(user.id, testGame.revault_key, 2, null, {
        "activity": {
            "status": "active"
        }
    })
    I.amOnPage('/summon/' + testGame.gameId + '/123/');
    I.seeInTitle(testGame.title);
    I.checkPageDescription(testGame.description);
    I.waitForVisible(referralPage.referral_rejected.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_rejected.headers.text, referralPage.timeout, referralPage.referral_rejected.headers.selector);
    I.waitForVisible(referralPage.referral_rejected.detailed.selector, referralPage.timeout);
    I.waitForText(referralPage.referral_rejected.detailed.text, referralPage.timeout, referralPage.referral_rejected.detailed.selector);
    I.waitForVisible(referralPage.referral_rejected.button.locator, referralPage.timeout);
    I.waitForText(referralPage.referral_rejected.button.text, referralPage.timeout, referralPage.referral_rejected.button.locator);
    I.hideAchievementsNotifications();
    I.checkLayout(testGame.gameId + '_referral_rejected', [{
        name: 'body',
        exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB]
    }], 0.1, '4game-referral-system', 'acc-1-qa-auth-referral');
    I.click(referralPage.referral_rejected.button.locator);
    I.waitForVisible(referralPage.referrer_old.headers.selector, referralPage.timeout);
    I.waitForText(referralPage.referrer_old.headers.text, referralPage.timeout, referralPage.referrer_old.headers.selector);
    I.waitInUrl('/summon/' + testGame.gameId + '/' + user.id + '/', referralPage.timeout);
});
