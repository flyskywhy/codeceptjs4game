Feature("l2-install-acc-1-qa-ru-install. Тесты для страницы install - Lineage 2 — официальный сайт онлайн-игры.");

BeforeSuite((I) => {
    I.syncDown('4game-l2-install', "acc-1-qa-ru-install");
});

Before((I, lineageInstallPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(lineageInstallPage.install.url);
    I.seeInTitle(lineageInstallPage.install.title);
    I.seeElement(lineageInstallPage.install.userbar);
});

AfterSuite((I) => {
    I.createTar('4game-l2-install', "acc-1-qa-ru-install");
    I.syncUp('4game-l2-install', "acc-1-qa-ru-install");
    I.clearDir('4game-l2-install', "acc-1-qa-ru-install");
})

Scenario("Проверяем верстку первой страницы", (I, lineageInstallPage) => {
    I.checkLayout('1page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-1-qa-ru-install");
});

Scenario("Проверяем верстку второй страницы", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide2();
    I.checkLayout('2page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-1-qa-ru-install");
});

Scenario("Проверяем верстку третьей страницы", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide3();
    I.checkLayout('3page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-1-qa-ru-install");
});

Scenario("Проверяем верстку четвертой страницы", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide4();
    I.checkLayout('4page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-1-qa-ru-install");
});

Scenario("Проверяем верстку пятой страницы", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide5();
    I.checkLayout('5page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-1-qa-ru-install");
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
    I.waitForText("Lineage 2 Classic — подпишись на легендарный хардкор");
});

Scenario("Переходим на сайт сообщества с первой страницы", (I, lineageInstallPage) => {
    I.waitForElement(lineageInstallPage.install.playLink);
    I.waitForVisible(lineageInstallPage.install.playLink);
    I.click(lineageInstallPage.install.playLink);
    I.waitInUrl("lineage2/play/", 15);
    I.seeInTitle("Lineage 2 — сайт сообщества");
});

Scenario("Проверяем выбор расы Люди", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide2();
    I.waitForElement(lineageInstallPage.install.racesPeopleElement);
    I.waitForVisible(lineageInstallPage.install.racesPeopleElement);
    I.click(lineageInstallPage.install.racesPeopleElement);
    I.waitForElement(lineageInstallPage.install.racesPeopleActiveElement);
});

Scenario("Проверяем выбор расы Артея", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide2();
    I.waitForElement(lineageInstallPage.install.racesArtheiaElement);
    I.waitForVisible(lineageInstallPage.install.racesArtheiaElement);
    I.click(lineageInstallPage.install.racesArtheiaElement);
    I.waitForElement(lineageInstallPage.install.racesArtheiaActiveElement);
});

Scenario("Проверяем отображение инфы об архетипе Лучник Эура", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide2();
    I.waitForElement(lineageInstallPage.install.racesPeopleElement);
    I.waitForVisible(lineageInstallPage.install.racesPeopleElement);
    I.click(lineageInstallPage.install.racesPeopleElement);
    I.waitForElement(lineageInstallPage.install.racesPeopleActiveElement);
    I.waitForElement(lineageInstallPage.install.archetypeEuraActiveElement);
    I.click(lineageInstallPage.install.archetypeEuraActiveElement);
    I.waitForVisible(lineageInstallPage.install.archetypeEuraInfoPopup);
    I.waitForText(lineageInstallPage.install.archetypeEuraText);
});

Scenario("Проверяем отображение инфы об архетипе Воин Тира", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide2();
    I.waitForElement(lineageInstallPage.install.racesArtheiaElement);
    I.waitForVisible(lineageInstallPage.install.racesArtheiaElement);
    I.click(lineageInstallPage.install.racesArtheiaElement);
    I.waitForElement(lineageInstallPage.install.racesArtheiaActiveElement);
    I.waitForElement(lineageInstallPage.install.archetypeTiraActiveElement);
    I.dontSee(lineageInstallPage.install.archetypeEuraActiveElement);
    I.click(lineageInstallPage.install.archetypeTiraActiveElement);
    I.waitForVisible(lineageInstallPage.install.archetypeTiraInfoPopup);
    I.waitForText(lineageInstallPage.install.archetypeTiraText);
});

