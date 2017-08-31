Feature("aion-acc-1-qa-install. Тесты для страницы install - Aion — официальный сайт онлайн-игры.");

BeforeSuite((I) => {
    I.syncDown('4game-aion', "acc-1-qa-install");
});

Before((I, aionInstallPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(aionInstallPage.install.url);
    I.seeInTitle(aionInstallPage.install.title);
});

AfterSuite((I) => {
    I.createTar('4game-aion', "acc-1-qa-install");
    I.syncUp('4game-aion', "acc-1-qa-install");
    I.clearDir('4game-aion', "acc-1-qa-install");
})

Scenario("Проверяем верстку страницы", (I, aionInstallPage, genericPage) => {
    I.checkLayout('install-main', [{
            name: 'body',
            elem: aionInstallPage.install.content,
            exclude: genericPage.excludeWithGamePanel
        }],
        0.05,
        '4game-aion', "acc-1-qa-install");
});

Scenario("Геймпанель отображается на странице", (I, genericPage) => {
    I.waitForElement(genericPage.gamePanel.generalElement);
    I.waitForVisible(genericPage.gamePanel.generalElement);
});

Scenario("Юзербар отображается на странице", (I, genericPage) => {
    I.waitForElement(genericPage.userBar);
    I.waitForVisible(genericPage.userBar);
});

Scenario("Открываем видео в галерее снизу, проверяем работу видео", (I, aionInstallPage, genericPage) => {
    I.waitForElement(aionInstallPage.install.galleryVideoElement);
    I.click(aionInstallPage.install.galleryVideoElement);
    I.waitForElement(aionInstallPage.install.galleryPopup);
    I.switchToIframeByNumber(0);
    I.waitForElement(genericPage.videoIframe.playButton);
    I.click(genericPage.videoIframe.playButton);
    I.waitForElement(genericPage.videoIframe.streamSelector);
});

Scenario("Открываем первую картинку в галерее снизу, проверяем верстку попапа", (I, aionInstallPage, genericPage) => {
    I.waitForElement(aionInstallPage.install.galleryFirstImg);
    I.click(aionInstallPage.install.galleryFirstImg);
    I.waitForElement(aionInstallPage.install.galleryPopup);
    I.checkLayout('popup-first-img', [{
            name: 'body',
            elem: aionInstallPage.install.content,
            exclude: genericPage.excludeWithGamePanel
        }],
        0.05,
        '4game-aion', "acc-1-qa-install");
});

Scenario("Проверяем навигацию по галерее вперед", (I, aionInstallPage) => {
    I.waitForElement(aionInstallPage.install.galleryVideoElement);
    I.click(aionInstallPage.install.galleryVideoElement);
    I.waitForElement(aionInstallPage.install.galleryPopup);
    I.waitForElement(aionInstallPage.install.galleryNextArrow);
    I.click(aionInstallPage.install.galleryNextArrow);
    I.waitForElement(aionInstallPage.install.firstImgActive);
    I.waitForElement(aionInstallPage.install.galleryNextArrow);
    I.waitForElement(aionInstallPage.install.galleryPrevArrow);
});

Scenario("Проверяем навигацию по галерее назад", (I, aionInstallPage) => {
    I.waitForElement(aionInstallPage.install.galleryLastImg);
    I.click(aionInstallPage.install.galleryLastImg);
    I.waitForElement(aionInstallPage.install.galleryPopup);
    I.waitForElement(aionInstallPage.install.galleryPrevArrow);
    I.click(aionInstallPage.install.galleryPrevArrow);
    I.waitForElement(aionInstallPage.install.fourthImgActiveActive);
    I.waitForElement(aionInstallPage.install.galleryNextArrow);
    I.waitForElement(aionInstallPage.install.galleryPrevArrow);
});

Scenario("Открываем последнюю картинку в галерее снизу, проверяем верстку попапа", (I, aionInstallPage, genericPage) => {
    I.waitForElement(aionInstallPage.install.galleryLastImg);
    I.click(aionInstallPage.install.galleryLastImg);
    I.waitForElement(aionInstallPage.install.galleryPopup);
    I.checkLayout('popup-last-img', [{
            name: 'body',
            elem: aionInstallPage.install.content,
            exclude: genericPage.excludeWithGamePanel
        }],
        0.05,
        '4game-aion', "acc-1-qa-install");
});

Scenario("Закрываем попап галереи", (I, aionInstallPage) => {
    I.waitForElement(aionInstallPage.install.galleryVideoElement);
    I.click(aionInstallPage.install.galleryVideoElement);
    I.waitForElement(aionInstallPage.install.galleryPopup);
    I.waitForElement(aionInstallPage.install.galleryCloseButton);
    I.click(aionInstallPage.install.galleryCloseButton);
    I.dontSeeElement(aionInstallPage.install.galleryPopup);
});

