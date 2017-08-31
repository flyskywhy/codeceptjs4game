'use strict';

const assert = require('assert');
const request = require('sync-request');
const querystring = require('querystring');

var config = {
    testapi: {
        'address': 'http://testapi-q.qa.inn.ru:8088/operation=',
        'environment': 'ru_qa'
    },
    user: {
        'loginPrefix': 'qa',
        'email': '@test.inn.ru',
        'defaultPassword': '123456'
    }
};

class TestApi extends Helper {


    _failed(test) {
        return;
    }

    execute(operation, args) {
        let testApiRequest = config.testapi.address + operation + '&environment=' + config.testapi.environment;
        for (var i = 0; i < args.length; i++) {
            if (args[i] == null || args[i] == "null") {
                testApiRequest += '&' + 'argument' + i + '=';
            } else {
                testApiRequest += '&' + 'argument' + i + '=' + args[i];
            }
        }
        let result = JSON.parse(request('GET', testApiRequest).body.toString());
        assert.equal(result.status, '0', 'Error on <' + operation + '>: ' + result.result_text + ' ' + result.log);
        return result.result;
    }

    /* создать юзера */
    createUser(login) {
        if (login == null) {
            login = '';
        }
        var email = config.user.loginPrefix + Math.random().toString(8).substring(2, 10) + config.user.email;
        var password = config.user.defaultPassword;
        var id = this.execute("registerUser", new Array(email, login, password));

        return {
            'id': id,
            'login': login,
            'email': email,
            'password': password
        };
    }

    /* добавить мобильный номер в формате +1ddddddddd */
    addMobileNumber(userId, mobileNumber) {
        return this.execute("addContact", new Array(userId, mobileNumber, '3'));
    }

    /* добавить платеж */
    addPayment(userId, amount, paymentSystem, currency) {
        return this.execute("addPayment", new Array(userId, paymentSystem, currency, amount));
    }

    /* добавить ваучер  */
    addVoucher(userId, promoId, billingEmissionId, count) {
        return this.execute("addVoucher", new Array(userId, promoId, billingEmissionId, count));
    }

    /* принять лицензию */
    acceptLicense(userId, serviceId, licenceId) {
        return this.execute("acceptLicense", new Array(userId, serviceId, licenceId, Date.now()));
    }

    /* создать персонажа в игре */
    createCharacter(userId, serviceId, characterName) {
        return this.execute("createCharacter", new Array(userId, serviceId, characterName));
    }

    /* создать сервис аккаунт */
    createServiceAccount(userId, serviceId) {
        var accountName = config.user.loginPrefix + serviceId + "-" + Math.random().toString(5).substring(2, 10);
        var serviceAccountId = this.execute("createServiceAccount", new Array(userId, accountName, serviceId));
        return serviceAccountId;
    }

    /* удалить все ачивки из кассандры */
    deleteAchievements(userId, serviceId, licenceId) {
        return this.execute("deleteAchievements", new Array(userId));
    }

    /**
     * Метод получения информации об аккаунте социальной сети
     * @param userId
     * @returns {*}
     */
    getContactStatus(socialId, social) {
        return this.execute("getContactStatus", new Array(socialId, social));
    }

    /**
     * Метод для удаления привязки социальной сети к аккаунту
     * @param userId
     * @param social (fb=4, vk=5, ok=14, ya=17)
     * @returns {*}
     */
    deleteSocialAccount(userId, social) {
        return this.execute("deleteContact", new Array(userId, social));
    }

    /* удалить мобильный номер */
    deleteMobileNumber(userId) {
        return this.execute("deleteContact", new Array(userId, '3'));
    }

    /* удалить email */
    deleteEmail(userId) {
        return this.execute("deleteContact", new Array(userId, '1'));
    }

    /* добавить ачивку в кассандру */
    insertAchievement(userId, achievementType, unlocked, level, progress, maxProgress, rewards, context, version, counters) {
        context = context || "{}";
        counters = counters || "[]";
        progress = progress || "0";
        maxProgress = maxProgress || "1";
        rewards = rewards || "[]";
        version = version || "0.0";
        return this.execute("insertAchievement", new Array(userId,
            achievementType,
            unlocked,
            level,
            progress,
            maxProgress,
            rewards,
            version,
            context,
            counters));
    }

    /* добавить запись в револт */
    insertRevault(userId, dataKey, accessLevel, dataMap, dataValue, modifiedAt) {
        return this.execute("insertRevault", new Array(userId,
            dataKey, accessLevel,
            JSON.stringify(dataMap),
            JSON.stringify(dataValue),
            typeof modifiedAt !== 'undefined' ? modifiedAt : Date.now()));
    }

    /* Баннит аккаунт в конкретном сервисе
    banPeriod - срок на который надо забанить в секундах
    */
    banUser(userId, serviceId, banPeriod) {
        return this.execute("banUser", new Array(userId, serviceId, banPeriod, "bool_true", "24148776"));
    }

    unbanUser(userId, serviceId) {
        return this.execute("unbanUser", new Array(userId, serviceId, "bool_true", "24148776"));
    }

    /* получить значение сервис аккаунта */
    getServiceAccountId(userId, serviceId) {
        return this.execute("getServiceAccountId", new Array(userId, serviceId));
    }

    /* отклонить лицензию */
    rejectLicense(userId, serviceId, licenceId) {
        return this.execute("rejectLicense", new Array(userId, serviceId, licenceId));
    }

    /* пробросить событие входа в игру (days - количество дней от текущей даты, можно в минус) */
    sendGameLogin(userId, gameId, days) {
        return this.execute("sendGameLogin", new Array(userId, gameId, days));
    }

    /* пробросить сообщение в Кафку */
    sendEventToKafka(topic, userId, message) {
        return this.execute("generateAchieveMessage", new Array(topic, userId, JSON.stringify(message)));
    }

    /* установить баланс  -- в данный момент работает как добавление к текущему балансу и бонусам */
    setBalance(userId, balance, bonus) {
        return this.execute("setBalance", new Array(userId, balance, bonus));
    }

    /* указать страну пользователя */
    setCountry(userId, countryId) {
        return this.execute("setCountry", new Array(userId, countryId));
    }

    /* включает или выключает кредит для пользователя и устанавливает лимит */
    setOverdraftLimit(userId, overdraftLimit, overdraftState) {
        return this.execute("setOverdraftLimit", new Array(userId, overdraftLimit, overdraftState));
    }

    /* установить дату завершения подписки */
    /* пример: http://testapi-q.qa.inn.ru:8088//operation=setSubscriptionDate&environment=ru_qa&argument0=119323052&argument1=1474819858357 */
    setSubscriptionDate(serviceAccountId, lifeTimeDateFinish) {
        return this.execute("setSubscriptionDate", new Array(serviceAccountId, lifeTimeDateFinish));
    }

    /* включить супербезопасность */
    setSuperSecurityON(userId) {
        return this.execute("setSuperSecurityFlag", new Array(userId, 'bool_true'));
    }

    /* выключить супербезопасность */
    setSuperSecurityOFF(userId) {
        return this.execute("setSuperSecurityFlag", new Array(userId, 'bool_false'));
    }

    getContactStatus(contact, contactType) {
        return this.execute("getContactStatus", new Array(contact, contactType));
    }

    /* удалить мобильный номер */
    deleteContact(userId, socialType) {
        return this.execute("deleteContact", new Array(userId, socialType));
    }
}

module.exports = TestApi;
