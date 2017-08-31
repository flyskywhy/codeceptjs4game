Feature("pointblank-acc-4-qa-ratings. Тесты для страницы Рейтинг кланов.");

BeforeSuite((I) => {
    I.syncDown('4game-pointblank', "acc-4-qa-ratings");
});

Before((I, pointblankRatingsPage, genericPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(pointblankRatingsPage.url);
    I.seeInTitle(pointblankRatingsPage.title);
    I.waitForElement(genericPage.userBar);
});

AfterSuite((I) => {
    I.createTar('4game-pointblank', "acc-4-qa-ratings");
    I.syncUp('4game-pointblank', "acc-4-qa-ratings");
    I.clearDir('4game-pointblank', "acc-4-qa-ratings");
})

Scenario("проверяем открытие списка рейтингов", (I, pointblankRatingsPage) => {
    I.waitForElement(pointblankRatingsPage.ratingsButton);
    I.click(pointblankRatingsPage.ratingsButton);
    I.waitForVisible(pointblankRatingsPage.ratingsListPopup);
    I.waitForVisible(pointblankRatingsPage.augustActiveElement);
    I.waitForVisible(pointblankRatingsPage.allTimeElement);
    I.waitForVisible(pointblankRatingsPage.julyElement);
});

Scenario("Выбираем рейтинг кланов за все время", (I, pointblankRatingsPage) => {
    I.waitForElement(pointblankRatingsPage.ratingsButton);
    I.click(pointblankRatingsPage.ratingsButton);
    I.waitForVisible(pointblankRatingsPage.ratingsListPopup);
    I.waitForVisible(pointblankRatingsPage.augustActiveElement);
    I.waitForVisible(pointblankRatingsPage.allTimeElement);
    I.click(pointblankRatingsPage.allTimeElement);
    I.waitForElement(pointblankRatingsPage.allTimeActiveElement);
});

Scenario("Выбираем рейтинг кланов за Июль 2016", (I, pointblankRatingsPage) => {
    I.waitForElement(pointblankRatingsPage.ratingsButton);
    I.click(pointblankRatingsPage.ratingsButton);
    I.waitForVisible(pointblankRatingsPage.ratingsListPopup);
    I.waitForVisible(pointblankRatingsPage.augustActiveElement);
    I.waitForVisible(pointblankRatingsPage.julyElement);
    I.click(pointblankRatingsPage.julyElement);
    I.waitForElement(pointblankRatingsPage.julyActiveElement);
});

Scenario("Проверяем верстку ТОП-3 сезона Август16", (I, pointblankRatingsPage) => {
    I.waitForElement(pointblankRatingsPage.topAugust);
    I.waitForVisible(pointblankRatingsPage.arrowLeft);
    I.waitForVisible(pointblankRatingsPage.arrowRightDisabled);
    I.checkLayout('top-august', [{
            name: 'body',
            elem: ".pRatings--header",
            exclude: pointblankRatingsPage.exclude,
        }],
        0.05,
        '4game-pointblank', "acc-4-qa-ratings");
});

Scenario("Проверяем верстку и переход на ТОП-3 сезона Июль16", (I, pointblankRatingsPage) => {
    I.waitForElement(pointblankRatingsPage.topAugust);
    I.waitForVisible(pointblankRatingsPage.arrowLeft);
    I.click(pointblankRatingsPage.arrowLeft);
    I.waitForElement(pointblankRatingsPage.topJuly);
    I.checkLayout('top-july', [{
            name: 'body',
            elem: ".pRatings--header",
            exclude: pointblankRatingsPage.exclude,
        }],
        0.05,
        '4game-pointblank', "acc-4-qa-ratings");
});

Scenario("Проверяем работу стрелок влево и вправо", (I, pointblankRatingsPage) => {
    I.waitForElement(pointblankRatingsPage.topAugust);
    I.waitForVisible(pointblankRatingsPage.arrowLeft);
    I.waitForVisible(pointblankRatingsPage.arrowRightDisabled);
    I.click(pointblankRatingsPage.arrowLeft);
    I.waitForElement(pointblankRatingsPage.topJuly);
    I.waitForVisible(pointblankRatingsPage.arrowRight);
    I.click(pointblankRatingsPage.arrowRight);
    I.waitForElement(pointblankRatingsPage.topAugust);
    I.waitForVisible(pointblankRatingsPage.arrowLeft);
    I.waitForVisible(pointblankRatingsPage.arrowRightDisabled);
});
