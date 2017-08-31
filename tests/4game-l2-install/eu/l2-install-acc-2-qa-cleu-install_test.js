Feature("l2-install-acc-2-qa-cleu-install. Тесты для классической версии страницы install - Lineage 2 Europe — official site of the online game.");

BeforeSuite((I) => {
    I.syncDown('4game-l2-install', "acc-2-qa-cleu-install");
});

Before((I, lineageInstallPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(lineageInstallPage.classicInstall.url);
    I.seeInTitle(lineageInstallPage.classicInstallEuro.title);
});

AfterSuite((I) => {
    I.createTar('4game-l2-install', "acc-2-qa-cleu-install");
    I.syncUp('4game-l2-install', "acc-2-qa-cleu-install");
    I.clearDir('4game-l2-install', "acc-2-qa-cleu-install");
})

Scenario("Проверяем верстку первой страницы", (I, lineageInstallPage) => {
    I.waitForText(lineageInstallPage.classicInstallEuro.slide1Title);
    I.checkLayout('1page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-2-qa-cleu-install");
});

Scenario("Проверяем верстку второй страницы", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide2();
    I.checkLayout('2page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-2-qa-cleu-install");
});

Scenario("Проверяем верстку третьей страницы", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide3();
    I.checkLayout('3page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-2-qa-cleu-install");
});

Scenario("Проверяем верстку четвертой страницы", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide4();
    I.checkLayout('4page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-2-qa-cleu-install");
});

Scenario("Проверяем верстку пятой страницы", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide5();
    I.checkLayout('5page', [{
            name: 'body',
            elem: lineageInstallPage.install.content,
            exclude: lineageInstallPage.exclude
        }],
        0.05,
        '4game-l2-install', "acc-2-qa-cleu-install");
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
    I.waitForText(lineageInstallPage.installEuro.slide1Title);
});

Scenario("Переходим на сайт сообщества с первой страницы", (I, lineageInstallPage) => {
    I.waitForElement(lineageInstallPage.classicInstall.playLink);
    I.waitForVisible(lineageInstallPage.classicInstall.playLink);
    I.click(lineageInstallPage.classicInstall.playLink);
    I.waitInUrl("lineage2classic/play/", 15);
    I.seeInTitle("Lineage 2 Classic Europe — official site of the online game");
});

Scenario("Проверяем выбор расы Люди", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide2();
    I.waitForElement(lineageInstallPage.classicInstall.racesPeopleElement);
    I.waitForVisible(lineageInstallPage.classicInstall.racesPeopleElement);
    I.click(lineageInstallPage.classicInstall.racesPeopleElement);
    I.waitForElement(lineageInstallPage.classicInstall.racesPeopleActiveElement);
});

Scenario("Проверяем выбор расы Гномы", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide2();
    I.waitForElement(lineageInstallPage.classicInstall.racesGnomesElement);
    I.waitForVisible(lineageInstallPage.classicInstall.racesGnomesElement);
    I.click(lineageInstallPage.classicInstall.racesGnomesElement);
    I.waitForElement(lineageInstallPage.classicInstall.racesGnomesActiveElement);
});

Scenario("Проверяем отображение инфы о классе Паладин", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide2();
    I.waitForElement(lineageInstallPage.classicInstall.racesPeopleElement);
    I.waitForVisible(lineageInstallPage.classicInstall.racesPeopleElement);
    I.click(lineageInstallPage.classicInstall.racesPeopleElement);
    I.waitForElement(lineageInstallPage.classicInstall.racesPeopleActiveElement);
    I.waitForElement(lineageInstallPage.classicInstall.classPaladinActiveElement);
    I.click(lineageInstallPage.classicInstall.classPaladinActiveElement);
    I.waitForVisible(lineageInstallPage.classicInstall.classPaladinInfoPopup);
    I.waitForText(lineageInstallPage.classicInstallEuro.classPaladinText);
});

Scenario("Проверяем отображение инфы о классе Охотник за наградой", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide2();
    I.waitForElement(lineageInstallPage.classicInstall.racesGnomesElement);
    I.waitForVisible(lineageInstallPage.classicInstall.racesGnomesElement);
    I.click(lineageInstallPage.classicInstall.racesGnomesElement);
    I.waitForElement(lineageInstallPage.classicInstall.racesGnomesActiveElement);
    I.waitForElement(lineageInstallPage.classicInstall.classBountyHunterActiveElement);
    I.click(lineageInstallPage.classicInstall.classBountyHunterActiveElement);
    I.waitForVisible(lineageInstallPage.classicInstall.classBountyHunterInfoPopup);
    I.waitForText(lineageInstallPage.classicInstallEuro.classBountyHunterText);
});

Scenario("Проверяем отображение инфы о классе Кузнец", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide2();
    I.waitForElement(lineageInstallPage.classicInstall.racesGnomesElement);
    I.waitForVisible(lineageInstallPage.classicInstall.racesGnomesElement);
    I.click(lineageInstallPage.classicInstall.racesGnomesElement);
    I.waitForElement(lineageInstallPage.classicInstall.racesGnomesActiveElement);
    I.waitForElement(lineageInstallPage.classicInstall.classBlacksmithActiveElement);
    I.click(lineageInstallPage.classicInstall.classBlacksmithActiveElement);
    I.waitForVisible(lineageInstallPage.classicInstall.classBlacksmithInfoPopup);
    I.waitForText(lineageInstallPage.classicInstallEuro.classBlacksmithText);
});

