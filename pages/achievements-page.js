'use strict';


let I;
let assert = require('assert');

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    timeout: 30,

    url: '/achievements/',
    popup_url: '/achievements/?popupWidget=AchievementPopupWidget&name=',
    popup_url_any_page: '/?popupWidget=AchievementPopupWidget&name=',

    page_title: 'Фогейм — достижения',
    content_title: 'Достижения',
    about_link: 'О достижениях',
    auth_link: '//a[@href="?popupWidget=AuthPopupWidget"]',
    about_link_locator: '.about-achievements',
    content_title_locator: '.achievement-page_title',

    any_achievement_icon: "//i[@class='achievement-icon achievement-icon--%s']",
    any_achievement_name: "//%s//div[@class='achievement-name']",
    any_achievement_prize: "//%s//div[@class='achievement-prize']",
    any_achievement_money_prize: "//%s//div[@class='achievement-prize']//money-prize",
    any_unlocked_achievement: "//%s//a[contains(@class,'achievement--unlocked')]",
    any_achievement_hover_block: "//%s//div[@class='achievement-hover_block']",
    any_achievement_prize_in_hover: "//%s//div[@class='achievement-hover_block']//div[@class='achievement-prize']",
    any_achievement_prize_in_hover_money_value: "//%s//div[@class='achievement-hover_block']//div[@class='achievement-prize']//span[contains(@class, 'money_prize')]",
    any_achievement_conditions_in_hover: "//%s//div[@class='achievement-hover_block']//base-custom-scroll-view//div[@class='achievement-conditions']",
    any_achievement_condition_in_hover: "//%s//div[@class='achievement-hover_block']//base-custom-scroll-view//div[@class='achievement-conditions']//div[@class='achievement-condition' or @class='achievement-condition achievement-condition--achieved']",
    any_achievement_unchecked_condition_in_hover: "//%s//div[@class='achievement-hover_block']//base-custom-scroll-view//div[@class='achievement-condition']",
    any_achievement_checked_condition_in_hover: "//%s//div[@class='achievement-hover_block']//base-custom-scroll-view//div[contains(@class,'achievement-condition--achieved')]",
    any_achievement_progressbar_in_hover: "//%s//div[@class='achievement-hover_block']//div[@class='achievement-condition_progress_bar']",
    any_achievement_progressbar_started_in_hover: "//%s//div[@class='achievement-hover_block']//div[@class='achievement-condition_progress achievement-condition_progress--started']",
    any_achievement_progressbar_completed_in_hover: "//%s//div[@class='achievement-hover_block']//div[@class='achievement-condition_progress achievement-condition_progress--completed']",
    any_achievement_vertical_scrollbar_in_hover: "//%s//div[@class='achievement-hover_block']//div[@class='scrollbar scrollbar-vertical']",
    any_achievement_more_prizes_in_hover: "//%s//div[@class='achievement-hover_block']//div[@class='item_prize-item-more']",

    any_achievement_level: "//%s//span[@class='achievement-progress-value']",
    any_achievement_ring: "//%s//*[contains(@class, 'achievement-ring') and @class != 'achievement-rings']",
    any_achievement_filled_ring: "//%s//*[contains(@class,'achievement-ring--filled')]",

    any_achievement_bounce: "//%s//a[contains(@class,'achievement--bounce')]",
    any_achievement_yellow_light: "//%s//a[contains(@class,'achievement--yellow_light')]",

    any_achievement_popup: "//div[@data-popup-name='achievement-popup']",
    any_achievement_popup_close_button: ".bUIPopup__eClose",
    any_achievement_icon_in_popup: "//%s//div[@class='achievement-card-indent']//i[@class='achievement-icon achievement-icon--%s']",
    any_achievement_name_in_popup: "//%s//div[@class='achievement-card-indent']//div[@class='achievement-name']",
    any_achievement_prize_in_popup: "//%s//div[@class='achievement-card-indent']//div[@class='achievement-prize']",
    any_achievement_prize_in_popup_money_value: "//%s//div[@class='achievement-card-indent']//div[@class='achievement-prize']//span[contains(@class, 'money_prize')]",
    any_achievement_conditions_in_popup: "//%s//div[@class='achievement-card-indent']//div[@class='achievement-conditions']",
    any_achievement_checked_condition_in_popup: "//%s//div[@class='achievement-card-indent']//div[@class='achievement-condition achievement-condition--achieved']",
    any_achievement_any_prize_in_popup: "//%s//div[@class='achievement-card-indent']//div[@class='item_prize-item']",
    any_achievement_progressbar_started_in_popup: "//%s//div[@class='achievement-card-indent']//div[@class='achievement-condition_progress achievement-condition_progress--started']",
    any_achievement_progressbar_completed_in_popup: "//%s//div[@class='achievement-card-indent']//div[@class='achievement-condition_progress achievement-condition_progress--completed']",

    any_achievement_notification: "//notificaton-center-view//achievement-notificaton",
    any_achievement_notification_unlock: "//achievement-notificaton[contains(@id, '%s')]",
    any_achievement_notification_progress: "//article[@class='achievement-notificaton' and @name='achievement-type--%s']",
    any_achievement_notification_link: "//achievement-notificaton[contains(@id, '%s')]//a",
    any_achievement_notification_title: "//achievement-notificaton[contains(@id, '%s')]//a//h1",
    any_achievement_notification_icon: "//%s//i[contains(@class,'achievement-icon')]",
    any_achievement_notification_close_button: "//%s//i[@class='achievement_notificaton-close']",

    any_group_selector: "//achievements-group[@id='%s']//div[@class='group-title_inner']",
    any_group_icon: "//achievements-group[@id='%s']//div[@class='group-icon']",
    any_group_total: "//achievements-group[@id='%s']//span[@class='group-achievements_total']",
    any_group_unlocked_count: "//achievements-group[@id='%s']//span[@class='group-achievements--unlocked_count']",

    userbar: '.userbar-bg',
    footer_vk: '.footer-4game__social-item_vk',
    footer_fb: '.footer-4game__social-item_fb',

    paymentTerminalWidget: {
        yandexAmount: "//input[@id='PaymentPopup__eAmount_Yandex_money']",
        achievementWantPrize: "//div[contains(@class, 'bPaymentTerminalAchievements__amount bPaymentTerminalAchievements__amount_visible')]/h3[contains(@class, 'bPaymentTerminalAchievements__wantPrize')]",
        achievementAddMore: "//div[contains(@class, 'bPaymentTerminalAchievements__amount bPaymentTerminalAchievements__amount_visible')]/p[contains(@class, 'bPaymentTerminalAchievements__addMore')]",
        bonusesVisible: "//div[contains(@class, 'bPaymentTerminalAchievements__bonuses bPaymentTerminalAchievements__bonuses_visible')]"
    },

    booble: {
        header: "//achievement-notificaton[@id='%s']//h1[contains(@class, 'achievement_notificaton-title')]",
        money_prize: "//achievement-notificaton[@id='%s']//span[contains(@class, 'money_prize')]"
    },

    what_it_is: {
        url: '/achievements/what-it-is/',
        locators: {
            button_to_achievements: '.bUIButton__eShine_type_undefined'
        }
    },

    groups: {
        forgame: {
            id: "4game",
            text: "На сайте Фогейм",
            count: "9",
            isHidden: false
        },
        bns: {
            id: "bns",
            text: "В Blade & Soul",
            count: "3",
            isHidden: false
        },
        pointblank: {
            id: "pointblank",
            text: "В Point Blank",
            count: "33",
            isHidden: false
        },
        aion: {
            id: "aion",
            text: "В Aion",
            count: "28",
            isHidden: false
        }
    },

    insertUnlockNotification(userId, achievementType, level, progress, maxProgress) {
        var data_key = achievementType + "-1-true";
        var data = {
            'data': {
                "achievementType": achievementType,
                "context": {},
                "isUnlocked": true,
                "level": 1,
                "maxProgress": 1000000000,
                "progress": 0,
                "rewards": [],
                "timestamp": 1477635294667,
                "userId": "119576479",
                "version": "0.0"
            },
            "id": achievementType + "-1-true",
            "tags": [],
            "type": "achievements"
        };
        var notification = {};
        notification[data_key] = JSON.parse(JSON.stringify(data));
        I.insertRevault(userId, 'notifications', 1, notification);
    },

    /* инициирует отображение нотификации об ачивке в правом верхнем углу экрана */
    forceBubble(achievementType, unlocked, level, progress, maxProgress, context) {
        context = context || "{}";
        progress = progress || "0";
        maxProgress = maxProgress || "1";
        I.executeScript("var notifications = require('streams/notifications');" +
            "var Bacon = require('packages/bacon');" +
            "notifications.plug(Bacon.once({   " +
            "id: ['" + achievementType + "', " + level + ", " + unlocked + "].join('-'),   " +
            "type: 'achievements',   tags: [],   " +
            "data: {achievementType: '" + achievementType + "',timestamp: " + Date.now() + ",isUnlocked: " + unlocked + "," +
            "context: " + context + "," +
            "progress: " + progress + "," +
            "maxProgress: " + maxProgress + "," +
            "level: " + level + "   " +
            "}}));");
    },

    /* кликает по баблу */
    clickOnBuble(achievement) {
        I.waitForVisible(this.any_achievement_notification_icon.replace(new RegExp("%s", 'g'), achievement));
        I.click(this.any_achievement_notification_icon.replace(new RegExp("%s", 'g'), achievement));
    },

    /* наводим мышку на ачивку */
    moveCursorToAchievement(achievement) {
        this.validateAchievementVisible(achievement);
        I.moveCursorTo(this.any_achievement_icon.replace("%s", achievement));
    },

    /* поднимает попап с ачивкой */
    openPopup(achievement) {
        I.amOnPage(this.popup_url_any_page + achievement);
        I.waitForVisible(this.any_achievement_popup);
    },

    validateAchievementBounced(achievement) {
        I.waitForVisible(this.any_achievement_bounce.replace("%s", achievement));
    },

    validateAchievementNotBounced(achievement) {
        I.dontSeeElement(this.any_achievement_bounce.replace("%s", achievement));
    },

    validateAchievementYellowLight(achievement) {
        I.waitForVisible(this.any_achievement_yellow_light.replace("%s", achievement));
    },

    validateAchievementNoYellowLight(achievement) {
        I.dontSeeElement(this.any_achievement_yellow_light.replace("%s", achievement));
    },

    /* проверяет, что ачивка отображается */
    validateAchievementVisible(achievement) {
        I.waitForVisible(this.any_achievement_icon.replace("%s", achievement));
    },

    /* проверяет, что ачивка не отображается */
    validateAchievementIsNotVisible(achievement) {
        I.dontSeeElement(this.any_achievement_icon.replace("%s", achievement));
    },

    /* проверяет, что ачивка анлокнута */
    validateAchievementUnlocked(achievement) {
        I.waitForVisible(this.any_unlocked_achievement.replace("%s", achievement));
    },

    /* проверяет, что ачивка не анлокнута */
    validateAchievementLocked(achievement) {
        I.waitForVisible(this.any_achievement_icon.replace("%s", achievement));
        I.dontSeeElement(this.any_unlocked_achievement.replace("%s", achievement));
    },

    /* проверяет количество дуг у ачивок  */
    validateAchievementRingsCount(achievement, expextedCount) {
        this.validateAchievementVisible(achievement);
        I.validateCountOfElements(this.any_achievement_ring.replace("%s", achievement), expextedCount);
    },

    /* проверяет количество закрашенных дуг у ачивок  */
    validateAchievementFilledRingsCount(achievement, expextedCount) {
        this.validateAchievementVisible(achievement);
        I.validateCountOfElements(this.any_achievement_filled_ring.replace("%s", achievement), expextedCount);
    },

    /* проверяет количество условий в ховере ачивки */
    validateAchievementConditionsCount(achievement, expextedCount) {
        this.validateAchievementVisible(achievement);
        I.moveCursorTo(this.any_achievement_icon.replace("%s", achievement));
        I.validateCountOfElements(this.any_achievement_condition_in_hover.replace("%s", achievement), expextedCount);
    },

    /* проверяет количество закрашенных условий в ховере ачивки */
    validateAchievementCheckedConditionsCount(achievement, expextedCount) {
        this.validateAchievementVisible(achievement);
        I.moveCursorTo(this.any_achievement_icon.replace("%s", achievement));
        I.validateCountOfElements(this.any_achievement_checked_condition_in_hover.replace("%s", achievement), expextedCount);
    },

    /* проверяет количество незакрашенных условий в ховере ачивки */
    validateAchievementUncheckedConditionsCount(achievement, expextedCount) {
        this.validateAchievementVisible(achievement);
        I.moveCursorTo(this.any_achievement_icon.replace("%s", achievement));
        I.validateCountOfElements(this.any_achievement_unchecked_condition_in_hover.replace("%s", achievement), expextedCount);
    },

    /* проверяет, что в прогресс баре в ховере ачивки виден прогресс */
    validateProgressBarInHoverVisible(achievement) {
        this.validateAchievementVisible(achievement);
        I.moveCursorTo(this.any_achievement_icon.replace("%s", achievement));
        I.waitForVisible(this.any_achievement_progressbar_in_hover.replace("%s", achievement));
    },

    /* проверяет отображение вертикально скроллбара в ховере ачивки */
    validateVerticalScrollBarInHover(achievement) {
        this.validateAchievementVisible(achievement);
        I.moveCursorTo(this.any_achievement_icon.replace("%s", achievement));
        I.waitForVisible(this.any_achievement_vertical_scrollbar_in_hover.replace("%s", achievement));
    },

    /* проверяет поведение, если все призы не умещаются в ховере ачивки */
    validateMorePrizesInHover(achievement) {
        this.validateAchievementVisible(achievement.id);
        I.moveCursorTo(this.any_achievement_icon.replace("%s", achievement.id));
        I.waitForVisible(this.any_achievement_more_prizes_in_hover.replace("%s", achievement.id));
        I.click(this.any_achievement_more_prizes_in_hover.replace("%s", achievement.id));
        I.waitForVisible(this.any_achievement_popup);
        I.seeInCurrentUrl(this.popup_url + achievement.id);
        I.waitForVisible(this.any_achievement_icon_in_popup.replace(new RegExp("%s", 'g'), achievement.id));
        I.waitForVisible(this.any_achievement_name_in_popup.replace("%s", achievement.id));
        I.validateCountOfElements(this.any_achievement_any_prize_in_popup.replace("%s", achievement.id), achievement.prizes_count);
    },

    /* проверяет, что в прогресс баре в ховере ачивки виден прогресс */
    validateProgressBarInHoverStarted(achievement) {
        this.validateProgressBarInHoverVisible(achievement);
        I.waitForVisible(this.any_achievement_progressbar_started_in_hover.replace("%s", achievement));
    },

    /* проверяет, что в прогресс бар заполнен */
    validateProgressBarInHoverCompleted(achievement) {
        this.validateProgressBarInHoverVisible(achievement);
        I.waitForVisible(this.any_achievement_progressbar_completed_in_hover.replace("%s", achievement));
    },


    /* проверяет, что название ачивки соответствует ожидаемому */
    validateAchievementName(achievement, name) {
        this.validateAchievementVisible(achievement);
        I.moveCursorTo(this.any_achievement_icon.replace("%s", achievement));
        I.waitForText(name, this.timeout, this.any_achievement_name.replace("%s", achievement));
    },

    /* проверка отображения и корректности уровня ачивки */
    validateAchievementLevel(achievement, level) {
        this.validateAchievementVisible(achievement);
        I.waitForVisible(this.any_achievement_level.replace("%s", achievement));
        I.waitForText(level, this.timeout, this.any_achievement_level.replace("%s", achievement));
    },

    /* проверят, что при наведении курсора на ачивку, отображается подсказка */
    validateAchievementHover(achievement) {
        this.validateAchievementVisible(achievement);
        I.moveCursorTo(this.any_achievement_icon.replace("%s", achievement));
        I.waitForVisible(this.any_achievement_name.replace("%s", achievement));
        I.waitForVisible(this.any_achievement_hover_block.replace("%s", achievement));
        I.waitForVisible(this.any_achievement_prize_in_hover.replace("%s", achievement));
        I.waitForVisible(this.any_achievement_conditions_in_hover.replace("%s", achievement));
    },

    /* проверяет отображение попапа с ачивкой */
    validateAchievementPopup(achievement, name) {
        I.waitForVisible(this.any_achievement_popup);
        I.seeInCurrentUrl(this.popup_url + achievement);
        I.waitForVisible(this.any_achievement_icon_in_popup.replace(new RegExp("%s", 'g'), achievement));
        I.waitForVisible(this.any_achievement_name_in_popup.replace("%s", achievement));
        I.waitForVisible(this.any_achievement_prize_in_popup.replace("%s", achievement));
        I.waitForVisible(this.any_achievement_conditions_in_popup.replace("%s", achievement));
        I.waitForText(name, this.timeout, this.any_achievement_name_in_popup.replace("%s", achievement));
        I.waitForVisible(this.any_achievement_popup_close_button);
        I.click(this.any_achievement_popup_close_button);
        I.dontSeeElement(this.any_achievement_popup);
    },

    /* проверяет отображение приза (текст) */
    validateAchievementPrize(achievement, expected) {
        this.validateAchievementVisible(achievement);
        I.waitForVisible(this.any_achievement_prize.replace("%s", achievement));
        I.waitForText(expected, this.timeout, this.any_achievement_prize.replace("%s", achievement));
    },

    /* проверяет отображение приза (текст) */
    validateAchievementMoneyPrize(achievement, expected) {
        this.validateAchievementVisible(achievement);
        I.waitForVisible(this.any_achievement_prize.replace("%s", achievement));
        assert(I.grabAttributeFrom(this.any_achievement_money_prize.replace("%s", achievement), 'value'), expected);
    },

    /* проверяет отображаение бабла */
    validateAchievementUnlockedBuble(achievement) {
        I.waitForVisible(this.any_achievement_notification_unlock.replace(new RegExp("%s", 'g'), achievement.id));
        I.waitForVisible(this.any_achievement_notification_link.replace(new RegExp("%s", 'g'), achievement.id));
        assert(I.grabAttributeFrom(this.any_achievement_notification_link.replace(new RegExp("%s", 'g'), achievement.id), 'href'), '/achievements/#' + achievement.id);
        I.waitForVisible(this.any_achievement_notification_icon.replace(new RegExp("%s", 'g'), achievement.id));
        I.waitForVisible(this.any_achievement_notification_title.replace(new RegExp("%s", 'g'), achievement.id));
        I.waitForText("Получено достижение «" + achievement.title + "»!", this.timeout, this.any_achievement_notification_unlock.replace(new RegExp("%s", 'g'), achievement.id));
        if (typeof achievement.money_prize != 'undefined') {
            I.waitForVisible(this.booble.money_prize.replace("%s", achievement.id + "-1-true"));
            I.waitForText(achievement.money_prize, this.timeout, this.booble.money_prize.replace("%s", achievement.id + "-1-true"));
        }
    },

    /* проверят, что скрытые ачивки не отображаются */
    validateHiddenAchevements(data) {
        for (var group in data.groups) {
            for (var achievement in data.groups[group]) {
                let currentAchievement = data.groups[group][achievement];
                if (currentAchievement.isHidden == true) {
                    this.validateAchievementIsNotVisible(currentAchievement.id);
                }
            }
        }
    },

    /* проверяет, что все видимые ачивки отображаются и не анлокнуты */
    validateLockedAchievements(data) {
        for (var group in data.groups) {
            for (var achievement in data.groups[group]) {
                var currentAchievement = data.groups[group][achievement];
                if (currentAchievement.isHidden == false) {
                    this.validateAchievementVisible(currentAchievement.id);
                    this.validateAchievementLocked(currentAchievement.id);
                    I.dontSeeElement(this.any_achievement_prize_in_hover.replace("%s", currentAchievement.id));
                    I.dontSeeElement(this.any_achievement_conditions_in_hover.replace("%s", currentAchievement.id));
                    this.validateAchievementName(currentAchievement.id, currentAchievement.title);
                }
            }
        }
    },

    /* проверяет отображаение бабла анлока у всех нескрытых ачивок */
    validateAchievemensUnlockedBubles(data) {
        for (var group in data.groups) {
            for (var achievement in data.groups[group]) {
                var currentAchievement = data.groups[group][achievement];
                if (currentAchievement.isHidden == false) {
                    I.amOnPage('/');
                    this.forceBubble(currentAchievement.id, true, 1, 0, currentAchievement.maxProgress, '');
                    this.validateAchievementUnlockedBuble(currentAchievement);
                }
            }
        }
    },

    /* проверяет, что у всех нескрытых ачивок отображается подсказка */
    validateAchievementsHover(data) {
        for (var group in data.groups) {
            for (var achievement in data.groups[group]) {
                var currentAchievement = data.groups[group][achievement];
                if (currentAchievement.isHidden == false) {
                    this.validateAchievementVisible(currentAchievement.id);
                    this.validateAchievementHover(currentAchievement.id);
                }
            }
        }
    },

    /* проверяет, что после клика на ачивку отображается попап */
    validateAchievementsPopup(data) {
        for (var group in data.groups) {
            for (var achievement in data.groups[group]) {
                var currentAchievement = data.groups[group][achievement];
                if (currentAchievement.isHidden == false) {
                    this.validateAchievementVisible(currentAchievement.id);
                    I.moveCursorTo(this.any_achievement_icon.replace("%s", achievement));
                    this.validateAchievementVisible(currentAchievement.id);
                    I.mouseLeftClick(this.any_achievement_icon.replace("%s", achievement));
                    this.validateAchievementPopup(currentAchievement.id, currentAchievement.title);
                }
            }
        }
    },

    /* проверяет отображение денежной награды */
    validateAchievementsMoneyPrize(data) {
        for (var group in data.groups) {
            for (var achievement in data.groups[group]) {
                var currentAchievement = data.groups[group][achievement];
                if (currentAchievement.isHidden == false) {
                    if (typeof currentAchievement.money_prize != 'undefined') {
                        this.validateAchievementMoneyPrize(currentAchievement.id, currentAchievement.money_prize);
                    }
                }
            }
        }
    },

    /* проверяет отображение текстовой награды */
    validateAchievementsPrize(data) {
        for (var group in data.groups) {
            for (var achievement in data.groups[group]) {
                var currentAchievement = data.groups[group][achievement];
                if (currentAchievement.isHidden == false) {
                    if (typeof currentAchievement.prize != 'undefined') {
                        this.validateAchievementPrize(currentAchievement.id, currentAchievement.prize);
                    }
                }
            }
        }
    },

    /* проверяет отображение скролл-бара в ховере ачивок */
    validateAchievementsVerticalScrollBarInHover(data) {
        for (var group in data.groups) {
            for (var achievement in data.groups[group]) {
                var currentAchievement = data.groups[group][achievement];
                if (currentAchievement.isHidden == false) {
                    if (typeof currentAchievement.hasScrollBar != 'undefined') {
                        this.validateVerticalScrollBarInHover(currentAchievement.id);
                    }
                }
            }
        }
    },

    /* проверяет поведение, если призов в ачивке больше определенного количества и они не умещаются в ховере */
    validateAchievementsMorePrizesInHover(data) {
        for (var group in data.groups) {
            for (var achievement in data.groups[group]) {
                var currentAchievement = data.groups[group][achievement];
                if (currentAchievement.isHidden == false) {
                    if (typeof currentAchievement.more_prizes != 'undefined') {
                        this.validateMorePrizesInHover(currentAchievement);
                    }
                }
            }
        }
    },

    /* перебирает все открытые группы ачивок и проверяет неизменяемый контент */
    validateVisibilityOfAchievementsGroups() {
        for (var group in this.groups) {
            if (this.groups[group].isHidden == false) {
                this.validateGroup(this.groups[group]);
            }
        }
    },

    /* проверяет количество анлокнутых ачивок (число) для указанной группы */
    validateUnlockedCountInGroup(group, expexted) {
        I.waitForVisible(this.any_group_selector.replace("%s", group.id));
        I.waitForText(expexted, this.timeout, this.any_group_unlocked_count.replace("%s", group.id));
    },

    /* Проверяет группу достижений (только неизменную часть) */
    validateGroup(group) {
        I.waitForVisible(this.any_group_selector.replace("%s", group.id));
        I.waitForVisible(this.any_group_icon.replace("%s", group.id));
        I.waitForVisible(this.any_group_total.replace("%s", group.id));
        I.waitForText(group.text, this.timeout, this.any_group_selector.replace("%s", group.id));
        //I.waitForText(group.count, this.timeout, this.any_group_total.replace("%s", group.id));
        //TODO раскоментить, когда внесем все ачивки в конфиг
    },

    /* Проверяет постоянный контент на странице */
    validateImmutableContent() {
        I.seeInTitle(this.page_title);
        I.waitForVisible(this.content_title_locator);
        I.waitForText(this.content_title, this.timeout, this.content_title_locator);
        I.waitForVisible(this.about_link_locator);
        I.waitForText(this.about_link, this.timeout, this.about_link_locator);
    },

    /* проверят, что при наведении курсора на ачивку, отображается корректные данные в ачивке */
    validateAchievementHoverContent(achievement, name, conditions, prize_money) {
        I.moveCursorTo(this.any_achievement_icon.replace("%s", achievement));
        I.waitForVisible(this.any_achievement_hover_block.replace("%s", achievement));
        I.waitForText(name, this.timeout, this.any_achievement_name.replace("%s", achievement));
        I.waitForText(prize_money, this.timeout, this.any_achievement_prize_in_hover_money_value.replace("%s", achievement));
        var now = new Date();
        I.waitForText(conditions.replace("%s", Math.ceil((new Date(now.getFullYear(), now.getMonth() + 1, 1) - now) / 1000 / 60 / 60 / 24)), this.timeout, this.any_achievement_conditions_in_hover.replace("%s", achievement));
    },

    /* проверяет, что после клика на ачивку отображается попап с корректными данными об ачивке */
    validateAchievementPopupContent(achievement, name, conditions, prize_money) {
        I.mouseLeftClick(this.any_achievement_icon.replace("%s", achievement));
        I.waitForVisible(this.any_achievement_name_in_popup.replace("%s", achievement));
        I.waitForText(name, this.timeout, this.any_achievement_name_in_popup.replace("%s", achievement));
        I.waitForText(prize_money, this.timeout, this.any_achievement_prize_in_popup_money_value.replace("%s", achievement));
        var now = new Date();
        I.waitForText(conditions.replace("%s", Math.ceil((new Date(now.getFullYear(), now.getMonth() + 1, 1) - now) / 1000 / 60 / 60 / 24)), this.timeout, this.any_achievement_conditions_in_popup.replace("%s", achievement));
    },

    /* проверяет, что все вариации залоченных донатных экспериментальных ачивок корректно отображаются на фронте*/
    validateAchivementsExperimentalDonate(data, user) {
        for (var achievement in data.forgame) {
            var currentAchievement = data.forgame[achievement];
            if (currentAchievement.context.sumExpirationDate) {
                currentAchievement.context.sumExpirationDate = Date.now() + 2628000000
            }
            I.insertAchievement(user.id, currentAchievement.id, false, "0", "0", "1", "[]", JSON.stringify(currentAchievement.context));
            I.amOnPage(this.url);
            this.validateAchievementVisible(currentAchievement.id);
            this.validateAchievementHoverContent(currentAchievement.id, currentAchievement.title, currentAchievement.conditions, currentAchievement.prize)
            if (currentAchievement.context.sumAdded) {
                I.waitForVisible(this.any_achievement_progressbar_started_in_hover.replace("%s", currentAchievement.id));
            }
            this.validateAchievementPopupContent(currentAchievement.id, currentAchievement.title, currentAchievement.conditions, currentAchievement.prize)
            if (currentAchievement.context.sumAdded) {
                I.waitForVisible(this.any_achievement_progressbar_started_in_popup.replace("%s", currentAchievement.id));
            }
        }
    },

    /* проверяет, что все вариации анлокнутых донатных экспериментальных ачивок корректно отображаются на фронте */
    validateUnlockedAchivementsExperimentalDonate(data, user) {
        for (var achievement in data.forgame) {
            var currentAchievement = data.forgame[achievement];
            var now = new Date();
            I.insertAchievement(user.id, currentAchievement.id, true, "1", "0", "1", "[]", JSON.stringify(currentAchievement.context));
            I.amOnPage(this.url);
            this.validateAchievementVisible(currentAchievement.id);
            this.validateAchievementUnlocked(currentAchievement.id);
            this.validateAchievementHoverContent(currentAchievement.id, currentAchievement.title, currentAchievement.conditions, currentAchievement.prize)
            I.waitForText(currentAchievement.conditions.replace("Как получить?\n", "").replace("%s", Math.ceil((new Date(now.getFullYear(), now.getMonth() + 1, 1) - now) / 1000 / 60 / 60 / 24)), this.timeout, this.any_achievement_checked_condition_in_hover.replace("%s", currentAchievement.id));
            this.validateAchievementPopupContent(currentAchievement.id, currentAchievement.title, currentAchievement.conditions, currentAchievement.prize)
            I.waitForText(currentAchievement.conditions.replace("Как получить?\n", "").replace("%s", Math.ceil((new Date(now.getFullYear(), now.getMonth() + 1, 1) - now) / 1000 / 60 / 60 / 24)), this.timeout, this.any_achievement_checked_condition_in_popup.replace("%s", currentAchievement.id));
        }
    },

    /* проверяет, что все вариации донатных экспериментальных ачивок корректно отрабатывают в попапе пополнения счета */
    validatePaymentTerminalExperimentalDonate(data, user) {
        for (var achievement in data.forgame) {
            var currentAchievement = data.forgame[achievement];
            I.insertAchievement(user.id, currentAchievement.id, false, "0", "0", "1", "[]", JSON.stringify(currentAchievement.context));
            I.amOnPage("/?popupWidget=PaymentTerminalWidget");
            I.waitForVisible(this.paymentTerminalWidget.yandexAmount);
            if (!currentAchievement.context.sumAdded) {
                I.fillField(this.paymentTerminalWidget.yandexAmount, ((currentAchievement.context.sumToAdd * 0.6) - 1).toString())
                I.waitForVisible(this.paymentTerminalWidget.achievementWantPrize);
                I.waitForVisible(this.paymentTerminalWidget.achievementAddMore);
                I.waitForText("Хочешь " + currentAchievement.context.reward + " руб. в подарок?", this.timeout, this.paymentTerminalWidget.achievementWantPrize);
                I.waitForText("Пополни счет на  " + currentAchievement.context.sumToAdd + " руб. и более.", this.timeout, this.paymentTerminalWidget.achievementAddMore);
                I.dontSeeElement(this.paymentTerminalWidget.bonusesVisible)
                I.clearField(this.paymentTerminalWidget.yandexAmount);
                I.fillField(this.paymentTerminalWidget.yandexAmount, currentAchievement.context.sumToAdd.toString())
                I.waitForVisible(this.paymentTerminalWidget.bonusesVisible);
                I.waitForText("+" + currentAchievement.context.reward + " руб. в награду\nпри пополнении счета", this.timeout, this.paymentTerminalWidget.bonusesVisible);
                I.dontSeeElement(this.paymentTerminalWidget.achievementWantPrize);
                I.dontSeeElement(this.paymentTerminalWidget.achievementAddMore);
            } else {
                I.fillField(this.paymentTerminalWidget.yandexAmount, ((currentAchievement.context.sumToAdd * 0.6) - 1).toString())
                I.dontSeeElement(this.paymentTerminalWidget.achievementWantPrize);
                I.dontSeeElement(this.paymentTerminalWidget.achievementAddMore);
                I.dontSeeElement(this.paymentTerminalWidget.bonusesVisible)
            }
        }
    },

    /* проверяет, что все вариации донатных экспериментальных ачивок корректно отображаются в бабблах*/
    validateBoobleExperimentalDonate(data, userbar) {
        for (var achievement in data.forgame) {
            var currentAchievement = data.forgame[achievement];
            I.amOnPage("/");
            I.waitForVisible(userbar.balanceDataArrow);
            this.forceBubble(currentAchievement.id, true, 1, 0, 1, JSON.stringify(currentAchievement.context));
            I.waitForVisible(this.booble.header.replace("%s", currentAchievement.id + "-1-true"));
            I.waitForText("Получено достижение «" + currentAchievement.title + "»!", this.timeout, this.booble.header.replace("%s", currentAchievement.id + "-1-true"));
            I.waitForVisible(this.booble.money_prize.replace("%s", currentAchievement.id + "-1-true"));
            I.waitForText(currentAchievement.prize, this.timeout, this.booble.money_prize.replace("%s", currentAchievement.id + "-1-true"));
        }
    }
}
