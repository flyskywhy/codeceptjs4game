'use strict';
// in this file you can append custom step methods to 'I' object
const request = require('sync-request');
const assert = require('assert');

var statuses = require('./data/statuses');
var games = require('./data/games');
var codeceptConfig = require('./codecept.conf').config

module.exports = function() {
    return actor({

        // Define custom steps here, use 'this' to access default methods of I.
        // It is recommended to place a general 'login' function here.

        /*
         ** Метод для переведения фогейма в авторизованную зону
         ** email - email пользователя
         ** password - пароль пользователя
         */
        amAuthorizedUser: function(email, password) {
            this.amOnPage('/404');
            this.setLoginCookieFor(email, password);
        },

        waitAndClick: function(element, time) {
            if (typeof(time) === 'undefined') {
                time = codeceptConfig.helpers.WebDriverIO.waitForTimeout / 1000;
            };
            this.waitForVisible(element, time);
            this.click(element);
        },

        waitAndFillField: function(text, element, time) {
            if (typeof(time) === 'undefined') {
                time = codeceptConfig.helpers.WebDriverIO.waitForTimeout / 1000;
            };
            this.waitForVisible(element, time);
            this.fillField(element, text);
        },

        doQuickLogin: function(url) {
            this.amOnPage('/404');
            this.setLoginCookieFor(user.email, user.password);
            this.amOnPage(url);
            return 1;
        },

        amOnPageForAuthUser: function(user, page) {
            this.acceptAgreementsForNewUser(user.id);
            this.amOnPage('/404');
            this.setLoginCookieFor(user.email, user.password);
            this.amOnPage(page);
        },

        hideAchievementsNotifications: function() {
            this.waitForElement('//div[@class = "notification_center"]');
            this.executeScript('document.getElementsByClassName("notification_center")[0].style.visibility = "hidden"');
        },

        makeInstalledGame: function(serviceId) {
            let message = JSON.stringify(statuses.installed).replace(new RegExp("%s", 'g'), serviceId);
            this.executeScript('window.Inn.BasicConsole.init();');
            this.executeScript('window.Inn.BasicConsole.receive("status",' + message + ');');
        },

        makeInProgressGame: function(serviceId) {
            let message = JSON.stringify(statuses.progress).replace(new RegExp("%s", 'g'), serviceId);
            this.executeScript('window.Inn.BasicConsole.init();');
            this.executeScript('window.Inn.BasicConsole.receive("status",' + message + ');');
        },

        makeUnpackingGame: function(serviceId) {
            let message = JSON.stringify(statuses.unpacking).replace(new RegExp("%s", 'g'), serviceId);
            this.executeScript('window.Inn.BasicConsole.init();');
            this.executeScript('window.Inn.BasicConsole.receive("status",' + message + ');');
        },

        makeNotInstalledGame: function(serviceId) {
            let message = JSON.stringify(statuses.not_installed).replace(new RegExp("%s", 'g'), serviceId);
            this.executeScript('window.Inn.BasicConsole.init();');
            this.executeScript('window.Inn.BasicConsole.receive("status",' + message + ');');
        },

        makeNotUpdatedGame: function(serviceId) {
            let message = JSON.stringify(statuses.full_update_required).replace(new RegExp("%s", 'g'), serviceId);
            this.executeScript('window.Inn.BasicConsole.init();');
            this.executeScript('window.Inn.BasicConsole.receive("status",' + message + ');');
        },

        makePauseInGameInstall: function(serviceId) {
            let message = JSON.stringify(statuses.paused).replace(new RegExp("%s", 'g'), serviceId);
            this.executeScript('window.Inn.BasicConsole.init();');
            this.executeScript('window.Inn.BasicConsole.receive("status",' + message + ');');
        },

        makeRepairGame: function(serviceId) {
            let message = JSON.stringify(statuses.repair).replace(new RegExp("%s", 'g'), serviceId);
            this.executeScript('window.Inn.BasicConsole.init();');
            this.executeScript('window.Inn.BasicConsole.receive("status",' + message + ');');
        },

        sendError: function(code) {
            this.executeScript('window.Inn.BasicConsole.init();');
            this.executeScript('window.Inn.BasicConsole.receive("error", {"code": ' + code + '});');
        },

        switchEnvironmentGame: function(serviceId, environment) {
            let script = 'require(["l4g/assets/app-interface"], function(iface) {  iface.get().send( "setEnvironment", {name: "%e", serviceId:%s} ); });';
            script = script.replace(new RegExp("%s", 'g'), serviceId).replace(new RegExp("%e", 'g'), environment);
            this.executeScript(script);
        },


        /*
        Выставляет значение для профилктики (либо выключает, либо включает)
        */
        setGameMaintenanceFor: function(serviceId, boolean) {
            let script = "$(document).one('l4g-model-ready', function(e, n){n.model.set('L4G.Maintenance/maintenance.services." +
                serviceId + "', " + boolean + ");" + "}).trigger('get-l4g-model-status');";
            this.executeScript(script);
        },

        setMaintForAllGames: function(games) {
            for (var i = 0; i < Object.keys(games).length; i++) {
                if (Object.keys(games)[i] != "default_game") {
                    var script = "$(document).one('l4g-model-ready', function(e, n){n.model.set('L4G.Maintenance/maintenance.services.%s', true);" + "}).trigger('get-l4g-model-status');";
                    script = script.replace(new RegExp("%s", 'g'), games[Object.keys(games)[i]].serviceId);
                    this.executeScript(script);
                }
            };
        },

        setInstalledForAllGames: function(games) {
            this.executeScript('window.Inn.BasicConsole.init();');
            for (var i = 0; i < Object.keys(games).length; i++) {
                if (Object.keys(games)[i] != "default_game") {
                    let message = JSON.stringify(statuses.installed).replace(new RegExp("%s", 'g'), games[Object.keys(games)[i]].serviceId);
                    this.executeScript('window.Inn.BasicConsole.receive("status",' + message + ');');
                }
            };
        },

        getGames: function() {
            return games;
        },

        /*
        установить куку без включения поддоменов
        */
        setCookieWithoutDot: function(name, value, path) {
            let script = "document.cookie='%n=%v; path = %p'";
            script = script.replace(new RegExp("%n", 'g'), name).replace(new RegExp("%v", 'g'), value).replace(new RegExp("%p", 'g'), path);
            this.executeScript(script);
        },

        /*
        переходит на другую языковую платформу ru <-> eu
        */
        amOnPageOnOtherPlatform(url) {
            if (codeceptConfig.helpers.WebDriverIO.url.indexOf("ru.") < 0) {
                this.amOnPage(codeceptConfig.helpers.WebDriverIO.url.replace("eu.", "ru.") + url);
            } else {
                this.amOnPage(codeceptConfig.helpers.WebDriverIO.url.replace("ru.", "eu.") + url)
            }
        }

    });
}
