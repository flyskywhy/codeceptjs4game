Feature('referral-system-acc-3-qa-stubs. Проверка заглушек, для игр, в которых отключена рефералка');
var data = require('./data/stubs');

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
    I.syncDown('4game-referral-system', 'acc-3-qa-stubs');
});

AfterSuite((I) => {
    I.createTar('4game-referral-system', 'acc-3-qa-stubs');
    I.syncUp('4game-referral-system', 'acc-3-qa-stubs');
    I.clearDir('4game-referral-system', 'acc-3-qa-stubs');
})

for (var i = 0; i < Object.keys(data).length; i++) {
    var testingGame = data[Object.keys(data)[i]];
    gamesForTest[k] = data[Object.keys(data)[i]];
    k = k + 1;

    Scenario(testingGame.gameTitle + ' заглушка для неавторизованного', function*(I, referralPage, genericPage) {
        testGame = gamesForTest[j];
        I.amOnPage('/summon/' + testGame.gameId + '/123123/');
        I.waitForVisible(referralPage.referral_closed.header, referralPage.timeout);
        I.waitForText(testGame.header, referralPage.timeout, referralPage.referral_closed.header);
        I.waitForVisible(referralPage.referral_closed.description, referralPage.timeout);
        I.waitForText(testGame.pageDescription, referralPage.timeout, referralPage.referral_closed.description);
        I.waitForVisible(referralPage.referral_closed.button, referralPage.timeout);
        I.waitForText(testGame.buttonText, referralPage.timeout, referralPage.referral_closed.button);
        I.seeInTitle(testGame.title);
        I.checkPageDescription(testGame.description);
        referralPage.hideAchievementsNotifications();
        I.checkLayout(testGame.gameId + '_referral_closed', [{
            name: 'body',
            exclude: [referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB]
        }], 0.1, '4game-referral-system', 'acc-3-qa-stubs');
        I.click(referralPage.referral_closed.button);
        I.waitInUrl('.com/' + testGame.gameId, referralPage.timeout);
    });

    Scenario(testingGame.gameTitle + ' заглушка для авторизованного реферера', function*(I, referralPage, genericPage) {
        var user = yield I.createUser();
        I.amAuthorizedUser(user.email, user.password);
        I.amOnPage('/summon/' + testGame.gameId);
        I.waitForVisible(referralPage.referral_closed.header, referralPage.timeout);
        I.waitForText(testGame.header, referralPage.timeout, referralPage.referral_closed.header);
        I.waitForVisible(referralPage.referral_closed.description, referralPage.timeout);
        I.waitForText(testGame.pageDescription, referralPage.timeout, referralPage.referral_closed.description);
        I.waitForVisible(referralPage.referral_closed.button, referralPage.timeout);
        I.waitForText(testGame.buttonText, referralPage.timeout, referralPage.referral_closed.button);
        I.seeInTitle(testGame.title);
        I.checkPageDescription(testGame.description);
    });

    Scenario(testingGame.gameTitle + ' заглушка для авторизованного новичка', function*(I, referralPage, genericPage) {
        var user = yield I.createUser();
        I.acceptAgreementsForNewUser(user.id);
        I.amAuthorizedUser(user.email, user.password);
        I.amOnPage('/summon/' + testGame.gameId + '/123123/');
        I.waitForVisible(referralPage.referral_closed.header, referralPage.timeout);
        I.waitForText(testGame.header, referralPage.timeout, referralPage.referral_closed.header);
        I.waitForVisible(referralPage.referral_closed.description, referralPage.timeout);
        I.waitForText(testGame.pageDescription, referralPage.timeout, referralPage.referral_closed.description);
        I.waitForVisible(referralPage.referral_closed.button, referralPage.timeout);
        I.waitForText(testGame.buttonText, referralPage.timeout, referralPage.referral_closed.button);
        I.seeInTitle(testGame.title);
        I.checkPageDescription(testGame.description);
    });

    Scenario(testingGame.gameTitle + ' заглушка для авторизованного старичка', function*(I, referralPage, genericPage) {
        var user = yield I.createUser();
        I.acceptAgreementsForNewUser(user.id);
        I.amAuthorizedUser(user.email, user.password);
        I.insertRevault(user.id, testGame.revault_key, 2, null, {
            "activity": {
                "status": "lost"
            }
        })
        I.amOnPage('/summon/' + testGame.gameId + '/123/');
        I.waitForVisible(referralPage.referral_closed.header, referralPage.timeout);
        I.waitForText(testGame.header, referralPage.timeout, referralPage.referral_closed.header);
        I.waitForVisible(referralPage.referral_closed.description, referralPage.timeout);
        I.waitForText(testGame.pageDescription, referralPage.timeout, referralPage.referral_closed.description);
        I.waitForVisible(referralPage.referral_closed.button, referralPage.timeout);
        I.waitForText(testGame.buttonText, referralPage.timeout, referralPage.referral_closed.button);
        I.seeInTitle(testGame.title);
        I.checkPageDescription(testGame.description);
    });

    Scenario(testingGame.gameTitle + ' заглушка для активного', function*(I, referralPage, genericPage) {
        var user = yield I.createUser();
        I.amAuthorizedUser(user.email, user.password);
        I.insertRevault(user.id, testGame.revault_key, 2, null, {
            "activity": {
                "status": "active"
            }
        })
        I.amOnPage('/summon/' + testGame.gameId + '/123/');
        I.waitForVisible(referralPage.referral_closed.header, referralPage.timeout);
        I.waitForText(testGame.header, referralPage.timeout, referralPage.referral_closed.header);
        I.waitForVisible(referralPage.referral_closed.description, referralPage.timeout);
        I.waitForText(testGame.pageDescription, referralPage.timeout, referralPage.referral_closed.description);
        I.waitForVisible(referralPage.referral_closed.button, referralPage.timeout);
        I.waitForText(testGame.buttonText, referralPage.timeout, referralPage.referral_closed.button);
        I.seeInTitle(testGame.title);
        I.checkPageDescription(testGame.description);
    });

    Scenario(testingGame.gameTitle + ' заглушка для выполнившего ачивку', function*(I, referralPage, genericPage) {
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
        I.insertAchievement(user.id, testGame.achievement, true, 1);
        I.amOnPage('/summon/' + testGame.gameId + '/123/');
        I.waitForVisible(referralPage.referral_closed.header, referralPage.timeout);
        I.waitForText(testGame.header, referralPage.timeout, referralPage.referral_closed.header);
        I.waitForVisible(referralPage.referral_closed.description, referralPage.timeout);
        I.waitForText(testGame.pageDescription, referralPage.timeout, referralPage.referral_closed.description);
        I.waitForVisible(referralPage.referral_closed.button, referralPage.timeout);
        I.waitForText(testGame.buttonText, referralPage.timeout, referralPage.referral_closed.button);
        I.seeInTitle(testGame.title);
        I.checkPageDescription(testGame.description);
        j = j + 1;
    });
}
