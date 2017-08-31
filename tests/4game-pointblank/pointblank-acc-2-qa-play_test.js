Feature("pointblank-acc-2-qa-play. Тесты для страницы play - Point Blank — сайт сообщества.");

BeforeSuite((I) => {
    I.syncDown('4game-pointblank', "acc-2-qa-play");
});

Before((I, pointblankPlayPage, genericPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(pointblankPlayPage.url);
    I.seeInTitle(pointblankPlayPage.title);
    I.waitForElement(genericPage.userBar);

});

AfterSuite((I) => {
    I.createTar('4game-pointblank', "acc-2-qa-play");
    I.syncUp('4game-pointblank', "acc-2-qa-play");
    I.clearDir('4game-pointblank', "acc-2-qa-play");
})

Scenario("Проверяем верстку страницы", (I, pointblankPlayPage, genericPage) => {
    I.checkLayout('main', [{
            name: 'body',
            elem: pointblankPlayPage.content,
            exclude: genericPage.exclude
        }],
        0.05,
        '4game-pointblank', "acc-2-qa-play");
});

Scenario("Геймпанель должна отображаться на странице", (I, genericPage) => {
    I.waitForElement(genericPage.gamePanel.gamePanel);
    I.waitForVisible(genericPage.gamePanel.generalElement);
});

Scenario("Виджет Новостей Вконтакте должен отображаться", (I, pointblankPlayPage) => {
    I.waitForElement(pointblankPlayPage.activeVkButton);
    I.waitForVisible(pointblankPlayPage.vkFeeds);
});

Scenario("Переключение на виджет Новостей Esport", (I, pointblankPlayPage) => {
    I.waitForElement(pointblankPlayPage.activeVkButton);
    I.waitForVisible(pointblankPlayPage.playEsportButton);
    I.click(pointblankPlayPage.playEsportButton);
    I.waitForElement(pointblankPlayPage.activeVkEsportButton);
    I.waitForVisible(pointblankPlayPage.vkEsportFeeds);
});

Scenario("Переключение на виджет Новостей Вконтакте", (I, pointblankPlayPage) => {
    I.waitForElement(pointblankPlayPage.activeVkButton);
    I.waitForVisible(pointblankPlayPage.playEsportButton);
    I.click(pointblankPlayPage.playEsportButton);
    I.waitForElement(pointblankPlayPage.activeVkEsportButton);
    I.waitForVisible(pointblankPlayPage.vkEsportFeeds);
    I.click(pointblankPlayPage.playVkButton);
    I.waitForElement(pointblankPlayPage.activeVkButton);
    I.waitForVisible(pointblankPlayPage.vkFeeds);
});

Scenario("Переход в Тир Удачи по ссылке в навигационном меню", (I, pointblankPlayPage, pointblankShootingPage) => {
    I.waitForElement(pointblankPlayPage.shootingLink);
    I.waitForVisible(pointblankPlayPage.shootingLink);
    I.click(pointblankPlayPage.shootingLink);
    I.seeInTitle(pointblankShootingPage.title);
    I.seeInCurrentUrl(pointblankShootingPage.url);
});

Scenario("Переход в Рейтинги кланов по ссылке в навигационном меню", (I, pointblankPlayPage, pointblankRatingsPage) => {
    I.waitForElement(pointblankPlayPage.ratingsLink);
    I.waitForVisible(pointblankPlayPage.ratingsLink);
    I.click(pointblankPlayPage.ratingsLink);
    I.seeInTitle(pointblankRatingsPage.title);
    I.seeInCurrentUrl(pointblankRatingsPage.url);
});

Scenario("Открываем Привести Друга в навигационном меню", (I, pointblankPlayPage) => {
    I.waitForElement(pointblankPlayPage.summonLink);
    I.waitForVisible(pointblankPlayPage.summonLink);
    I.click(pointblankPlayPage.summonLink);
    I.seeInTitle(pointblankPlayPage.summonTitle);
    I.seeInCurrentUrl("/summon/");
});

Scenario("Открываем Турниры в навигационном меню", (I, pointblankPlayPage) => {
    I.waitForElement(pointblankPlayPage.arenaLink);
    I.waitForVisible(pointblankPlayPage.arenaLink);
    I.click(pointblankPlayPage.arenaLink);
    I.seeInTitle(pointblankPlayPage.arenaTitle);
    I.seeInCurrentUrl("/arena");
});

Scenario("Открываем Форум в навигационном меню", (I, pointblankPlayPage) => {
    I.waitForElement(pointblankPlayPage.forumLink);
    I.waitForVisible(pointblankPlayPage.forumLink);
    I.click(pointblankPlayPage.forumLink);
    I.seeInTitle(pointblankPlayPage.forumTitle);
    I.seeInCurrentUrl("/4gameforum.com/categories/1112/");
});

Scenario("Открываем Промосайт в навигационном меню", (I, pointblankPlayPage, pointblankInstallPage) => {
    I.waitForElement(pointblankPlayPage.promoLink);
    I.waitForVisible(pointblankPlayPage.promoLink);
    I.click(pointblankPlayPage.promoLink);
    I.seeInTitle(pointblankInstallPage.title);
    I.seeInCurrentUrl(pointblankInstallPage.url);
});
