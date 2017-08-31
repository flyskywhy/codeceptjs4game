Feature('referral-system-acc-3-qa-other-games. Проверка всех состояний страниц реферальной системы для игр, которые не в data.common.testingGame');
var data = require('./data/referral');

/* В цикле пробегаем по всему конфигу рефералки и ищем подходящие нам игры для тестов (исключаем common и data.common.testingGame)
 ** При этом формируются правильные названия тестов
 ** Далее в первом сценарии определяем игру, по которой прогоняем тесты, а в последнем сценарии инкрементим счетчик на 1
 */

var k = 0;
var j = 0;
var gamesForTest = new Object();

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

BeforeSuite((I) => {
    I.syncDown('4game-referral-system', 'acc-3-qa-other-games');
});

AfterSuite((I) => {
    I.createTar('4game-referral-system', 'acc-3-qa-other-games');
    I.syncUp('4game-referral-system', 'acc-3-qa-other-games');
    I.clearDir('4game-referral-system', 'acc-3-qa-other-games');
})

for (var i = 0; i < Object.keys(data).length; i++) {
    if ((Object.keys(data)[i] != "common") && (Object.keys(data)[i] != data.common.testingGame)) {
        var testingGame = data[Object.keys(data)[i]];
        gamesForTest[k] = data[Object.keys(data)[i]];
        k = k + 1;

        Scenario(testingGame.gameTitle + ' состояние referral_new_unauth', function*(I, referralPage, genericPage) {
            testGame = gamesForTest[j];
            I.amOnPage('/summon/' + testGame.gameId + '/123123/');
            I.waitForVisible(referralPage.referral_unauth_new.headers.selector, referralPage.timeout);
            I.waitForText(testGame.titles.unauth_referral_new_screen_prefix + ' ' + testGame.gameTitle + ',\nи оба получим награды', referralPage.timeout, referralPage.referral_unauth_new.headers.selector);
            I.seeInTitle(testGame.title);
            I.checkPageDescription(testGame.description);
            I.waitForText(testGame.steps.first_step_referral_newbie_title, referralPage.timeout, referralPage.referral_unauth_new.step1.selector)
            I.waitForText(testGame.snippets.referral_new_step2_title, referralPage.timeout, referralPage.referral_unauth_new.step2.selector)
            I.seeElement(referralPage.referral_unauth_old.tab);
            I.dontSeeElement(referralPage.referral_unauth_new.tab);
            I.hideAchievementsNotifications();
            I.checkLayout(testGame.gameId + '_referral_unauth_new', [{
                name: 'body',
                exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB]
            }], 0.1, '4game-referral-system', 'acc-3-qa-other-games');
        });

        Scenario(testingGame.gameTitle + ' состояние referral_old_unauth', function*(I, referralPage, genericPage) {
            I.amOnPage('/summon/' + testGame.gameId + '/123123/');
            I.waitForVisible(referralPage.referral_unauth_new.headers.selector, referralPage.timeout);
            I.waitForText(testGame.titles.unauth_referral_new_screen_prefix + ' ' + testGame.gameTitle + ',\nи оба получим награды', referralPage.timeout, referralPage.referral_unauth_new.headers.selector);
            I.seeInTitle(testGame.title);
            I.checkPageDescription(testGame.description);
            I.seeElement(referralPage.referral_unauth_old.tab);
            I.dontSeeElement(referralPage.referral_unauth_new.tab);
            I.click(referralPage.referral_unauth_old.tab);
            I.seeElement(referralPage.referral_unauth_new.tab);
            I.dontSeeElement(referralPage.referral_unauth_old.tab);
            I.waitForText(testGame.titles.unauth_referral_old_screen_prefix + ' ' + testGame.gameTitle + ',\nи оба получим награды', referralPage.timeout, referralPage.referral_unauth_old.headers.selector);
            I.waitForText(testGame.steps.first_step_referral_title, referralPage.timeout, referralPage.referral_unauth_old.step1.selector)
            I.waitForText(testGame.snippets.referral_old_step2_title, referralPage.timeout, referralPage.referral_unauth_old.step2.selector)
            I.hideAchievementsNotifications();
            I.checkLayout(testGame.gameId + '_referral_unauth_old', [{
                name: 'body',
                exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB]
            }], 0.1, '4game-referral-system', 'acc-3-qa-other-games');
        });

        Scenario(testingGame.gameTitle + ' состояние referrer_old_auth', function*(I, referralPage, genericPage) {
            var user = yield I.createUser();
            I.amAuthorizedUser(user.email, user.password);
            I.amOnPage('/summon/' + testGame.gameId);
            I.waitForVisible(referralPage.referrer_old.headers.selector, referralPage.timeout);
            I.waitForText('Верни друга в ' + testGame.gameTitle + ',\nи оба получите награды', referralPage.timeout, referralPage.referrer_old.headers.selector);
            I.seeInTitle(testGame.title);
            I.checkPageDescription(testGame.description);
            I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/' + user.id + '/');
            I.waitForText(testGame.steps.first_step_title, referralPage.timeout, referralPage.referrer_old.step1.selector);
            I.waitForText(testGame.snippets.referrer_old_step2_title, referralPage.timeout, referralPage.referrer_old.step2.selector);
            I.hideAchievementsNotifications();
            I.checkLayout(testGame.gameId + '_referrer_auth_old', [{
                name: 'body',
                exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB, referralPage.exclude.referrerLink]
            }], 0.1, '4game-referral-system', 'acc-3-qa-other-games');
        });

        Scenario(testingGame.gameTitle + ' состояние referrer_new_auth', function*(I, referralPage, genericPage) {
            var user = yield I.createUser();
            I.amAuthorizedUser(user.email, user.password);
            I.amOnPage('/summon/' + testGame.gameId + '/' + user.id);
            I.waitForVisible(referralPage.referrer_old.headers.selector, referralPage.timeout);
            I.waitForText('Верни друга в ' + testGame.gameTitle + ',\nи оба получите награды', referralPage.timeout, referralPage.referrer_old.headers.selector);
            I.seeInTitle(testGame.title);
            I.checkPageDescription(testGame.description);
            I.seeElement(referralPage.referrer_new.tab);
            I.dontSeeElement(referralPage.referrer_old.tab);
            I.click(referralPage.referrer_new.tab);
            I.seeElement(referralPage.referrer_old.tab);
            I.dontSeeElement(referralPage.referrer_new.tab);
            I.waitForText(testGame.titles.auth_referrer_new_screen_prefix + ' ' + testGame.gameTitle + ',\nи оба получите награды', referralPage.timeout, referralPage.referrer_new.headers.selector);
            I.waitForText(testGame.steps.first_step_title, referralPage.timeout, referralPage.referrer_new.step1.selector)
            I.waitForText(testGame.snippets.referrer_new_step2_title, referralPage.timeout, referralPage.referrer_new.step2.selector)
            I.hideAchievementsNotifications();
            I.checkLayout(testGame.gameId + '_referrer_auth_new', [{
                name: 'body',
                exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB, referralPage.exclude.referrerLink]
            }], 0.1, '4game-referral-system', 'acc-3-qa-other-games');
        });

        Scenario(testingGame.gameTitle + ' состояние referral_new_auth', function*(I, referralPage, genericPage) {
            var user = yield I.createUser();
            I.acceptAgreementsForNewUser(user.id);
            I.amAuthorizedUser(user.email, user.password);
            I.amOnPage('/summon/' + testGame.gameId + '/123123/');
            //Проверяем заголовок
            I.waitForVisible(referralPage.referral_auth_new.headers.selector, referralPage.timeout);
            I.waitForText(testGame.titles.auth_referral_new_screen_prefix + '  ' + testGame.gameTitle + ',\nи оба получим награды', referralPage.timeout, referralPage.referral_auth_new.headers.selector);
            //I.setStatusForGame('pointblank', not_installed)
            //Проверяем URL
            I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/123123/');
            I.seeInTitle(testGame.title);
            I.checkPageDescription(testGame.description);
            //Проверяем, что табов переключения нет
            I.dontSeeElement(referralPage.referral_unauth_new.tab);
            I.dontSeeElement(referralPage.referral_unauth_old.tab);
            //Проверяем, что в 1 шаге правильное описание
            I.waitForText(testGame.steps.first_step_referral_newbie_title, referralPage.timeout, referralPage.referral_auth_new.step1.selector)
                //Проверяем, что во 2 шаге правильная ачивка
            I.waitForText(testGame.snippets.referral_new_step2_title, referralPage.timeout, referralPage.referral_auth_new.step2.selector)
                //Ждем когда прогрузиться кнопка
            I.waitForVisible(referralPage.referral_auth_new.button, referralPage.timeout)
                //TODO: Раскоментить, когда сделаем переключение состояний
                //I.waitForText('Установить игру', referralPage.timeout, referralPage.referral_auth_new.button)
                //Проверяем, что 1 шаг в прогрессе
                //referralPage.seeStepInProgress(referralPage.referral_auth_new.step1.checkboxSelector);
                //Провереряем лэйаут страницы
                //I.hideAchievementsNotifications();
                //I.checkLayout(testGame.gameId + '_referal_auth_new_install', [ {name: 'body', exclude: [ referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB ]} ], 0.1, '4game-referral-system', "acc-3-qa-other-games");
        });

        Scenario(testingGame.gameTitle + ' состояние referral_old_auth', function*(I, referralPage, genericPage) {
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
            I.waitForText('Вернись в  ' + testGame.gameTitle + ',\nи оба получим награды', referralPage.timeout, referralPage.referral_auth_old.headers.selector);
            //I.setStatusForGame('pointblank', not_installed)
            I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/123/');
            I.seeInTitle(testGame.title);
            I.checkPageDescription(testGame.description);
            I.dontSeeElement(referralPage.referral_unauth_new.tab);
            I.dontSeeElement(referralPage.referral_unauth_old.tab);
            I.waitForText(testGame.steps.first_step_referral_title, referralPage.timeout, referralPage.referral_auth_old.step1.selector)
            I.waitForText(testGame.snippets.referral_old_step2_title, referralPage.timeout, referralPage.referral_auth_old.step2.selector)
            I.waitForVisible(referralPage.referral_auth_old.button, referralPage.timeout)
                //TODO: Раскоментить, когда сделаем переключение состояний
                //I.waitForText('Играть', referralPage.timeout, referralPage.referral_auth_old.button)
                //referralPage.seeStepCompleted(referralPage.referral_auth_old.step1.checkboxSelector);
                //I.hideAchievementsNotifications();
                //I.checkLayout(testGame.gameId + '_referal_auth_old_play', [ {name: 'body', exclude: [ referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB ]} ], 0.1, '4game-referral-system', "acc-3-qa-other-games");
        });

        Scenario(testingGame.gameTitle + ' состояние referral_rejected', function*(I, referralPage, genericPage) {
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
            I.waitForText('Последний раз ты играл .\nПриводи друзей в ' + testGame.gameTitle + ' и получай награду', referralPage.timeout, referralPage.referral_rejected.detailed.selector);
            I.waitForVisible(referralPage.referral_rejected.button.locator, referralPage.timeout);
            I.waitForText('Пригласить друзей', referralPage.timeout, referralPage.referral_rejected.button.locator);
            I.hideAchievementsNotifications();
            I.checkLayout(testGame.gameId + '_referral_rejected', [{
                name: 'body',
                exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB]
            }], 0.1, '4game-referral-system', 'acc-3-qa-other-games');
        });

        Scenario(testingGame.gameTitle + ' состояние referral_completed', function*(I, referralPage, genericPage) {
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
            I.seeInTitle(testGame.title);
            I.checkPageDescription(testGame.description);
            I.seeCurrentUrlEquals('/summon/' + testGame.gameId + '/123/');
            I.waitForVisible(referralPage.referral_completed.detailed.selector, referralPage.timeout);
            I.waitForText(referralPage.referral_completed.detailed.text, referralPage.timeout, referralPage.referral_completed.detailed.selector);
            I.waitForVisible(referralPage.referral_completed.button.locator, referralPage.timeout);
            I.waitForText('Пригласить друзей', referralPage.timeout, referralPage.referral_completed.button.locator);
            I.hideAchievementsNotifications();
            I.checkLayout(testGame.gameId + '_referral_completed', [{
                name: 'body',
                exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB]
            }], 0.1, '4game-referral-system', 'acc-3-qa-other-games');
            j = j + 1;
        });
    }
}
