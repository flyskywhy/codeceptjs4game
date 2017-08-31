Feature("footer-common-acc-1-qa-main. Тесты для общего футера страниц 4game. Проверяем службу поддержки, форум, смену языка, соцсети и т.п.");

var data = require('./data/footer');
var game = data[data.testingGame];

Before((I) => {
    I.closeTabsExceptForOne();
    I.clearCookie();
    I.amOnPage(game.url);
});

Scenario("Переходим в службу поддержки", (I, genericPage) => {
    I.waitForElement(game.supportLink);
    I.click(game.supportLink);
    I.waitForEnabled(genericPage.authPopup);
    I.waitInUrl(game.supportUrl, 15);
});

Scenario("Переходим на форум", (I) => {
    I.waitForElement(game.forumLink);
    I.click(game.forumLink);
    I.seeInCurrentUrl(game.forumUrl);
});

Scenario("Нажимаем Переустановить приложение, видим попап с пользовательским соглашением", (I, genericPage) => {
    I.waitForElement(game.appBtn);
    I.scrollTo(game.footer);
    I.waitForVisible(game.appBtn);
    I.click(game.appBtn);
    I.switchTo(genericPage.licencePopupIframe);
    I.waitForVisible(genericPage.licencePopup);
});

Scenario("Переходим в ВК неавторизованным юзером", (I) => {
    I.scrollTo(game.footer);
    I.waitForElement(data.common.vkButton);
    I.click(data.common.vkButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(game.body);
    I.waitInUrl(game.vkUrl, 15);
});

Scenario("Переходим в FB неавторизованным юзером", (I) => {
    I.scrollTo(game.footer);
    I.waitForElement(data.common.fbButton);
    I.click(data.common.fbButton);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(game.body);
    I.waitInUrl(game.fbUrl, 15);
});

Scenario("Открываем список документов", (I) => {
    I.scrollTo(game.footer);
    I.waitForElement(game.docsLink);
    I.click(game.docsLink);
    I.waitForVisible(game.docsList);
});

Scenario("Открываем Лицензионное соглашение", (I) => {
    I.scrollTo(game.footer);
    I.waitForElement(game.docsLink);
    I.click(game.docsLink);
    I.waitForVisible(game.docsList);
    I.click(game.licenceLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(game.body);
    I.seeInCurrentUrl(game.licenceUrl);
});

Scenario("Открываем Нарушения и Санкции", (I) => {
    I.scrollTo(game.footer);
    I.waitForElement(game.docsLink);
    I.click(game.docsLink);
    I.waitForVisible(game.docsList);
    I.click(game.violationsLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(game.body);
    I.seeInCurrentUrl(game.violationsUrl);
});

Scenario("Открываем Системные требования к компьютеру", (I) => {
    I.scrollTo(game.footer);
    I.waitForElement(game.docsLink);
    I.click(game.docsLink);
    I.waitForVisible(game.docsList);
    I.click(game.requirementsLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(game.body);
    I.seeInCurrentUrl(game.requirementsUrl);
});

Scenario("Открываем Пользовательское соглашение", (I) => {
    I.scrollTo(game.footer);
    I.waitForElement(game.docsLink);
    I.click(game.docsLink);
    I.waitForVisible(game.docsList);
    I.click(game.licenceUserLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(game.body);
    I.seeInCurrentUrl(game.licenceUserUrl);
});

Scenario("Открываем Условия установки дополнительных компонентов", (I) => {
    I.scrollTo(game.footer);
    I.waitForElement(game.docsLink);
    I.click(game.docsLink);
    I.waitForVisible(game.docsList);
    I.click(game.policyLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(game.body);
    I.seeInCurrentUrl(game.policyUrl);
});

Scenario("Открываем Условия установки дополнительных компонентов", (I) => {
    I.scrollTo(game.footer);
    I.waitForElement(game.docsLink);
    I.click(game.docsLink);
    I.waitForVisible(game.docsList);
    I.click(game.policyLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(game.body);
    I.seeInCurrentUrl(game.policyUrl);
});

Scenario("Открываем Выпадающий список языков", (I) => {
    I.scrollTo(game.footer);
    I.waitForElement(data.common.langButton);
    I.click(data.common.langButton);
    I.waitForVisible(data.common.langPopup);
});

Scenario("Закрываем Выпадающий список языков", (I) => {
    I.scrollTo(game.footer);
    I.waitForElement(data.common.langButton);
    I.click(data.common.langButton);
    I.waitForVisible(data.common.langPopup);
    I.click(data.common.langButton);
    I.dontSee(data.common.langPopup);
});

Scenario("Меняем язык на English", (I) => {
    I.scrollTo(game.footer);
    I.waitForElement(data.common.langButton);
    I.click(data.common.langButton);
    I.waitForVisible(data.common.langPopup);
    I.waitForVisible(data.common.languageEnglish);
    I.click(data.common.languageEnglish);
    I.seeInCurrentUrl(data.common.foreignUrl, 15);
});

Scenario("Меняем язык на Deutsch", (I) => {
    I.scrollTo(game.footer);
    I.waitForElement(data.common.langButton);
    I.click(data.common.langButton);
    I.waitForVisible(data.common.langPopup);
    I.waitForVisible(data.common.languageDeutsch);
    I.click(data.common.languageDeutsch);
    I.seeInCurrentUrl(data.common.foreignUrl, 15);
});

Scenario("Меняем язык на Polski", (I) => {
    I.scrollTo(game.footer);
    I.waitForElement(data.common.langButton);
    I.click(data.common.langButton);
    I.waitForVisible(data.common.langPopup);
    I.waitForVisible(data.common.languagePolski);
    I.click(data.common.languagePolski);
    I.waitInUrl(data.common.foreignUrl, 15);
});
