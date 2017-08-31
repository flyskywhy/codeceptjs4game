'use strict';

const assert = require('assert');
const request = require('sync-request');
const querystring = require('querystring');

var codeceptConfig = require('../codecept.conf').config

class Email extends Helper {

    _failed(test) {
        return;
    }

    /* пока что костыльный слип */
    sleep(miliseconds) {
        var currentTime = new Date().getTime();
        while (currentTime + miliseconds >= new Date().getTime()) {}
    }

    /* в зависимости от среды (qa/live) формирует урл запроса к нотифаю */
    createRequestUrl(identity) {
        let client = this.helpers['WebDriverIO'].browser;
        var url = '' + client.getUrl();
        if (identity.toString().indexOf('@') == -1) {
            identity = 'notifytest.' + identity + '@inn.ru';
        }
        return (url.indexOf('test') > -1) ?
            'http://notifytest.srv.inn.ru/maildata/' + identity + '.htm' :
            'http://notify.qa.inn.ru/maildata/' + identity + '.htm';
    }

    /* в зависимости от среды (qa/live) формирует урл запроса к нотифаю */
    createRequestUrlPhone(identity) {
        let client = this.helpers['WebDriverIO'].browser;
        var url = '' + client.getUrl();
        return (url.indexOf('test') > -1) ?
            'http://notifytest.srv.inn.ru/smsdata/' + identity + '.htm' :
            'http://notify.qa.inn.ru/smsdata/' + identity + '.htm';
    }

    /* возвращает код подтвердения из письма */
    getConfirmCode(message) {
        return message.template_data.confirmCode;
    }

    /* возвращает новое письмо, если оно есть */
    getNewMessage(identity, currentCount) {
        var messages = {};
        var newCount = currentCount;
        for (let i = 0; i < 6; i++) {
            messages = this.getMessages(identity);
            newCount = Object.keys(messages).length;
            if (newCount > currentCount)
                return messages[newCount - 1];
            this.sleep(5000);
        }
        assert.fail('New messages not founded for ' + this.createRequestUrl(identity));
    }

    /* возвращает текущий список писем */
    getMessages(identity) {
        let requestUrl = this.createRequestUrl(identity);
        var messages = {};
        let res = request('GET', requestUrl);
        if (res.statusCode == '404') {
            return messages;
        }
        let source = res.getBody().toString();
        var currentPos, currentDataPos, nextPos, template, template_data;
        var i = 0;
        while (source.indexOf('Template: ') != -1) {
            currentPos = source.indexOf('Template: ');
            currentDataPos = source.indexOf('Template data: ');
            nextPos = source.indexOf('Build info: ');
            template = source.substring(currentPos + 'Template: '.length, currentDataPos - 5);
            template_data = source.substring(currentDataPos + 'Template data: '.length, nextPos - 5);
            source = source.substring(nextPos + 1);
            messages[i++] = {
                template: template,
                template_data: JSON.parse(template_data)
            };
        }
        return messages;
    }

    /* возвращает текущий список смс */
    getSmsList(identity) {
        let requestUrl = this.createRequestUrlPhone(identity);
        var messages = {};
        let res = request('GET', requestUrl);
        if (res.statusCode == '404') {
            return messages;
        }
        let source = res.getBody().toString();
        var currentPos, currentDataPos, nextPos, template, template_data;
        var i = 0;
        while (source.indexOf('Template: ') != -1) {
            currentPos = source.indexOf('Template: ');
            currentDataPos = source.indexOf('Template data: ');
            nextPos = source.indexOf('Build info: ');
            template = source.substring(currentPos + 'Template: '.length, currentDataPos - 5);
            template_data = source.substring(currentDataPos + 'Template data: '.length, nextPos - 5);
            source = source.substring(nextPos + 1);
            messages[i++] = {
                template: template,
                template_data: JSON.parse(template_data)
            };
        }
        return messages;
    }

    /* возвращает новое письмо, если оно есть */
    getNewSms(identity, currentCount) {
        var messages = {};
        var newCount = currentCount;
        for (let i = 0; i < 6; i++) {
            messages = this.getSmsList(identity);
            newCount = Object.keys(messages).length;
            if (newCount > currentCount)
                return messages[newCount - 1];
            this.sleep(5000);
        }
        assert.fail('New messages not founded for ' + this.createRequestUrlPhone(identity));
    }

    /**
     * Метод для получения адреса почты
     */
    getEmail() {
        return "notifytest.js" + Date.now() + "@inn.ru";
    }

    /**
     * Метод для получения регистрационной ссылки из письма
     * @param email
     * @returns {Promise.<TResult>|*}
     */
    getRegisterLink(email) {
        let client = this.helpers['WebDriverIO'].browser;
        return client.url('http://notify.qa.inn.ru/maildata/' + email + '.htm').waitUntil(function() {
            return client.refresh().isExisting('#regLink');
        }, 120000, "email timeout").then(function() {
            return client.getAttribute('#regLink', 'href').then(function(attr) {
                return codeceptConfig.helpers.WebDriverIO.url + attr.substr(attr.lastIndexOf(".com") + 4);
            });
        });
    }

    /**
     * Метод для получения регистрационной ссылки из письма в тихую
     * @param email
     * @returns {Promise.<TResult>|*}
     */
    silentlyGetRegistrationLink(email) {
        var mail = this.helpers['EmailHelper'].getNewMessage(email, 0);
        return codeceptConfig.helpers.WebDriverIO.url + "/welcome/?email=" + mail.template_data.contact_address_to + "&confirmCode=" + mail.template_data.confirmCode + "&service_id=" + mail.template_data.service_id + "&related_game=&partner_id=" + mail.template_data.partner_id + "&referrer=" + mail.template_data.referrer
    }

    /**
     * Метод для получения регистрационной ссылки из письма в тихую
     * @param email
     * @returns {Promise.<TResult>|*}
     */
    silentlyGetSetContactLink(email) {
        var mail = this.helpers['EmailHelper'].getNewMessage(email, 0);
        return codeceptConfig.helpers.WebDriverIO.url + "/set-contact/?contactType=" + mail.template_data.contactType + "&contactAction=" + mail.template_data.contactAction + "&contactThrough=" + mail.template_data.contact_address_to + "&confirmCode=" + mail.template_data.confirmCode + "&redirectTo="
    }

    /**
     * Метод для получения регистрационной ссылки из письма в тихую
     * @param email
     * @returns {Promise.<TResult>|*}
     */
    silentlyGetConfirmContactLink(email) {
        var mail = this.helpers['EmailHelper'].getNewMessage(email, 3);
        //TODO: в json приходит "contactAction":"2", хотя должен быть 1
        return codeceptConfig.helpers.WebDriverIO.url + "/set-contact/?contactType=" + mail.template_data.contactType + "&contactAction=1" + "&link=" + mail.template_data.link + "&contactThrough=" + mail.template_data.identityContact + "&confirmCode=" + mail.template_data.confirmCode + "&verificationCode=" + mail.template_data.verificationCode + "&redirectTo="
    }

    /**
     * Метод для получения кода подтверждения по телефону
     * @param phone, currentCount
     * @returns {Promise.<TResult>|*}
     */
    silentlyGetMobileConfirmCode(phone, currentCount) {
        var mail = this.helpers['EmailHelper'].getNewSms(phone, currentCount);
        //TODO: в json приходит "contactAction":"2", хотя должен быть 1
        return mail.template_data.confirmCode;
    }

}

module.exports = Email;
