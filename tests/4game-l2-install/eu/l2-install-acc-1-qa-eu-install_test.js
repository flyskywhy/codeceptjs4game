Feature("l2-install-acc-1-qa-eu-install. Тесты для страницы install - Lineage 2 Europe — official site of the online game.");

BeforeSuite((I) => {
    I.syncDown('4game-l2-install', "acc-1-qa-eu-install");
});

Before((I, lineageInstallPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(lineageInstallPage.install.url);
    I.seeInTitle(lineageInstallPage.installEuro.title);
});

AfterSuite((I) => {
    I.createTar('4game-l2-install', "acc-1-qa-eu-install");
    I.syncUp('4game-l2-install', "acc-1-qa-eu-install");
    I.clearDir('4game-l2-install', "acc-1-qa-eu-install");
})

Scenario("Проверяем верстку первой страницы", (I, lineageInstallPage) => {
    I.checkLayout('1page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-1-qa-eu-install");
});

Scenario("Проверяем верстку второй страницы", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide2();
    I.checkLayout('2page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-1-qa-eu-install");
});

Scenario("Проверяем верстку третьей страницы", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide3();
    I.checkLayout('3page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-1-qa-eu-install");
});

Scenario("Проверяем верстку четвертой страницы", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide4();
    I.checkLayout('4page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-1-qa-eu-install");
});

Scenario("Проверяем верстку пятой страницы", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide5();
    I.checkLayout('5page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-1-qa-eu-install");
});

Scenario("Геймпанель должна отображаться на странице", (I, genericPage) => {
    I.waitForElement(genericPage.gamePanel.gamePanel);
    I.waitForVisible(genericPage.gamePanel.gamePanel);
});

Scenario("Переходим на сайт классической версии с первой страницы", (I, lineageInstallPage) => {
    I.waitForElement(lineageInstallPage.install.classicLink);
    I.waitForVisible(lineageInstallPage.install.classicLink);
    I.click(lineageInstallPage.install.classicLink);
    I.waitInUrl("lineage2classic/install/", 15);
    I.waitForText("Lineage 2 Classic — epic adventures await");
});

Scenario("Переходим на сайт сообщества с первой страницы", (I, lineageInstallPage) => {
    I.waitForElement(lineageInstallPage.install.playLink);
    I.waitForVisible(lineageInstallPage.install.playLink);
    I.click(lineageInstallPage.install.playLink);
    I.waitInUrl("lineage2/play/", 15);
    I.seeInTitle("Lineage 2 Europe — official site of the online game");
});

Scenario("Проверяем выбор расы Люди", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide2();
    I.waitForElement(lineageInstallPage.install.racesPeopleElement);
    I.waitForVisible(lineageInstallPage.install.racesPeopleElement);
    I.click(lineageInstallPage.install.racesPeopleElement);
    I.waitForElement(lineageInstallPage.install.racesPeopleActiveElement);
});

Scenario("Проверяем выбор расы Артея", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide2();
    I.waitForElement(lineageInstallPage.install.racesArtheiaElement);
    I.waitForVisible(lineageInstallPage.install.racesArtheiaElement);
    I.click(lineageInstallPage.install.racesArtheiaElement);
    I.waitForElement(lineageInstallPage.install.racesArtheiaActiveElement);
});

Scenario("Проверяем отображение инфы об архетипе Лучник Эура", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide2();
    I.waitForElement(lineageInstallPage.install.racesPeopleElement);
    I.waitForVisible(lineageInstallPage.install.racesPeopleElement);
    I.click(lineageInstallPage.install.racesPeopleElement);
    I.waitForElement(lineageInstallPage.install.racesPeopleActiveElement);
    I.waitForElement(lineageInstallPage.install.archetypeEuraActiveElement);
    I.click(lineageInstallPage.install.archetypeEuraActiveElement);
    I.waitForVisible(lineageInstallPage.install.archetypeEuraInfoPopup);
    I.waitForText(lineageInstallPage.installEuro.archetypeEuraText);
});

Scenario("Проверяем отображение инфы об архетипе Воин Тира", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide2();
    I.waitForElement(lineageInstallPage.install.racesArtheiaElement);
    I.waitForVisible(lineageInstallPage.install.racesArtheiaElement);
    I.click(lineageInstallPage.install.racesArtheiaElement);
    I.waitForElement(lineageInstallPage.install.racesArtheiaActiveElement);
    I.waitForElement(lineageInstallPage.install.archetypeTiraActiveElement);
    I.dontSee(lineageInstallPage.install.archetypeEuraActiveElement);
    I.click(lineageInstallPage.install.archetypeTiraActiveElement);
    I.waitForVisible(lineageInstallPage.install.archetypeTiraInfoPopup);
    I.waitForText(lineageInstallPage.installEuro.archetypeTiraText);
});

