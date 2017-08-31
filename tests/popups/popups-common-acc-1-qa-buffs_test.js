Feature("popups-common-acc-1-qa-buffs. Тесты отображения Попапа про баффы.");

var games = require('../../data/games');
var config = require('../../codecept.conf').config

BeforeSuite((I) => {
    I.syncDown('popups', 'acc-1-qa-buffs');
});

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

AfterSuite((I) => {
    I.createTar('popups', 'acc-1-qa-buffs');
    I.syncUp('popups', 'acc-1-qa-buffs');
    I.clearDir('popups', 'acc-1-qa-buffs');
})

Scenario("У юзера один бафф и он зашел посмотеть попап", function*(I, buffsPopup) {
    var user = yield I.createUser();
    buffsPopup.addBuffToRevault(user.id, 400.0, [{
        "buffPercent": 10,
        "expiresAt": Date.now() + 432000000
    }]);
    I.addPopupNotification(user.id, "bonus-on-payment-buffs-reminder", ["all"]);
    I.amOnPageForAuthUser(user, games[config.testGame].play_url);
    buffsPopup.validateBuffsPopupOnURL(games[config.testGame].play_url + buffsPopup.url);
    I.waitForText(buffsPopup.text.titleNormal, buffsPopup.timeout, buffsPopup.title);
    I.waitForText(buffsPopup.text.buffValue.replace('$s', '10%'), buffsPopup.timeout, buffsPopup.buffValue);
    I.waitForText(buffsPopup.text.expireTime.replace('$s', '5 дней'), buffsPopup.timeout, buffsPopup.listExpiresNormal);
    I.validateCssStyle(buffsPopup.listExpiresNormal, "color", "rgba(57,135,222,1)");
    I.checkLayout('buffs_popup', [{
        name: 'popup',
        elem: buffsPopup.webdriverCSS.elem,
        ignore: 'antialiasing'
    }], 3.0, 'popups', 'acc-1-qa-buffs');
    I.click(buffsPopup.button);
    I.waitInUrl("pointblank/play/?popupWidget=PaymentTerminalWidget", buffsPopup.timeout)
});

Scenario("У юзера есть несколько баффов, просроченный и истекающий", function*(I, buffsPopup) {
    var user = yield I.createUser();
    buffsPopup.addBuffToRevault(user.id, 400.0, [{
        "buffPercent": 19000,
        "expiresAt": Date.now() + 432000000
    }, {
        "buffPercent": 20,
        "expiresAt": Date.now() + 86300000
    }, {
        "buffPercent": 20,
        "expiresAt": Date.now() - 1000
    }]);
    I.addPopupNotification(user.id, "bonus-on-payment-buffs-reminder", ["all"]);
    I.amOnPageForAuthUser(user, games[config.testGame].play_url);
    buffsPopup.validateBuffsPopupOnURL(games[config.testGame].play_url + buffsPopup.url);
    I.waitForText(buffsPopup.text.titleExpireSoon, buffsPopup.timeout, buffsPopup.title);
    I.waitForText(buffsPopup.text.buffValue.replace('$s', '19020%'), buffsPopup.timeout, buffsPopup.buffValue);
    I.waitForText(buffsPopup.text.expireTime.replace('$s', '5 дней'), buffsPopup.timeout, buffsPopup.listExpiresNormal);
    I.waitForText("19000%", buffsPopup.timeout, buffsPopup.listBonusNormal);
    I.waitForText(buffsPopup.text.expireTime.replace('$s', '24 часа'), buffsPopup.timeout, buffsPopup.listExpiresExpiresSoon);
    I.waitForText("20%", buffsPopup.timeout, buffsPopup.listBonusExpiresSoon);
    I.validateCssStyle(buffsPopup.listExpiresNormal, "color", "rgba(57,135,222,1)");
    I.validateCssStyle(buffsPopup.listBonusNormal, "color", "rgba(57,135,222,1)");
    I.validateCssStyle(buffsPopup.listExpiresExpiresSoon, "color", "rgba(255,75,35,1)");
    I.validateCssStyle(buffsPopup.listBonusExpiresSoon, "color", "rgba(255,75,35,1)");
    I.checkLayout('buffs_popup_expire_many_buffs', [{
        name: 'popup',
        elem: buffsPopup.webdriverCSS.elem,
        ignore: 'antialiasing'
    }], 3.0, 'popups', 'acc-1-qa-buffs');
});

Scenario("У юзера есть несколько баффов и они не истекают ", function*(I, buffsPopup) {
    var user = yield I.createUser();
    buffsPopup.addBuffToRevault(user.id, 400.0, [{
        "buffPercent": 10,
        "expiresAt": Date.now() + 432000000
    }, {
        "buffPercent": 20,
        "expiresAt": Date.now() + 432000000
    }]);
    I.addPopupNotification(user.id, "bonus-on-payment-buffs-reminder", ["all"]);
    I.amOnPageForAuthUser(user, games[config.testGame].play_url);
    buffsPopup.validateBuffsPopupOnURL(games[config.testGame].play_url + buffsPopup.url);
    I.waitForText(buffsPopup.text.titleNormalMany, buffsPopup.timeout, buffsPopup.title);
    I.waitForText(buffsPopup.text.buffValue.replace('$s', '30%'), buffsPopup.timeout, buffsPopup.buffValue);
    I.waitForText(buffsPopup.text.expireTime.replace('$s', '5 дней'), buffsPopup.timeout, buffsPopup.listExpiresNormal);
    I.waitForText("10%", buffsPopup.timeout, buffsPopup.listBonusNormal);
    I.checkLayout('buffs_popup_expire_many_buffs_normal', [{
        name: 'popup',
        elem: buffsPopup.webdriverCSS.elem,
        ignore: 'antialiasing'
    }], 3.0, 'popups', 'acc-1-qa-buffs');
});

