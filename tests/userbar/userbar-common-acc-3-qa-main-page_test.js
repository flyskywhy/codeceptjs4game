Feature("userbar-common-acc-3-qa-main-page. Тесты юзербара на главной фогейма");

var games = require('../../data/games');
var config = require('../../codecept.conf').config

Before((I) => {
    I.closeTabsExceptForOne();
    I.clearCookie();
});

Scenario("Проверяем ссылку на 4gamer", function*(I, userbar) {
    userbar.check4gamerLinkFor("/");
    var user = yield I.createUser();
    I.acceptAgreementsForNewUser(user.id);
    I.amAuthorizedUser(user.email, user.password);
    userbar.check4gamerLinkFor(games[config.testGame].install_url);
});