Scenario("Проверяем переход в Мир Игры (катаклизм) и верстку страницы", (I, aionInstallPage, genericPage) => {
    I.waitForElement(aionInstallPage.menu.world);
    I.click(aionInstallPage.menu.world);
    I.waitForElement(aionInstallPage.world.cataclismActiveElement);
    I.seeInCurrentUrl("world");
    I.stopAnimation(aionInstallPage.cataclismAnimation);
    I.checkLayout('world-cataclism', [{
            name: 'body',
            elem: aionInstallPage.install.content,
            exclude: genericPage.excludeWithGamePanel
        }],
        0.05,
        '4game-aion', "acc-1-qa-install");
});

Scenario("Проверяем переход в Мир Игры (разделение рас) и верстку страницы", (I, aionInstallPage, genericPage) => {
    I.waitForElement(aionInstallPage.menu.world);
    I.click(aionInstallPage.menu.world);
    I.waitForElement(aionInstallPage.world.cataclismActiveElement);
    I.click(aionInstallPage.menu.split);
    I.waitForElement(aionInstallPage.world.splitActiveElement);
    I.seeInCurrentUrl("world");
    I.stopAnimation(aionInstallPage.cataclismAnimation);
    I.checkLayout('world-split', [{
            name: 'body',
            elem: aionInstallPage.install.content,
            exclude: genericPage.excludeWithGamePanel
        }],
        0.05,
        '4game-aion', "acc-1-qa-install");
});

Scenario("Проверяем переход в Мир Игры (бездна) и верстку страницы", (I, aionInstallPage, genericPage) => {
    I.waitForElement(aionInstallPage.menu.world);
    I.click(aionInstallPage.menu.world);
    I.waitForElement(aionInstallPage.world.cataclismActiveElement);
    I.click(aionInstallPage.menu.abyss);
    I.waitForElement(aionInstallPage.world.abyssActiveElement);
    I.seeInCurrentUrl("world");
    I.stopAnimation(".pAionGL_bWorld__eAbyssRotation");
    I.checkLayout('world-abyss', [{
            name: 'body',
            elem: aionInstallPage.install.content,
            exclude: genericPage.excludeWithGamePanel
        }],
        0.05,
        '4game-aion', "acc-1-qa-install");
});

Scenario("Проверяем переход в Мир Игры (мир сегодня) и верстку страницы", (I, aionInstallPage, genericPage) => {
    I.waitForElement(aionInstallPage.menu.world);
    I.click(aionInstallPage.menu.world);
    I.waitForElement(aionInstallPage.world.cataclismActiveElement);
    I.click(aionInstallPage.menu.today);
    I.waitForElement(aionInstallPage.world.todayActiveElement);
    I.seeInCurrentUrl("world");
    I.stopAnimation(aionInstallPage.cataclismAnimation);
    I.checkLayout('world-today', [{
            name: 'body',
            elem: aionInstallPage.install.content,
            exclude: genericPage.excludeWithGamePanel
        }],
        0.05,
        '4game-aion', "acc-1-qa-install");
});

Scenario("Проверяем переход в Классы и верстку страницы", (I, aionInstallPage, genericPage) => {
    I.waitForElement(aionInstallPage.menu.classes);
    I.click(aionInstallPage.menu.classes);
    I.waitForElement(aionInstallPage.classes.activeElement);
    I.seeInCurrentUrl("classes");
    I.checkLayout('classes', [{
            name: 'body',
            elem: aionInstallPage.install.content,
            exclude: genericPage.excludeWithGamePanel
        }],
        0.05,
        '4game-aion', "acc-1-qa-install");
});

Scenario("Проверяем переход в Персонажи и верстку страницы", (I, aionInstallPage, genericPage) => {
    I.waitForElement(aionInstallPage.menu.characters);
    I.click(aionInstallPage.menu.characters);
    I.waitForElement(aionInstallPage.characters.activeElement);
    I.seeInCurrentUrl("characters");
    I.waitForElement(".pAionGL_bMorphing__eTimelineSlider[style='left: 127px;']");
    I.checkLayout('characters', [{
            name: 'body',
            elem: aionInstallPage.install.content,
            exclude: genericPage.excludeWithGamePanel
        }],
        0.05,
        '4game-aion', "acc-1-qa-install");
});

Scenario("Проверяем переход в Игроки и верстку страницы", (I, aionInstallPage, genericPage) => {
    I.waitForElement(aionInstallPage.menu.players);
    I.click(aionInstallPage.menu.players);
    I.waitForElement(aionInstallPage.players.activeElement);
    I.seeInCurrentUrl("players");
    I.checkLayout('players', [{
            name: 'body',
            elem: aionInstallPage.install.content,
            exclude: genericPage.excludeWithGamePanel
        }],
        0.05,
        '4game-aion', "acc-1-qa-install");
});

