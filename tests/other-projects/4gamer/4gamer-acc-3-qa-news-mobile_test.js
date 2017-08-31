/**
 * Тесты для мобильной версии страницы со списком новостей
 */

Feature('4gamer-acc-3-qa-news-mobile. Тесты для мобильной версии страницы со списком новостей.');

Before((I, indexPage) => {
    I.amOnPage(indexPage.news.url);
    I.setMobileResolutionEquivalentCurrent();
    I.seeInTitle(indexPage.news.title);
});

// Тесты верстки нужно отладить, очень много всего на странице
xScenario('Проверяем верстку мобильной страницы новостей исключая динамический контент', (I, indexPage) => {
    I.checkLayout('4gamer-acc-3-qa-news-mobile', [{
            name: 'body',
            exclude: [indexPage.news.pageSelector, indexPage.gridTitle, indexPage.vkWidget]
        }],
        0.05,
        '4gamer', "reference");
});

Scenario('Открываем меню навигации по страницам, проверяем наличие ссылок на другие секции', (I, indexPage, headerMenu) => {
    I.waitForEnabled(indexPage.indexMobile.menuButton);
    I.click(indexPage.indexMobile.menuButton);
    I.seeElement(headerMenu.allMenu);
    I.seeElement(headerMenu.videoLink);
    I.seeElement(headerMenu.articlesLink);
    I.seeElement(headerMenu.indexLink);
});

Scenario('Закрываем меню навигации по страницам', (I, indexPage, headerMenu) => {
    I.waitForEnabled(indexPage.indexMobile.menuButton);
    I.click(indexPage.indexMobile.menuButton);
    I.waitForVisible(headerMenu.allMenu);
    I.waitForEnabled(indexPage.indexMobile.menuButton);
    I.click(indexPage.indexMobile.menuButton);
    I.waitForVisible(headerMenu.allMenu);
});

Scenario('Переходим на Главную страницу, проверяем наличие новостей и соответствющий урл', (I, headerMenu, indexPage) => {
    I.waitForEnabled(indexPage.indexMobile.menuButton);
    I.click(indexPage.indexMobile.menuButton);
    I.seeElement(headerMenu.allMenu);
    I.seeElement(headerMenu.indexLink);
    I.click(headerMenu.indexLink);
    I.seeInCurrentUrl(indexPage.index.url);
});

Scenario('Переходим на страницу Статей, проверяем наличие статей и соответствющий урл', (I, indexPage, headerMenu) => {
    I.waitForEnabled(indexPage.indexMobile.menuButton);
    I.click(indexPage.indexMobile.menuButton);
    I.waitForVisible(headerMenu.allMenu);
    I.seeElement(headerMenu.articlesLink);
    I.click(headerMenu.articlesLink);
    I.seeInCurrentUrl(indexPage.articles.url);
});

Scenario('Переходим на страницу Видео, проверяем наличие видео и соответствющий урл', (I, headerMenu, indexPage) => {
    I.waitForEnabled(indexPage.indexMobile.menuButton);
    I.click(indexPage.indexMobile.menuButton);
    I.seeElement(headerMenu.allMenu);
    I.seeElement(headerMenu.videoLink);
    I.click(headerMenu.videoLink);
    I.seeInCurrentUrl(indexPage.video.url);
});

Scenario('Переход в паблик по ссылке в футере Наш паблик ВКонтакте, проверяем, что открывается паблик 4game', (I, socialWidget, indexPage, mediaPage) => {
    I.scrollTo(indexPage.news.footer);
    I.waitForElement(socialWidget.footerVkPublic, 10);
    I.click(socialWidget.footerVkPublic);
    I.waitForElement(mediaPage.body, 10);
    I.seeInCurrentUrl("vk.com/4game");
});

Scenario('Нажимаем Поделиться в неавторизованном ВК, проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, indexPage, socialWidget, mediaPage) => {
    I.scrollTo(indexPage.news.footer);
    I.seeElement(socialWidget.footerVkButton);
    I.click(socialWidget.footerVkButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.decodeUrlAndCompare('https://oauth.vk.com/authorize?client_id=-1&redirect_uri=https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/&title=Фогеймер — об играх без воды и рекламы&display=widget');
});

Scenario('Нажимаем Поделиться в неавторизованном Fb, проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, indexPage, socialWidget, mediaPage) => {
    I.scrollTo(indexPage.news.footer);
    I.seeElement(socialWidget.footerFbButton);
    I.click(socialWidget.footerFbButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.decodeUrlAndCompare('https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/&cancel_url=https://www.facebook.com/dialog/return/close?error_code=4201&error_message=User canceled the Dialog flow#_=_&display=popup&locale=en_GB');
});

Scenario('Переход в паблик по ссылке в хедере Наш паблик ВКонтакте, проверяем, что открывается паблик 4game', (I, socialWidget, indexPage, mediaPage) => {
    I.seeElement(socialWidget.mobileHeaderVkPublic);
    I.click(socialWidget.mobileHeaderVkPublic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.dontSeeElement(indexPage.news.pageSelector);
    I.seeInCurrentUrl("vk.com/4game");
});

Scenario('Переход в паблик по ссылке в футере Наш паблик ВКонтакте, проверяем, что открывается паблик 4game', (I, socialWidget, indexPage, mediaPage) => {
    I.scrollTo(indexPage.video.footer);
    I.waitForElement(socialWidget.footerVkPublic);
    I.click(socialWidget.footerVkPublic);
    I.waitForVisible(mediaPage.body);
    I.seeInCurrentUrl("vk.com/4game");
});

// Отладить, т.к. первая новость не кликабельна (переделать на другую новость по счету
xScenario('Открыть новость из блока Материалы за неделю, проверяем переход со страницы и соответствующий урл', function*(I, indexPage, mediaPage) {
    I.seeElement(indexPage.news.firstNewsLocator);
    var text = yield I.grabTextFrom(indexPage.articles.firstArticleText);
    I.click(indexPage.news.firstNewsLocator);
    I.waitForElement(mediaPage.header);
    I.dontSeeInTitle(indexPage.news.title);
    var title = yield I.grabTextFrom(mediaPage.galleryTitle);
    I.textShouldBeSameAs(text, title);
});
