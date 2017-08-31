/**
 * Тесты для тестовой статьи "ТЕСТОВАЯ ФОТОСТОРИ — Фогеймер"
 */

Feature('4gamer-acc-2-qa-testfoto. Тесты для тестовой статьи ТЕСТОВАЯ ФОТОСТОРИ — Фогеймер.');

Before((I, mediaPage) => {
    I.amOnPage(mediaPage.testFoto.url);
    I.seeInTitle(mediaPage.testFoto.title);
    I.seeElement(mediaPage.headerPhotoStory);
});

Scenario('Проверяем верстку статьи исключая динамический контент', (I, mediaPage) => {
    I.checkLayout('4gamer-acc-2-qa-testfoto', [{
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

Scenario('Открываем следующую статью с помощью стрелки', (I, mediaPage) => {
    I.waitForElement(mediaPage.nextArrow);
    I.click(mediaPage.nextArrow);
    I.seeInCurrentUrl('sem-minut-gejmpleja-the-technomancer');
    I.seeElement(mediaPage.headerWithVideo);
});

Scenario('Открываем предыдущую статью с помощью стрелки', (I, mediaPage) => {
    I.waitForElement(mediaPage.nextArrow);
    I.click(mediaPage.nextArrow);
    I.seeInCurrentUrl('antarkticheskaja-baza-v-trejlere-umbrella-corps');
    I.seeElement(mediaPage.headerWithVideo);

});

Scenario('Проверяем переход в профиль автора статьи по имени', (I, mediaPage, indexPage) => {
    I.waitForElement(mediaPage.authorName);
    I.click(mediaPage.authorName);
    I.waitForElement(indexPage.tagsContent);
    I.dontSeeInTitle(mediaPage.testFoto.title);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
    I.seeInCurrentUrl('aleksey-makarenkov');
});

Scenario('Проверяем переход в профиль автора статьи по аватару', (I, mediaPage, indexPage) => {
    I.waitForElement(mediaPage.authorAvatar);
    I.click(mediaPage.authorAvatar);
    I.waitForElement(indexPage.tagsContent);
    I.dontSeeInTitle(mediaPage.testFoto.title);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
    I.seeInCurrentUrl('aleksey-makarenkov');
});

Scenario('Поделиться ссылкой в неавторизованном FB (через хедер)', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.headerFacebook);
    I.click(mediaPage.socialButton.headerFacebook);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/testfoto/', 15);
    I.dontSeeInTitle(mediaPage.testFoto.title);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
});

Scenario('Поделиться ссылкой в неавторизованном ВК (через хедер)', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.headerVk);
    I.click(mediaPage.socialButton.headerVk);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/testfoto/&title=', 15);
    I.dontSeeInTitle(mediaPage.testFoto.title);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
});

Scenario('Поделиться ссылкой в неавторизованный вконтакте через футер', (I, mediaPage) => {
    I.waitForVisible(mediaPage.testFoto.footer);
    I.scrollTo(mediaPage.testFoto.footer);
    I.waitForVisible(mediaPage.socialButton.footerVk);
    I.click(mediaPage.socialButton.footerVk);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/testfoto/&title=ТЕСТОВАЯ ФОТОСТОРИ', 15);
    I.dontSeeInTitle(mediaPage.testFoto.title);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
});

Scenario('Поделиться ссылкой в неавторизованный фейсбук через футер', (I, mediaPage) => {
    I.waitForVisible(mediaPage.testFoto.footer);
    I.scrollTo(mediaPage.testFoto.footer);
    I.waitForVisible(mediaPage.socialButton.footerFacebookButton);
    I.click(mediaPage.socialButton.footerFacebookButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/testfoto/', 15);
    I.dontSeeInTitle(mediaPage.testFoto.title);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
});

Scenario('Переключаемся на комментарии facebook', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.commentsButtonFb);
    I.scrollTo(mediaPage.testFoto.footer);
    I.seeElement(mediaPage.socialButton.commentsButtonFb);
    I.click(mediaPage.socialButton.commentsButtonFb);
    I.waitForVisible(mediaPage.socialButton.footerCommentsFb);
});

Scenario('Переключаемся на комментарии вконтакте', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.commentsButtonFb);
    I.scrollTo(mediaPage.testFoto.footer);
    I.seeElement(mediaPage.socialButton.commentsButtonFb);
    I.click(mediaPage.socialButton.commentsButtonFb);
    I.waitForVisible(mediaPage.socialButton.footerCommentsFb);
    I.seeElement(mediaPage.socialButton.commentsButtonVk);
    I.click(mediaPage.socialButton.commentsButtonVk);
    I.waitForVisible(mediaPage.socialButton.footerCommentsVk);
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
});

// Тест может работать не стабильно, т.к. поведение счетчиков нестабильное
Scenario('Проверяем количество просмотров статьи', function*(I, mediaPage) {
    I.seeElement(mediaPage.viewCountElement);
    var count = parseInt(yield I.grabTextFrom(mediaPage.viewCountElement));
    I.refreshPage();
    I.seeElement(mediaPage.viewCountElement);
    var newCount = parseInt(yield I.grabTextFrom(mediaPage.viewCountElement));
    // I.textShouldBeSameAs(count + 1, newCount);
    I.textShouldBeSameAs(count, newCount);
});

