Feature("aion-acc-3-qa-discount. Тесты для страницы discount Aion — сайт сообщества: выгодный Премиум для новичков.");

BeforeSuite((I) => {
    I.syncDown('4game-aion', "acc-3-qa-discount");
});

Before((I, aionPlayPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(aionPlayPage.discount.url);
    I.seeInTitle(aionPlayPage.discount.title);
});

AfterSuite((I) => {
    I.createTar('4game-aion', "acc-3-qa-discount");
    I.syncUp('4game-aion', "acc-3-qa-discount");
    I.clearDir('4game-aion', "acc-3-qa-discount");
})

Scenario("Проверяем верстку страницы", (I, aionPlayPage) => {
    I.checkLayout('main', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-discount");
});

Scenario("Нажимаем купить премиум, проверяем появление попапа с регистрацией", (I, aionPlayPage, genericPage) => {
    I.waitForElement(aionPlayPage.discount.buyButton);
    I.click(aionPlayPage.discount.buyButton);
    I.waitForVisible(genericPage.authPopup);
    I.waitInUrl("redirectTo=" + aionPlayPage.discount.url + "?popupWidget=PremiumUpgradeWidget&fromactionpage=true", 15)
});

Scenario("Геймпанель не должна отображаться на странице", (I, aionPlayPage) => {
    I.dontSeeElement(aionPlayPage.play.gamePanel);
});

Scenario("Юзербар должен отображаться на странице", (I, genericPage) => {
    I.waitForElement(genericPage.userBar);
    I.waitForVisible(genericPage.userBar);
});

Scenario("Проверяем переход на Главную", (I, aionPlayPage) => {
    I.waitForElement(aionPlayPage.menu.index);
    I.click(aionPlayPage.menu.index);
    I.waitForElement(aionPlayPage.discount.activeElement);
    I.dontSeeElementInDOM(aionPlayPage.menu.index);
    I.seeInCurrentUrl(aionPlayPage.play.url);
});

Scenario("Переходим на акцию Премиум на год, проверяем верстку", (I, aionPlayPage) => {
    I.waitForVisible(aionPlayPage.discount.packages.premiumForYearLink);
    I.click(aionPlayPage.discount.packages.premiumForYearLink);
    I.waitForText(aionPlayPage.discount.packages.premiumForYearText);
    I.seeInCurrentUrl(aionPlayPage.discount.packages.premiumForYearUrl);
    I.checkLayout('annual-package2016', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-discount");
});

Scenario("Переходим на акцию Зимний пакет 2015, проверяем верстку", (I, aionPlayPage) => {
    I.waitForVisible(aionPlayPage.discount.packages.winterPackage2015Link);
    I.click(aionPlayPage.discount.packages.winterPackage2015Link);
    I.waitForText(aionPlayPage.discount.packages.winterPackage2015Text);
    I.seeInCurrentUrl(aionPlayPage.discount.packages.winterPackage2015Url);
    I.checkLayout('winter-package2015', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-discount");
});

Scenario("Переходим на акцию Зимний пакет 2014, проверяем верстку", (I, aionPlayPage) => {
    I.waitForVisible(aionPlayPage.discount.packages.winterPackage2014Link);
    I.click(aionPlayPage.discount.packages.winterPackage2014Link);
    I.waitForText(aionPlayPage.discount.packages.winterPackage2014Text);
    I.seeInCurrentUrl(aionPlayPage.discount.packages.winterPackage2014Url);
    I.checkLayout('winter-package2014', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-discount");
});

Scenario("Переходим на акцию Летний пакет, проверяем верстку", (I, aionPlayPage) => {
    I.waitForVisible(aionPlayPage.discount.packages.summerPackageLink);
    I.click(aionPlayPage.discount.packages.summerPackageLink);
    I.waitForText(aionPlayPage.discount.packages.summerPackageText);
    I.seeInCurrentUrl(aionPlayPage.discount.packages.summerPackageUrl);
    I.checkLayout('summer-package', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-discount");
});

Scenario("Переходим на акцию Праздник весенних скидок, проверяем верстку", (I, aionPlayPage) => {
    I.waitForVisible(aionPlayPage.discount.packages.marchLink);
    I.click(aionPlayPage.discount.packages.marchLink);
    I.waitForText(aionPlayPage.discount.packages.marchText);
    I.seeInCurrentUrl(aionPlayPage.discount.packages.marchUrl);
    I.checkLayout('march', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-discount");
});

Scenario("Переходим на акцию Марафон подарков, проверяем верстку", (I, aionPlayPage) => {
    I.waitForVisible(aionPlayPage.discount.packages.valentinesDayLink);
    I.click(aionPlayPage.discount.packages.valentinesDayLink);
    I.waitForText(aionPlayPage.discount.packages.valentinesDayText);
    I.seeInCurrentUrl(aionPlayPage.discount.packages.valentinesDayUrl);
    I.checkLayout('valentines-day', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-discount");
});

Scenario("Переходим на акцию Киберпонедельник, проверяем верстку", (I, aionPlayPage) => {
    I.waitForVisible(aionPlayPage.discount.packages.cybermondayLink);
    I.click(aionPlayPage.discount.packages.cybermondayLink);
    I.waitForText(aionPlayPage.discount.packages.cybermondayText);
    I.seeInCurrentUrl(aionPlayPage.discount.packages.cybermondayUrl);
    I.checkLayout('cybermonday', [{
            name: 'body',
            elem: aionPlayPage.play.content,
            exclude: aionPlayPage.exclude
        }],
        0.05,
        '4game-aion', "acc-3-qa-discount");
});
