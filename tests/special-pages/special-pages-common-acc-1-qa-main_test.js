Feature("special-pages-common-acc-1-qa-main. Тесты отображения специальных страниц");

BeforeSuite((I) => {
    I.syncDown('special-pages', 'acc-1-qa-main');
});

Before((I) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
});

AfterSuite((I) => {
    I.createTar('special-pages', 'acc-1-qa-main');
    I.syncUp('special-pages', 'acc-1-qa-main');
    I.clearDir('special-pages', 'acc-1-qa-main');
})

Scenario("Проверка страницы 404", function*(I, specialPages) {
    I.amOnPage(specialPages.notFound.url);
    I.waitForVisible(specialPages.notFound.header.locator);
    I.waitForText(specialPages.notFound.header.text, specialPages.timeout, specialPages.notFound.header.locator)
    I.waitForVisible(specialPages.notFound.description.locator);
    I.waitForText(specialPages.notFound.description.text, specialPages.timeout, specialPages.notFound.description.locator)
    I.checkLayout('404', [{
        name: 'body'
    }], 0.1, 'special-pages', 'acc-1-qa-main');
    I.click(specialPages.notFound.link);
    I.waitInUrl("ru.4gametest.com", specialPages.timeout);
});

Scenario("Проверка страницы 504", function*(I, specialPages) {
    I.amOnPage(specialPages.overload.url);
    I.waitForVisible(specialPages.overload.header.locator);
    I.waitForText(specialPages.overload.header.text, specialPages.timeout, specialPages.overload.header.locator)
    I.waitForVisible(specialPages.overload.description.locator);
    I.waitForText(specialPages.overload.description.text, specialPages.timeout, specialPages.overload.description.locator)
    I.checkLayout('504', [{
        name: 'body',
        exclude: specialPages.overload.exclude
    }], 0.1, 'special-pages', 'acc-1-qa-main');
    I.switchTo(specialPages.overload.twitterIframe);
    I.waitForText(specialPages.overload.twitterHeader.text, specialPages.timeout, specialPages.overload.twitterHeader.locator)
});

Scenario("Проверка страницы 500", function*(I, specialPages) {
    I.amOnPage(specialPages.phpException.url);
    I.waitForVisible(specialPages.phpException.header.locator);
    I.waitForText(specialPages.phpException.header.text, specialPages.timeout, specialPages.phpException.header.locator)
    I.waitForVisible(specialPages.phpException.description.locator);
    I.see(specialPages.phpException.description.text, specialPages.phpException.description.locator)
    I.checkLayout('500', [{
        name: 'body',
        hide: specialPages.phpException.hide
    }], 0.1, 'special-pages', 'acc-1-qa-main');
});
