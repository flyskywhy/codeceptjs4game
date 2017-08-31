Feature("pointblank-acc-1-qa-install. Тесты для страницы install - Point Blank — официальный сайт онлайн-игры.");

BeforeSuite((I) => {
    I.syncDown('4game-pointblank', "acc-1-qa-install");
});

Before((I, pointblankInstallPage, genericPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(pointblankInstallPage.url);
    I.seeInTitle(pointblankInstallPage.title);
    I.waitForElement(genericPage.userBar);
});

AfterSuite((I) => {
    I.createTar('4game-pointblank', "acc-1-qa-install");
    I.syncUp('4game-pointblank', "acc-1-qa-install");
    I.clearDir('4game-pointblank', "acc-1-qa-install");
})

Scenario("Проверяем верстку страницы", (I, pointblankInstallPage, genericPage) => {
    I.checkLayout('main', [{
            name: 'body',
            elem: pointblankInstallPage.content,
            exclude: genericPage.exclude
        }],
        0.05,
        '4game-pointblank', "acc-1-qa-install");
});

Scenario("Геймпанель должна отображаться на странице", (I, genericPage) => {
    I.waitForElement(genericPage.gamePanel.gamePanel);
    I.waitForVisible(genericPage.gamePanel.generalElement);
});

Scenario("Проверяем текст на cтранице", (I, pointblankInstallPage) => {
    I.waitForText(pointblankInstallPage.description);
});

Scenario("Проверяем на втором слайде новое изображение и основные элементы", (I, pointblankInstallPage, genericPage) => {
    I.waitForVisible(pointblankInstallPage.firstSlide);
    I.waitForElement(pointblankInstallPage.activeFirstSlide);
    I.waitForVisible(pointblankInstallPage.secondSlide);
    I.click(pointblankInstallPage.secondSlide);
    I.waitForElement(pointblankInstallPage.activeSecondSlide);
    I.checkLayout('slide2', [{
            name: 'body',
            elem: pointblankInstallPage.content,
            exclude: genericPage.exclude
        }],
        0.05,
        '4game-pointblank', "acc-1-qa-install");
});

Scenario("Проверяем на третьем слайде новое изображение и основные элементы", (I, pointblankInstallPage, genericPage) => {
    I.waitForVisible(pointblankInstallPage.firstSlide);
    I.waitForElement(pointblankInstallPage.activeFirstSlide);
    I.waitForVisible(pointblankInstallPage.thirdSlide);
    I.click(pointblankInstallPage.thirdSlide);
    I.waitForElement(pointblankInstallPage.activeThirdSlide);
    I.checkLayout('slide3', [{
            name: 'body',
            elem: pointblankInstallPage.content,
            exclude: genericPage.exclude
        }],
        0.05,
        '4game-pointblank', "acc-1-qa-install");
});

Scenario("Проверяем на четвертом слайде новое изображение и основные элементы", (I, pointblankInstallPage, genericPage) => {
    I.waitForVisible(pointblankInstallPage.firstSlide);
    I.waitForElement(pointblankInstallPage.activeFirstSlide);
    I.waitForVisible(pointblankInstallPage.lastSlide);
    I.click(pointblankInstallPage.lastSlide);
    I.waitForElement(pointblankInstallPage.activeLastSlide);
    I.checkLayout('slide4', [{
            name: 'body',
            elem: pointblankInstallPage.content,
            exclude: genericPage.exclude
        }],
        0.05,
        '4game-pointblank', "acc-1-qa-install");
});

Scenario("Проверяем на слайде с видео появление видео и основные элементы", (I, pointblankInstallPage) => {
    I.waitForVisible(pointblankInstallPage.firstSlide);
    I.waitForElement(pointblankInstallPage.activeFirstSlide);
    I.waitForVisible(pointblankInstallPage.videoSlide);
    I.click(pointblankInstallPage.videoSlide);
    I.waitForElement(pointblankInstallPage.videoPopup);
    I.switchToIframeByNumber(0);
    I.checkLayout('video', [{
            name: 'body',
            elem: pointblankInstallPage.iframe
        }],
        0.05,
        '4game-pointblank', "acc-1-qa-install");
});

Scenario("Закрываем попап с видео", (I, pointblankInstallPage) => {
    I.waitForVisible(pointblankInstallPage.firstSlide);
    I.waitForElement(pointblankInstallPage.activeFirstSlide);
    I.waitForVisible(pointblankInstallPage.videoSlide);
    I.click(pointblankInstallPage.videoSlide);
    I.waitForElement(pointblankInstallPage.videoPopup);
    I.click(pointblankInstallPage.closePopupButton);
    I.dontSee(pointblankInstallPage.videoPopup);
});

Scenario("Нажимаем плей, проверяем показ ролика", (I, pointblankInstallPage) => {
    I.waitForVisible(pointblankInstallPage.firstSlide);
    I.waitForElement(pointblankInstallPage.activeFirstSlide);
    I.waitForVisible(pointblankInstallPage.videoSlide);
    I.click(pointblankInstallPage.videoSlide);
    I.waitForElement(pointblankInstallPage.videoPopup);
    I.switchToIframeByNumber(0);
    I.waitForElement(pointblankInstallPage.playButton);
    I.click(pointblankInstallPage.playButton);
    I.waitForElement(pointblankInstallPage.streamSelector);
});