Scenario('Проверяем переход по тегу', (I, mediaPage, indexPage) => {
    I.scrollTo(mediaPage.testFoto.footer);
    I.waitForVisible(mediaPage.firstTagSelector);
    I.click(mediaPage.firstTagSelector);
    I.waitForVisible(indexPage.tagsContent);
    I.seeInCurrentUrl('/tags/borderlands/');
});

// элемент перекрывается хедером, заведен баг
xScenario('Проверяем переход по внутренней ссылке', (I, mediaPage) => {
    I.see('В прошлый раз');
    I.click('[href="minutka-prekrasnogo-resident-evil/"]');
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.dontSeeInTitle(mediaPage.testFoto.title);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
    I.seeInCurrentUrl('minutka-prekrasnogo-resident-evil');
});

// элемент перекрывается хедером, заведен баг
xScenario('Проверяем переход по внешней ссылке', (I, mediaPage) => {
    I.see('Джессика Нигри');
    I.click('[href="https://ru.wikipedia.org/wiki/%D0%9D%D0%B8%D0%B3%D1%80%D0%B8,_%D0%94%D0%B6%D0%B5%D1%81%D1%81%D0%B8%D0%BA%D0%B0"]');
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.dontSeeInTitle(mediaPage.testFoto.title);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
    I.seeInCurrentUrl('/wiki/%D0%9D%D0%B8%D0%B3%D1%80%D0%B8,_%D0%94%D0%B6%D0%B5%D1%81%D1%81%D0%B8%D0%BA%D0%B0');
});

Scenario('Количество статей в футере "Выбор редакции" должно быть 4', (I, mediaPage) => {
    I.waitForVisible(mediaPage.popularFooter);
    I.seeElement(mediaPage.popularFooter);
    I.seeNumberOfElements(mediaPage.popularFooterNews, 4);
});

// сделать клик не по центру плитки с новостью, иначе кликает на тег, если он есть
xScenario('Открываем первую новость из блока "Выбор редакции"', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.firstNews);
    var text = yield I.grabTextFrom(mediaPage.firstNewsTitle);
    I.click(mediaPage.firstNewsLink);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
    I.waitForEnabled(mediaPage.titleText);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Открываем вторую новость из блока "Выбор редакции"', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.secondNews);
    var text = yield I.grabTextFrom(mediaPage.secondNewsTitle);
    I.click(mediaPage.secondNewsLink);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
    I.waitForEnabled(mediaPage.titleText);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Открываем третью новость из блока "Выбор редакции"', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.thirdNews);
    var text = yield I.grabTextFrom(mediaPage.thirdNewsTitle);
    I.click(mediaPage.thirdNewsLink);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
    I.waitForEnabled(mediaPage.titleText);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

// сделать клик не по центру плитки с новостью, иначе кликает на тег, если он есть
Scenario('Открываем последнюю новость из блока "Выбор редакции"', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.lastNews);
    var text = yield I.grabTextFrom(mediaPage.lastNewsTitle);
    I.click(mediaPage.lastNewsLink);
    I.dontSeeInCurrentUrl(mediaPage.testFoto.url);
    I.waitForEnabled(mediaPage.titleText);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Рекомендованные новости в хедере при высоте окна > 900px', (I, mediaPage) => {
    I.resizeWindow(1920, 1080);
    I.seeElement(mediaPage.popularHeader);
});

Scenario('Количество новостей в хедере должно быть 637', (I, mediaPage) => {
    I.resizeWindow(1920, 1080);
    I.seeElement(mediaPage.popularHeader);
    I.seeNumberOfElements(mediaPage.popularHeaderNews, 637);
});

// новостей было 21, стало 637, соответственно нужно изменить локаторы на отображаемые
xScenario('Открываем текущую новость в хедере', function*(I, mediaPage) {
    I.resizeWindow(1920, 1080);
    I.waitForElement(mediaPage.popularHeader);
    I.waitForElement(mediaPage.popularHeaderNews);
    var text = yield I.grabTextFrom(mediaPage.popularNewsTitle);
    I.click(mediaPage.popularNewsTitle);
    I.waitForElement(mediaPage.header);
    I.waitForText(text);
});

// новостей было 21, стало 637, соответственно нужно изменить локаторы на отображаемые
xScenario('Открываем следующую новость в хедере', function*(I, mediaPage) {
    I.resizeWindow(1920, 1080);
    I.waitForElement(mediaPage.popularHeader);
    I.waitForElement(mediaPage.popularHeaderNews);
    var text = yield I.grabTextFrom(mediaPage.popularNextNewsTitle);
    I.click(mediaPage.popularNextNewsTitle);
    I.waitForElement(mediaPage.header);
    I.waitForText(text);
});

// новостей было 21, стало 637, соответственно нужно изменить локаторы на отображаемые
xScenario('Открываем предыдущую новость в хедере', function*(I, mediaPage) {
    I.resizeWindow(1920, 1080);
    I.waitForElement(mediaPage.popularHeader);
    I.waitForElement(mediaPage.popularHeaderNews);
    var text = yield I.grabTextFrom(mediaPage.popularPrevNewsTitle);
    I.click(mediaPage.popularPrevNewsTitle);
    I.waitForElement(mediaPage.header);
    I.waitForText(text);
});
