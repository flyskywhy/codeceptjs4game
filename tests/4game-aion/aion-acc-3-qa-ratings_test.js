Feature("aion-acc-3-qa-ratings. Тесты для страницы ratings Aion — сайт сообщества: рейтинги.");

BeforeSuite((I) => {
    I.syncDown('4game-aion', "acc-3-qa-ratings");
});

Before((I, aionPlayPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(aionPlayPage.ratings.url);
    I.seeInTitle(aionPlayPage.ratings.title);
});

AfterSuite((I) => {
    I.createTar('4game-aion', "acc-3-qa-ratings");
    I.syncUp('4game-aion', "acc-3-qa-ratings");
    I.clearDir('4game-aion', "acc-3-qa-ratings");
})

Scenario("Проверяем верстку страницы", (I, aionPlayPage) => {
    I.checkLayout('main', [{
            name: 'body',
            elem: ".pRatings--header",
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-ratings");
});

Scenario("Геймпанель не должна отображаться на странице", (I, aionPlayPage) => {
    I.dontSeeElement(aionPlayPage.play.gamePanel);
});

Scenario("Юзербар должен отображаться на странице", (I, genericPage) => {
    I.waitForElement(genericPage.userBar);
    I.waitForVisible(genericPage.userBar);
});

Scenario("Нажимаем PvP, проверяем сортировку", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.ratings.pvpButton);
    I.dontSeeElement(aionPlayPage.ratings.pvpActiveElement);
    I.click(aionPlayPage.ratings.pvpButton);
    I.waitForElement(aionPlayPage.ratings.pvpActiveElement);
});

Scenario("Нажимаем Опыт, проверяем сортировку", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.ratings.experienceButton);
    I.dontSeeElement(aionPlayPage.ratings.experienceActiveElement);
    I.click(aionPlayPage.ratings.experienceButton);
    I.waitForElement(aionPlayPage.ratings.experienceActiveElement);
});

Scenario("Проверяем сортировку по кнопке Слава после перехода на Опыт", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.ratings.experienceButton);
    I.click(aionPlayPage.ratings.experienceButton);
    I.waitForElement(aionPlayPage.ratings.reputationButton);
    I.dontSeeElement(aionPlayPage.ratings.reputationActiveElement);
    I.click(aionPlayPage.ratings.reputationButton);
    I.waitForElement(aionPlayPage.ratings.reputationActiveElement);
});

Scenario("Проверяем работу выпадающего списка Сервер", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.ratings.server);
    I.dontSeeElement(aionPlayPage.ratings.serverPopup);
    I.click(aionPlayPage.ratings.server);
    I.waitForElement(aionPlayPage.ratings.serverPopup);
    I.waitForVisible(aionPlayPage.ratings.serverPopup);
});

Scenario("Проверяем работу выпадающего списка Расы", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.ratings.rases);
    I.dontSeeElement(aionPlayPage.ratings.rasesPopup);
    I.click(aionPlayPage.ratings.rases);
    I.waitForElement(aionPlayPage.ratings.rasesPopup);
    I.waitForVisible(aionPlayPage.ratings.rasesPopup);
});

Scenario("Проверяем работу выпадающего списка Классы", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.ratings.classes);
    I.dontSeeElement(aionPlayPage.ratings.classesPopup);
    I.click(aionPlayPage.ratings.classes);
    I.waitForElement(aionPlayPage.ratings.classesPopup);
    I.waitForVisible(aionPlayPage.ratings.classesPopup);
});
