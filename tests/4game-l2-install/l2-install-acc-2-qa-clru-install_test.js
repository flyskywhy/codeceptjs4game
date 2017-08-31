Feature("l2-install-acc-2-qa-clru-install. Тесты для классической версии страницы install - Lineage 2 — официальный сайт онлайн-игры.");

BeforeSuite((I) => {
    I.syncDown('4game-l2-install', "acc-2-qa-clru-install");
});

Before((I, lineageInstallPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(lineageInstallPage.classicInstall.url);
    I.seeInTitle(lineageInstallPage.classicInstall.title);
    I.seeElement(lineageInstallPage.install.userbar);
});

AfterSuite((I) => {
    I.createTar('4game-l2-install', "acc-2-qa-clru-install");
    I.syncUp('4game-l2-install', "acc-2-qa-clru-install");
    I.clearDir('4game-l2-install', "acc-2-qa-clru-install");
})

Scenario("Проверяем верстку первой страницы", (I, lineageInstallPage) => {
    I.waitForText(lineageInstallPage.classicInstall.slide1Title);
    I.checkLayout('1page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-2-qa-clru-install");
});

Scenario("Проверяем верстку второй страницы", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide2();
    I.checkLayout('2page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-2-qa-clru-install");
});

Scenario("Проверяем верстку третьей страницы", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide3();
    I.checkLayout('3page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-2-qa-clru-install");
});

Scenario("Проверяем верстку четвертой страницы", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide4();
    I.checkLayout('4page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-2-qa-clru-install");
});

Scenario("Проверяем верстку пятой страницы", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide5();
    I.checkLayout('5page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-2-qa-clru-install");
});

Scenario("Геймпанель должна отображаться на странице", (I, genericPage) => {
    I.waitForElement(genericPage.gamePanel.gamePanel);
    I.waitForVisible(genericPage.gamePanel.gamePanel);
});

Scenario("Переходим на сайт обновленной версии с первой страницы", (I, lineageInstallPage) => {
    I.waitForElement(lineageInstallPage.classicInstall.promoLink);
    I.waitForVisible(lineageInstallPage.classicInstall.promoLink);
    I.click(lineageInstallPage.classicInstall.promoLink);
    I.waitInUrl("lineage2/install/", 15);
    I.waitForText("Играй бесплатно в обновленную версию Lineage 2: Helios");
});

Scenario("Переходим на сайт сообщества с первой страницы", (I, lineageInstallPage) => {
    I.waitForElement(lineageInstallPage.classicInstall.playLink);
    I.waitForVisible(lineageInstallPage.classicInstall.playLink);
    I.click(lineageInstallPage.classicInstall.playLink);
    I.waitInUrl("lineage2classic/play/", 15);
    I.seeInTitle("Lineage 2 Classic — сайт сообщества");
});

Scenario("Проверяем выбор расы Люди", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide2();
    I.waitForElement(lineageInstallPage.classicInstall.racesPeopleElement);
    I.waitForVisible(lineageInstallPage.classicInstall.racesPeopleElement);
    I.click(lineageInstallPage.classicInstall.racesPeopleElement);
    I.waitForElement(lineageInstallPage.classicInstall.racesPeopleActiveElement);
});

Scenario("Проверяем выбор расы Гномы", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide2();
    I.waitForElement(lineageInstallPage.classicInstall.racesGnomesElement);
    I.waitForVisible(lineageInstallPage.classicInstall.racesGnomesElement);
    I.click(lineageInstallPage.classicInstall.racesGnomesElement);
    I.waitForElement(lineageInstallPage.classicInstall.racesGnomesActiveElement);
});

Scenario("Проверяем отображение инфы о классе Паладин", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide2();
    I.waitForElement(lineageInstallPage.classicInstall.racesPeopleElement);
    I.waitForVisible(lineageInstallPage.classicInstall.racesPeopleElement);
    I.click(lineageInstallPage.classicInstall.racesPeopleElement);
    I.waitForElement(lineageInstallPage.classicInstall.racesPeopleActiveElement);
    I.waitForElement(lineageInstallPage.classicInstall.classPaladinActiveElement);
    I.click(lineageInstallPage.classicInstall.classPaladinActiveElement);
    I.waitForVisible(lineageInstallPage.classicInstall.classPaladinInfoPopup);
    I.waitForText(lineageInstallPage.classicInstall.classPaladinText);
});

Scenario("Проверяем отображение инфы о классе Охотник за наградой", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide2();
    I.waitForElement(lineageInstallPage.classicInstall.racesGnomesElement);
    I.waitForVisible(lineageInstallPage.classicInstall.racesGnomesElement);
    I.click(lineageInstallPage.classicInstall.racesGnomesElement);
    I.waitForElement(lineageInstallPage.classicInstall.racesGnomesActiveElement);
    I.waitForElement(lineageInstallPage.classicInstall.classBountyHunterActiveElement);
    I.click(lineageInstallPage.classicInstall.classBountyHunterActiveElement);
    I.waitForVisible(lineageInstallPage.classicInstall.classBountyHunterInfoPopup);
    I.waitForText(lineageInstallPage.classicInstall.classBountyHunterText);
});

