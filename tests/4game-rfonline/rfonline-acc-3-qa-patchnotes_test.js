Feature("rfonline-acc-3-qa-patchnotes. Тесты для страницы servermerge - RF Online — сайт сообщества.");

BeforeSuite((I) => {
    I.syncDown('4game-rfonline', 'acc-3-qa-patchnotes');
});

Before((I, rfonlinePatchnotesPage, genericPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(rfonlinePatchnotesPage.url);
});

AfterSuite((I) => {
    I.createTar('4game-rfonline', 'acc-3-qa-patchnotes');
    I.syncUp('4game-rfonline', 'acc-3-qa-patchnotes');
    I.clearDir('4game-rfonline', 'acc-3-qa-patchnotes');
})

Scenario("Проверяем верстку страницы", (I, rfonlinePatchnotesPage) => {
    I.checkLayout('main', [{
            name: 'body',
            elem: rfonlinePatchnotesPage.content,
            exclude: rfonlinePatchnotesPage.exclude
        }],
        0.05,
        '4game-rfonline', "acc-3-qa-patchnotes");
});

Scenario("Проверяем переход по заголовкам", (I, rfonlinePatchnotesPage) => {
    rfonlinePatchnotesPage.titles.forEach(function(title) {
        I.click(title);
        I.waitForVisible('//span[@class="bPatchnote__menuItemText" and text()="' + title + '"]');
        I.see(title, 'h1');
    });
});

Scenario("Проверяем появление поп-апов по наведению на планеты", (I, rfonlinePatchnotesPage) => {
    var keys = Object.keys(rfonlinePatchnotesPage.planets);
    keys.forEach(function(planet) {
        var wrap = '.' + planet + ' .planet__hover-wrap';
        var hover = '.' + planet + ' .planet__hover';
        I.moveCursorTo(wrap, rfonlinePatchnotesPage.offsets[planet], rfonlinePatchnotesPage.offsets[planet]);
        I.waitForVisible(hover);
        rfonlinePatchnotesPage.planets[planet].forEach(function(text) {
            I.see(text, hover);
        });
    });
});
