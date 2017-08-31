Feature("eu-common-acc-1-qa-main. Тесты для европейской версии сайта 4game.");

Before((I) => {
    I.closeTabsExceptForOne();
    I.clearCookie();
});

Scenario("Юзербар не отображается для неавторизованного", (I, lineageInstallPage) => {
    I.amOnPage("/");
    I.seeInTitle(lineageInstallPage.installEuro.title);
    I.dontSeeElementInDOM(lineageInstallPage.install.userbar);
});

Scenario("Юзербар не отображается для авторизованного", function*(I, lineageInstallPage) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, "/");
    I.seeInTitle(lineageInstallPage.installEuro.title);
    I.dontSeeElementInDOM(lineageInstallPage.install.userbar);
});

Scenario("Ссылка на достижения не отображается для неавторизованного", (I, lineageInstallPage, genericPage) => {
    I.amOnPage("/");
    I.seeInTitle(lineageInstallPage.installEuro.title);
    I.dontSeeElementInDOM(genericPage.barAchievementLink);
});

Scenario("Ссылка на достижения не отображается для авторизованного", function*(I, lineageInstallPage, genericPage) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, "/");
    I.seeInTitle(lineageInstallPage.installEuro.title);
    I.dontSeeElementInDOM(genericPage.barAchievementLink);
});

Scenario("страница Достижения отдает ошибку 404 для неавторизованного", (I, achievementsPage, genericPage) => {
    I.amOnPage(achievementsPage.url);
    I.dontSeeInTitle(achievementsPage.page_title);
    I.seeInTitle(genericPage.error404);
    I.waitForText(genericPage.error404);
});

Scenario("страница Достижения отдает ошибку 404 для авторизованного", function*(I, achievementsPage, genericPage) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, achievementsPage.url);
    I.dontSeeInTitle(achievementsPage.page_title);
    I.seeInTitle(genericPage.error404);
    I.waitForText(genericPage.error404);
});

Scenario("страница Подарочные коды отдает ошибку 404 для неавторизованного", function*(I, giftCodePage, genericPage) {
    I.amOnPage(giftCodePage.url);
    I.dontSeeInTitle(giftCodePage.title);
    I.seeInTitle(genericPage.error404);
    I.waitForText(genericPage.error404);
});

Scenario("страница Подарочные коды отдает ошибку 404 для авторизованного", function*(I, giftCodePage, genericPage) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, giftCodePage.url);
    I.dontSeeInTitle(giftCodePage.title);
    I.seeInTitle(genericPage.error404);
    I.waitForText(genericPage.error404);
});

// Ожидается мердж ветки feature-gemapanel, т.к. нужен метод из /helpers/gamepanel_helper/
xScenario("Провереяем редирект на install, если игра не установлена", function*(I, lineageInstallPage, genericPage) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, "/");
    I.sendStatus('ид_игры', 'not_installed');
    I.seeInCurrentUrl(lineageInstallPage.classicInstall.url)
    I.seeInTitle(lineageInstallPage.classicInstallEuro.title);
});

// Ожидается мердж ветки feature-gemapanel, т.к. нужен метод из /helpers/gamepanel_helper/
xScenario("Провереяем редирект на play, если игра установлена", function*(I, giftCodePage, genericPage) {
    var user = yield I.createUser();
    I.amOnPageForAuthUser(user, "/");
    I.sendStatus('ид_игры', 'installed');
    I.seeInCurrentUrl("/lineage2classic/play/")
    I.seeInTitle("Lineage 2 Classic Europe — official site of the online game");
});