Scenario("Проверяем отображение инфы о классе Кузнец", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide2();
    I.waitForElement(lineageInstallPage.classicInstall.racesGnomesElement);
    I.waitForVisible(lineageInstallPage.classicInstall.racesGnomesElement);
    I.click(lineageInstallPage.classicInstall.racesGnomesElement);
    I.waitForElement(lineageInstallPage.classicInstall.racesGnomesActiveElement);
    I.waitForElement(lineageInstallPage.classicInstall.classBlacksmithActiveElement);
    I.click(lineageInstallPage.classicInstall.classBlacksmithActiveElement);
    I.waitForVisible(lineageInstallPage.classicInstall.classBlacksmithInfoPopup);
    I.waitForText(lineageInstallPage.classicInstall.classBlacksmithText);
});

Scenario("Открываем Выпадающий список языков", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide5();
    I.waitForElement(lineageInstallPage.footer.langButtonClassic);
    I.scrollTo(lineageInstallPage.footer.langButtonClassic);
    I.click(lineageInstallPage.footer.langButtonClassic);
    I.waitForVisible(lineageInstallPage.footer.langPopupClassic);
});

Scenario("Закрываем Выпадающий список языков", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide5();
    I.waitForElement(lineageInstallPage.footer.langButtonClassic);
    I.scrollTo(lineageInstallPage.footer.langButtonClassic);
    I.click(lineageInstallPage.footer.langButtonClassic);
    I.waitForVisible(lineageInstallPage.footer.langPopupClassic);
    I.click(lineageInstallPage.footer.langButtonClassic);
    I.dontSee(lineageInstallPage.footer.langPopupClassic);
});

Scenario("Меняем язык на English", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide5();
    I.waitForElement(lineageInstallPage.footer.langButtonClassic);
    I.click(lineageInstallPage.footer.langButtonClassic);
    I.waitForVisible(lineageInstallPage.footer.langPopupClassic);
    I.waitForVisible(lineageInstallPage.footer.languageEnglishClassic);
    I.click(lineageInstallPage.footer.languageEnglishClassic);
    I.seeInCurrentUrl(lineageInstallPage.footer.foreignUrl);
});

Scenario("Меняем язык на Deutsch", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide5();
    I.waitForElement(lineageInstallPage.footer.langButtonClassic);
    I.click(lineageInstallPage.footer.langButtonClassic);
    I.waitForVisible(lineageInstallPage.footer.langPopupClassic);
    I.waitForVisible(lineageInstallPage.footer.languageDeutschClassic);
    I.click(lineageInstallPage.footer.languageDeutschClassic);
    I.seeInCurrentUrl(lineageInstallPage.footer.foreignUrl);
});

Scenario("Меняем язык на Polski", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide5();
    I.waitForElement(lineageInstallPage.footer.langButtonClassic);
    I.click(lineageInstallPage.footer.langButtonClassic);
    I.waitForVisible(lineageInstallPage.footer.langPopupClassic);
    I.waitForVisible(lineageInstallPage.footer.languagePolskiClassic);
    I.click(lineageInstallPage.footer.languagePolskiClassic);
    I.seeInCurrentUrl(lineageInstallPage.footer.foreignUrl);
});

Scenario("Открываем список документов", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLinkClassic);
    I.click(lineageInstallPage.footer.docsLinkClassic);
    I.waitForVisible(lineageInstallPage.footer.docsListClassic);
});

Scenario("Открываем Лицензионное соглашение", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLinkClassic);
    I.click(lineageInstallPage.footer.docsLinkClassic);
    I.waitForVisible(lineageInstallPage.footer.docsListClassic);
    I.click(lineageInstallPage.footer.licenceLinkClassic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footer.licenceUrlClassic);
});

Scenario("Открываем Пользовательское соглашение", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLinkClassic);
    I.click(lineageInstallPage.footer.docsLinkClassic);
    I.waitForVisible(lineageInstallPage.footer.docsListClassic);
    I.click(lineageInstallPage.footer.licenceUserLinkClassic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footer.licenceUserUrlClassic);
});

Scenario("Открываем Нарушения и Санкции", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLinkClassic);
    I.click(lineageInstallPage.footer.docsLinkClassic);
    I.waitForVisible(lineageInstallPage.footer.docsListClassic);
    I.click(lineageInstallPage.footer.violationsLinkClassic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footer.violationsUrlClassic);
});

Scenario("Открываем Условия установки дополнительных компонентов", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLinkClassic);
    I.click(lineageInstallPage.footer.docsLinkClassic);
    I.waitForVisible(lineageInstallPage.footer.docsListClassic);
    I.click(lineageInstallPage.footer.policyLinkClassic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footer.policyUrl);
});

Scenario("Открываем Системные требования к компьютеру", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLinkClassic);
    I.click(lineageInstallPage.footer.docsLinkClassic);
    I.waitForVisible(lineageInstallPage.footer.docsListClassic);
    I.click(lineageInstallPage.footer.requirementsLinkClassic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footer.requirementsUrl);
});
