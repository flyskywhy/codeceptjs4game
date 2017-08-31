Feature("pointblank-acc-3-qa-daily-events. Тесты для виджета и страницы Задание дня.");

BeforeSuite((I) => {
    I.syncDown('4game-pointblank', "acc-3-qa-daily-events");
});

Before((I, pointblankPlayPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(pointblankPlayPage.url);
    I.seeInTitle(pointblankPlayPage.title);

});

AfterSuite((I) => {
    I.createTar('4game-pointblank', "acc-3-qa-daily-events");
    I.syncUp('4game-pointblank', "acc-3-qa-daily-events");
    I.clearDir('4game-pointblank', "acc-3-qa-daily-events");
})

Scenario("Проверяем переход на страницу дейликов из виджета", (I, dailyPage) => {
    I.waitForElement(dailyPage.vidget.eventsElement);
    I.waitForVisible(dailyPage.vidget.eventsElement);
    I.click(dailyPage.vidget.eventsElement);
    I.seeInCurrentUrl(dailyPage.vidget.url);
    I.waitForText(dailyPage.vidget.text);
});

Scenario("Проверяем выделение первого задания с помощью навигации", (I, dailyPage) => {
    I.waitForElement(dailyPage.vidget.eventsElement);
    I.waitForVisible(dailyPage.vidget.firstControl);
    I.click(dailyPage.vidget.firstControl);
    I.waitForVisible(dailyPage.vidget.firstActiveControl);
    I.waitForVisible(dailyPage.vidget.firstActiveEvent);
});

Scenario("Проверяем выделение второго задания с помощью навигации", (I, dailyPage) => {
    I.waitForElement(dailyPage.vidget.eventsElement);
    I.waitForVisible(dailyPage.vidget.secondControl);
    I.click(dailyPage.vidget.secondControl);
    I.waitForVisible(dailyPage.vidget.secondActiveControl);
    I.waitForVisible(dailyPage.vidget.secondActiveEvent);
});

Scenario("Проверяем выделение третьего задания с помощью навигации", (I, dailyPage) => {
    I.waitForElement(dailyPage.vidget.eventsElement);
    I.waitForVisible(dailyPage.vidget.lastControl);
    I.click(dailyPage.vidget.lastControl);
    I.waitForVisible(dailyPage.vidget.lastActiveControl);
    I.waitForVisible(dailyPage.vidget.lastActiveEvent);
});

Scenario("Проверяем выделение первого задания с помощью плитки", (I, dailyPage) => {
    I.waitForElement(dailyPage.vidget.eventsElement);
    I.waitForVisible(dailyPage.vidget.firstEvent);
    I.click(dailyPage.vidget.firstEvent);
    I.waitForVisible(dailyPage.vidget.firstActiveEvent);
    I.waitForVisible(dailyPage.vidget.firstActiveControl);
});

Scenario("Проверяем выделение второго задания с помощью плитки", (I, dailyPage) => {
    I.waitForElement(dailyPage.vidget.eventsElement);
    I.waitForVisible(dailyPage.vidget.secondEvent);
    I.click(dailyPage.vidget.secondEvent);
    I.waitForVisible(dailyPage.vidget.secondActiveEvent);
    I.waitForVisible(dailyPage.vidget.secondActiveControl);
});

Scenario("Проверяем выделение третьего задания с помощью плитки", (I, dailyPage) => {
    I.waitForElement(dailyPage.vidget.eventsElement);
    I.waitForVisible(dailyPage.vidget.secondControl);
    I.click(dailyPage.vidget.secondControl);
    I.waitForVisible(dailyPage.vidget.lastEvent);
    I.click(dailyPage.vidget.lastEvent);
    I.waitForVisible(dailyPage.vidget.lastActiveEvent);
    I.waitForVisible(dailyPage.vidget.lastActiveControl);
});

Scenario("Открываем попап для авторизации при клике на ссылку в плите", (I, dailyPage, genericPage) => {
    I.waitForElement(dailyPage.vidget.authLink);
    I.click(dailyPage.vidget.authLink);
    I.waitForElement(genericPage.authPopup);
});

Scenario("Закрываем информацию о задании дня", (I, dailyPage) => {
    I.waitForElement(dailyPage.vidget.closeInfoButton);
    I.click(dailyPage.vidget.closeInfoButton);
    I.waitForElement(dailyPage.vidget.collapsedInfoButton);
});

Scenario("Открываем информацию о задании дня, после закрытия", (I, dailyPage) => {
    I.waitForElement(dailyPage.vidget.closeInfoButton);
    I.click(dailyPage.vidget.closeInfoButton);
    I.dontSee(dailyPage.vidget.closeInfoButton);
    I.waitForElement(dailyPage.vidget.collapsedInfoButton);
    I.click(dailyPage.vidget.collapsedInfoButton);
    I.dontSee(dailyPage.vidget.collapsedInfoButton);
    I.waitForElement(dailyPage.vidget.closeInfoButton);
});

Scenario("После закрытия информации и обновления страницы информации нет", (I, pointblankPlayPage, dailyPage) => {
    I.waitForElement(dailyPage.vidget.closeInfoButton);
    I.click(dailyPage.vidget.closeInfoButton);
    I.waitForElement(dailyPage.vidget.collapsedInfoButton);
    I.amOnPage(pointblankPlayPage.url);
    I.seeInTitle(pointblankPlayPage.title);
    I.waitForElement(dailyPage.vidget.collapsedInfoButton);
});

Scenario("Проверяем верстку страницы", (I, dailyPage, genericPage) => {
    I.amOnPage(dailyPage.url);
    I.seeInTitle(dailyPage.title);
    I.checkLayout('main', [{
            name: 'body',
            elem: genericPage.content,
            exclude: genericPage.exclude
        }],
        0.05,
        '4game-pointblank', "acc-3-qa-daily-events");
});

Scenario("Проверяем переход на страницу игры", (I, dailyPage, pointblankPlayPage) => {
    I.amOnPage(dailyPage.url);
    I.seeInTitle(dailyPage.title);
    I.waitForElement(dailyPage.gameLink);
    I.click(dailyPage.gameLink);
    I.seeInCurrentUrl(pointblankPlayPage.url);
    I.seeInTitle(pointblankPlayPage.title);
});

Scenario("Проверяем открытие попапа для авторизации на странице дейликов в виджете", (I, dailyPage, genericPage) => {
    I.amOnPage(dailyPage.url);
    I.seeInTitle(dailyPage.title);
    I.waitForElement(dailyPage.authLink);
    I.click(dailyPage.authLink);
    I.waitForElement(genericPage.authPopup);
});

Scenario("Переход на страницу Часто Задаваемые Вопросы", (I, dailyPage) => {
    I.amOnPage(dailyPage.url);
    I.seeInTitle(dailyPage.title);
    I.waitForElement(dailyPage.FAQLink);
    I.click(dailyPage.FAQLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForText("Ежедневные задания");
    I.seeInCurrentUrl("page-10924683_50322656");
});
