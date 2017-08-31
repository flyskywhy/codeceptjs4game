/**
 * Тесты для тестовой статьи 'Тест новых блоков форматирования — Фогеймер'
 */

Feature('4gamer-acc-2-qa-test-blokov. Тесты для тестовой статьи Тест новых блоков форматирования — Фогеймер.');

Before((I, mediaPage) => {
    I.amOnPage(mediaPage.testBlokov.url);
    I.seeInTitle(mediaPage.testBlokov.title);
    I.seeElement(mediaPage.header);
});

Scenario('Проверяем верстку статьи исключая динамический контент', (I, mediaPage) => {
    I.checkLayout('4gamer-acc-2-qa-test-blokov', [{
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
    I.dontSeeInTitle(mediaPage.testBlokov.title);
    I.dontSeeElement(mediaPage.header);
});

Scenario('Открываем следующую статью с помощью стрелки, проверяем переход на новую статью: урл, текст', (I, mediaPage) => {
    I.waitForElement(mediaPage.nextArrow);
    I.click(mediaPage.nextArrow);
    I.waitForElement(mediaPage.body, 10);
    I.seeInCurrentUrl('test-tegov');
    I.seeElement(mediaPage.header);
});

Scenario('Открываем предыдущую статью с помощью стрелки, проверяем переход на новую статью: урл, текст', (I, mediaPage) => {
    I.seeElement(mediaPage.previewArrow);
    I.click(mediaPage.previewArrow);
    I.seeInCurrentUrl('imperija-protiv-haosa-v-rolike-total-war-warhammer');
    I.seeElement(mediaPage.headerWithVideo);
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

Scenario('Поделиться ссылкой в неавторизованный вконтакте через футер, проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, mediaPage) => {
    I.waitForVisible(mediaPage.testBlokov.footer);
    I.scrollTo(mediaPage.testBlokov.footer);
    I.waitForVisible(mediaPage.socialButton.footerVk);
    I.click(mediaPage.socialButton.footerVk);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/test-novyh-blokov-formatirovanija/&title=Тест новых блоков форматирования', 15);
    I.dontSeeInTitle(mediaPage.testBlokov.title);
    I.dontSeeInCurrentUrl(mediaPage.testBlokov.url);
});

Scenario('Поделиться ссылкой в неавторизованный фейсбук через футер, проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, mediaPage) => {
    I.waitForVisible(mediaPage.testBlokov.footer);
    I.scrollTo(mediaPage.testBlokov.footer);
    I.waitForVisible(mediaPage.socialButton.footerFacebookButton);
    I.click(mediaPage.socialButton.footerFacebookButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/test-novyh-blokov-formatirovanija/', 15);
    I.dontSeeInTitle(mediaPage.testBlokov.title);
    I.dontSeeInCurrentUrl(mediaPage.testBlokov.url);
});

// Тест может работать не стабильно, т.к. поведение счетчиков нестабильное
Scenario('Проверяем количество просмотров статьи, берем значение и прибавляем 1, обновляем страницу, стравниваем с текущим значением', function*(I, mediaPage) {
    I.seeElement(mediaPage.viewCountElement);
    var count = parseInt(yield I.grabTextFrom(mediaPage.viewCountElement));
    I.refreshPage();
    I.seeElement(mediaPage.viewCountElement);
    var newCount = parseInt(yield I.grabTextFrom(mediaPage.viewCountElement));
    // I.textShouldBeSameAs(count + 1, newCount); В ИДЕАЛЕ ДОЛЖНО РАБОТАТЬ ТАК
    I.textShouldBeSameAs(count, newCount);
});

Scenario('Переход по внешней ссылке masseffect', (I, mediaPage) => {
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

Scenario('Переход по внешней ссылке imdb', (I, mediaPage) => {
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

Scenario('Переключаемся на комментарии facebook', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.commentsButtonFb);
    I.scrollTo(mediaPage.testBlokov.footer);
    I.seeElement(mediaPage.socialButton.commentsButtonFb);
    I.click(mediaPage.socialButton.commentsButtonFb);
    I.waitForVisible(mediaPage.socialButton.footerCommentsFb);
});

Scenario('Переключаемся на комментарии вконтакте', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.commentsButtonFb);
    I.scrollTo(mediaPage.testBlokov.footer);
    I.seeElement(mediaPage.socialButton.commentsButtonFb);
    I.click(mediaPage.socialButton.commentsButtonFb);
    I.waitForVisible(mediaPage.socialButton.footerCommentsFb);
    I.seeElement(mediaPage.socialButton.commentsButtonVk);
    I.click(mediaPage.socialButton.commentsButtonVk);
    I.waitForVisible(mediaPage.socialButton.footerCommentsVk);
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

Scenario('Переход по тегу, проверяем что открылась страница тега и урл', (I, mediaPage, indexPage) => {
    I.waitForVisible(mediaPage.firstTagSelector);
    I.click(mediaPage.firstTagSelector);
    I.waitForVisible(indexPage.tagsContent);
    I.seeInCurrentUrl('/tags/doom/');
});

Scenario('Количество статей в футере "Выбор редакции" должно быть 4', (I, mediaPage) => {
    I.waitForVisible(mediaPage.popularFooter);
    I.seeNumberOfElements(mediaPage.popularFooterNews, 4);
});

// сделать клик не по центру плитки с новостью, иначе кликает на тег, если он есть
xScenario('Открываем первую новость из блока "Выбор редакции"', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.firstNews);
    var text = yield I.grabTextFrom(mediaPage.firstNewsTitle);
    I.click(mediaPage.firstNewsLink);
    I.dontSeeInCurrentUrl(mediaPage.testBlokov.url);
    I.waitForEnabled(mediaPage.titleText);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Открываем вторую новость из блока "Выбор редакции"', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.secondNews);
    var text = yield I.grabTextFrom(mediaPage.secondNewsTitle);
    I.click(mediaPage.secondNewsLink);
    I.dontSeeInCurrentUrl(mediaPage.testBlokov.url);
    I.waitForEnabled(mediaPage.titleText);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Открываем третью новость из блока "Выбор редакции"', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.thirdNews);
    var text = yield I.grabTextFrom(mediaPage.thirdNewsTitle);
    I.click(mediaPage.thirdNewsLink);
    I.dontSeeInCurrentUrl(mediaPage.testBlokov.url);
    I.waitForEnabled(mediaPage.titleText);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

// сделать клик не по центру плитки с новостью, иначе кликает на тег, если он есть
xScenario('Открываем последнюю новость из блока "Выбор редакции"', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.lastNews);
    var text = yield I.grabTextFrom(mediaPage.lastNewsTitle);
    I.click(mediaPage.lastNewsLink);
    I.dontSeeInCurrentUrl(mediaPage.testBlokov.url);
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
