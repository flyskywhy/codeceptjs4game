/**
 * Тесты для страницы со списком видео
 */

Feature('4gamer-acc-1-qa-video. Тесты для страницы со списком видео.');

Before((I, indexPage) => {
    I.amOnPage(indexPage.video.url);
    I.seeInTitle(indexPage.video.title);
    I.seeElement(indexPage.video.pageSelector);
});

Scenario('Проверяем верстку страницы видео исключая динамический контент', (I, indexPage) => {
    I.checkLayout('4gamer-acc-1-qa-video', [{
            name: 'body',
            exclude: [indexPage.video.pageSelector, indexPage.gridTitle, indexPage.vkWidget]
        }],
        0.05,
        '4gamer', "reference");
});

Scenario('Проверяем отображение одного из видео', (I, indexPage) => {
    I.seeElement(indexPage.video.firstVideoSelector);
    I.seeElement(indexPage.video.firstVideoText);
    I.seeElement(indexPage.video.firstVideoCount);
});

Scenario('Проверяем заголовок первого видео', function*(I, indexPage, mediaPage) {
    I.waitForVisible(indexPage.video.firstVideoSelector);
    I.seeElement(indexPage.video.firstVideoText);
    var text = yield I.grabTextFrom(indexPage.video.firstVideoText);
    I.click(indexPage.video.firstVideoSelector);
    I.waitForElement(mediaPage.header);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Проверяем просмотры первого видео', function*(I, indexPage, mediaPage) {
    I.waitForVisible(indexPage.video.firstVideoSelector);
    I.seeElement(indexPage.video.firstVideoCount);
    var expected = yield I.grabTextFrom(indexPage.video.firstVideoCount);
    parseInt(expected, 2);
    I.click(indexPage.video.firstVideoSelector);
    I.waitForElement(mediaPage.viewCountElement);
    var actual = yield I.grabTextFrom(mediaPage.viewCountElement);
    parseInt(actual, 2);
    I.textShouldBeSameAs(actual, expected);
});

Scenario('Проверяем переход на страницу Новости через меню', (I, headerMenu, indexPage) => {
    I.seeElement(headerMenu.allMenu);
    I.waitForEnabled(headerMenu.newsLink);
    I.click(headerMenu.newsLink);
    I.waitForElement(indexPage.news.pageSelector);
    I.seeInCurrentUrl(indexPage.news.url);
});

Scenario('Проверяем переход на страницу Статьи через главное меню', (I, headerMenu, indexPage) => {
    I.seeElement(headerMenu.allMenu);
    I.waitForEnabled(headerMenu.articlesLink);
    I.click(headerMenu.articlesLink);
    I.waitForElement(indexPage.articles.pageSelector);
    I.seeInCurrentUrl(indexPage.articles.url);
});

Scenario('Переход по ссылке в хедере О нас', (I, indexPage, mediaPage) => {
    I.waitForEnabled(indexPage.index.siteHeaderLink);
    I.click(indexPage.index.siteHeaderLink);
    I.waitForElement(mediaPage.header);
    I.seeInCurrentUrl('about');
});

Scenario('Переход в паблик по ссылке в хедере Наш паблик ВКонтакте', (I, socialWidget, indexPage, mediaPage) => {
    I.waitForEnabled(socialWidget.headerVkPublic);
    I.click(socialWidget.headerVkPublic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.dontSeeElement(indexPage.video.pageSelector);
    I.seeInCurrentUrl("vk.com/4game");
});

Scenario('Переход в паблик по ссылке в футере Наш паблик ВКонтакте', (I, socialWidget, indexPage, mediaPage) => {
    I.waitForElement(socialWidget.footerVkPublic);
    I.click(socialWidget.footerVkPublic);
    I.waitForVisible(mediaPage.body);
    I.seeInCurrentUrl("vk.com/4game");
});

Scenario('Нажимаем Поделиться в неавторизованном ВК', (I, indexPage, socialWidget, mediaPage) => {
    I.seeElement(socialWidget.footerVkButton);
    I.click(socialWidget.footerVkButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.decodeUrlAndCompare('https://oauth.vk.com/authorize?client_id=-1&redirect_uri=https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/&title=Фогеймер — об играх без воды и рекламы&display=widget');
});

Scenario('Нажимаем Поделиться в неавторизованном Fb', (I, indexPage, socialWidget, mediaPage) => {
    I.seeElement(socialWidget.footerFbButton);
    I.click(socialWidget.footerFbButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/', 15);
});

Scenario('Переход на Фогейм Игры', (I, indexPage, mediaPage) => {
    I.seeElement(indexPage.forgameLink);
    I.click(indexPage.forgameLink);
    I.waitForVisible(mediaPage.body);
    I.dontSeeElement(indexPage.video.pageSelector);
    I.seeInCurrentUrl(indexPage.urlGame);
});
