Feature("rfonline-acc-1-qa-install. Тесты для страницы install - RF Online — официальный сайт онлайн-игры.");

BeforeSuite((I) => {
    I.syncDown('4game-rfonline', 'acc-1-qa-install');
});

Before((I, rfonlineInstallPage, genericPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(rfonlineInstallPage.url);
    I.seeInTitle(rfonlineInstallPage.title);
});

AfterSuite((I) => {
    I.createTar('4game-rfonline', 'acc-1-qa-install');
    I.syncUp('4game-rfonline', 'acc-1-qa-install');
    I.clearDir('4game-rfonline', 'acc-1-qa-install');
})

Scenario("Проверяем верстку страницы", (I, rfonlineInstallPage, genericPage) => {
    I.checkLayout('main', [{
            name: 'body',
            elem: rfonlineInstallPage.content,
            exclude: genericPage.exclude
        }],
        0.05,
        '4game-rfonline', "acc-1-qa-install");
});

Scenario("Геймпанель должна отображаться на странице", (I, genericPage) => {
    I.waitForElement(genericPage.gamePanel.gamePanel);
    I.waitForVisible(genericPage.gamePanel.generalElement);
});

Scenario("Проверяем текст на cтранице", (I, rfonlineInstallPage) => {
    I.see(rfonlineInstallPage.description, rfonlineInstallPage.textContainer);
});

Scenario("Проверяем появление иконок увеличения на скринах", (I, rfonlineInstallPage) => {
    I.waitForVisible(rfonlineInstallPage.firstScreen);
    I.moveCursorTo(rfonlineInstallPage.firstScreen, 20, 20);
    I.waitForVisible(rfonlineInstallPage.bulletImage);
    I.moveCursorTo(rfonlineInstallPage.videoButton);
    I.waitToHide(rfonlineInstallPage.bulletImage, 0.2);
    I.moveCursorTo(rfonlineInstallPage.secondScreen, 20, 20);
    I.waitForVisible(rfonlineInstallPage.bulletImage);
    I.moveCursorTo(rfonlineInstallPage.videoButton);
    I.waitToHide(rfonlineInstallPage.bulletImage, 0.2);
    I.moveCursorTo(rfonlineInstallPage.thirdScreen, 20, 20);
    I.waitForVisible(rfonlineInstallPage.bulletImage);
    I.moveCursorTo(rfonlineInstallPage.videoButton);
    I.waitToHide(rfonlineInstallPage.bulletImage, 0.2);
    I.moveCursorTo(rfonlineInstallPage.fourthScreen, 20, 20);
    I.waitForVisible(rfonlineInstallPage.bulletImage);
    I.moveCursorTo(rfonlineInstallPage.videoButton);
    I.waitToHide(rfonlineInstallPage.bulletImage, 0.2);
    I.moveCursorTo(rfonlineInstallPage.lastScreen, 20, 20);
    I.waitForVisible(rfonlineInstallPage.bulletImage);
    I.moveCursorTo(rfonlineInstallPage.videoButton);
    I.waitToHide(rfonlineInstallPage.bulletImage, 0.2);
});

Scenario("Открываем первый скрин, проверяем изображение и основные элементы", (I, rfonlineInstallPage, genericPage) => {
    I.waitForVisible(rfonlineInstallPage.firstScreen);
    I.click(rfonlineInstallPage.firstScreen);
    I.waitForElement(rfonlineInstallPage.activeFirstScreen);
    I.moveCursorTo(rfonlineInstallPage.navLeft, 10, 10);
    I.waitForElement(rfonlineInstallPage.navLeft);
    I.moveCursorTo(rfonlineInstallPage.navRight, 10, 10);
    I.waitForElement(rfonlineInstallPage.navRight);
    I.moveCursorTo(rfonlineInstallPage.navClose, 10, 10);
    I.waitForElement(rfonlineInstallPage.navClose);
    I.checkLayout('screen1', [{
            name: 'body',
            elem: rfonlineInstallPage.content,
            exclude: genericPage.exclude
        }],
        0.05,
        '4game-rfonline', "acc-1-qa-install");
    I.click(rfonlineInstallPage.navClose);
    I.waitToHide(rfonlineInstallPage.activeFirstScreen, 0.2);
});

