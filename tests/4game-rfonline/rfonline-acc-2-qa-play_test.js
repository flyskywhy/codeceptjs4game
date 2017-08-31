Feature("rfonline-acc-2-qa-play. Тесты для страницы play - RF Online — сайт сообщества.");

BeforeSuite((I) => {
    I.syncDown('4game-rfonline', 'acc-2-qa-play');
});

Before((I, rfonlinePlayPage, genericPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(rfonlinePlayPage.url);
});

AfterSuite((I) => {
    I.createTar('4game-rfonline', 'acc-2-qa-play');
    I.syncUp('4game-rfonline', 'acc-2-qa-play');
    I.clearDir('4game-rfonline', 'acc-2-qa-play');
})

Scenario("Проверяем верстку страницы", (I, rfonlinePlayPage) => {
    I.checkLayout('main', [{
            name: 'body',
            elem: rfonlinePlayPage.content,
            exclude: rfonlinePlayPage.exclude
        }],
        0.05,
        '4game-rfonline', "acc-2-qa-play");
});

Scenario("Геймпанель должна отображаться на странице", (I, genericPage) => {
    I.waitForElement(genericPage.gamePanel.gamePanel);
    I.waitForVisible(genericPage.gamePanel.generalElement);
});

Scenario("Виджет Твиттера должен отображаться по-умолчанию", (I, rfonlinePlayPage) => {
    I.waitForElement(rfonlinePlayPage.activeTwitterButton);
    I.waitForVisible(rfonlinePlayPage.twitterFeeds);
});

Scenario("Переключение на виджет Новостей VK", (I, rfonlinePlayPage) => {
    I.waitForElement(rfonlinePlayPage.activeTwitterButton);
    I.waitForVisible(rfonlinePlayPage.playVkButton);
    I.click(rfonlinePlayPage.playVkButton);
    I.waitForVisible(rfonlinePlayPage.vkFeeds);
});

Scenario("Переключение на виджет Твиттера", (I, rfonlinePlayPage) => {
    I.waitForElement(rfonlinePlayPage.activeTwitterButton);
    I.waitForVisible(rfonlinePlayPage.playVkButton);
    I.click(rfonlinePlayPage.playVkButton);
    I.waitForVisible(rfonlinePlayPage.vkFeeds);
    I.click(rfonlinePlayPage.playTwitterButton);
    I.waitForElement(rfonlinePlayPage.activeTwitterButton);
    I.waitForVisible(rfonlinePlayPage.twitterFeeds);
});

Scenario("Переход в патчноуты по ссылке в навигационном меню", (I, rfonlinePlayPage, rfonlinePatchnotesPage) => {
    I.waitForVisible(rfonlinePlayPage.notesLink);
    I.click(rfonlinePlayPage.notesLink);
    I.seeInTitle(rfonlinePatchnotesPage.title);
    I.seeInCurrentUrl(rfonlinePatchnotesPage.url);
});

Scenario("Переход в Представители Рас по ссылке в навигационном меню", (I, rfonlinePlayPage, rfonlineRatingsPage) => {
    I.waitForVisible(rfonlinePlayPage.ratingsLink);
    I.click(rfonlinePlayPage.ratingsLink);
    I.seeInTitle(rfonlineRatingsPage.title);
    I.seeInCurrentUrl(rfonlineRatingsPage.url);
});


Scenario("Открываем Форум в навигационном меню", (I, rfonlinePlayPage) => {
    I.waitForVisible(rfonlinePlayPage.forumLink);
    I.click(rfonlinePlayPage.forumLink);
    I.seeInTitle(rfonlinePlayPage.forumTitle);
    I.seeInCurrentUrl("https://4gameforum.com/categories/593/");
});

Scenario("Открываем Промосайт в навигационном меню", (I, rfonlinePlayPage, rfonlineInstallPage) => {
    I.waitForVisible(rfonlinePlayPage.promoLink);
    I.click(rfonlinePlayPage.promoLink);
    I.seeInTitle(rfonlineInstallPage.title);
    I.seeInCurrentUrl(rfonlineInstallPage.url);
});
