/**
 * Тесты для мобильной версии страницы со списком видео
 */

Feature('4gamer-acc-3-qa-video-mobile. Тесты для мобильной версии страницы со списком видео.');

Before((I, indexPage) => {
    I.amOnPage(indexPage.video.url);
    I.setMobileResolutionEquivalentCurrent();
    I.seeInTitle(indexPage.video.title);
    I.seeElement(indexPage.video.pageSelector);
});

Scenario('Проверяем верстку страницы исключая динамический контент', (I, indexPage) => {
    I.checkLayout('4gamer-acc-3-qa-video-mobile', [{
            name: 'body',
            exclude: [indexPage.video.pageSelector, indexPage.gridTitle, indexPage.vkWidget]
        }],
        0.05,
        '4gamer', "reference");
});

Scenario('Открываем меню навигации по страницам', (I, indexPage, headerMenu) => {
    I.waitForEnabled(indexPage.indexMobile.menuButton);
    I.click(indexPage.indexMobile.menuButton);
    I.seeElement(headerMenu.allMenu);
    I.seeElement(headerMenu.articlesLink);
    I.seeElement(headerMenu.newsLink);
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

Scenario('Переходим на Главную страницу', (I, headerMenu, indexPage) => {
    I.waitForEnabled(indexPage.indexMobile.menuButton);
    I.click(indexPage.indexMobile.menuButton);
    I.seeElement(headerMenu.allMenu);
    I.seeElement(headerMenu.indexLink);
    I.click(headerMenu.indexLink);
    I.seeInCurrentUrl(indexPage.index.url);
});

Scenario('Переходим на страницу Новостей', (I, indexPage, headerMenu) => {
    I.waitForEnabled(indexPage.indexMobile.menuButton);
    I.click(indexPage.indexMobile.menuButton);
    I.waitForVisible(headerMenu.allMenu);
    I.seeElement(headerMenu.newsLink);
    I.click(headerMenu.newsLink);
    I.waitForElement(indexPage.news.pageSelector);
    I.seeInCurrentUrl(indexPage.news.url);
});

Scenario('Переходим на страницу Статей', (I, indexPage, headerMenu) => {
    I.waitForEnabled(indexPage.indexMobile.menuButton);
    I.click(indexPage.indexMobile.menuButton);
    I.waitForVisible(headerMenu.allMenu);
    I.seeElement(headerMenu.articlesLink);
    I.click(headerMenu.articlesLink);
    I.seeInCurrentUrl(indexPage.articles.url);
});

Scenario('Переход в паблик по ссылке в футере Наш паблик ВКонтакте', (I, socialWidget, indexPage, mediaPage) => {
    I.scrollTo(indexPage.video.footer);
    I.waitForElement(socialWidget.footerVkPublic);
    I.click(socialWidget.footerVkPublic);
    I.waitForVisible(mediaPage.body);
    I.seeInCurrentUrl("vk.com/4game");
});

Scenario('Нажимаем Поделиться в неавторизованном ВК', (I, indexPage, socialWidget, mediaPage) => {
    I.scrollTo(indexPage.video.footer);
    I.seeElement(socialWidget.footerVkButton);
    I.click(socialWidget.footerVkButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/&title=Фогеймер — об играх без воды и рекламы', 15);
});

Scenario('Нажимаем Поделиться в неавторизованном Fb', (I, indexPage, socialWidget, mediaPage) => {
    I.scrollTo(indexPage.video.footer);
    I.seeElement(socialWidget.footerFbButton);
    I.click(socialWidget.footerFbButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/', 15);
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
    I.waitForVisible(mediaPage.mobile.viewCountElement);
    var actual = yield I.grabTextFrom(mediaPage.mobile.viewCountElement);
    parseInt(actual, 2);
    I.textShouldBeSameAs(actual, expected);
});