Scenario("Открываем первый скрин кликом на иконку, проверяем основные элементы", (I, rfonlineInstallPage) => {
    I.waitForVisible(rfonlineInstallPage.firstScreen);
    I.moveCursorTo(rfonlineInstallPage.firstScreen, 20, 20);
    I.waitForVisible(rfonlineInstallPage.bulletImage);
    I.click(rfonlineInstallPage.bulletImage);
    I.waitForElement(rfonlineInstallPage.activeFirstScreen);
    I.moveCursorTo(rfonlineInstallPage.navLeft, 10, 10);
    I.waitForElement(rfonlineInstallPage.navLeft);
    I.moveCursorTo(rfonlineInstallPage.navRight, 10, 10);
    I.waitForElement(rfonlineInstallPage.navRight);
    I.moveCursorTo(rfonlineInstallPage.navClose, 10, 10);
    I.waitForElement(rfonlineInstallPage.navClose);
    I.click(rfonlineInstallPage.navClose);
    I.waitToHide(rfonlineInstallPage.activeFirstScreen, 0.2);
});

Scenario("Открываем остальные скрины", (I, rfonlineInstallPage) => {
    I.waitForVisible(rfonlineInstallPage.secondScreen);
    I.click(rfonlineInstallPage.secondScreen);
    I.waitForElement(rfonlineInstallPage.activeSecondScreen);
    I.click(rfonlineInstallPage.navClose);
    I.waitToHide(rfonlineInstallPage.activeSecondScreen, 0.2);
    I.waitForVisible(rfonlineInstallPage.thirdScreen);
    I.click(rfonlineInstallPage.thirdScreen);
    I.waitForElement(rfonlineInstallPage.activeThirdScreen);
    I.click(rfonlineInstallPage.navClose);
    I.waitToHide(rfonlineInstallPage.activeThirdScreen, 0.2);
    I.waitForVisible(rfonlineInstallPage.fourthScreen);
    I.click(rfonlineInstallPage.fourthScreen);
    I.waitForElement(rfonlineInstallPage.activeFourthScreen);
    I.click(rfonlineInstallPage.navClose);
    I.waitToHide(rfonlineInstallPage.activeFourthScreen, 0.2);
    I.waitForVisible(rfonlineInstallPage.lastScreen);
    I.click(rfonlineInstallPage.lastScreen);
    I.waitForElement(rfonlineInstallPage.activeLastScreen);
    I.click(rfonlineInstallPage.navClose);
    I.waitToHide(rfonlineInstallPage.activeLastScreen, 0.2);
});

Scenario("Открываем последний скрин, проверяем переключение на четвёртый и первый", (I, rfonlineInstallPage) => {
    I.waitForVisible(rfonlineInstallPage.lastScreen);
    I.moveCursorTo(rfonlineInstallPage.lastScreen, 20, 20);
    I.waitForVisible(rfonlineInstallPage.bulletImage);
    I.moveCursorTo(rfonlineInstallPage.firstScreen, 20, 20);
    I.click(rfonlineInstallPage.lastScreen);
    I.waitForElement(rfonlineInstallPage.activeLastScreen);
    I.moveCursorTo(rfonlineInstallPage.navLeft, 10, 10);
    I.waitForElement(rfonlineInstallPage.navLeft);
    I.click(rfonlineInstallPage.navLeft);
    I.waitForElement(rfonlineInstallPage.activeFourthScreen);
    I.moveCursorTo(rfonlineInstallPage.navRight, 10, 10);
    I.waitForElement(rfonlineInstallPage.navRight);
    I.click(rfonlineInstallPage.navRight);
    I.waitForElement(rfonlineInstallPage.activeLastScreen);
    I.moveCursorTo(rfonlineInstallPage.navRight, 10, 10);
    I.waitForElement(rfonlineInstallPage.navRight);
    I.click(rfonlineInstallPage.navRight);
    I.waitForElement(rfonlineInstallPage.activeFirstScreen);
});

Scenario("Открываем видео, проверяем появление видео закрываем попап", (I, rfonlineInstallPage) => {
    I.waitForVisible(rfonlineInstallPage.videoButton);
    I.click(rfonlineInstallPage.videoButton);
    I.waitForElement(rfonlineInstallPage.videoPopup);
    I.waitForElement(rfonlineInstallPage.videoEmbed);
    I.checkLayout('video', [{
            name: 'video',
            elem: rfonlineInstallPage.videoEmbed,
        }],
        0.05,
        '4game-rfonline', "acc-1-qa-install");
    I.click(rfonlineInstallPage.closePopupButton);
    I.waitToHide(rfonlineInstallPage.videoEmbed, 0.2);
});
