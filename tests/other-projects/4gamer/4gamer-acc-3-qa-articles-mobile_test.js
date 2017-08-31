/**
 * Тесты для мобильной версии страницы со списком статей
 */

Feature('4gamer-acc-3-qa-articles-mobile. Тесты для мобильной версии страницы со списком статей.');

Before((I, indexPage) => {
    I.amOnPage(indexPage.articles.url);
    I.setMobileResolutionEquivalentCurrent();
    I.seeInTitle(indexPage.articles.title);
    I.seeElement(indexPage.articles.pageSelector);
});

// Тесты верстки нужно отладить, очень много всего на странице
xScenario('Проверяем верстку мобильной страницы статей исключая динамический контент', (I, indexPage) => {
    I.checkLayout('4gamer-acc-3-qa-articles-mobile', [{
            name: 'body',
            exclude: [indexPage.articles.pageSelector, indexPage.gridTitle, indexPage.vkWidget]
        }],
        0.05,
        '4gamer', "reference");
});

Scenario('Открываем меню навигации по страницам, проверяем наличие ссылок на другие секции', (I, indexPage, headerMenu) => {
    I.waitForEnabled(indexPage.indexMobile.menuButton);
    I.click(indexPage.indexMobile.menuButton);
    I.waitForEnabled(headerMenu.allMenu);
    I.waitForEnabled(headerMenu.videoLink);
    I.waitForEnabled(headerMenu.newsLink);
    I.waitForEnabled(headerMenu.indexLink);
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
    I.waitForEnabled(headerMenu.allMenu);
    I.waitForEnabled(headerMenu.indexLink);
    I.click(headerMenu.indexLink);
    I.seeInCurrentUrl(indexPage.index.url);
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

Scenario('Переходим на страницу Видео, проверяем наличие видео и соответствющий урл', (I, headerMenu, indexPage) => {
    I.waitForEnabled(indexPage.indexMobile.menuButton);
    I.click(indexPage.indexMobile.menuButton);
    I.waitForVisible(headerMenu.allMenu);
    I.seeElement(headerMenu.videoLink);
    I.click(headerMenu.videoLink);
    I.waitForElement(indexPage.video.pageSelector);
    I.seeInCurrentUrl(indexPage.video.url);
});

Scenario('Переход в паблик по ссылке в футере Наш паблик ВКонтакте, проверяем, что открывается паблик 4game', (I, socialWidget, indexPage, mediaPage) => {
    I.scrollTo(indexPage.articles.footer);
    I.waitForEnabled(socialWidget.footerVkPublic);
    I.click(socialWidget.footerVkPublic);
    I.waitForVisible(mediaPage.body);
    I.seeInCurrentUrl("vk.com/4game");
});

Scenario('Нажимаем Поделиться в неавторизованном ВК, проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, indexPage, socialWidget, mediaPage) => {
    I.scrollTo(indexPage.articles.footer);
    I.waitForEnabled(socialWidget.footerVkButton);
    I.click(socialWidget.footerVkButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.decodeUrlAndCompare('https://oauth.vk.com/authorize?client_id=-1&redirect_uri=https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/&title=Фогеймер — об играх без воды и рекламы&display=widget');
});

Scenario('Нажимаем Поделиться в неавторизованном Fb, проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, indexPage, socialWidget, mediaPage) => {
    I.scrollTo(indexPage.articles.footer);
    I.waitForEnabled(socialWidget.footerFbButton);
    I.click(socialWidget.footerFbButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body);
    I.decodeUrlAndCompare('https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/&cancel_url=https://www.facebook.com/dialog/return/close?error_code=4201&error_message=User canceled the Dialog flow#_=_&display=popup&locale=en_GB');
});

Scenario('Переход в паблик по ссылке в хедере Наш паблик ВКонтакте, проверяем, что открывается паблик 4game', (I, socialWidget, indexPage, mediaPage) => {
    I.waitForEnabled(socialWidget.mobileHeaderVkPublic);
    I.click(socialWidget.mobileHeaderVkPublic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.dontSeeElement(indexPage.articles.pageSelector);
    I.seeInCurrentUrl("vk.com/4game");
});

// Здесь нужно отлаживать.
// Просить дополнительный тег, для разделения title и subtitle, т.к. сейчас можно получить только текст из (title + subtitle) и из subtitle
// либо написать костиль, который будет из (title+subtitle) вычитать subtitle
xScenario('Открыть первую статью, проверяем переход со страницы и соответствующий урл', function*(I, indexPage, mediaPage) {
    I.waitForEnabled(indexPage.articles.firstArticleSelector);
    var text = yield I.grabTextFrom(indexPage.articles.firstArticleText);
    I.click(indexPage.articles.firstArticleSelector);
    I.waitForVisible(mediaPage.header);
    I.dontSeeInTitle(indexPage.articles.title);
    var title = yield I.grabTextFrom(mediaPage.galleryTitle);
    I.textShouldBeSameAs(text, title);
});

Scenario('Проверяем отображение первой статьи на странице, наличие статьи, тега, заголовка и просмотров', (I, indexPage) => {
    I.seeElement(indexPage.articles.firstArticleSelector);
    I.seeElement(indexPage.articles.firstArticleTag);
    I.seeElement(indexPage.articles.firstArticleText);
    I.seeElement(indexPage.articles.firstArticleViewCount);
});

Scenario('Проверяем просмотры статьи, смотрим кол-во просмотров, открываем страницу и сравниваем значения', function*(I, indexPage, mediaPage) {
    I.waitForVisible(indexPage.articles.firstArticleSelector);
    I.seeElement(indexPage.articles.firstArticleViewCount);
    var expected = yield I.grabTextFrom(indexPage.articles.firstArticleViewCount);
    parseInt(expected, 2);
    I.click(indexPage.articles.firstArticleSelector);
    I.waitForEnabled(mediaPage.viewCountElement);
    var actual = yield I.grabTextFrom(mediaPage.mobile.viewCountElement);
    parseInt(actual, 2);
    I.textShouldBeSameAs(actual, expected);
});