Scenario("Открываем первый попап в галерее Мир Игры (мир сегодня)", (I, aionInstallPage) => {
    I.waitForElement(aionInstallPage.menu.world);
    I.click(aionInstallPage.menu.world);
    I.waitForElement(aionInstallPage.world.cataclismActiveElement);
    I.click(aionInstallPage.menu.today);
    I.waitForElement(aionInstallPage.world.todayActiveElement);
    I.seeInCurrentUrl("world");
    I.waitForVisible(aionInstallPage.world.todayFirstGalleryImage);
    I.click(aionInstallPage.world.todayFirstGalleryImage);
    I.waitForElement(aionInstallPage.world.todayFirstImagePopup);
});

Scenario("Открываем средний попап в галерее Мир Игры (мир сегодня)", (I, aionInstallPage) => {
    I.waitForElement(aionInstallPage.menu.world);
    I.click(aionInstallPage.menu.world);
    I.waitForElement(aionInstallPage.world.cataclismActiveElement);
    I.click(aionInstallPage.menu.today);
    I.waitForElement(aionInstallPage.world.todayActiveElement);
    I.seeInCurrentUrl("world");
    I.waitForVisible(aionInstallPage.world.todayMidleGalleryImage);
    I.click(aionInstallPage.world.todayMidleGalleryImage);
    I.waitForElement(aionInstallPage.world.todayMidleImagePopup);
});

Scenario("Открываем последний попап в галерее Мир Игры (мир сегодня)", (I, aionInstallPage) => {
    I.waitForElement(aionInstallPage.menu.world);
    I.click(aionInstallPage.menu.world);
    I.waitForElement(aionInstallPage.world.cataclismActiveElement);
    I.click(aionInstallPage.menu.today);
    I.waitForElement(aionInstallPage.world.todayActiveElement);
    I.seeInCurrentUrl("world");
    I.waitForVisible(aionInstallPage.world.todayLastGalleryImage);
    I.click(aionInstallPage.world.todayLastGalleryImage);
    I.waitForElement(aionInstallPage.world.todayLastImagePopup);
});

Scenario("Закрываем попап в галерее Мир Игры (мир сегодня)", (I, aionInstallPage) => {
    I.waitForVisible(aionInstallPage.menu.world);
    I.click(aionInstallPage.menu.world);
    I.waitForElement(aionInstallPage.world.cataclismActiveElement);
    I.waitForVisible(aionInstallPage.menu.today);
    I.click(aionInstallPage.menu.today);
    I.waitForElement(aionInstallPage.world.todayActiveElement);
    I.seeInCurrentUrl("world");
    I.waitForVisible(aionInstallPage.world.todayLastGalleryImage);
    I.click(aionInstallPage.world.todayLastGalleryImage);
    I.waitForElement(aionInstallPage.world.todayLastImagePopup);
    I.waitForVisible(aionInstallPage.world.galleryCloseButton);
    I.click(aionInstallPage.world.galleryCloseButton);
    I.waitForElement(aionInstallPage.world.todayActiveElement);
});

Scenario("Проверяем работу стрелки Назад в галерее Мир Игры (мир сегодня)", (I, aionInstallPage) => {
    I.waitForVisible(aionInstallPage.menu.world);
    I.click(aionInstallPage.menu.world);
    I.waitForElement(aionInstallPage.world.cataclismActiveElement);
    I.waitForVisible(aionInstallPage.menu.today);
    I.click(aionInstallPage.menu.today);
    I.waitForElement(aionInstallPage.world.todayActiveElement);
    I.seeInCurrentUrl("world");
    I.waitForVisible(aionInstallPage.world.todayMidleGalleryImage);
    I.click(aionInstallPage.world.todayMidleGalleryImage);
    I.waitForElement(aionInstallPage.world.todayMidleImagePopup);
    I.waitForVisible(aionInstallPage.world.galleryPrevArrow);
    I.click(aionInstallPage.world.galleryPrevArrow);
    I.waitForVisible(aionInstallPage.world.galleryPrevImage);
});

Scenario("Проверяем работу стрелки Вперед в галерее Мир Игры (мир сегодня)", (I, aionInstallPage) => {
    I.waitForVisible(aionInstallPage.menu.world);
    I.click(aionInstallPage.menu.world);
    I.waitForElement(aionInstallPage.world.cataclismActiveElement);
    I.waitForVisible(aionInstallPage.menu.today);
    I.click(aionInstallPage.menu.today);
    I.waitForElement(aionInstallPage.world.todayActiveElement);
    I.seeInCurrentUrl("world");
    I.waitForVisible(aionInstallPage.world.todayMidleGalleryImage);
    I.click(aionInstallPage.world.todayMidleGalleryImage);
    I.waitForElement(aionInstallPage.world.todayMidleImagePopup);
    I.waitForVisible(aionInstallPage.world.galleryNextArrow);
    I.click(aionInstallPage.world.galleryNextArrow);
    I.waitForVisible(aionInstallPage.world.galleryNextImage);
});
