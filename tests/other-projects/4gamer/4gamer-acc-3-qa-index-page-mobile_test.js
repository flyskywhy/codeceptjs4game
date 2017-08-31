/**
 * Тесты для мобильной главной страницы
 */

Feature('4gamer-acc-3-qa-index-page-mobile. Тесты для мобильной главной страницы - верстка, отображение и открытие рекомендованных новости, шаринг соцсетей, навигация по меню.');

Before((I, indexPage) => {
    I.amOnPage('/');
    I.setMobileResolutionEquivalentCurrent();
    I.seeInTitle(indexPage.index.title);
    I.seeElement(indexPage.index.pageSelector);
});

// Тесты верстки нужно отладить, очень много всего на странице
xScenario('Проверяем верстку мобильной страницы', (I, indexPage) => {
    I.checkLayout('4gamer-acc-3-qa-index-page-mobile', [{
            name: 'body',
            elem: indexPage.allContentSelector.css,
        }],
        0.05,
        '4gamer', "reference");
});

Scenario('Проверяем количество рекомендованных новостей в хедере, должно быть 5', (I, indexPage) => {
    I.seeElement(indexPage.index.pageSelector);
    I.seeNumberOfElements(indexPage.index.headerNews, 5);
});

Scenario('Открываем первую новость в хедере, проверяем соответствующий урл', function*(I, indexPage, mediaPage) {
    I.seeElement(indexPage.index.headerNews);
    I.waitForEnabled(indexPage.indexMobile.headerFirstNews);
    I.click(indexPage.indexMobile.headerFirstNews);
    I.waitForVisible(mediaPage.header);
    I.dontSeeInTitle(indexPage.index.title);
    var url = yield I.grabAttributeFrom(indexPage.indexMobile.headerFirstNews, 'href');
    I.seeInCurrentUrl(url);
});

Scenario('Открываем среднюю новость в хедере, проверяем соответствующий урл', function*(I, indexPage, mediaPage) {
    I.seeElement(indexPage.index.headerNews);
    I.waitForEnabled(indexPage.indexMobile.headerMiddleNews);
    I.click(indexPage.indexMobile.headerMiddleNews);
    I.waitForVisible(mediaPage.header);
    I.dontSeeInTitle(indexPage.index.title);
    var url = yield I.grabAttributeFrom(indexPage.indexMobile.headerMiddleNews, 'href');
    I.seeInCurrentUrl(url);
});

Scenario('Открываем последнюю новость в хедере, проверяем соответствующий урл', function*(I, indexPage, mediaPage) {
    I.seeElement(indexPage.index.headerNews);
    I.waitForEnabled(indexPage.indexMobile.headerLastNews);
    I.click(indexPage.indexMobile.headerLastNews);
    I.waitForVisible(mediaPage.header);
    I.dontSeeInTitle(indexPage.index.title);
    var url = yield I.grabAttributeFrom(indexPage.indexMobile.headerLastNews, 'href');
    I.seeInCurrentUrl(url);
});

Scenario('Переход в паблик по ссылке в футере Наш паблик ВКонтакте, проверяем, что открывается паблик 4game', (I, socialWidget, indexPage, mediaPage) => {
    I.scrollTo(indexPage.index.footer);
    I.waitForElement(socialWidget.footerVkPublic, 10);
    I.click(socialWidget.footerVkPublic);
    I.waitForVisible(mediaPage.body);
    I.seeInCurrentUrl("vk.com/4game");
});

Scenario('Нажимаем Поделиться в неавторизованном ВК, проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, indexPage, socialWidget, mediaPage) => {
    I.scrollTo(indexPage.index.footer);
    I.seeElement(socialWidget.footerVkButton);
    I.click(socialWidget.footerVkButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.decodeUrlAndCompare('https://oauth.vk.com/authorize?client_id=-1&redirect_uri=https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/&title=Фогеймер — об играх без воды и рекламы&display=widget');
});

Scenario('Нажимаем Поделиться в неавторизованном Fb, проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, indexPage, socialWidget, mediaPage) => {
    I.scrollTo(indexPage.index.footer);
    I.seeElement(socialWidget.footerFbButton);
    I.click(socialWidget.footerFbButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.decodeUrlAndCompare('https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/&cancel_url=https://www.facebook.com/dialog/return/close?error_code=4201&error_message=User canceled the Dialog flow#_=_&display=popup&locale=en_GB');
});

Scenario('Переход в паблик по ссылке в хедере Наш паблик ВКонтакте, проверяем, что открывается паблик 4game', (I, socialWidget, indexPage, mediaPage) => {
    I.seeElement(socialWidget.mobileHeaderVkPublic);
    I.click(socialWidget.mobileHeaderVkPublic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.dontSeeElement(indexPage.index.pageSelector);
    I.seeInCurrentUrl("vk.com/4game");
});

Scenario('Открываем меню навигации по страницам, проверяем наличие ссылок на другие секции', (I, indexPage, headerMenu) => {
    I.waitForEnabled(indexPage.indexMobile.menuButton);
    I.click(indexPage.indexMobile.menuButton);
    I.seeElement(headerMenu.allMenu);
    I.seeElement(headerMenu.videoLink);
    I.seeElement(headerMenu.newsLink);
    I.seeElement(headerMenu.articlesLink);
});

Scenario('Закрываем меню навигации по страницам', (I, indexPage, headerMenu) => {
    I.waitForEnabled(indexPage.indexMobile.menuButton);
    I.click(indexPage.indexMobile.menuButton);
    I.waitForVisible(headerMenu.allMenu);
    I.waitForEnabled(indexPage.indexMobile.menuButton);
    I.click(indexPage.indexMobile.menuButton);
    I.waitForVisible(headerMenu.allMenu);
});

Scenario('Переходим на страницу Новостей, проверяем наличие новостей и соответствющий урл', (I, indexPage, headerMenu) => {
    I.waitForEnabled(indexPage.indexMobile.menuButton);
    I.click(indexPage.indexMobile.menuButton);
    I.waitForVisible(headerMenu.allMenu);
    I.seeElement(headerMenu.newsLink);
    I.click(headerMenu.newsLink);
    I.waitForElement(indexPage.news.pageSelector);
    I.seeInCurrentUrl(indexPage.news.url);
});

Scenario('Переходим на страницу Статей, проверяем наличие статей и соответствющий урл', (I, indexPage, headerMenu) => {
    I.waitForEnabled(indexPage.indexMobile.menuButton);
    I.click(indexPage.indexMobile.menuButton);
    I.waitForVisible(headerMenu.allMenu);
    I.seeElement(headerMenu.articlesLink);
    I.click(headerMenu.articlesLink);
    I.waitForElement(indexPage.articles.pageSelector);
    I.seeInCurrentUrl(indexPage.articles.url);
});

Scenario('Переходим на страницу Видео, проверяем наличие видео и соответствющий урл', (I, indexPage, headerMenu) => {
    I.waitForEnabled(indexPage.indexMobile.menuButton);
    I.click(indexPage.indexMobile.menuButton);
    I.waitForVisible(headerMenu.allMenu);
    I.seeElement(headerMenu.videoLink);
    I.click(headerMenu.videoLink);
    I.waitForElement(indexPage.video.pageSelector);
    I.seeInCurrentUrl(indexPage.video.url);
});