Scenario("Открываем Выпадающий список языков", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide5();
    I.waitForElement(lineageInstallPage.footer.langButton);
    I.scrollTo(lineageInstallPage.footer.langButton);
    I.click(lineageInstallPage.footer.langButton);
    I.waitForVisible(lineageInstallPage.footer.langPopup);
});

Scenario("Закрываем Выпадающий список языков", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide5();
    I.waitForElement(lineageInstallPage.footer.langButton);
    I.scrollTo(lineageInstallPage.footer.langButton);
    I.click(lineageInstallPage.footer.langButton);
    I.waitForVisible(lineageInstallPage.footer.langPopup);
    I.click(lineageInstallPage.footer.langButton);
    I.dontSee(lineageInstallPage.footer.langPopup);
});

Scenario("Меняем язык на English", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide5();
    I.waitForElement(lineageInstallPage.footer.langButton);
    I.click(lineageInstallPage.footer.langButton);
    I.waitForVisible(lineageInstallPage.footer.langPopup);
    I.waitForVisible(lineageInstallPage.footer.languageEnglish);
    I.click(lineageInstallPage.footer.languageEnglish);
    I.seeInCurrentUrl(lineageInstallPage.footer.foreignUrl);
});

Scenario("Меняем язык на Deutsch", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide5();
    I.waitForElement(lineageInstallPage.footer.langButton);
    I.click(lineageInstallPage.footer.langButton);
    I.waitForVisible(lineageInstallPage.footer.langPopup);
    I.waitForVisible(lineageInstallPage.footer.languageDeutsch);
    I.click(lineageInstallPage.footer.languageDeutsch);
    I.seeInCurrentUrl(lineageInstallPage.footer.foreignUrl);
});

Scenario("Меняем язык на Polski", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide5();
    I.waitForElement(lineageInstallPage.footer.langButton);
    I.click(lineageInstallPage.footer.langButton);
    I.waitForVisible(lineageInstallPage.footer.langPopup);
    I.waitForVisible(lineageInstallPage.footer.languagePolski);
    I.click(lineageInstallPage.footer.languagePolski);
    I.seeInCurrentUrl(lineageInstallPage.footer.foreignUrl);
});

Scenario("Открываем список документов", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLink);
    I.click(lineageInstallPage.footer.docsLink);
    I.waitForVisible(lineageInstallPage.footer.docsList);
});

Scenario("Открываем Лицензионное соглашение", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLink);
    I.click(lineageInstallPage.footer.docsLink);
    I.waitForVisible(lineageInstallPage.footer.docsList);
    I.click(lineageInstallPage.footer.licenceLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footer.licenceUrl);
});

Scenario("Открываем Пользовательское соглашение", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLink);
    I.click(lineageInstallPage.footer.docsLink);
    I.waitForVisible(lineageInstallPage.footer.docsList);
    I.click(lineageInstallPage.footer.licenceUserLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footer.licenceUserUrl);
});

Scenario("Открываем Нарушения и Санкции", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLink);
    I.click(lineageInstallPage.footer.docsLink);
    I.waitForVisible(lineageInstallPage.footer.docsList);
    I.click(lineageInstallPage.footer.violationsLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footer.violationsUrl);
});

Scenario("Открываем Условия установки дополнительных компонентов", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLink);
    I.click(lineageInstallPage.footer.docsLink);
    I.waitForVisible(lineageInstallPage.footer.docsList);
    I.click(lineageInstallPage.footer.policyLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footer.policyUrl);
});

Scenario("Открываем Системные требования к компьютеру", (I, lineageInstallPage) => {
    lineageInstallPage.moveToSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLink);
    I.click(lineageInstallPage.footer.docsLink);
    I.waitForVisible(lineageInstallPage.footer.docsList);
    I.click(lineageInstallPage.footer.requirementsLink);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footer.requirementsUrl);
});
