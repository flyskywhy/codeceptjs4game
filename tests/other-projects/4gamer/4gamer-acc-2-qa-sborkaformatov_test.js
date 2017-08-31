/**
 * Тесты для тестовой статьи 'СБОРКА ФОРМАТОВ — Фогеймер'
 */

Feature('4gamer-acc-2-qa-sborkaformatov. Тесты для тестовой статьи СБОРКА ФОРМАТОВ — Фогеймер.');

Before((I, mediaPage) => {
    I.amOnPage(mediaPage.sborkaformatov.url);
    I.seeInTitle(mediaPage.sborkaformatov.title);
    I.seeElement(mediaPage.header);
});

Scenario('Проверяем верстку статьи исключая динамический контент', (I, mediaPage) => {
    I.checkLayout('4gamer-acc-2-qa-sborkaformatov', [{
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
    I.dontSeeInTitle(mediaPage.sborkaformatov.title);
    I.dontSeeElement(mediaPage.header);
});

Scenario('Поделиться ссылкой в неавторизованном FB (через хедер), проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.headerFacebook);
    I.click(mediaPage.socialButton.headerFacebook);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/sborkaformatov/', 15);
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

Scenario('Поделиться ссылкой в неавторизованный вконтакте через футер, проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.footerVk);
    I.scrollTo(mediaPage.sborkaformatov.footer);
    I.click(mediaPage.socialButton.footerVk);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/sborkaformatov/&title=СБОРКА+ФОРМАТОВ', 15);
    I.dontSeeInTitle(mediaPage.sborkaformatov.title);
    I.dontSeeInCurrentUrl(mediaPage.sborkaformatov.url);
});

Scenario('Поделиться ссылкой в неавторизованный фейсбук через футер, проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.footerFacebookButton);
    I.scrollTo(mediaPage.sborkaformatov.footer);
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

Scenario('Проверяем переход в паблик вконтакте, проверяем переход на новую страницу и урл', (I, mediaPage) => {
    I.scrollTo(mediaPage.socialButton.socialButtons);
    I.waitForVisible(mediaPage.socialButton.readVkLink, 10);
    I.click(mediaPage.socialButton.readVkLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.seeInCurrentUrl('vk.com');
    I.seeInCurrentUrl('4game');
});

Scenario('Проверяем переход в твитер, проверяем переход на новую страницу и урл', (I, mediaPage) => {
    I.switchTo(mediaPage.frame.twitter);
    I.waitForElement(mediaPage.frame.twitterMedia);
    I.click(mediaPage.frame.twitterFollowButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForElement(mediaPage.body, 10);
    I.seeInCurrentUrl('twitter.com');
});

Scenario('Открываем следующую статью с помощью стрелки, проверяем урл', (I, mediaPage) => {
    I.waitForElement(mediaPage.nextArrow);
    I.click(mediaPage.nextArrow);
    I.seeInCurrentUrl('videonovosti-ot-15-aprelja-2016-goda');
});

Scenario('Открываем предыдущую статью с помощью стрелки, проверяем урл', (I, mediaPage) => {
    I.waitForElement(mediaPage.previewArrow);
    I.click(mediaPage.previewArrow);
    I.seeInCurrentUrl('ne-vinovatye-my');
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
    I.dontSeeInCurrentUrl(mediaPage.sborkaformatov.url);
    I.dontSeeInTitle(mediaPage.sborkaformatov.title);
    I.seeInCurrentUrl('aleksey-makarenkov');
});

Scenario('Проверяем количество просмотров статьи, берем значение и прибавляем 1, обновляем страницу, стравниваем с текущим значением', function*(I, mediaPage) {
    I.seeElement(mediaPage.viewCountElement);
    var count = parseInt(yield I.grabTextFrom(mediaPage.viewCountElement));
    I.refreshPage();
    I.seeElement(mediaPage.viewCountElement);
    var newCount = parseInt(yield I.grabTextFrom(mediaPage.viewCountElement));
    // I.textShouldBeSameAs(count + 1, newCount);
    I.textShouldBeSameAs(count, newCount);
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

Scenario('Переход по тегу, проверяем что открылась страница тега и урл', (I, mediaPage, indexPage) => {
    I.scrollTo(mediaPage.sborkaformatov.footer);
    I.waitForVisible(mediaPage.firstTagSelector);
    I.click(mediaPage.firstTagSelector);
    I.waitForVisible(indexPage.tagsContent);
    I.seeInCurrentUrl('/tags/teg1/');
});

Scenario('Проверяем переход на youtube', (I, mediaPage, pointblankInstallPage) => {
    I.seeElement(mediaPage.frame.youTube);
    I.switchToIframeByNumber(2);
    I.click(mediaPage.frame.youTubePlayButton);
    I.waitForElement(pointblankInstallPage.streamSelector);
});

Scenario('Открываем викторину на плейбазе, проверяем что она отображается', (I, mediaPage) => {
    I.waitForVisible(mediaPage.sborkaformatov.quizOnPlaybase);
    I.waitForElement(mediaPage.sborkaformatov.quizPlayButton);
    I.scrollTo(mediaPage.sborkaformatov.quizOnPlaybase);
    I.click(mediaPage.sborkaformatov.quizPlayButton);
    I.waitForElement(".Modal__contentWrapper");
});

Scenario('Проверяем работу стрелок для галереи', (I, mediaPage) => {
    I.seeElement(mediaPage.galleryElement);

    // листаем вперед
    I.seeElement('[src="-/7ea5f7b5fd29fbcc0d7866e50758ca09/images/gallery-previews/97a0dcb9-66f7-407f-93f5-e53839407457.jpeg"]');
    I.click(mediaPage.galleryArrowNext);
    I.seeElement('[src="-/40f1cdb4d644623089a316e86e65a05f/images/gallery-previews/a81628e8-894c-450e-b4c2-c922822c8391.jpeg"]');
    I.click(mediaPage.galleryArrowNext);
    I.seeElement('[src="-/6abfe0468de175fb2c5f0f6578215462/images/gallery-previews/ef9f4553-0364-47b4-a6dc-436dfaeddf5c.jpeg"]');
    I.click(mediaPage.galleryArrowNext);
    I.seeElement('[src="-/b98724bc859e78c2407fc5585684f6f7/images/gallery-previews/49a235d6-4598-48e2-83f6-14f228ace97f.jpeg"]');
    I.click(mediaPage.galleryArrowNext);
    I.seeElement('[src="-/8d13fca1770e344a959a21b0ba5438c6/images/gallery-previews/564b76dc-73d8-4077-b176-aa249702427e.jpeg"]');

    // листаем назад
    I.click(mediaPage.galleryArrowPrev);
    I.seeElement('[src="-/b98724bc859e78c2407fc5585684f6f7/images/gallery-previews/49a235d6-4598-48e2-83f6-14f228ace97f.jpeg"]');
    I.click(mediaPage.galleryArrowPrev);
    I.seeElement('[src="-/6abfe0468de175fb2c5f0f6578215462/images/gallery-previews/ef9f4553-0364-47b4-a6dc-436dfaeddf5c.jpeg"]');
    I.click(mediaPage.galleryArrowPrev);
    I.seeElement('[src="-/40f1cdb4d644623089a316e86e65a05f/images/gallery-previews/a81628e8-894c-450e-b4c2-c922822c8391.jpeg"]');
    I.click(mediaPage.galleryArrowPrev);
    I.seeElement('[src="-/7ea5f7b5fd29fbcc0d7866e50758ca09/images/gallery-previews/97a0dcb9-66f7-407f-93f5-e53839407457.jpeg"]');
});

Scenario('Проверяем выделение активной картинки при листании (под основной картинкой)', (I, mediaPage) => {
    I.seeElement(mediaPage.galleryElement);

    // листаем вперед
    I.seeElement(mediaPage.activeSlide0);
    I.click(mediaPage.galleryArrowNext);
    I.seeElement(mediaPage.activeSlide1);
    I.click(mediaPage.galleryArrowNext);
    I.seeElement(mediaPage.activeSlide2);
    I.click(mediaPage.galleryArrowNext);
    I.seeElement(mediaPage.activeSlide3);
    I.click(mediaPage.galleryArrowNext);
    I.seeElement(mediaPage.activeSlide4);

    // листаем назад
    I.seeElement(mediaPage.activeSlide4);
    I.click(mediaPage.galleryArrowPrev);
    I.seeElement(mediaPage.activeSlide3);
    I.click(mediaPage.galleryArrowPrev);
    I.seeElement(mediaPage.activeSlide2);
    I.click(mediaPage.galleryArrowPrev);
    I.seeElement(mediaPage.activeSlide1);
    I.click(mediaPage.galleryArrowPrev);
    I.seeElement(mediaPage.activeSlide0);
});

Scenario('Количество статей в футере Выбор редакции должно быть 4', (I, mediaPage) => {
    I.waitForVisible(mediaPage.popularFooter);
    I.seeElement(mediaPage.popularFooter);
    I.seeNumberOfElements(mediaPage.popularFooterNews, 4);
});

Scenario('Открываем вторую новость из блока Выбор редакции, проверяем заголовок открытой новости', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.secondNews);
    var text = yield I.grabTextFrom(mediaPage.secondNewsTitle);
    I.click(mediaPage.secondNewsLink);
    I.dontSeeInCurrentUrl(mediaPage.sborkaformatov.url);
    I.waitForEnabled(mediaPage.titleText);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Открываем третью новость из блока Выбор редакции, проверяем заголовок открытой новости', function*(I, mediaPage) {
    I.waitForVisible(mediaPage.popularFooter);
    I.waitForVisible(mediaPage.thirdNews);
    var text = yield I.grabTextFrom(mediaPage.thirdNewsTitle);
    I.click(mediaPage.thirdNewsLink);
    I.dontSeeInCurrentUrl(mediaPage.sborkaformatov.url);
    I.waitForEnabled(mediaPage.titleText);
    var title = yield I.grabTextFrom(mediaPage.titleText);
    I.textShouldBeSameAs(text, title);
});

Scenario('Рекомендованные новости в хедере при высоте окна > 900px, увеличиваем окно, проверяем наличие рекомендованных новостей', (I, mediaPage) => {
    I.resizeWindow(1920, 1080);
    I.seeElement(mediaPage.popularHeader);
});

Scenario('Количество новостей в хедере должно быть 637, увеличиваем окно, проверяем кол-во', (I, mediaPage) => {
    I.resizeWindow(1920, 1080);
    I.seeElement(mediaPage.popularHeader);
    I.seeNumberOfElements(mediaPage.popularHeaderNews, 637);
});

// новостей было 21, стало 637, соответственно нужно изменить локаторы на отображаемые
xScenario('Открываем текущую новость в хедере, проверяем переход на новую статью и текст', function*(I, mediaPage) {
    I.resizeWindow(1920, 1080);
    I.waitForElement(mediaPage.popularHeader);
    I.waitForElement(mediaPage.popularHeaderNews);
    var text = yield I.grabTextFrom(mediaPage.popularNewsTitle);
    I.click(mediaPage.popularNewsTitle);
    I.waitForElement(mediaPage.header);
    I.waitForText(text);
});

// новостей было 21, стало 637, соответственно нужно изменить локаторы на отображаемые
xScenario('Открываем следующую новость в хедере, проверяем переход на новую статью и текст', function*(I, mediaPage) {
    I.resizeWindow(1920, 1080);
    I.waitForElement(mediaPage.popularHeader);
    I.waitForElement(mediaPage.popularHeaderNews);
    var text = yield I.grabTextFrom(mediaPage.popularNextNewsTitle);
    I.click(mediaPage.popularNextNewsTitle);
    I.waitForElement(mediaPage.header);
    I.waitForText(text);
});

// новостей было 21, стало 637, соответственно нужно изменить локаторы на отображаемые
xScenario('Открываем предыдущую новость в хедере, проверяем переход на новую статью и текст', function*(I, mediaPage) {
    I.resizeWindow(1920, 1080);
    I.waitForElement(mediaPage.popularHeader);
    I.waitForElement(mediaPage.popularHeaderNews);
    var text = yield I.grabTextFrom(mediaPage.popularPrevNewsTitle);
    I.click(mediaPage.popularPrevNewsTitle);
    I.waitForElement(mediaPage.header);
    I.waitForText(text);
});