Scenario("У юзера один бафф и он скоро закончится", function*(I, buffsPopup) {
    var user = yield I.createUser();
    buffsPopup.addBuffToRevault(user.id, 500.0, [{
        "buffPercent": 60,
        "expiresAt": Date.now() + 86300000
    }]);
    I.addPopupNotification(user.id, "bonus-on-payment-buffs-reminder", ["all"]);
    I.amOnPageForAuthUser(user, games[config.testGame].play_url);
    I.waitForVisible(buffsPopup.title, buffsPopup.timeout);
    I.waitForVisible(buffsPopup.buffValue, buffsPopup.timeout);
    I.waitForVisible(buffsPopup.buffDesc, buffsPopup.timeout);
    I.waitForVisible(buffsPopup.listExpiresExpiresSoon, buffsPopup.timeout);
    I.waitForVisible(buffsPopup.button, buffsPopup.timeout);
    I.waitInUrl(games[config.testGame].play_url + buffsPopup.url, buffsPopup.timeout);
    I.waitForText(buffsPopup.text.titleExpireSoon, buffsPopup.timeout, buffsPopup.title);
    I.waitForText(buffsPopup.text.buffValue.replace('$s', '60%'), buffsPopup.timeout, buffsPopup.buffValue);
    I.waitForText(buffsPopup.text.expireTime.replace('$s', '24 часа'), buffsPopup.timeout, buffsPopup.listExpiresExpiresSoon);
    I.checkLayout('buffs_popup_expire_last_buff', [{
        name: 'popup',
        elem: buffsPopup.webdriverCSS.elem,

        ignore: 'antialiasing'
    }], 3.0, 'popups', 'acc-1-qa-buffs');
});

Scenario("У юзера один неактивированный бафф и он зашел посмотеть попап", function*(I, buffsPopup) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    buffsPopup.addBuffToRevault(user.id, 400.0, [{
        "buffPercent": 10,
        "buffDurationInMillis": 432000000
    }]);
    I.addPopupNotification(user.id, "bonus-on-payment-buffs-reminder", ["all"]);
    I.amOnPage(games[config.testGame].play_url);
    buffsPopup.validateBuffsPopupOnURL(games[config.testGame].play_url + buffsPopup.url);
    I.waitForText(buffsPopup.text.titleNormal, buffsPopup.timeout, buffsPopup.title);
    I.waitForText(buffsPopup.text.buffValue.replace('$s', '10%'), buffsPopup.timeout, buffsPopup.buffValue);
    I.waitForText(buffsPopup.text.expireTime.replace('$s', '5 дней'), buffsPopup.timeout, buffsPopup.listExpiresNormal);
    I.validateCssStyle(buffsPopup.listExpiresNormal, "color", "rgba(57,135,222,1)");
    I.click(buffsPopup.button);
    I.waitInUrl("pointblank/play/?popupWidget=PaymentTerminalWidget", buffsPopup.timeout)
});

Scenario("У юзера есть несколько баффов, просроченный и неактивированный", function*(I, buffsPopup) {
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    buffsPopup.addBuffToRevault(user.id, 400.0, [{
        "buffPercent": 19000,
        "expiresAt": Date.now() + 432000000
    }, {
        "buffPercent": 20,
        "buffDurationInMillis": 86300000
    }, {
        "buffPercent": 20,
        "expiresAt": Date.now() - 1000
    }]);
    I.addPopupNotification(user.id, "bonus-on-payment-buffs-reminder", ["all"]);
    I.amOnPage(games[config.testGame].play_url);
    buffsPopup.validateBuffsPopupOnURL(games[config.testGame].play_url + buffsPopup.url);
    I.waitForText(buffsPopup.text.titleNormalMany, buffsPopup.timeout, buffsPopup.title);
    I.waitForText(buffsPopup.text.buffValue.replace('$s', '19020%'), buffsPopup.timeout, buffsPopup.buffValue);
    I.waitForText(buffsPopup.text.expireTime.replace('$s', '5 дней'), buffsPopup.timeout, buffsPopup.listExpiresNormal);
    I.waitForText("19000%", buffsPopup.timeout, buffsPopup.listBonusNormal);
    I.waitForText(buffsPopup.text.expireTime.replace('$s', '24 часа'), buffsPopup.timeout, buffsPopup.listExpiresExpiresSoon);
    I.waitForText("20%", buffsPopup.timeout, buffsPopup.listBonusExpiresSoon);
    I.validateCssStyle(buffsPopup.listExpiresNormal, "color", "rgba(57,135,222,1)");
    I.validateCssStyle(buffsPopup.listBonusNormal, "color", "rgba(57,135,222,1)");
    I.validateCssStyle(buffsPopup.listExpiresExpiresSoon, "color", "rgba(255,75,35,1)");
    I.validateCssStyle(buffsPopup.listBonusExpiresSoon, "color", "rgba(255,75,35,1)");
});
