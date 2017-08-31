/**
 * Тесты для страницы со списком новостей
 */

Feature('4gamer-acc-1-qa-news. Тесты для страницы со списком новостей.');

Before((I, indexPage) => {
    I.amOnPage(indexPage.news.url);
    I.seeInTitle(indexPage.news.title);
    // I.seeElement(indexPage.news.pageSelector);
});

// Тесты верстки нужно отладить, очень много всего на странице
xScenario('Проверяем верстку страницы новостей исключая динамический контент', (I, indexPage) => {
    I.checkLayout('4gamer-acc-1-qa-news', [{
            name: 'body',
            exclude: [indexPage.news.pageSelector, indexPage.gridTitle, indexPage.vkWidget]
        }],
        0.05,
        '4gamer', "reference");
});

Scenario('Проверяем переход на страницу Видео через меню, проверяем наличие видео и соответствющий урл', (I, headerMenu, indexPage) => {
    I.seeElement(headerMenu.allMenu);
    I.waitForEnabled(headerMenu.videoLink);
    I.click(headerMenu.videoLink);
    I.waitForElement(indexPage.video.pageSelector);
    I.seeInCurrentUrl(indexPage.video.url);
});

Scenario('Проверяем переход на страницу Статьи через главное меню, проверяем наличие статей и соответствющий урл', (I, headerMenu, indexPage) => {
    I.seeElement(headerMenu.allMenu);
    I.waitForEnabled(headerMenu.articlesLink);
    I.click(headerMenu.articlesLink);
    I.waitForElement(indexPage.articles.pageSelector);
    I.seeInCurrentUrl(indexPage.articles.url);
});

Scenario('Переход по ссылке в хедере О нас, проверяем что статья открылась и урл', (I, indexPage, mediaPage) => {
    I.waitForEnabled(indexPage.siteHeaderLink);
    I.click(indexPage.siteHeaderLink);
    I.waitForVisible(mediaPage.header);
    I.seeInCurrentUrl('about');
});

Scenario('Переход в паблик по ссылке в хедере Наш паблик ВКонтакте', (I, socialWidget, indexPage, mediaPage) => {
    I.waitForEnabled(socialWidget.headerVkPublic);
    I.click(socialWidget.headerVkPublic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.dontSeeElement(indexPage.news.pageSelector);
    I.seeInCurrentUrl("vk.com/4game");
});

Scenario('Переход в паблик по ссылке в футере Наш паблик ВКонтакте, проверяем, что открывается паблик 4game', (I, socialWidget, indexPage, mediaPage) => {
    I.waitForElement(socialWidget.footerVkPublic);
    I.click(socialWidget.footerVkPublic);
    I.waitForVisible(mediaPage.body);
    I.seeInCurrentUrl("vk.com/4game");
});

Scenario('Нажимаем Поделиться в неавторизованном ВК, проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, indexPage, socialWidget, mediaPage) => {
    I.seeElement(socialWidget.footerVkButton);
    I.click(socialWidget.footerVkButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.decodeUrlAndCompare('https://oauth.vk.com/authorize?client_id=-1&redirect_uri=https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/&title=Фогеймер — об играх без воды и рекламы&display=widget');
});

Scenario('Нажимаем Поделиться в неавторизованном Fb, проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, indexPage, socialWidget, mediaPage) => {
    I.seeElement(socialWidget.footerFbButton);
    I.click(socialWidget.footerFbButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/', 15);
});

Scenario('Переход на Фогейм Игры, проверяем, что ушли с текущей страницы и урл', (I, indexPage, mediaPage) => {
    I.seeElement(indexPage.forgameLink);
    I.click(indexPage.forgameLink);
    I.waitForVisible(mediaPage.body);
    I.dontSeeElement(indexPage.news.pageSelector);
    I.seeInCurrentUrl(indexPage.urlGame);
});
