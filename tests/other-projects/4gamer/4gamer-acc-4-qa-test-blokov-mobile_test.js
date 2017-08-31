/**
 * Тесты для мобильной версии тестовой статьи "Тест новых блоков форматирования — Фогеймер"
 */

Feature('4gamer-acc-4-qa-test-blokov-mobile. Тесты для мобильной версии тестовой статьи - Тест новых блоков форматирования — Фогеймер.');

Before((I, mediaPage) => {
    I.amOnPage(mediaPage.testBlokov.url);
    I.setMobileResolutionEquivalentCurrent();
    I.seeInTitle(mediaPage.testBlokov.title);
    I.seeElement(mediaPage.header);
});

Scenario('Проверяем верстку мобильной статьи исключая динамический контент', (I, mediaPage) => {
    I.checkLayout('4gamer-acc-4-qa-test-blokov-mobile', [{
            name: 'body',
            elem: mediaPage.content.css,
            exclude: mediaPage.exclude
        }],
        0.05,
        '4gamer', "reference");
});

Scenario('Проверяем отсутствие автора статьи', (I, mediaPage, indexPage) => {
    I.dontSeeElement(indexPage.authorName);
    I.dontSeeElement(indexPage.authorAvatar);
});

Scenario('Поделиться ссылкой в неавторизованном FB (через хедер), проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, mediaPage) => {
    I.seeElement(mediaPage.socialButton.headerFacebook);
    I.click(mediaPage.socialButton.headerFacebook);
    I.waitTabsLoading(2, 10);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.waitInUrl('https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/test-novyh-blokov-formatirovanija/', 15);
    I.dontSeeInTitle(mediaPage.testBlokov.title);
    I.dontSeeInCurrentUrl(mediaPage.testBlokov.url);
});

Scenario('Поделиться ссылкой в неавторизованном ВК (через хедер), проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, mediaPage) => {
    I.seeElement(mediaPage.socialButton.headerVk);
    I.click(mediaPage.socialButton.headerVk);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.waitInUrl('https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/test-novyh-blokov-formatirovanija/&title=', 15);
    I.dontSeeInTitle(mediaPage.testBlokov.title);
    I.dontSeeInCurrentUrl(mediaPage.testBlokov.url);
});

Scenario('Поделиться ссылкой в неавторизованном BK (через футер), проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, mediaPage) => {
    I.seeElement(mediaPage.socialButton.footerVk);
    I.scrollTo(mediaPage.testBlokovFooter);
    I.click(mediaPage.socialButton.footerVk);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.waitInUrl('https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/test-novyh-blokov-formatirovanija/&title=Тест новых блоков форматирования', 15);
    I.dontSeeInTitle(mediaPage.testBlokov.title);
    I.dontSeeInCurrentUrl(mediaPage.testBlokov.url);
});

Scenario('Поделиться ссылкой в неавторизованном FB (через футер), проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, mediaPage) => {
    I.seeElement(mediaPage.socialButton.footerFacebookButton);
    I.scrollTo(mediaPage.testBlokovFooter);
    I.click(mediaPage.socialButton.footerFacebookButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.waitInUrl('https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/test-novyh-blokov-formatirovanija/', 15);
    I.dontSeeInTitle(mediaPage.testBlokov.title);
    I.dontSeeInCurrentUrl(mediaPage.testBlokov.url);
});

// Тест может работать не правильно, т.к. поведение счетчиков нестабильное
Scenario('Проверяем количество просмотров статьи, берем значение и прибавляем 1, обновляем страницу, стравниваем с текущим значением', function*(I, mediaPage) {
    I.seeElement(mediaPage.mobile.viewCountElement);
    var count = parseInt(yield I.grabTextFrom(mediaPage.mobile.viewCountElement));
    I.refreshPage();
    I.seeElement(mediaPage.mobile.viewCountElement);
    var newCount = parseInt(yield I.grabTextFrom(mediaPage.mobile.viewCountElement));
    I.textShouldBeSameAs(count + 1, newCount);
});

