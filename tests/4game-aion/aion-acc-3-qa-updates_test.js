Feature("aion-acc-3-qa-updates. Тесты для страницы ratings AION: Обновление 5.1 «Тени прошлого».");

BeforeSuite((I) => {
    I.syncDown('4game-aion', "acc-3-qa-updates");
});

Before((I, aionPlayPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(aionPlayPage.updates.url);
    I.seeInTitle(aionPlayPage.updates.title);
});

AfterSuite((I) => {
    I.createTar('4game-aion', "acc-3-qa-updates");
    I.syncUp('4game-aion', "acc-3-qa-updates");
    I.clearDir('4game-aion', "acc-3-qa-updates");
})


Scenario("Проверяем верстку страницы", (I, aionPlayPage) => {
    I.checkLayout('main', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-updates");
});

Scenario("Геймпанель не должна отображаться на странице", (I, aionPlayPage) => {
    I.dontSeeElement(aionPlayPage.play.gamePanel);
});

Scenario("Мини Геймпанель должна отображаться на странице", (I, genericPage) => {
    I.waitForVisible(genericPage.gamePanel.mini);
});

Scenario("Юзербар должен отображаться на странице", (I, genericPage) => {
    I.waitForElement(genericPage.userBar);
    I.waitForVisible(genericPage.userBar);
});

Scenario("Переходим на вкладку меню Предметы, проверяем верстку", (I, aionPlayPage) => {
    I.waitForVisible(aionPlayPage.updates.timezoneActiveMenu);
    I.waitForVisible(aionPlayPage.updates.objectsMenu);
    I.click(aionPlayPage.updates.objectsMenu);
    I.waitForVisible(aionPlayPage.updates.objectsActiveMenu);
    I.checkLayout('objects', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-updates");
});

Scenario("Переходим на вкладку меню Окружение, проверяем верстку", (I, aionPlayPage) => {
    I.waitForVisible(aionPlayPage.updates.timezoneActiveMenu);
    I.waitForVisible(aionPlayPage.updates.environMenu);
    I.click(aionPlayPage.updates.environMenu);
    I.waitForVisible(aionPlayPage.updates.environActiveMenu);
    I.checkLayout('environ', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-updates");
});

Scenario("Переходим на вкладку меню Умения, проверяем верстку", (I, aionPlayPage) => {
    I.waitForVisible(aionPlayPage.updates.timezoneActiveMenu);
    I.waitForVisible(aionPlayPage.updates.skillsMenu);
    I.click(aionPlayPage.updates.skillsMenu);
    I.waitForVisible(aionPlayPage.updates.skillsActiveMenu);
    I.checkLayout('skills', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-updates");
});

Scenario("Проверяем переходы на предыдущие Обновления", (I, aionPlayPage) => {
    I.waitForVisible(aionPlayPage.updates.prev51Page);
    I.click(aionPlayPage.updates.prev51Page);
    I.seeInCurrentUrl(aionPlayPage.updates.url50);
    I.seeInTitle(aionPlayPage.updates.title50);

    I.waitForVisible(aionPlayPage.updates.prev50Page);
    I.click(aionPlayPage.updates.prev50Page);
    I.seeInCurrentUrl(aionPlayPage.updates.url491);
    I.seeInTitle(aionPlayPage.updates.title491);

    I.waitForVisible(aionPlayPage.updates.prev491Page);
    I.click(aionPlayPage.updates.prev491Page);
    I.seeInCurrentUrl(aionPlayPage.updates.url49);
    I.seeInTitle(aionPlayPage.updates.title49);

    I.waitForVisible(aionPlayPage.updates.prev49Page);
    I.click(aionPlayPage.updates.prev49Page);
    I.seeInCurrentUrl(aionPlayPage.updates.url48);
    I.seeInTitle(aionPlayPage.updates.title48);

    I.waitForVisible(aionPlayPage.updates.prev48Page);
    I.click(aionPlayPage.updates.prev48Page);
    I.seeInCurrentUrl(aionPlayPage.updates.url475);
    I.seeInTitle(aionPlayPage.updates.title475);

    I.waitForVisible(aionPlayPage.updates.prev475Page);
    I.click(aionPlayPage.updates.prev475Page);
    I.seeInCurrentUrl(aionPlayPage.updates.url47);
    I.seeInTitle(aionPlayPage.updates.title47);
});

Scenario("Переходим на Обновление 5.0", (I, aionPlayPage) => {
    I.amOnPage(aionPlayPage.updates.url50);
    I.seeInTitle(aionPlayPage.updates.title50);
    I.checkLayout('50', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-updates");
});

Scenario("Переходим на Обновление 4.91", (I, aionPlayPage) => {
    I.amOnPage(aionPlayPage.updates.url491);
    I.seeInTitle(aionPlayPage.updates.title491);
    I.checkLayout('491', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-updates");
});

Scenario("Проверяем верстку страницы: Обновление 4.9", (I, aionPlayPage) => {
    I.amOnPage(aionPlayPage.updates.url49);
    I.seeInTitle(aionPlayPage.updates.title49);
    I.checkLayout('49', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-updates");
});

Scenario("Проверяем верстку страницы: Обновление 4.8", (I, aionPlayPage) => {
    I.amOnPage(aionPlayPage.updates.url48);
    I.seeInTitle(aionPlayPage.updates.title48);
    I.checkLayout('48', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-updates");
});

Scenario("Проверяем верстку страницы: Обновление 4.75", (I, aionPlayPage) => {
    I.amOnPage(aionPlayPage.updates.url475);
    I.seeInTitle(aionPlayPage.updates.title475);
    I.checkLayout('475', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-updates");
});

Scenario("Проверяем верстку страницы: Обновление 4.7", (I, aionPlayPage) => {
    I.amOnPage(aionPlayPage.updates.url47);
    I.seeInTitle(aionPlayPage.updates.title47);
    I.checkLayout('47', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-updates");
});
