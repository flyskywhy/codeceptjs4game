/**
 * Тесты статьи О Нас
 */

Feature('4gamer-acc-2-qa-about. Тесты статьи О Нас. Проверяется верстка, закрытие статьи, кол-во просмотров, отображение и переход на новости блока Выбор редакции.');

Before((I, mediaPage) => {
    I.amOnPage(mediaPage.about.url);
    I.seeInTitle(mediaPage.about.title);
    I.seeElement(mediaPage.header);
});

Scenario('Проверяем верстку cтраницы О нас исключая динамический контент', (I, mediaPage) => {
    I.checkLayout('4gamer-acc-2-qa-about', [{
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

Scenario('Поделиться ссылкой в неавторизованном FB (через хедер), проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.headerFacebook);
    I.click(mediaPage.socialButton.headerFacebook);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/about/', 15);
    I.dontSeeInTitle(mediaPage.about.title);
    I.dontSeeInCurrentUrl(mediaPage.about.url);
});

Scenario('Поделиться ссылкой в неавторизованном ВК (через хедер), проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.headerVk);
    I.click(mediaPage.socialButton.headerVk);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/about/&title=', 15);
    I.dontSeeInTitle(mediaPage.about.title);
    I.dontSeeInCurrentUrl(mediaPage.about.url);
});

Scenario('Поделиться ссылкой в неавторизованный ВК (через футер), проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.footerVk);
    I.click(mediaPage.socialButton.footerVk);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://vk.com/share.php?url=https://ru.4gametest.com/4gamer/about/&title=О нас', 15);
    I.dontSeeInTitle(mediaPage.about.title);
    I.dontSeeInCurrentUrl(mediaPage.about.url);
});

Scenario('Поделиться ссылкой в неавторизованный FB (через футер), проверяем что открывается паблик, проверяем что мы передаем данные откуда перешли', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.footerFacebookButton);
    I.click(mediaPage.socialButton.footerFacebookButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(mediaPage.body);
    I.waitInUrl('https://www.facebook.com/sharer/sharer.php?u=https://ru.4gametest.com/4gamer/about/', 15);
    I.dontSeeInTitle(mediaPage.about.title);
    I.dontSeeInCurrentUrl(mediaPage.about.url);
});

Scenario('Переключаемся на комментарии facebook', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.commentsButtonVk);
    I.seeElement(mediaPage.socialButton.commentsButtonVk);
    I.click(mediaPage.socialButton.commentsButtonVk);
    I.waitForVisible(mediaPage.socialButton.footerCommentsVk);
    I.waitForVisible(mediaPage.socialButton.commentsButtonFb);
    I.click(mediaPage.socialButton.commentsButtonFb);
    I.waitForVisible(mediaPage.socialButton.footerCommentsFb);
});

Scenario('Переключаемся на комментарии вконтакте', (I, mediaPage) => {
    I.waitForVisible(mediaPage.socialButton.commentsButtonVk);
    I.seeElement(mediaPage.socialButton.commentsButtonVk);
    I.click(mediaPage.socialButton.commentsButtonVk);
    I.waitForVisible(mediaPage.socialButton.footerCommentsVk);
});
