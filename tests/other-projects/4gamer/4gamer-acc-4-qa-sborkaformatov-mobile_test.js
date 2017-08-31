/**
 * Тесты для мобильной версии тестовой статьи 'СБОРКА ФОРМАТОВ — Фогеймер'
 */

Feature('4gamer-acc-4-qa-sborkaformatov-mobile. Тесты для мобильной версии тестовой статьи СБОРКА ФОРМАТОВ — Фогеймер.');

Before((I, mediaPage) => {
    I.amOnPage(mediaPage.sborkaformatov.url);
    I.setMobileResolutionEquivalentCurrent();
    I.seeInTitle(mediaPage.sborkaformatov.title);
    I.seeElement(mediaPage.header);
});

Scenario('Проверяем верстку мобильной статьи исключая динамический контент', (I, mediaPage) => {
    I.checkLayout('4gamer-acc-4-qa-sborkaformatov-mobile', [{
            name: 'body',
            elem: mediaPage.content.css,
            exclude: mediaPage.exclude
        }],
        0.05,
        '4gamer', "reference");
});

Scenario('Проверяем переход в профиль автора статьи по имени, проверяем переход на новую страницу и урл', (I, mediaPage, indexPage) => {
    I.waitForElement(mediaPage.authorName);
    I.click(mediaPage.authorName);
    I.waitForElement(indexPage.tagsContent);
    I.dontSeeInTitle(mediaPage.sborkaformatov.title);
    I.dontSeeInCurrentUrl(mediaPage.sborkaformatov.url);
    I.seeInCurrentUrl('aleksey-makarenkov');
});

Scenario('Проверяем переход в профиль автора статьи по аватару, проверяем переход на новую страницу и урл', (I, mediaPage, indexPage) => {
    I.waitForElement(mediaPage.authorAvatar);
    I.click(mediaPage.authorAvatar);
    I.waitForElement(indexPage.tagsContent);
    I.dontSeeInTitle(mediaPage.sborkaformatov.title);
    I.dontSeeInCurrentUrl(mediaPage.sborkaformatov.url);
    I.seeInCurrentUrl('aleksey-makarenkov');
});

// для фантома отличается локаль в урле, сделать метод сравнивающий часть урла
Scenario('Поделиться ссылкой в неавторизованном FB (через хедер), проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.headerFacebook);
    I.click(mediaPage.socialButton.headerFacebook);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/sborkaformatov/', 15);
    I.dontSeeInTitle(mediaPage.sborkaformatov.title);
    I.dontSeeInCurrentUrl(mediaPage.sborkaformatov.url);
});

Scenario('Поделиться ссылкой в неавторизованном ВК (через хедер), проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.headerVk);
    I.click(mediaPage.socialButton.headerVk);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/sborkaformatov/&title=', 15);
    I.dontSeeInTitle(mediaPage.sborkaformatov.title);
    I.dontSeeInCurrentUrl(mediaPage.sborkaformatov.url);
});

Scenario('Поделиться ссылкой в неавторизованный ВК (через футер), проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, mediaPage) => {
    I.waitForVisible(mediaPage.sborkaformatov.footer);
    I.scrollTo(mediaPage.sborkaformatov.footer);
    I.waitForVisible(mediaPage.socialButton.footerVk);
    I.click(mediaPage.socialButton.footerVk);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/sborkaformatov/&title=СБОРКА ФОРМАТОВ', 15);
    I.dontSeeInTitle(mediaPage.sborkaformatov.title);
    I.dontSeeInCurrentUrl(mediaPage.sborkaformatov.url);
});

Scenario('Поделиться ссылкой в неавторизованный FB (через футер), проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, mediaPage) => {
    I.waitForVisible(mediaPage.sborkaformatov.footer);
    I.scrollTo(mediaPage.sborkaformatov.footer);
    I.waitForVisible(mediaPage.socialButton.footerFacebookButton);
    I.click(mediaPage.socialButton.footerFacebookButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/sborkaformatov/', 15);
    I.dontSeeInTitle(mediaPage.sborkaformatov.title);
    I.dontSeeInCurrentUrl(mediaPage.sborkaformatov.url);
});

