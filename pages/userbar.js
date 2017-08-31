'use strict';

let I;
let assert = require('assert');

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    timeout: 30,

    userbarMainPage: "//i[contains(@class, 'userbar-bg-overlay')]",
    userbarMoneyDropdown: "//*[@id='UserBar4Game']//div[@class = 'userbar-dropdown']",

    ballance: "//span[@id='userBar-div-UserBalanceData']",
    frozenBonusesLabel: "//span[@id='userBar-frozenBonusesData']",
    buffLabel: "//span[@id='userBar-buffBonusesData']",

    generalElement: ".userbar-tray",
    barUserName: "#userBar-div-LoginName",
    barBalance: "#userBar-div-UserBalanceData",
    barAchievementLink: ".userbar-list-item--achievement-link",

    authAndRegButton: "#userBar-button-authAndReg",
    logoutLink: "#userBar-link-Logout",

    loginYAButton: "#userBar-button-YA",
    loginYAField: "#login",
    passwordYAField: "#passwd",
    submitYAButton: ".domik-submit",

    loginFBButton: "#userBar-button-FB",
    loginFBField: "#email",
    passwordFBField: "#pass",
    submitFBButton: "#loginbutton",

    loginVKButton: "#userBar-button-VK",
    loginVKField: "[name='email']",
    passwordVKField: "[name='pass']",
    submitVKButton: "[type='submit']",

    balanceDataArrow: "#userBar-arrow-UserBalanceData",
    userDataArrow: "#userBar-arrow-UserData",


    barFrozenBalance: {
        css: '#userBar-frozenBonusesData'
    },
    barFrozenBonusesReplenishText: {
        locator: ".userbar-bonuses-replenish-text",
        text: "При пополнении на %s руб.\nили более",
        textCanUse: "Бонусные %s руб.",
        locatorCanUse: ".userbar-bonuses-use-bonus-text"
    },

    /*
    попап пополнения счета
    replenish - кнопка пополнить
    buffsHelp - подсказка о баффах, если они есть
    frozenBonusesHelp - подсказка о замороженных бонусах, если они есть
    labelCreditOn - лейбл включенного кредита
    labelCreditOff - лейбл выключенного кредита
    linkGiftCode - ссылка на страницу пин-кодов
    linkCredit - ссылка на страницу кредита
    */
    ballancePopup: {
        replenish: "//a[@id='userBar-button-Replenish']",
        buffsHelp: "//div[contains(@class, 'userbar-bonuses-text-buffs')]",
        frozenBonusesHelp: "//div[contains(@class, 'userbar-bonuses-text-frozen-bonus')]",
        labelCreditOn: "#userBar-div-CreditStatus_On",
        labelCreditOff: "#userBar-div-CreditStatus_Off",
        linkGiftCode: "a[href='/giftcode/']",
        linkCredit: "a[href*='/credit/']",

        text: {
            buffsHelp: "+%s% на счет\nосталось %k",
            frozenBonusesHelp: "Бонусные %s руб.\nПри пополнении на %k руб.\nили более"
        }
    },
    barSpgLink: {
        css: '.userbar-control--desktop'
    },
    barSpgList: {
        css: '.userbar-games--desktop'
    },
    /*
    попап данных пользователя
    linkSettings - ссылка на страницу настроек входа
    linkPersonalData - ссылка на страницу настроек персональных данных
    linkNotifications - ссылка на страницу настроек нотификаций
    linkEvents - ссылка на страницу событий
    linkSecurity - ссылка на страницу супербезопасности
    linkLogout - ссылка на выход из фогейма
    superSecurityOn - кнопка, ведущая на страницу супербезопасности, когда она выключена
    */
    userDataPopup: {
        linkSettings: "a[href='/settings/']",
        linkPersonalData: "a[href='/settings/personal/']",
        linkNotifications: "a[href='/settings/notifications/']",
        linkEvents: "a[href='/events/']",
        linkSecurity: "a[href*='/security/']",
        linkLogout: "#userBar-link-Logout",
        superSecurityOn: "#dropdown_ubersecurity_turn_on"
    },

    /*
    ссылка на фогеймер в юзербаре
    */
    linkTo4gamer: "#link-to-4gamer",


    /*
    gameIcon - иконка игры в юзербаре
    gameInstalled - иконка игры в юзербаре в блоке установленных игр
    gameUninstalled - иконка игры в юзербаре в блоке неустановленных игр
    badgeProgress - бейдж игры находящейся в процессе установки
    progressTooltip - тултип, который появляется при наведении на игру в процессе установки
    yellowBorderForActiveGame - желтый бордер иконки у активной игры (на чьей странице мы находимся)
    badgeUpdateRequired - бейдж у игры, требующей обновление
    badgePaused - бейдж игры, установка которой поставлена на паузу
    badgeMaintenance - бейдж игры, находящейся на профилактике
    */
    gameIcon: "//a[@data-serviceid='%s']",
    gameInstalled: "//a[@data-serviceid='%s' and ancestor-or-self::li[@id = 'navBar-div-InstalledGames']]",
    gameUninstalled: "//a[@data-serviceid = '%s' and ancestor-or-self::li[@id = 'navBar-div-UninstalledGames']]",
    badgeProgress: "//li[@data-service-id='%s']//div[contains(@class, 'userbar-game--progress')]",
    progressTooltip: "//li[@data-service-id='%s']//div[contains(@class, 'userbar-tooltip-content')]",
    yellowBorderForActiveGame: "//li[@data-service-id='%s']/div/div[contains(@class,'active')]",
    badgeUpdateRequired: "//li[@data-service-id='%s']//*[contains(concat( ' ', @class, ' ' ), concat( ' ', 'userbar-game--full_update_required', ' ' ))]",
    badgePaused: "//li[@data-service-id='%s']//*[contains(concat( ' ', @class, ' ' ), concat( ' ', 'userbar-game--paused', ' ' ))]",
    badgeMaintenance: "//li[@data-service-id='%s']//*[contains(concat( ' ', @class, ' ' ), concat( ' ', 'userbar-game--maintenance', ' ' ))]",

    /*
    Метод устанавливает профилактику на все игры
    games - json с играми
    */
    checkAllGamesHaveMaint(games) {
        for (var i = 0; i < Object.keys(games).length; i++) {
            if (Object.keys(games)[i] != "default_game") {
                I.waitForVisible(this.badgeMaintenance.replace("%s", games[Object.keys(games)[i]].serviceId));
            }
        };
    },

    /*
    Метод проверяет, что иконки всех игр видны в юзербаре
    games - json с играми
    */
    checkAllGamesAreInUserbar(games) {
        for (var i = 0; i < Object.keys(games).length; i++) {
            if (Object.keys(games)[i] != "default_game") {
                I.waitForVisible(this.gameIcon.replace("%s", games[Object.keys(games)[i]].serviceId));
            }
        };
    },

    /*
    Проверяет, что если в куках установилось, что игра установлена,
    то она отображается в блоке установленных игр в юзербаре
    cookies - все куки фогейма на данный момент
    */
    checkInstalledGamesByCookie(cookies) {
        var installedGames;
        for (var i = 0; i < Object.keys(cookies).length; i++) {
            if (cookies[Object.keys(cookies)[i]].name.indexOf("inst_") != -1) {
                if (cookies[Object.keys(cookies)[i]].name.substr(cookies[Object.keys(cookies)[i]].name.lastIndexOf("_") + 1).length < 4)
                    I.waitForVisible(this.gameInstalled.replace("%s", cookies[Object.keys(cookies)[i]].name.substr(cookies[Object.keys(cookies)[i]].name.lastIndexOf("_") + 1)));
            }
        };
    },

    /*
    Проверяет навигацию в попапе данных пользователя
    startLink - ссылка, на которой начинаем
    locator - локатор ссылки в попапе данных пользователя
    endLink - ссылка, на которой должны оказаться после перехода
    */
    checkUserDataPopupNavigationFor(startLink, locator, endLink) {
        I.amOnPage(startLink);
        I.waitAndClick(this.userDataArrow);
        I.waitAndClick(locator);
        I.waitInUrl(endLink, this.timeout);
    },

    /*
    Проверяет навигацию в попапе баланса
    startLink - ссылка, на которой начинаем
    locator - локатор ссылки в попапе данных пользователя
    endLink - ссылка, на которой должны оказаться после перехода
    */
    checkBallancePopupNavigationFor(startLink, locator, endLink) {
        I.amOnPage(startLink);
        I.waitAndClick(this.balanceDataArrow);
        I.waitAndClick(locator);
        I.waitInUrl(endLink, this.timeout);
    },

    /*
    Проверяет переход в 4gamer по ссылке
    startLink - ссылка, на которой начинаем
    */
    check4gamerLinkFor(startLink) {
        I.amOnPage(startLink);
        I.waitAndClick(this.linkTo4gamer);
        I.waitInUrl(".com/4gamer/", this.timeout);
    }
}
