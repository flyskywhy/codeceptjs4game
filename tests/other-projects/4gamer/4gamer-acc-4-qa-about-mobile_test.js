/**
 * Тесты мобильной версии статьи О Нас
 */

Feature('4gamer-acc-4-qa-about-mobile. Тесты мобильной версии статьи О Нас - верстка, закрытие статьи, кол-во просмотров, отображение и переход на новости блока Выбор редакции.');

Before((I, mediaPage) => {
    I.amOnPage(mediaPage.about.url);
    I.setMobileResolutionEquivalentCurrent();
    I.seeInTitle(mediaPage.about.title);
    I.seeElement(mediaPage.header);
});

Scenario('Проверяем верстку мобильной страницы О нас исключая динамический контент', (I, mediaPage) => {
    I.checkLayout('4gamer-acc-4-qa-about-mobile', [{
            name: 'body',
            elem: mediaPage.content.css,
            exclude: mediaPage.exclude
        }],
        0.05,
        '4gamer', "reference");
});

Scenario('Закрываем статью с помощью крестика в правом верхнем углу', (I, mediaPage, indexPage) => {
    I.waitForVisible(mediaPage.closeButton);
    I.click(mediaPage.closeButton);
    I.waitForVisible(indexPage.index.pageSelector);
    I.dontSeeInTitle(mediaPage.about.title);
    I.dontSeeElement(mediaPage.header);
});

// Тест может работать не правильно, т.к. поведение счетчиков нестабильное
Scenario('Проверяем количество просмотров статьи,берем значение и прибавляем 1, обновляем страницу, стравниваем с текущим значением', function*(I, mediaPage) {
    I.seeElement(mediaPage.mobile.viewCountElement);
    var count = parseInt(yield I.grabTextFrom(mediaPage.mobile.viewCountElement));
    I.refreshPage();
    I.seeElement(mediaPage.mobile.viewCountElement);
    var newCount = parseInt(yield I.grabTextFrom(mediaPage.mobile.viewCountElement));
    I.textShouldBeSameAs(count + 1, newCount);
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
    I.dontSeeInCurrentUrl(mediaPage.about.url);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Открываем вторую новость из блока Выбор редакции, проверяем заголовок открытой новости', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.secondNews);
    var text = yield I.grabTextFrom(mediaPage.secondNewsTitle);
    I.click(mediaPage.secondNewsLink);
    I.waitForText(text);
    I.dontSeeInCurrentUrl(mediaPage.about.url);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Открываем третью новость из блока Выбор редакции, проверяем заголовок открытой новости', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.thirdNews);
    var text = yield I.grabTextFrom(mediaPage.thirdNewsTitle);
    I.click(mediaPage.thirdNewsLink);
    I.waitForText(text);
    I.dontSeeInCurrentUrl(mediaPage.about.url);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Открываем последнюю новость из блока Выбор редакции, проверяем заголовок открытой новости', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.lastNews);
    var text = yield I.grabTextFrom(mediaPage.lastNewsTitle);
    I.click(mediaPage.lastNewsLink);
    I.waitForText(text);
    I.dontSeeInCurrentUrl(mediaPage.about.url);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});
