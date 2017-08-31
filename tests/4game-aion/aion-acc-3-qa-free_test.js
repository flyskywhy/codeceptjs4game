Feature("aion-acc-3-qa-free. Тесты для страницы free Aion — сайт сообщества: переход на free-to-play.");

BeforeSuite((I) => {
    I.syncDown('4game-aion', "acc-3-qa-free");
});

Before((I, aionPlayPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(aionPlayPage.free.url);
    I.seeInTitle(aionPlayPage.free.title);
});

AfterSuite((I) => {
    I.createTar('4game-aion', "acc-3-qa-free");
    I.syncUp('4game-aion', "acc-3-qa-free");
    I.clearDir('4game-aion', "acc-3-qa-free");
})

Scenario("Проверяем верстку страницы", (I, aionPlayPage) => {
    I.checkLayout('main', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-free");
});

Scenario("Геймпанель не должна отображаться на странице", (I, aionPlayPage) => {
    I.dontSeeElement(aionPlayPage.play.gamePanel);
});

Scenario("Юзербар должен отображаться на странице", (I, genericPage) => {
    I.waitForElement(genericPage.userBar);
    I.waitForVisible(genericPage.userBar);
});

Scenario("Нажимаем кнопку Играть, проверяем переход на страницу play", (I, aionPlayPage, genericPage) => {
    I.waitForElement(aionPlayPage.free.playButton);
    I.click(aionPlayPage.free.playButton);
    I.seeInCurrentUrl(aionPlayPage.play.url);
    I.seeInTitle(aionPlayPage.play.title);
});

Scenario("Нажимаем на 2 слайд, проверяем переход и верстку страницы", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.free.slide2);
    I.click(aionPlayPage.free.slide2);
    I.waitForVisible(aionPlayPage.free.slide2Active);
    I.dontSee(aionPlayPage.free.slide1Active)
    I.checkLayout('slide2', [{
            name: "body",
            elem: aionPlayPage.free.slide2Active,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-free");
});

Scenario("Нажимаем на 3 слайд, проверяем переход и верстку страницы", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.free.slide3);
    I.click(aionPlayPage.free.slide3);
    I.waitForVisible(aionPlayPage.free.slide3Active);
    I.dontSee(aionPlayPage.free.slide1Active);
    I.checkLayout('slide3', [{
            name: "body",
            elem: aionPlayPage.free.slide3Active,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-free");
});
