Feature("aion-acc-2-qa-play. Тесты для страницы play Aion — сайт сообщества.");

BeforeSuite((I) => {
    I.syncDown('4game-aion', "acc-2-qa-play");
});

Before((I, aionPlayPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(aionPlayPage.play.url);
    I.seeInTitle(aionPlayPage.play.title);
});

AfterSuite((I) => {
    I.createTar('4game-aion', "acc-2-qa-play");
    I.syncUp('4game-aion', "acc-2-qa-play");
    I.clearDir('4game-aion', "acc-2-qa-play");
})

Scenario("Проверяем верстку страницы", (I, aionPlayPage) => {
    I.checkLayout('main', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-2-qa-play");
});

Scenario("Геймпанель должна отображаться на странице", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.play.gamePanel);
    I.waitForVisible(aionPlayPage.play.gamePanel);
});

Scenario("Юзербар должен отображаться на странице", (I, genericPage) => {
    I.waitForElement(genericPage.userBar);
    I.waitForVisible(genericPage.userBar);
});

Scenario("Виджет Новостей Вконтакте должен отображаться", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.play.activeVkButton);
    I.waitForVisible(aionPlayPage.play.vkFeeds);
});

Scenario("Переключение на виджет Новостей Твиттера", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.play.activeVkButton);
    I.waitForVisible(aionPlayPage.play.playTwitterButton);
    I.click(aionPlayPage.play.playTwitterButton);
    I.waitForElement(aionPlayPage.play.activeTwitterButton);
    I.waitForVisible(aionPlayPage.play.twitterFeeds);
});

Scenario("Переключение на виджет Новостей Вконтакте", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.play.activeVkButton);
    I.waitForVisible(aionPlayPage.play.playTwitterButton);
    I.click(aionPlayPage.play.playTwitterButton);
    I.waitForElement(aionPlayPage.play.activeTwitterButton);
    I.waitForVisible(aionPlayPage.play.twitterFeeds);
    I.click(aionPlayPage.play.playVkButton);
    I.waitForElement(aionPlayPage.play.activeVkButton);
    I.waitForVisible(aionPlayPage.play.vkFeeds);
});

Scenario("Нажимаем Показать в Твиттере", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.play.activeVkButton);
    I.waitForVisible(aionPlayPage.play.playTwitterButton);
    I.click(aionPlayPage.play.playTwitterButton);
    I.waitForElement(aionPlayPage.play.activeTwitterButton);
    I.switchTo(aionPlayPage.play.twitterIframe);
    I.click(aionPlayPage.play.openTwitterButton);
    I.changeTab(2);
    I.waitForVisible(aionPlayPage.play.body);
    I.waitInUrl("https://twitter.com/aion_ru?", 15);
});

Scenario("Проверяем переход в Акции", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.menu.discount);
    I.click(aionPlayPage.menu.discount);
    I.waitForElement(aionPlayPage.discount.activeElement);
    I.dontSeeElementInDOM(aionPlayPage.menu.discount);
    I.seeInCurrentUrl(aionPlayPage.discount.url);
});

Scenario("Проверяем переход в Рейтинги", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.menu.ratings);
    I.click(aionPlayPage.menu.ratings);
    I.waitForElement(aionPlayPage.ratings.activeElement);
    I.dontSeeElementInDOM(aionPlayPage.menu.ratings);
    I.seeInCurrentUrl(aionPlayPage.ratings.url);
});

Scenario("Проверяем переход в Обновления", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.menu.updates);
    I.click(aionPlayPage.menu.updates);
    I.waitForElement(aionPlayPage.updates.activeElement);
    I.dontSeeElementInDOM(aionPlayPage.menu.updates);
    I.seeInCurrentUrl(aionPlayPage.updates.url);
});

Scenario("Проверяем переход в Играй Бесплатно", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.menu.free);
    I.click(aionPlayPage.menu.free);
    I.waitForElement(aionPlayPage.free.activeElement);
    I.dontSeeElementInDOM(aionPlayPage.menu.free);
    I.seeInCurrentUrl(aionPlayPage.free.url);
});

Scenario("Проверяем переход в Привести друга", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.menu.summon);
    I.click(aionPlayPage.menu.summon);
    I.waitForElement(aionPlayPage.play.body);
    I.dontSeeElementInDOM(aionPlayPage.menu.summon);
    I.seeInCurrentUrl("summon");
});

Scenario("Проверяем переход в Форум", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.menu.forum);
    I.click(aionPlayPage.menu.forum);
    I.waitForElement(aionPlayPage.play.body);
    I.dontSeeElementInDOM(aionPlayPage.menu.forum);
    I.seeInCurrentUrl("https://4gameforum.com/categories/484/");
});

Scenario("Проверяем переход в Промосайт", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.menu.install);
    I.click(aionPlayPage.menu.install);
    I.waitForElement(aionPlayPage.play.body);
    I.dontSeeElementInDOM(aionPlayPage.menu.install);
    I.seeInCurrentUrl("aion/install/");
});

Scenario("Проверяем переход в Магазин", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.menu.store);
    I.click(aionPlayPage.menu.store);
    I.waitForElement(aionPlayPage.play.body);
    I.dontSeeElementInDOM(aionPlayPage.menu.store);
    I.seeInCurrentUrl("https://ru-store.4game.com/aion/store/index.html");
});

Scenario("Проверяем ховер товара в блоке Магазин", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.play.gameStoreFirstItem);
    I.moveCursorTo(aionPlayPage.play.gameStoreFirstItem);
    I.waitForVisible(aionPlayPage.play.gameStoreFirstItemDescription);
});