Scenario("Открываем Выпадающий список языков", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.langButtonClassic);
    I.scrollTo(lineageInstallPage.footer.langButtonClassic);
    I.click(lineageInstallPage.footer.langButtonClassic);
    I.waitForVisible(lineageInstallPage.footer.langPopupClassic);
});

Scenario("Закрываем Выпадающий список языков", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.langButtonClassic);
    I.scrollTo(lineageInstallPage.footer.langButtonClassic);
    I.click(lineageInstallPage.footer.langButtonClassic);
    I.waitForVisible(lineageInstallPage.footer.langPopupClassic);
    I.click(lineageInstallPage.footer.langButtonClassic);
    I.dontSee(lineageInstallPage.footer.langPopupClassic);
});

Scenario("Меняем язык на Русский", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.langButtonClassic);
    I.click(lineageInstallPage.footer.langButtonClassic);
    I.waitForVisible(lineageInstallPage.footer.langPopupClassic);
    I.waitForVisible(lineageInstallPage.footer.languageRussianClassic);
    I.click(lineageInstallPage.footer.languageRussianClassic);
    I.seeInCurrentUrl(lineageInstallPage.footer.russianUrl);
});

Scenario("Меняем язык на Deutsch", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.langButtonClassic);
    I.click(lineageInstallPage.footer.langButtonClassic);
    I.waitForVisible(lineageInstallPage.footer.langPopupClassic);
    I.waitForVisible(lineageInstallPage.footer.languageDeutschClassic);
    I.click(lineageInstallPage.footer.languageDeutschClassic);
    I.seeInCurrentUrl(lineageInstallPage.footer.foreignUrl);
});

Scenario("Меняем язык на Polski", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.langButtonClassic);
    I.click(lineageInstallPage.footer.langButtonClassic);
    I.waitForVisible(lineageInstallPage.footer.langPopupClassic);
    I.waitForVisible(lineageInstallPage.footer.languagePolskiClassic);
    I.click(lineageInstallPage.footer.languagePolskiClassic);
    I.seeInCurrentUrl(lineageInstallPage.footer.foreignUrl);
});

Scenario("Открываем список документов", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLinkClassic);
    I.click(lineageInstallPage.footer.docsLinkClassic);
    I.waitForVisible(lineageInstallPage.footer.docsListClassic);
});

Scenario("Открываем License Agreement (Лицензионное соглашение)", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLinkClassic);
    I.click(lineageInstallPage.footer.docsLinkClassic);
    I.waitForVisible(lineageInstallPage.footer.docsListClassic);
    I.click(lineageInstallPage.footerEuro.licenceLinkClassic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footerEuro.licenceUrlClassic);
});

Scenario("Открываем User Agreement (Пользовательское соглашение)", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLinkClassic);
    I.click(lineageInstallPage.footer.docsLinkClassic);
    I.waitForVisible(lineageInstallPage.footer.docsListClassic);
    I.click(lineageInstallPage.footerEuro.licenceUserLinkClassic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footerEuro.licenceUserUrlClassic);
});

Scenario("Открываем Terms of Use", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLinkClassic);
    I.click(lineageInstallPage.footer.docsLinkClassic);
    I.waitForVisible(lineageInstallPage.footer.docsListClassic);
    I.click(lineageInstallPage.footerEuro.useLinkClassic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footerEuro.useUrlClassic);
});

Scenario("Открываем Payment policy (Условия установки дополнительных компонентов)", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLinkClassic);
    I.click(lineageInstallPage.footer.docsLinkClassic);
    I.waitForVisible(lineageInstallPage.footer.docsListClassic);
    I.click(lineageInstallPage.footerEuro.policyLinkClassic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footerEuro.policyUrlClassic);
});

Scenario("Открываем Company Details (Контакты)", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLinkClassic);
    I.click(lineageInstallPage.footer.docsLinkClassic);
    I.waitForVisible(lineageInstallPage.footer.docsListClassic);
    I.click(lineageInstallPage.footerEuro.contactsLinkClassic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footerEuro.contactsUrlClassic);
});

Scenario("Открываем Privacy Policy", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLinkClassic);
    I.click(lineageInstallPage.footer.docsLinkClassic);
    I.waitForVisible(lineageInstallPage.footer.docsListClassic);
    I.click(lineageInstallPage.footerEuro.privacyLinkClassic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footerEuro.privacyUrlClassic);
});

Scenario("Открываем Notifications and News", (I, lineageInstallPage) => {
    lineageInstallPage.moveToClassicEuroSlide5();
    I.waitForElement(lineageInstallPage.footer.docsLinkClassic);
    I.click(lineageInstallPage.footer.docsLinkClassic);
    I.waitForVisible(lineageInstallPage.footer.docsListClassic);
    I.click(lineageInstallPage.footerEuro.newsLinkClassic);
    I.waitTabsLoading(2, 15);
    I.changeTab(2);
    I.waitForVisible(lineageInstallPage.install.body);
    I.seeInCurrentUrl(lineageInstallPage.footerEuro.newsUrlClassic);
});