Scenario('Переход в паблик вконтакте, проверяем, что открывается паблик 4game', (I, mediaPage) => {
    I.scrollTo(mediaPage.socialButton.socialButtons);
    I.waitForVisible(mediaPage.socialButton.readVkLink, 10);
    I.click(mediaPage.socialButton.readVkLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.seeInCurrentUrl('vk.com');
    I.seeInCurrentUrl('4game');
});

Scenario('Закрываем статью с помощью крестика в правом верхнем углу', (I, mediaPage) => {
    I.seeElement(mediaPage.closeButton);
    I.click(mediaPage.closeButton);
    I.dontSeeInTitle(mediaPage.testBlokov.title);
    I.dontSeeElement(mediaPage.header);
});

Scenario('Переключаемся на комментарии facebook', (I, mediaPage) => {
    I.scrollTo(mediaPage.testBlokovFooter);
    I.seeElement(mediaPage.socialButton.commentsButtonFb);
    I.click(mediaPage.socialButton.commentsButtonFb);
    I.waitForElement(mediaPage.socialButton.footerCommentsFb, 20);
});

Scenario('Переключаемся на комментарии вконтакте', (I, mediaPage) => {
    I.scrollTo(mediaPage.testBlokovFooter);
    I.seeElement(mediaPage.socialButton.commentsButtonFb);
    I.click(mediaPage.socialButton.commentsButtonFb);
    I.waitForElement(mediaPage.socialButton.footerCommentsFb, 20);
    I.seeElement(mediaPage.socialButton.commentsButtonVk);
    I.click(mediaPage.socialButton.commentsButtonVk);
    I.waitForElement(mediaPage.socialButton.footerCommentsVk, 10);
});

Scenario('Переход по тегу, проверяем что открылась страница тега и урл', (I, mediaPage, indexPage) => {
    I.scrollTo(mediaPage.mobile.testBlokovFooter);
    I.seeElement(mediaPage.tagsSelector);
    I.click(mediaPage.tagsSelector);
    I.seeElement(indexPage.tagsContent);
    I.seeInCurrentUrl('/tags/doom/');
});

Scenario('Количество статей в футере Выбор редакции должно быть 4', (I, mediaPage) => {
    I.seeElement(mediaPage.popularFooter);
    I.seeNumberOfElements(mediaPage.popularFooterNews, 4);
});

// сделать клик не по центру плитки с новостью, иначе кликает на тег, если он есть
Scenario('Открываем первую новость из блока Выбор редакции, проверяем заголовок открытой новости', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.firstNews);
    var text = yield I.grabTextFrom(mediaPage.firstNewsTitle);
    I.click(mediaPage.firstNewsLink);
    I.waitForText(text);
    I.dontSeeInCurrentUrl(mediaPage.testBlokov.url);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Открываем вторую новость из блока Выбор редакции, проверяем заголовок открытой новости', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.secondNews);
    var text = yield I.grabTextFrom(mediaPage.secondNewsTitle);
    I.click(mediaPage.secondNewsLink);
    I.waitForText(text);
    I.dontSeeInCurrentUrl(mediaPage.testBlokov.url);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Открываем третью новость из блока Выбор редакции, проверяем заголовок открытой новости', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.thirdNews);
    var text = yield I.grabTextFrom(mediaPage.thirdNewsTitle);
    I.click(mediaPage.thirdNewsLink);
    I.waitForText(text);
    I.dontSeeInCurrentUrl(mediaPage.testBlokov.url);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Открываем последнюю новость из блока Выбор редакции, проверяем заголовок открытой новости', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.lastNews);
    var text = yield I.grabTextFrom(mediaPage.lastNewsTitle);
    I.click(mediaPage.lastNewsLink);
    I.waitForText(text);
    I.dontSeeInCurrentUrl(mediaPage.testBlokov.url);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Переход по внешней ссылке masseffect, проверяем, что ушли с текущей страницы и урл', (I, mediaPage) => {
    I.seeElement(mediaPage.wikiLink);
    I.scrollTo(mediaPage.blockquoteElement);
    I.click(mediaPage.wikiLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 20);
    I.seeInCurrentUrl('%D0%A8%D0%B5%D0%BF%D0%B0%D1%80%D0%B4');
    I.dontSeeInTitle(mediaPage.testBlokov.title);
    I.dontSeeInCurrentUrl(mediaPage.testBlokov.url);
});

Scenario('Переход по внешней ссылке imdb, проверяем, что ушли с текущей страницы и урл', (I, mediaPage) => {
    I.seeElement(mediaPage.indbLink);
    I.scrollTo(mediaPage.blockquoteElement);
    I.click(mediaPage.indbLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 20);
    I.seeInCurrentUrl('imdb.com');
    I.dontSeeInTitle(mediaPage.testBlokov.title);
    I.dontSeeInCurrentUrl(mediaPage.testBlokov.url);
});