Scenario("Открываем Выпадающий список языков", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.langButton);
    I.scrollTo(lineageInstallPage.footer.langButton);
    I.click(lineageInstallPage.footer.langButton);
    I.waitForVisible(lineageInstallPage.footer.langPopup);
});

Scenario("Закрываем Выпадающий список языков", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.langButton);
    I.scrollTo(lineageInstallPage.footer.langButton);
    I.click(lineageInstallPage.footer.langButton);
    I.waitForVisible(lineageInstallPage.footer.langPopup);
    I.click(lineageInstallPage.footer.langButton);
    I.dontSee(lineageInstallPage.footer.langPopup);
});

Scenario("Меняем язык на Русский", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.langButton);
    I.click(lineageInstallPage.footer.langButton);
    I.waitForVisible(lineageInstallPage.footer.langPopup);
    I.waitForVisible(lineageInstallPage.footer.languageRussian);
    I.click(lineageInstallPage.footer.languageRussian);
    I.seeInCurrentUrl(lineageInstallPage.footer.russianUrl);
});

Scenario("Меняем язык на Deutsch", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.langButton);
    I.click(lineageInstallPage.footer.langButton);
    I.waitForVisible(lineageInstallPage.footer.langPopup);
    I.waitForVisible(lineageInstallPage.footer.languageDeutsch);
    I.click(lineageInstallPage.footer.languageDeutsch);
    I.seeInCurrentUrl(lineageInstallPage.footer.foreignUrl);
});

Scenario("Меняем язык на Polski", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.langButton);
    I.click(lineageInstallPage.footer.langButton);
    I.waitForVisible(lineageInstallPage.footer.langPopup);
    I.waitForVisible(lineageInstallPage.footer.languagePolski);
    I.click(lineageInstallPage.footer.languagePolski);
    I.seeInCurrentUrl(lineageInstallPage.footer.foreignUrl);
});

Scenario("Открываем список документов", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLink);
    I.click(lineageInstallPage.footer.docsLink);
    I.waitForVisible(lineageInstallPage.footer.docsList);
});

Scenario("Открываем License Agreement (Лицензионное соглашение)", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLink);
    I.click(lineageInstallPage.footer.docsLink);
    I.waitForVisible(lineageInstallPage.footer.docsList);
    I.click(lineageInstallPage.footerEuro.licenceLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footerEuro.licenceUrl);
});

Scenario("Открываем Payment policy (Условия установки дополнительных компонентов)", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLink);
    I.click(lineageInstallPage.footer.docsLink);
    I.waitForVisible(lineageInstallPage.footer.docsList);
    I.click(lineageInstallPage.footerEuro.policyLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footerEuro.policyUrl);
});

Scenario("Открываем Violations and Penalties (Нарушения и Санкции)", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLink);
    I.click(lineageInstallPage.footer.docsLink);
    I.waitForVisible(lineageInstallPage.footer.docsList);
    I.click(lineageInstallPage.footerEuro.violationsLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footerEuro.violationsUrl);
});

Scenario("Открываем User Agreement (Пользовательское соглашение)", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLink);
    I.click(lineageInstallPage.footer.docsLink);
    I.waitForVisible(lineageInstallPage.footer.docsList);
    I.click(lineageInstallPage.footerEuro.licenceUserLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footerEuro.licenceUserUrl);
});

Scenario("Открываем Company Details (Контакты)", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLink);
    I.click(lineageInstallPage.footer.docsLink);
    I.waitForVisible(lineageInstallPage.footer.docsList);
    I.click(lineageInstallPage.footerEuro.contactsLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footerEuro.contactsUrl);
});

Scenario("Открываем Terms of Use", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLink);
    I.click(lineageInstallPage.footer.docsLink);
    I.waitForVisible(lineageInstallPage.footer.docsList);
    I.click(lineageInstallPage.footerEuro.useLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footerEuro.useUrl);
});

Scenario("Открываем Privacy Policy", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLink);
    I.click(lineageInstallPage.footer.docsLink);
    I.waitForVisible(lineageInstallPage.footer.docsList);
    I.click(lineageInstallPage.footerEuro.privacyLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footerEuro.privacyUrl);
});

Scenario("Открываем Notifications and News", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLink);
    I.click(lineageInstallPage.footer.docsLink);
    I.waitForVisible(lineageInstallPage.footer.docsList);
    I.click(lineageInstallPage.footerEuro.newsLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footerEuro.newsUrl);
});

Scenario("Открываем Cases", (I, lineageInstallPage) => {
    lineageInstallPage.moveToEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLink);
    I.click(lineageInstallPage.footer.docsLink);
    I.waitForVisible(lineageInstallPage.footer.docsList);
    I.click(lineageInstallPage.footerEuro.casesLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footerEuro.casesUrl);
});
