/**
 * Тесты для мобильной версии тестовой статьи "ТЕСТОВАЯ ФОТОСТОРИ — Фогеймер"
 */

Feature('4gamer-acc-4-qa-testfoto-mobile. Тесты для мобильной версии тестовой статьи "ТЕСТОВАЯ ФОТОСТОРИ — Фогеймер"');

Before((I, mediaPage) => {
    I.amOnPage(mediaPage.testFoto.url);
    I.setMobileResolutionEquivalentCurrent();
    I.seeInTitle(mediaPage.testFoto.title);
    I.seeElement(mediaPage.headerPhotoStory);
});

Scenario('Проверяем верстку мобильной статьи исключая динамический контент', (I, mediaPage) => {
    I.checkLayout('4gamer-acc-4-qa-testfoto-mobile', [{
            name: 'body',
            elem: mediaPage.content.css,
            exclude: mediaPage.exclude
        }],
        0.05,
        '4gamer', "reference");
});

Scenario('Закрываем статью с помощью крестика в правом верхнем углу', (I, mediaPage) => {
    I.seeElement(mediaPage.closeButton);
    I.click(mediaPage.closeButton);
    I.dontSeeInTitle(mediaPage.testFoto.title);
    I.dontSeeElement(mediaPage.header);
});

Scenario('Проверяем переход в профиль автора статьи по имени', (I, mediaPage, indexPage) => {
    I.seeElement(mediaPage.authorName);
    I.click(mediaPage.authorName);
    I.dontSeeInTitle(mediaPage.testFoto.title);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
    I.seeInCurrentUrl('aleksey-makarenkov');
    I.seeElement(indexPage.tagsContent);
});

Scenario('Проверяем переход в профиль автора статьи по аватару', (I, mediaPage, indexPage) => {
    I.seeElement(mediaPage.authorAvatar);
    I.click(mediaPage.authorAvatar);
    I.dontSeeInTitle(mediaPage.testFoto.title);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
    I.seeInCurrentUrl('aleksey-makarenkov');
    I.seeElement(indexPage.tagsContent);
});

// для этой статьи не отображается, баг?
Scenario('Проверяем количество просмотров статьи', function*(I, mediaPage) {
    I.seeElement(mediaPage.mobile.viewCountElement);
    var count = parseInt(yield I.grabTextFrom(mediaPage.mobile.viewCountElement));
    I.refreshPage();
    I.seeElement(mediaPage.mobile.viewCountElement);
    var newCount = parseInt(yield I.grabTextFrom(mediaPage.mobile.viewCountElement));
    I.textShouldBeSameAs(count + 1, newCount);
});

Scenario('Проверяем переход по тегу', (I, mediaPage, indexPage) => {
    I.scrollTo(mediaPage.testFoto.footer);
    I.seeElement(mediaPage.tagsSelector);
    I.click(mediaPage.tagsSelector);
    I.seeElement(indexPage.tagsContent);
    I.seeInCurrentUrl('/tags/borderlands/');
});

Scenario('Поделиться ссылкой в неавторизованном FB (через хедер)', (I, mediaPage) => {
    I.seeElement(mediaPage.socialButton.headerFacebook);
    I.click(mediaPage.socialButton.headerFacebook);
    I.waitTabsLoading(2, 10);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.waitInUrl('https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/testfoto/', 15);
    I.dontSeeInTitle(mediaPage.testFoto.title);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
});

Scenario('Поделиться ссылкой в неавторизованном ВК (через хедер)', (I, mediaPage) => {
    I.seeElement(mediaPage.socialButton.headerVk);
    I.click(mediaPage.socialButton.headerVk);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.waitInUrl('https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/testfoto/&title=', 15);
    I.dontSeeInTitle(mediaPage.testFoto.title);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
});

Scenario('Поделиться ссылкой в неавторизованном BK (через футер)', (I, mediaPage) => {
    I.seeElement(mediaPage.socialButton.footerVk);
    I.scrollTo(mediaPage.testFoto.footer);
    I.click(mediaPage.socialButton.footerVk);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.waitInUrl('https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/testfoto/&title=ТЕСТОВАЯ ФОТОСТОРИ', 15);
    I.dontSeeInTitle(mediaPage.testFoto.title);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
});

