'use strict';

let I;
var data = require('../tests/4game-referral-system/data/referral');
var testGame = require('../tests/4game-referral-system/data/referral')[data.common.testingGame];

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    /*
    timeout - время ожидания загрузки элементов, используется в методах
    */

    timeout: 30,

    /*
    Селекторы страниц реферальной системы. Разбиты по состояниям.
    headers - Заголовок страницы (селектор и текст в заголовке)
      selector - селектор заголовка
      text - текст заголовка
      text_defaultGame - текст заголовка для дефолтной игры
    button - Кнопка логина или перехода на страницу /play /install на странице
    stepN - шаги в реферальной системе
      selector - селектор шага, в котором находится какой-то текст
      text - текст, который проверяем
      checkboxSelector - селектор чекбокса, который отображает статус выполнения шага
    tab - таб для переключения состояний New/old
    tooltip - тултип, объясняющий что значит быть возвращаемым, тултип одинаковый для вкладок
      open - селектор для открытия тултипа
      close - селектор для закрытия тултипа
      tooltip - сам тултип
      tooltipOut - закрыть тултип нажатием вне области тултипа
    gameLink - Селектор ссылки на страницу игры в заголовке
    achievement - Селекторы ачивки на странице реферальной системы
      icon - иконка ачивки
      hover - ховер ачивки
      popup - селектор попапа ачивки
    detailed - описание смысла страницы, находится под заголовком страницы
    */

    referrer_unauth: {
        headers: {
            selector: "h4",
            text: 'Войди в свой аккаунт'
        },
        button: '#referrer_unauth_button'
    },

    referrer_new: {
        headers: {
            selector: "div.referal.referal_invite > h1.h1",
            text: testGame.titles.auth_referrer_new_screen_prefix + ' ' + testGame.gameTitle + ',\nи оба получите награды'
        },
        step1: {
            selector: "//div[@class = 'steps steps_invite']//div[@class = 'step__title step1__title']",
            text: testGame.steps.first_step_title
        },
        step2: {
            selector: "//div[@class = 'steps steps_invite']//div[@class = 'step__title step2__title']"
        },
        tab: 'div.referal.referal_return > div.nav > div.nav__item.tab__new',
        tooltip: {
            open: "//div[@id='invite-tooltip']/span[contains(@class, 'tooltip')]",
            tooltip: "//div[@id='invite-tooltip']//div[contains(@class, 'wc-tooltip-indent')]",
            tooltipOut: 'div.referal.referal_invite > div.nav',
            text: 'Возвращай друзей, которые не играют в игры Фогейма больше 1 месяца'
        },
        gameLink: '#gameLink_referral_invite'
    },

    referrer_old: {
        headers: {
            selector: "div.referal.referal_return > h1.h1",
            text: 'Верни друга в ' + testGame.gameTitle + ',\nи оба получите награды',
            text_defaultGame: 'Верни друга в ' + data.common.commonGameTitle + ',\nи оба получите награды'
        },
        step1: {
            selector: "//div[@class = 'steps steps_return']//div[@class = 'step__title step1__title']",
            text: testGame.steps.first_step_title
        },
        step2: {
            selector: "//div[@class = 'steps steps_return']//div[@class = 'step__title step2__title']"
        },
        tab: 'div.referal.referal_invite > div.nav > div.nav__item.tab__old',
        tooltip: {
            open: "//div[@id='return-tooltip']/span[contains(@class, 'tooltip')]",
            tooltip: "//div[@id='return-tooltip']//div[contains(@class, 'wc-tooltip-indent')]",
            tooltipOut: 'div.referal.referal_return > div.nav',
            text: 'Возвращай друзей, которые не играют в игры Фогейма больше 1 месяца'
        },
        gameLink: '#gameLink_referral_return'
    },

    referral_unauth_new: {
        headers: {
            selector: "div.referal.referal_enter > h1.h1",
            text: testGame.titles.unauth_referral_new_screen_prefix + ' ' + testGame.gameTitle + ',\nи оба получим награды'
        },
        step1: {
            selector: "//div[contains(@class, 'referral-progress-new')]//div[@class = 'step__title step1__title']",
            text: testGame.steps.first_step_referral_newbie_title
        },
        step2: {
            selector: "//div[contains(@class, 'referral-progress-new')]//div[@class = 'step__title step2__title']"
        },
        step3: {
            titleSelf: "//div[contains(@class, 'referral-progress-new')]//div[contains(@class, 'steps__prizes__self')]/div[@class = 'step__title']",
            linkSelf: "//div[contains(@class, 'referral-progress-new')]//div[contains(@class, 'steps__prizes__self')]/div[@class = 'step__link']",
            achieveSelf: "//div[contains(@class, 'referral-progress-new')]//div[@class = 'step__title step2__title']//achievement-link[contains(@name, '" + testGame.snippets.referral_new_step3_id + "')]",
            achieveSelfPopup: "//div[contains(@class, 'achievement-name')]",
            titleFriend: "//div[contains(@class, 'referral-progress-new')]//div[contains(@class, 'steps__prizes__friend')]/div[@class = 'step__title']",
            linkFriend: "//div[contains(@class, 'referral-progress-new')]//div[contains(@class, 'steps__prizes__friend')]/div[@class = 'step__link']"
        },
        tab: 'div.referal.referal_back > div.nav > div.nav__item.tab__new',
        tooltip: {
            open: "//div[@id='enter-tooltip']/span[contains(@class, 'tooltip')]",
            tooltip: "//div[@id='enter-tooltip']//div[contains(@class, 'wc-tooltip-indent')]",
            tooltipOut: "div.referal.referal_enter > div.nav",
            text: 'Вернись за призами, если ты не играл в игры Фогейма больше 1 месяца'
        },
        gameLink: '#gameLink_referral_enter',
        button: '.referral_unauth_button',
        achievement: {
            link: "//div[contains(@class, 'referral-progress-new')]//achievement-link[@name = '" + testGame.snippets.referral_new_step2_id + "']//a",
            popup: "//div[contains(@class, 'achievement-name')]"
        }
    },

    referral_unauth_old: {
        headers: {
            selector: "div.referal.referal_back > h1.h1",
            text: testGame.titles.unauth_referral_old_screen_prefix + ' ' + testGame.gameTitle + ',\nи оба получим награды'
        },
        step1: {
            selector: "//div[contains(@class, 'referral-progress-old')]//div[@class = 'step__title step1__title']",
            text: testGame.steps.first_step_referral_title
        },
        step2: {
            selector: "//div[contains(@class, 'referral-progress-old')]//div[@class = 'step__title step2__title']"
        },
        tab: 'div.referal.referal_enter > div.nav > div.nav__item.tab__old',
        tooltip: {
            open: "//div[@id='back-tooltip']/span[contains(@class, 'tooltip')]",
            tooltip: "//div[@id='back-tooltip']//div[contains(@class, 'wc-tooltip-indent')]",
            tooltipOut: 'div.referal.referal_back > div.nav',
            text: 'Вернись за призами, если ты не играл в игры Фогейма больше 1 месяца'
        },
        gameLink: '#gameLink_referral_back',
        button: "//div[contains(@class, 'referral-progress-old')]//div[contains(@class, 'step__button_unauth')]//button",
        achievement: {
            link: "//div[contains(@class, 'referral-progress-old')]//achievement-link[@name = '" + testGame.snippets.referral_old_step2_id + "']//a"
        }
    },

    referral_auth_new: {
        headers: {
            selector: "div.referal.referal_new > h1.h1",
            text: testGame.titles.auth_referral_new_screen_prefix + '  ' + testGame.gameTitle + ',\nи оба получим награды'
        },
        step1: {
            selector: "//div[contains(@class, 'referral-progress-new')]//div[@class = 'step__title step1__title']",
            text: testGame.steps.first_step_referral_newbie_title,
            checkboxSelector: 'div.steps.steps_create.referral-progress.referral-progress-new > div.steps__header > div.steps__header__step.step.step1'
        },
        step2: {
            selector: "//div[contains(@class, 'referral-progress-new')]//div[@class = 'step__title step2__title']",
            checkboxSelector: 'div.steps.steps_create.referral-progress.referral-progress-new > div.steps__header > div.steps__header__step.step.step2'
        },
        gameLink: '#gameLink_referral_new',
        button: '.referral_auth_button'
    },

    referral_auth_old: {
        headers: {
            selector: "div.referal.referal_go > h1.h1",
            text: 'Вернись в  ' + testGame.gameTitle + ',\nи оба получим награды'
        },
        step1: {
            selector: "//div[contains(@class, 'referral-progress-old')]//div[@class = 'step__title step1__title']",
            text: testGame.steps.first_step_referral_title,
            checkboxSelector: 'div.steps.steps_create.referral-progress.referral-progress-old > div.steps__header > div.steps__header__step.step.step1'
        },
        step2: {
            selector: "//div[contains(@class, 'referral-progress-old')]//div[@class = 'step__title step2__title']",
            checkboxSelector: 'div.steps.steps_back.referral-progress.referral-progress-old > div.steps__header > div.steps__header__step.step.step2'
        },
        gameLink: '#gameLink_referral_go',
        button: "//div[contains(@class, 'referral-progress-old')]//div[contains(@class, 'step__button_auth')]//button"
    },

    referral_completed: {
        headers: {
            selector: "div.invite.invite_friends > h1.h1",
            text: 'Развивайся в игре и приводи друзей'
        },
        detailed: {
            selector: "h5.h5",
            text: 'Получи персональную ссылку и перешли ее другу. Чем больше друзей пригласишь, тем больше награда.\nЗа успехи в игре тебя также ждут более крутые достижения.'
        },
        button: {
            locator: '.invite_friends .btn-invite-friend',
            text: 'Пригласить друзей'
        }
    },

    referral_rejected: {
        headers: {
            selector: "div.invite__wrap > h1.h1",
            text: 'Ты уже играешь'
        },
        detailed: {
            selector: "div.referral-last-played",
            text: 'Последний раз ты играл .\nПриводи друзей в ' + testGame.gameTitle + ' и получай награду'
        },
        button: {
            locator: '.invite_already .btn-invite-friend',
            text: 'Пригласить друзей'
        }
    },

    referral_closed: {
        header: "//div[contains(@class, 'referral_closed')]/h1[contains(@class, 'h1')]",
        description: "//div[contains(@class, 'referral_closed')]/p[contains(@class, 'p')]",
        button: "//div[contains(@class, 'referral_closed')]//a"
    },

    /*
    Селекторы для блока "Что такое фогейм"
    bns - селектор иконки BnS в этом блоке
    */

    about4game: {
        bns: 'a.gameover__game.gameover__game-bns'
    },

    /*
    Селекторы для блока faq
    link - селектор ссылки на faq
    */

    faq: {
        link: 'a.faq__link'
    },

    /*
    футер и ссылки внутри него
    main - первая ссылка в футере на доки
    refRules - ссылка на описание правил реферальной системы
    */

    footer: {
        main: "//span[contains(@class, 'footer-4game__picker footer-4game__docs-picker')]",
        refRules: 'li.footer-4game__docs-item > a'
    },

    /*
    Селекторы блока шаринга
    popup - сам попап шаринга
    button - кнопка "Скопировать ссылку"
    line - Строка с url страницы рефералки
    vk - кнопка шаринга в VK
    fb - кнопка шаринга в FB
    vkIdentity - селектор для определения, что попап VK загрузился
    fbIdentity - селектор для определения, что попап FB загрузился
    */

    share: {
        popup: 'div.popup__wrap',
        button: "//div[@class = 'steps steps_return']//button",
        line: "//div[@class = 'steps steps_return']//input",
        vk: "//div[@class = 'steps steps_return']//span[@data-sharing-icon = 'vkontakte']",
        fb: "//div[@class = 'steps steps_return']//span[@data-sharing-icon = 'facebook']",
        ok: "//div[@class = 'steps steps_return']//span[@data-sharing-icon = 'odnoklassniki']",
    },

    /*
    исключения из проверок webdriverCSS
    userbar - юзербар
    likesVK - блок лайков VK
    likesFB - блок лайков FB
    referral_moreInvited_achieve - ачивка из блока "Хочешь больше призов"
    referral_moreInvited_hover - ховер ачивки из блока "Хочешь больше призов"
    */

    exclude: {
        userbar: '//*[@id="UserBar4Game"]/div[1]',
        referrerLink: "//input",
        likesVK: '//span[contains(@class, "footer-4game__social-item footer-4game__social-item_vk")]',
        likesFB: '//span[contains(@class, "footer-4game__social-item footer-4game__social-item_fb")]'
    },

    /* Тут описываем какие элементы берем для проверки с помощью webdriverCSS */

    webdriverCSS: {
        referrer_unauth: 'body',
        referral_tabs_new: 'div.referal.referal_enter',
        referral_tabs_old: 'div.referal.referal_back',
        referrer_tabs_new: 'div.referal.referal_invite',
        referrer_tabs_old: 'div.referal.referal_return'
    },

    /*
    Метод для проверки того, что пункт реферальной системы в прогрессе
    selector - селектор пункта
    */

    seeStepInProgress(selector) {
        I.seeElement(selector + ' > div.steps__header__num');
        I.validateCssStyle(selector + ' > div.steps__header__num', 'border-top-color', 'rgba(249,199,33,1)');
        I.validateCssStyle(selector + ' > div.steps__header__num', 'border-top-style', 'solid');
        I.validateCssStyle(selector + ' > div.steps__header__num', 'border-top-width', '2px');
        I.validateCssStyle(selector + ' > div.steps__header__num', 'border-right-color', 'rgba(249,199,33,1)');
        I.validateCssStyle(selector + ' > div.steps__header__num', 'border-right-style', 'solid');
        I.validateCssStyle(selector + ' > div.steps__header__num', 'border-right-width', '2px');
        I.validateCssStyle(selector + ' > div.steps__header__num', 'border-bottom-color', 'rgba(249,199,33,1)');
        I.validateCssStyle(selector + ' > div.steps__header__num', 'border-bottom-style', 'solid');
        I.validateCssStyle(selector + ' > div.steps__header__num', 'border-bottom-width', '2px');
        I.validateCssStyle(selector + ' > div.steps__header__num', 'border-left-color', 'rgba(249,199,33,1)');
        I.validateCssStyle(selector + ' > div.steps__header__num', 'border-left-style', 'solid');
        I.validateCssStyle(selector + ' > div.steps__header__num', 'border-left-width', '2px');
        I.dontSeeElement(selector + ' > div.steps__header__check');
    },

    /*
    Метод для проверки того, что пункт реферальной системы выполнен
    selector - селектор пункта
    */

    seeStepCompleted(selector) {
        I.seeElement(selector + ' > div.steps__header__check');
        I.dontSeeElement(selector + ' > div.steps__header__num');
    },

    checkSharingUrlVk(title, description, image, userId, gameId, timeout) {
        I.waitInUrl('vk.com', timeout);
        I.waitInUrl('url=https://ru.4game.com/summon/' + gameId + '/' + userId, timeout);
        I.waitInUrl('&title=' + title, timeout);
        I.waitInUrl('&description=' + description, timeout);
        I.waitInUrl('&image=https://ru.4game.com/summon/common/img/' + image, timeout);
    },

    checkSharingUrlFb(title, description, image, userId, gameId, timeout) {
        I.waitInUrl('facebook.com', timeout);
        I.waitInUrl('link=https://ru.4game.com/summon/' + gameId + '/' + userId, timeout);
        I.waitInUrl('&caption=' + title, timeout);
        I.waitInUrl('&description=' + description, timeout);
        I.waitInUrl('&picture=https://ru.4game.com/summon/common/img/' + image, timeout);
    },

    checkSharingUrlOk(gameId, userId, timeout) {
        I.waitInUrl('ok.ru', timeout);
        I.waitInUrl('st.shareUrl=https://ru.4game.com/summon/' + gameId + '/' + userId, timeout);
    },

    hideAchievementsNotifications() {
        I.executeScript('document.getElementsByClassName("notification_center")[0].style.visibility = "hidden"');
    }

}
