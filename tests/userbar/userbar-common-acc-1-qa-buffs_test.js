Feature("userbar-common-acc-1-qa-buffs. Тесты отображения баффов в юзербаре.");

BeforeSuite((I) => {
    I.syncDown('userbar', 'acc-1-qa-buffs');
});

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

AfterSuite((I) => {
    I.createTar('userbar', 'acc-1-qa-buffs');
    I.syncUp('userbar', 'acc-1-qa-buffs');
    I.clearDir('userbar', 'acc-1-qa-buffs');
})


Scenario("У юзера без баффов нет лейбла в юзербаре", function*(I, userbar) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, "/");
    I.waitForVisible(userbar.ballance, userbar.timeout);
    I.dontSeeElement(userbar.buffLabel);
});

Scenario("У юзера без баффов нет подсказки в выпадайке", function*(I, userbar) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, "/");
    I.waitForVisible(userbar.ballance, userbar.timeout);
    I.hideAchievementsNotifications();
    I.click(userbar.ballance);
    I.waitForVisible(userbar.ballancePopup.replenish, userbar.timeout);
    I.dontSeeElement(userbar.ballancePopup.buffsHelp);
});

Scenario("У юзера с баффом есть лейбл в юзербаре", function*(I, userbar, buffsPopup) {
    var user = yield I.createUser();
    buffsPopup.addBuffToRevault(user.id, 500.0, [{
        "buffPercent": 10,
        "expiresAt": Date.now() + 432000000
    }, {
        "buffPercent": 20,
        "expiresAt": Date.now() + 432000000
    }]);
    I.amOnPageForAuthUser(user, "/");
    I.waitForVisible(userbar.ballance, userbar.timeout);
    I.waitForVisible(userbar.buffLabel, userbar.timeout);
    I.waitForText("30%", userbar.timeout, userbar.buffLabel);
    I.hideAchievementsNotifications();
    I.checkLayout('buffs_label', [{
        name: 'popup',
        elem: userbar.userbarMainPage,
        exclude: [userbar.barUserName]
    }], 0.1, 'userbar', 'acc-1-qa-buffs');
});

Scenario("У юзера с бафом есть подсказка в выпадайке", function*(I, userbar, buffsPopup) {
    var user = yield I.createUser();
    buffsPopup.addBuffToRevault(user.id, 500.0, [{
        "buffPercent": 10,
        "expiresAt": Date.now() + 432000000
    }, {
        "buffPercent": 20,
        "expiresAt": Date.now() + 432000000
    }]);
    I.amOnPageForAuthUser(user, "/");
    I.waitForVisible(userbar.ballance, userbar.timeout);
    I.hideAchievementsNotifications();
    I.click(userbar.ballance);
    I.waitForVisible(userbar.ballancePopup.buffsHelp, userbar.timeout);
    I.waitForText(userbar.ballancePopup.text.buffsHelp.replace('%s', '30').replace('%k', '5 дней'), userbar.timeout, userbar.ballancePopup.buffsHelp);
    I.checkLayout('buffs_tooltip', [{
        name: 'popup',
        elem: userbar.userbarMoneyDropdown
    }], 0.1, 'userbar', 'acc-1-qa-buffs');
});

Scenario("У юзера с бафом есть подсказка в выпадайке, но бафф скоро закончится", function*(I, userbar, buffsPopup) {
    var user = yield I.createUser();
    buffsPopup.addBuffToRevault(user.id, 500.0, [{
        "buffPercent": 10,
        "expiresAt": Date.now() + 86400000
    }, {
        "buffPercent": 10,
        "expiresAt": Date.now() - 1000
    }, {
        "buffPercent": 2000,
        "expiresAt": Date.now() + 86400000
    }]);
    I.amOnPageForAuthUser(user, "/");
    I.waitForVisible(userbar.ballance, userbar.timeout);
    I.waitForVisible(userbar.buffLabel, userbar.timeout);
    I.waitForText("2010%", userbar.timeout, userbar.buffLabel);
    I.hideAchievementsNotifications();
    I.click(userbar.ballance);
    I.waitForVisible(userbar.ballancePopup.buffsHelp, userbar.timeout);
    I.waitForText(userbar.ballancePopup.text.buffsHelp.replace('%s', '2010').replace('%k', '24 часа'), userbar.timeout, userbar.ballancePopup.buffsHelp);
    I.checkLayout('buffs_tooltip_expires_soon', [{
        name: 'popup',
        elem: userbar.userbarMoneyDropdown
    }], 0.1, 'userbar', 'acc-1-qa-buffs');
});