Scenario('Поделиться ссылкой в неавторизованном FB (через футер)', (I, mediaPage) => {
    I.seeElement(mediaPage.socialButton.footerFacebookButton);
    I.scrollTo(mediaPage.testFoto.footer);
    I.click(mediaPage.socialButton.footerFacebookButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.waitInUrl('https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/testfoto/', 15);
    I.dontSeeInTitle(mediaPage.testFoto.title);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
});

Scenario('Проверяем переход по внутренней ссылке', (I, mediaPage) => {
    I.see('В прошлый раз');
    I.seeElement(mediaPage.testFoto.link);
    I.click(mediaPage.testFoto.link);
    I.waitForElement(mediaPage.body, 10);
    I.dontSeeInTitle(mediaPage.testFoto.title);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
    I.seeElement(mediaPage.header);
    I.seeInCurrentUrl('minutka-prekrasnogo-resident-evil');
});

Scenario('Проверяем переход по внешней ссылке', (I, mediaPage) => {
    I.see('Джессика Нигри');
    I.seeElement(mediaPage.testFoto.externalLink);
    I.click(mediaPage.testFoto.externalLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.dontSeeInTitle(mediaPage.testFoto.title);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
    I.seeInCurrentUrl('/wiki/%D0%9D%D0%B8%D0%B3%D1%80%D0%B8,_%D0%94%D0%B6%D0%B5%D1%81%D1%81%D0%B8%D0%BA%D0%B0');
});

Scenario('Проверяем переход в паблик вконтакте ', (I, mediaPage) => {
    I.scrollTo(mediaPage.socialButton.socialButtons);
    I.waitForVisible(mediaPage.socialButton.readVkLink, 10);
    I.click(mediaPage.socialButton.readVkLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.seeInCurrentUrl('vk.com');
    I.seeInCurrentUrl('4game');
    I.dontSeeInTitle(mediaPage.testFoto.title);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
});

Scenario('Переключаемся на комментарии facebook', (I, mediaPage) => {
    I.scrollTo(mediaPage.testFoto.footer);
    I.seeElement(mediaPage.socialButton.commentsButtonFb);
    I.click(mediaPage.socialButton.commentsButtonFb);
    I.waitForElement(mediaPage.socialButton.footerCommentsFb, 20);
});

Scenario('Переключаемся на комментарии вконтакте', (I, mediaPage) => {
    I.scrollTo(mediaPage.testFoto.footer);
    I.seeElement(mediaPage.socialButton.commentsButtonFb);
    I.click(mediaPage.socialButton.commentsButtonFb);
    I.waitForElement(mediaPage.socialButton.footerCommentsFb, 20);
    I.seeElement(mediaPage.socialButton.commentsButtonVk);
    I.click(mediaPage.socialButton.commentsButtonVk);
    I.waitForElement(mediaPage.socialButton.footerCommentsVk, 10);
});

Scenario('Количество статей в футере Выбор редакции должно быть 4', (I, mediaPage) => {
    I.seeElement(mediaPage.popularFooter);
    I.seeNumberOfElements(mediaPage.popularFooterNews, 4);
});

// сделать клик не по центру плитки с новостью, иначе кликает на тег, если он есть
Scenario('Открываем первую новость из блока Выбор редакции', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.firstNews);
    var text = yield I.grabTextFrom(mediaPage.firstNewsTitle);
    I.click(mediaPage.firstNewsLink);
    I.waitForText(text);
    I.dontSeeInCurrentUrl(mediaPage.sborkaformatov.url);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Открываем вторую новость из блока Выбор редакции', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.secondNews);
    var text = yield I.grabTextFrom(mediaPage.secondNewsTitle);
    I.click(mediaPage.secondNewsLink);
    I.waitForText(text);
    I.dontSeeInCurrentUrl(mediaPage.sborkaformatov.url);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Открываем третью новость из блока Выбор редакции', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.thirdNews);
    var text = yield I.grabTextFrom(mediaPage.thirdNewsTitle);
    I.click(mediaPage.thirdNewsLink);
    I.waitForText(text);
    I.dontSeeInCurrentUrl(mediaPage.sborkaformatov.url);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Открываем последнюю новость из блока Выбор редакции', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.lastNews);
    var text = yield I.grabTextFrom(mediaPage.lastNewsTitle);
    I.click(mediaPage.lastNewsLink);
    I.waitForText(text);
    I.dontSeeInCurrentUrl(mediaPage.sborkaformatov.url);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});
