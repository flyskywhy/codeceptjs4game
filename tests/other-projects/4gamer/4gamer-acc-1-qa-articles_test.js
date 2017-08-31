/**
 * Тесты для страницы со списком статей
 */

Feature('4gamer-acc-1-qa-articles. Тесты для страницы со списком статей.');

Before((I, indexPage) => {
    I.amOnPage(indexPage.articles.url);
    I.seeInTitle(indexPage.articles.title);
    I.seeElement(indexPage.articles.pageSelector);
});

// Тесты верстки нужно отладить, очень много всего на странице
Scenario('Проверяем верстку страницы статей исключая динамический контент', (I, indexPage) => {
    I.checkLayout('4gamer-acc-1-qa-articles', [{
            name: 'body',
            exclude: [indexPage.articles.pageSelector, indexPage.gridTitle, indexPage.vkWidget]
        }],
        0.05,
        '4gamer', "reference");
});

Scenario('Проверяем отображение первой статьи на странице, наличие статьи, тега, заголовка и просмотров', (I, indexPage) => {
    I.seeElement(indexPage.articles.firstArticleSelector);
    I.seeElement(indexPage.articles.firstArticleTag);
    I.seeElement(indexPage.articles.firstArticleText);
    I.seeElement(indexPage.articles.firstArticleViewCount);
});

Scenario('Проверяем заголовок первой статьи, берем текст заголовка, открываем статьи и сравниваем значения', function*(I, indexPage, mediaPage) {
    I.waitForVisible(indexPage.articles.firstArticleSelector);
    I.seeElement(indexPage.articles.firstArticleText);
    var text = yield I.grabTextFrom(indexPage.articles.firstArticleText);
    I.click(indexPage.articles.firstArticleSelector);
    I.waitForVisible(mediaPage.header);
    I.waitForText(text);
});

Scenario('Проверяем просмотры статьи, смотрим кол-во просмотров, открываем страницу и сравниваем значения', function*(I, indexPage, mediaPage) {
    I.waitForVisible(indexPage.articles.firstArticleSelector);
    I.seeElement(indexPage.articles.firstArticleViewCount);
    var expected = yield I.grabTextFrom(indexPage.articles.firstArticleViewCount);
    parseInt(expected, 2);
    I.click(indexPage.articles.firstArticleSelector);
    I.waitForVisible(mediaPage.viewCountElement);
    var actual = yield I.grabTextFrom(mediaPage.viewCountElement);
    parseInt(actual, 2);
    I.textShouldBeSameAs(actual, expected);
});

Scenario('Проверяем переход на страницу Новости через меню, проверяем наличие новостей и соответствющий урл', (I, headerMenu, indexPage) => {
    I.seeElement(headerMenu.allMenu);
    I.waitForEnabled(headerMenu.newsLink);
    I.click(headerMenu.newsLink);
    I.waitForElement(indexPage.news.pageSelector);
    I.seeInCurrentUrl(indexPage.news.url);
});

Scenario('Проверяем переход на страницу Видео через меню, проверяем наличие видео и соответствющий урл', (I, headerMenu, indexPage) => {
    I.seeElement(headerMenu.allMenu);
    I.waitForEnabled(headerMenu.videoLink);
    I.click(headerMenu.videoLink);
    I.waitForElement(indexPage.video.pageSelector);
    I.seeInCurrentUrl(indexPage.video.url);
});

Scenario('Переход по ссылке в хедере О нас, проверяем что статья открылась и урл', (I, indexPage, mediaPage) => {
    I.waitForEnabled(indexPage.index.siteHeaderLink);
    I.click(indexPage.index.siteHeaderLink);
    I.waitForElement(mediaPage.header);
    I.seeInCurrentUrl('about');
});

Scenario('Переход в паблик по ссылке в хедере Наш паблик ВКонтакте, проверяем, что открывается паблик 4game', (I, socialWidget, indexPage, mediaPage) => {
    I.waitForEnabled(socialWidget.headerVkPublic);
    I.click(socialWidget.headerVkPublic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.dontSeeElement(indexPage.articles.pageSelector);
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
    I.dontSeeElement(indexPage.articles.pageSelector);
    I.seeInCurrentUrl(indexPage.urlGame);
});