Scenario('Переключаемся на комментарии facebook', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.commentsButtonFb);
    I.scrollTo(mediaPage.sborkaformatov.footer);
    I.seeElement(mediaPage.socialButton.commentsButtonFb);
    I.click(mediaPage.socialButton.commentsButtonFb);
    I.waitForVisible(mediaPage.socialButton.footerCommentsFb);
});

Scenario('Переключаемся на комментарии вконтакте', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.commentsButtonFb);
    I.scrollTo(mediaPage.sborkaformatov.footer);
    I.seeElement(mediaPage.socialButton.commentsButtonFb);
    I.click(mediaPage.socialButton.commentsButtonFb);
    I.waitForVisible(mediaPage.socialButton.footerCommentsFb);
    I.seeElement(mediaPage.socialButton.commentsButtonVk);
    I.click(mediaPage.socialButton.commentsButtonVk);
    I.waitForVisible(mediaPage.socialButton.footerCommentsVk);
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

Scenario('Переход по внешней ссылке, проверяем переход на новую страницу и урл', (I, mediaPage) => {
    I.seeElement(mediaPage.yandexLink);
    I.scrollTo(mediaPage.frame.youTube);
    I.click(mediaPage.yandexLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.seeInCurrentUrl('yandex.ru');
});

Scenario('Переход в паблик вконтакте, проверяем, что открывается паблик 4game', (I, mediaPage) => {
    I.scrollTo(mediaPage.socialButton.socialButtons);
    I.waitForVisible(mediaPage.socialButton.readVkLink, 10);
    I.click(mediaPage.socialButton.readVkLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.seeInCurrentUrl('vk.com/4game');
});

Scenario('Переход в твитер, проверяем, что открывается twitter', (I, mediaPage) => {
    I.switchTo(mediaPage.frame.twitter);
    I.waitForElement(mediaPage.frame.twitterMedia);
    I.click(mediaPage.frame.twitterFollowButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.seeInCurrentUrl('twitter.com');
});

Scenario('Закрываем статью с помощью крестика в правом верхнем углу', (I, mediaPage) => {
    I.seeElement(mediaPage.closeButton);
    I.click(mediaPage.closeButton);
    I.dontSeeInTitle(mediaPage.sborkaformatov.title);
    I.dontSeeElement(mediaPage.header);
});

Scenario('Переход по тегу, проверяем что открылась страница тега и урл', (I, mediaPage, indexPage) => {
    I.scrollTo(mediaPage.mobile.sborkaformatovFooter);
    I.seeElement(mediaPage.tagsSelector);
    I.click(mediaPage.tagsSelector);
    I.seeElement(indexPage.tagsContent);
    I.seeInCurrentUrl('/tags/teg1/');
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
    I.dontSeeInCurrentUrl(mediaPage.sborkaformatov.url);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Открываем вторую новость из блока Выбор редакции, проверяем заголовок открытой новости', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.secondNews);
    var text = yield I.grabTextFrom(mediaPage.secondNewsTitle);
    I.click(mediaPage.secondNewsLink);
    I.waitForText(text);
    I.dontSeeInCurrentUrl(mediaPage.sborkaformatov.url);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Открываем третью новость из блока Выбор редакции, проверяем заголовок открытой новости', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.thirdNews);
    var text = yield I.grabTextFrom(mediaPage.thirdNewsTitle);
    I.click(mediaPage.thirdNewsLink);
    I.waitForText(text);
    I.dontSeeInCurrentUrl(mediaPage.sborkaformatov.url);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Открываем последнюю новость из блока Выбор редакции, проверяем заголовок открытой новости', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.lastNews);
    var text = yield I.grabTextFrom(mediaPage.lastNewsTitle);
    I.click(mediaPage.lastNewsLink);
    I.waitForText(text);
    I.dontSeeInCurrentUrl(mediaPage.sborkaformatov.url);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});
