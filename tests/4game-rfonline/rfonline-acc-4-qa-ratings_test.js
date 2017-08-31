Feature("rfonline-acc-4-qa-ratings. Тесты для страницы Представители Рас.");

BeforeSuite((I) => {
    I.syncDown('4game-rfonline', 'acc-4-qa-ratings');
});

Before((I, rfonlineRatingsPage, genericPage) => {
    I.clearCookie();
    I.closeTabsExceptForOne();
    I.amOnPage(rfonlineRatingsPage.url);
});

AfterSuite((I) => {
    I.createTar('4game-rfonline', 'acc-4-qa-ratings');
    I.syncUp('4game-rfonline', 'acc-4-qa-ratings');
    I.clearDir('4game-rfonline', 'acc-4-qa-ratings');
})

Scenario("Проверяем верстку страницы и ссылку на форум", (I, rfonlineRatingsPage) => {
    I.waitForElement(rfonlineRatingsPage.forumLink);
    I.scrollTo(rfonlineRatingsPage.forumLink);
    I.see(rfonlineRatingsPage.forumText, rfonlineRatingsPage.forumLink);
    I.checkLayout('main', [{
            name: 'body',
            elem: rfonlineRatingsPage.content,
            exclude: rfonlineRatingsPage.exclude
        }],
        0.05,
        '4game-rfonline', "acc-4-qa-ratings");
});

Scenario("Нажимаем на выпадающий список серверов, проверяем названия и переключение", (I, rfonlineRatingsPage) => {
    I.waitForElement(rfonlineRatingsPage.serversButton);
    I.click(rfonlineRatingsPage.serversButton);
    I.waitForVisible(rfonlineRatingsPage.serversList);
    I.see(rfonlineRatingsPage.servers[0], rfonlineRatingsPage.serversSelected);
    I.click(rfonlineRatingsPage.serversButton);
    I.waitToHide(rfonlineRatingsPage.serversList, 0.5);
    rfonlineRatingsPage.servers.forEach(function(server) {
        I.click(rfonlineRatingsPage.serversButton);
        I.waitForVisible(rfonlineRatingsPage.serversList);
        I.click("//span[text()='" + server + "']");
        I.seeNumberOfElements("//h3[text()='" + server + "']", 9);
    });
});

Scenario("Проверяем появление поп-апов по наведению на иконки и текст/верстку в них", (I, rfonlineRatingsPage) => {
    I.waitForElement(rfonlineRatingsPage.patriarchIcon);
    I.scrollTo(rfonlineRatingsPage.aboutHeader);
    rfonlineRatingsPage.icons.forEach(function(icon) {
        var name = icon.replace('.prf-ratings_graph_node_icon__rank-', '');
        I.moveCursorTo(rfonlineRatingsPage.selectedRanks + ' ' + icon, 20, 20);
        I.waitForVisible(rfonlineRatingsPage.selectedRanks + ' ' + icon + ' ' + rfonlineRatingsPage.popup);
        rfonlineRatingsPage.popupTextSelected[name].forEach(function(text) {
            I.see(text, rfonlineRatingsPage.selectedRanks + ' ' + icon + ' ' + rfonlineRatingsPage.popup);
        });
    });
    rfonlineRatingsPage.icons.forEach(function(icon) {
        var name = icon.replace('.prf-ratings_graph_node_icon__rank-', '');
        I.moveCursorTo(rfonlineRatingsPage.appointedRanks + ' ' + icon, 20, 20);
        I.waitForVisible(rfonlineRatingsPage.appointedRanks + ' ' + icon + ' ' + rfonlineRatingsPage.popup);
        rfonlineRatingsPage.popupTextAppointed[name].forEach(function(text) {
            I.see(text, rfonlineRatingsPage.appointedRanks + ' ' + icon + ' ' + rfonlineRatingsPage.popup);
        });
    });
    I.moveCursorTo(rfonlineRatingsPage.patriarchIcon, 20, 20);
    I.waitForVisible(rfonlineRatingsPage.patriarchIcon + ' ' + rfonlineRatingsPage.popup);
    I.checkLayout('popup', [{
            name: 'body',
            elem: rfonlineRatingsPage.patriarchIcon + ' ' + rfonlineRatingsPage.popup,
            ignore: 'antialiasing'
        }],
        0.05,
        '4game-rfonline', "acc-4-qa-ratings");
});
