/**
 * Тесты главной страницы
 */

Feature('4gamer-acc-1-qa-index-page. Тесты главной страницы.');

Before((I, indexPage) => {
    I.amOnPage('/');
    I.seeInTitle(indexPage.index.title);
    I.seeElement(indexPage.index.pageSelector);
});

// Тесты верстки нужно отладить, очень много всего на странице
xScenario('Проверяем верстку страницы', (I, indexPage) => {
    I.checkLayout('4gamer-acc-1-qa-index-page', [{
            name: 'body',
            elem: indexPage.allContentSelector,
        }],
        0.05,
        '4gamer', "reference");
});

Scenario('Открываем первую новость в хедере, проверяем соответствующий урл', function*(I, indexPage, mediaPage) {
    I.seeElement(indexPage.index.headerNews);
    I.waitForEnabled(indexPage.index.headerFirstNews);
    I.click(indexPage.index.headerFirstNews);
    I.waitForVisible(mediaPage.header);
    I.dontSeeInTitle(indexPage.index.title);
    var url = yield I.grabAttributeFrom(indexPage.index.headerFirstNews, 'href');
    I.seeInCurrentUrl(url);
});

Scenario('Открываем среднюю новость в хедере, проверяем соответствующий урл', function*(I, indexPage, mediaPage) {
    I.seeElement(indexPage.index.headerNews);
    I.click(indexPage.index.headerMiddleNews);
    I.waitForVisible(mediaPage.header);
    I.dontSeeInTitle(indexPage.index.title);
    var url = yield I.grabAttributeFrom(indexPage.index.headerMiddleNews, 'href');
    I.seeInCurrentUrl(url);
});

Scenario('Открываем последнюю новость в хедере, проверяем соответствующий урл', function*(I, indexPage, mediaPage) {
    I.seeElement(indexPage.index.headerNews);
    I.click(indexPage.index.headerLastNews);
    I.waitForVisible(mediaPage.header);
    I.dontSeeInTitle(indexPage.index.title);
    var url = yield I.grabAttributeFrom(indexPage.index.headerLastNews, 'href');
    I.seeInCurrentUrl(url);
});

Scenario('Проверяем переход на страницу Новости через главное меню, проверяем наличие новостей и соответствющий урл', (I, headerMenu, indexPage) => {
    I.seeElement(headerMenu.allMenu);
    I.seeElement(headerMenu.newsLink);
    I.click(headerMenu.newsLink);
    I.waitForElement(indexPage.news.pageSelector);
    I.seeInCurrentUrl('news');
});

Scenario('Проверяем переход на страницу Статьи через главное меню, проверяем наличие статей и соответствющий урл', (I, headerMenu, indexPage) => {
    I.seeElement(headerMenu.allMenu);
    I.waitForEnabled(headerMenu.articlesLink);
    I.click(headerMenu.articlesLink);
    I.waitForElement(indexPage.articles.pageSelector);
    I.seeInCurrentUrl('articles');
});

Scenario('Проверяем переход на страницу Видео через главное меню, проверяем наличие видео и соответствющий урл', (I, headerMenu, indexPage) => {
    I.seeElement(headerMenu.allMenu);
    I.waitForEnabled(headerMenu.videoLink);
    I.click(headerMenu.videoLink);
    I.waitForElement(indexPage.video.pageSelector);
    I.seeInCurrentUrl('video');
});

Scenario('Переход по ссылке в хедере О нас, проверяем что статья открылась и урл', (I, indexPage, mediaPage) => {
    I.waitForEnabled(indexPage.siteHeaderLink);
    I.click(indexPage.siteHeaderLink);
    I.waitForVisible(mediaPage.header);
    I.seeInCurrentUrl('about');
});

Scenario('Переход в паблик по ссылке в хедере Наш паблик ВКонтакте, проверяем, что открывается паблик 4game', (I, socialWidget, indexPage, mediaPage) => {
    I.waitForEnabled(socialWidget.headerVkPublic);
    I.click(socialWidget.headerVkPublic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.dontSeeElement(indexPage.index.pageSelector);
    I.seeInCurrentUrl("vk.com/4game");
});

Scenario('Переход в паблик по ссылке в футере Наш паблик ВКонтакте, проверяем, что открывается паблик 4game', (I, socialWidget, indexPage, mediaPage) => {
    I.waitForElement(socialWidget.footerVkPublic);
    I.click(socialWidget.footerVkPublic);
    I.waitForVisible(mediaPage.body);
    I.seeInCurrentUrl("vk.com/4game");
});

Scenario('Нажимаем Поделиться в неавторизованном ВК, проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, indexPage, socialWidget, mediaPage) => {
    I.waitForEnabled(socialWidget.footerVkButton);
    I.click(socialWidget.footerVkButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.decodeUrlAndCompare('https://oauth.vk.com/authorize?client_id=-1&redirect_uri=https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/&title=Фогеймер — об играх без воды и рекламы&display=widget');
});

Scenario('Нажимаем Поделиться в неавторизованном Fb, проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, indexPage, socialWidget, mediaPage) => {
    I.waitForEnabled(socialWidget.footerFbButton);
    I.click(socialWidget.footerFbButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/', 15);
});

Scenario('Переход на Фогейм Игры, проверяем, что ушли с текущей страницы и урл', (I, indexPage, mediaPage) => {
    I.waitForEnabled(indexPage.forgameLink);
    I.click(indexPage.forgameLink);
    I.waitForVisible(mediaPage.body);
    I.dontSeeElement(indexPage.index.pageSelector);
    I.seeInCurrentUrl(indexPage.urlGame);
});