Scenario("У юзера с бафом и замороженными бонусами лейбл и подсказка от баффа", function*(I, userbar, buffsPopup) {
    var user = yield I.createUser();
    I.addFrozenBonuses(user, 100);
    buffsPopup.addBuffToRevault(user.id, 500.0, [{
        "buffPercent": 10,
        "expiresAt": Date.now() + 432000000
    }, {
        "buffPercent": 20,
        "expiresAt": Date.now() + 432000000
    }]);
    I.amOnPageForAuthUser(user, "/");
    I.waitForVisible(userbar.ballance, userbar.timeout);
    I.waitForVisible(userbar.buffLabel, userbar.timeout);
    I.waitForText("30%", userbar.timeout, userbar.buffLabel);
    I.dontSeeElement(userbar.frozenBonusesLabel);
    I.hideAchievementsNotifications();
    I.click(userbar.ballance);
    I.waitForVisible(userbar.ballancePopup.replenish, userbar.timeout);
    I.waitForVisible(userbar.ballancePopup.buffsHelp, userbar.timeout);
    I.waitForText(userbar.ballancePopup.text.buffsHelp.replace('%s', '30').replace('%k', '5 дней'), userbar.timeout, userbar.ballancePopup.buffsHelp);
    I.waitForText(userbar.ballancePopup.text.frozenBonusesHelp.replace('%s', '100').replace('%k', '50'), userbar.timeout, userbar.ballancePopup.frozenBonusesHelp);
    I.checkLayout('buffs_and_frozen_tooltip', [{
        name: 'popup',
        elem: userbar.userbarMoneyDropdown
    }], 0.1, 'userbar', 'acc-1-qa-buffs');
});

Scenario("У юзера просроченный бафф лейбл и подсказка не отображаются", function*(I, userbar, buffsPopup) {
    var user = yield I.createUser();
    buffsPopup.addBuffToRevault(user.id, 500.0, [{
        "buffPercent": 10,
        "expiresAt": Date.now() - 1000
    }, {
        "buffPercent": 20,
        "expiresAt": Date.now() - 1000
    }]);
    I.amOnPageForAuthUser(user, "/");
    I.waitForVisible(userbar.ballance, userbar.timeout);
    I.dontSeeElement(userbar.buffLabel, userbar.timeout);
    I.hideAchievementsNotifications();
    I.click(userbar.ballance);
    I.waitForVisible(userbar.ballancePopup.replenish, userbar.timeout);
    I.dontSeeElement(userbar.ballancePopup.buffsHelp);
});

Scenario("У юзера просроченный бафф и замороженные бонусы, лейбл и подсказка от замороженных бонусов", function*(I, userbar, buffsPopup) {
    var user = yield I.createUser();
    I.addFrozenBonuses(user, 100);
    buffsPopup.addBuffToRevault(user.id, 500.0, [{
        "buffPercent": 10,
        "expiresAt": Date.now() - 1000
    }, {
        "buffPercent": 20,
        "expiresAt": Date.now() - 1000
    }]);
    I.amOnPageForAuthUser(user, "/");
    I.waitForVisible(userbar.ballance, userbar.timeout);
    I.waitForVisible(userbar.frozenBonusesLabel, userbar.timeout);
    I.see("100 руб.", userbar.frozenBonusesLabel);
    I.dontSeeElement(userbar.buffLabel);
    I.hideAchievementsNotifications();
    I.click(userbar.ballance);
    I.waitForVisible(userbar.ballancePopup.frozenBonusesHelp, userbar.timeout);
    I.waitForText(userbar.ballancePopup.text.frozenBonusesHelp.replace('%s', '100').replace('%k', '50'), userbar.timeout, userbar.ballancePopup.frozenBonusesHelp);
});

Scenario("У юзера есть неактивированный баф, он не отображается в юзербаре", function*(I, userbar, buffsPopup) {
    var user = yield I.createUser();
    buffsPopup.addBuffToRevault(user.id, 500.0, [{
        "buffPercent": 10,
        "buffDurationInMillis": 86400000
    }, {
        "buffPercent": 10,
        "expiresAt": Date.now() - 1000
    }, {
        "buffPercent": 2000,
        "buffDurationInMillis": 86400000
    }]);
    I.amOnPageForAuthUser(user, "/");
    I.waitForVisible(userbar.ballance, userbar.timeout);
    I.dontSeeElement(userbar.buffLabel);
});
