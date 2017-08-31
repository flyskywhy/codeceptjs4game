'use strict';
/**
 * Элементы Гейм-панели
 */

let I;

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    timeout: 30,
    wait_install_game: 15000,

    index: {
        locators: {
            main_section: ".bGamePanelCommon__eMainSection",
            main_form: ".bGamePanelCommon__eInnerSection",
            ui_button: ".bUIButton__eLabel",
            game_size: "#bGamePanel__installServiceSize_jsId",
            app_os_icon: "#bGamePanel__installServiceSize_jsId .bPageFooter__eAppOSIcon",
            service_title: {
                locator: ".jsServiceTitle",
                qa_text: "%s [QA]",
                live_text: "%s"
            },

            widget_install_game: {
                locator: ".bWidgetDownload",
                icon: ".bWidgetDownload .bWidgetDownload__eServiceLogo",
                title_locator: ".bWidgetDownload .bWidgetDownload__eTitle",
                title_text: "Установить %s",
                folder_choose_input: ".bWidgetDownload .bFolderChoose__eInput",
                folser_choose_button: ".bWidgetDownload .bFolderChoose__eInput .jsBtnFolderChoose",
                create_shortcuts_checkbox: ".bWidgetDownload #chbCreateShortcuts",
                accept_licence_checkbox: ".bWidgetDownload #chbAcceptLicence",
                licence_link: ".bWidgetDownload .jsLicenceLink",
                user_licence_link: ".bWidgetDownload .jsUserLicenceLink",
                button_begin_install: ".bWidgetDownload #btnBeginInstall",
                checkbox_error: ".bFolderChoose__eCheckboxError",
                error_incorrect_path_locator: ".bWidgetDownload .mError_723",
                error_incorrect_path_text: "Указан неверный путь к каталогу",
                close_button: ".bUIPopup__eClose"
            },

            widget_progress: {
                locator: ".bGamePanel__eProgress",
                version_locator: ".bGamePanelProgress__eVersion",
                button_pause_locator: "#jsGamePanel__ProgressBlock__eButton_Pause",
                button_pause_text: "Остановить",
                button_cancel_locator: "#jsGamePanel__ProgressBlock__eButton_Cancel",
                button_cancel_text: "Отменить",
                button_cancel_yes: "#jsGamePanel__ProgressBlock__eButton_ProgressStopYes",
                button_cancel_no: "#jsGamePanel__ProgressBlock__eButton_ProgressStopNo",
                button_resume_locator: "#jsGamePanel__ProgressBlock__eButton_Resume",
                button_resume_text: "Возобновить",
                progressBar: ".bUIProgressBar__eInner",
                progress_status: ".bUIProgressBar__eStatus",
                progressBar_on_pause: ".bUIProgressBar__mState_pause",
                progress_block: {
                    downloaded: "#jsGamePanel__ProgressBlock__Downloaded",
                    size: "#jsGamePanel__ProgressBlock__DownloadSize",
                    speed: "#jsGamePanel__ProgressBlock__DownloadSpeed"
                }
            },

            widget_settings: {
                button_to_settings: "#jsGamePanel-btnToSettings",
                button_back_to_gp: "#jsGamePanel-btnToCommon",
                locator: ".bGamePanelSettings",
                title_locator: ".bGamePanelSettings__eTitle",
                title_text: "Настройки игры",
                button_default_path: "#jsGamePanel-btnChangeDefaultPath",
                button_fix_game: "#jsGamePanel-btnFixGame",
                game_version: ".bGamePanelSettings__eVersion",
                sub_info_message: {
                    locator: ".bInfoMessage__mType_subinfo",
                    text: "Полная проверка файлов и ремонт игры"
                },
                envitonment_selector: ".bGamePanelSettings__eEnvironmentSelector"
            },

            popup_final_formalities: {
                locator: "#LicencePopup",
                frame: "A4GFrame",
                game_icon: ".bWidgetDownload__eServiceLogo",
                license_widget: "#WidgetDownloadPopupLicence",
                button_accept_and_play: "#jsLicensePopup-btnPlay",
                title: {
                    locator: ".bWidgetDownload__eTitle",
                    text: "Последние формальности"
                },
                close_button: ".bUIPopup__eCloseIcon",
                play_button: "#jsLicensePopup-btnPlay"
            },

            popup_inftall_app: {
                description: {
                    locator: ".bWidgetDownload__eDescription",
                    text: "Чтобы установить игру требуется приложение Фогейм"
                },
            },

            popup_download_application: {
                frame: "A4GFrame",
                button_accept_licence: "#jsLicensePopup-btnAgree",
            },

            buttons: {
                install: {
                    locator: "#bGamePanel__eBtnInstallService_jsId",
                    text_locator: "#bGamePanel__eBtnInstallService_jsId .bUIButton__eLabel",
                    text: "Установить"
                },
                install_plugin: {
                    locator: "#bGamePanel__eBtnInstallPlugin_jsId",
                    text_locator: "#bGamePanel__eBtnInstallPlugin_jsId .bUIButton__eLabel",
                    text: "Установить"
                },
                play_unauth: {
                    locator: "#bGamePanel__eBtnLogin_jsId",
                    text_locator: "#bGamePanel__eBtnLogin_jsId .bUIButton__eLabel",
                    text: "Играть"
                },
                play: {
                    locator: "#jsBtnPlay",
                    text_locator: "#jsBtnPlay .bUIButton__eLabel",
                    text: "Играть"
                },
                play_blocked: {
                    locator: "#jsBtnPlayBlocked",
                    text_locator: "#jsBtnPlayBlocked .bUIButton__eLabel",
                    text: "Играть"
                },
                confirm_email: {
                    locator: ".bPseudoButton",
                    text_locator: ".bPseudoButton__eText",
                    text: "Подтвердить эл. почту"
                },
                confirm_country: {
                    locator: ".bPseudoButton",
                    text_locator: ".bPseudoButton__eText",
                    text: "Указать страну"
                },
                refresh_after_error: {
                    locator: ".jsGamePanel__eDefaultState__Refresh",
                    text_locator: ".bSmallButton__eShine",
                    text: "Обновить"
                },
                update: {
                    locator: "#bGamePanel__eBtnUpdateService_jsId",
                    text_locator: "#bGamePanel__eBtnUpdateService_jsId .bUIButton__eLabel",
                    text: "Обновить"
                }
            },
            messages: {
                ban_info_message: {
                    locator: ".bInfoMessage__mType_ban",
                    text: "Аккаунт заблокирован до"
                },
                error_message: {
                    locator: ".bInfoMessage__mType_error",
                    text: "При загрузке страницы произошла ",
                    target: "//div[@class='bGamePanelDefaultState__eFault']//a",
                    target_text: "ошибка %s"
                },
                info_success_install: {
                    locator: ".bInfoMessage__mType_success",
                    text: "Игра установлена,"
                },
                sub_info_support_message: {
                    locator: ".bInfoMessage__mType_subinfo",
                    text: "Обратись в ",
                    target: ".bInfoMessage__mType_subinfo a",
                    target_text: "службу поддержки",
                    on_error_text: "Способы решения этой проблемы"
                },
                warning_cant_play: {
                    locator: ".bInfoMessage__mType_warning",
                    text: "Для того, чтобы начать\nигру, необходимо:"
                },
                warning_need_update: {
                    locator: "#jsUpdateRequiredMessage",
                    text: "Требуется обновление"
                },
                maintenance: {
                    locator: "#jsBigMaintenanceMessage"
                }
            },
            link_to_play: {
                locator: ".bInfoMessage__eLinkContent__mType_underline",
                text: "перейти на страницу\nзапуска"
            }
        }
    },

    buttons: {
        switchUbersecurityOn: "//div[contains(@class, 'bGamePanelCommon__eMainSection')]//a[@id='go-to-uber-security']",
        buySubscription: "//div[contains(@class, 'bGamePanelCommon__eMainSection')]//a[@href='?popupWidget=PremiumUpgradeWidget']",
        addMobile: "//div[contains(@class, 'bGamePanelCommon__eMainSection')]//a[@href='?popupWidget=SetContactWidget&contactType=3']"
    },

    /* Метод возвращет игру, отличную от текущей */
    getAnotherGame(games, currentGame) {
        for (var i = 0; i < Object.keys(games).length; i++) {
            if (Object.keys(games)[i] != currentGame) {
                return Object.keys(games)[i];
            }
        }
    },

    /* Подтверждает попап "последние формальности" если он виден на странице */
    acceptFinalFormalitiesIfVisible() {
        if (I.grabElementVisibleStatus(this.index.locators.popup_final_formalities.locator)) {
            I.switchTo(this.index.locators.popup_final_formalities.frame);
            I.waitForVisible(this.index.locators.popup_final_formalities.play_button, this.timeout);
            I.click(this.index.locators.popup_final_formalities.play_button);
        }
    },

    /* Метод ожидания кнопки "Плей". Использовать, если игра не установлена или требует обновлений */
    /* //TODO метод еще не готов, будет сделан в другой ветке. сейчас не используется */
    waitForPlayButton() {
        if (I.grabElementVisibleStatus(this.index.locators.buttons.play.locator) == true) {
            if (I.grabElementVisibleStatus(this.index.locators.buttons.install.locator) == true) {
                I.click(this.index.locators.buttons.install.locator);
                I.waitForVisible(this.index.locators.widget_install_game.locator, this.timeout);
                I.waitForVisible(this.index.locators.widget_install_game.icon, this.timeout);
                I.waitForVisible(this.index.locators.widget_install_game.title_locator, this.timeout);
                I.waitForVisible(this.index.locators.widget_install_game.folder_choose_input, this.timeout);
                I.waitForVisible(this.index.locators.widget_install_game.folser_choose_button, this.timeout);
                I.waitForVisible(this.index.locators.widget_install_game.create_shortcuts_checkbox, this.timeout);
                I.waitForVisible(this.index.locators.widget_install_game.accept_licence_checkbox, this.timeout);
                I.waitForVisible(this.index.locators.widget_install_game.licence_link, this.timeout);
                I.waitForVisible(this.index.locators.widget_install_game.button_begin_install, this.timeout);
                I.waitForVisible(this.index.locators.widget_install_game.user_licence_link, this.timeout);
                I.click(this.index.locators.widget_install_game.accept_licence_checkbox);
                I.click(this.index.locators.widget_install_game.button_begin_install);
                I.waitForElementPresent(this.index.locators.buttons.play.locator, this.wait_install_game);
            }
            if (I.grabElementVisibleStatus(this.index.locators.buttons.update.locator) == true) {
                I.mouseLeftClick(this.index.locators.buttons.update.locator);
                I.waitForElementPresent(this.index.locators.buttons.play.locator, this.wait_install_game);
            }
        }
    }
}
