'use strict';

const assert = require('assert');
const request = require('sync-request');
const querystring = require('querystring');

class ForGame extends Helper {

    _failed(test) {
        return;
    }

    seeSelected(element) {
        let client = this.helpers['WebDriverIO'].browser;

        if (typeof(element.css) !== 'undefined') {
            element = element.css;
        };

        return client.isSelected(element)
            .then((selected) => {
                if (!selected) {
                    throw new Error('Element "' + element + '" is not selected');
                }
            })
            .catch((e) => {
                throw e;
            });
    }

    /**
     * Метод для получения нового логина
     */
    grabNewLogin() {
        return "new" + Date.now().toString().substring(3, 10);
    }

    /**
     * Метод для получения нового пароля
     */
    grabNewPassword() {
        return Date.now().toString().substring(3, 10);
    }

    /**
     * Метод для получения нового телефона
     */
    grabRandomMobileNumber() {
        var mobileNumber = '+1' + Math.random().toString(10).substring(3, 12);
        return mobileNumber;
    }

    /* добавляет пользователю рандомный номер телефона */
    addRandomMobileNumber(userId) {
        var mobileNumber = this.grabRandomMobileNumber();
        this.helpers['TestApi'].addMobileNumber(userId, mobileNumber);
        return mobileNumber;
    }

    /* добавляет пользователю номер телефона */
    addMobileNumber(userId, mobileNumber) {
        return this.helpers['TestApi'].addMobileNumber(userId, mobileNumber);
    }

    /* добавляет рублей на аккаунт*/
    addRubles(userId, amount) {
        return this.helpers['TestApi'].addPayment(userId, amount, "243", "rub");
    }

    /* добавляет ваучеры по промо,
    если нужен ваучер без привязки, передаем userId = '0'
    возвращает массив ваучеров
    */
    addVouchersByPromo(userId, promoId, count) {
        let result = JSON.parse(this.helpers['TestApi'].addVoucher(userId, promoId, '', count));
        console.log("Result of addVouchersByPromo: " + result.vouchers);
        return result.vouchers;
    }

    /* добавляет ваучеры по эмиссии (использовать когда эмиссия есть, но промо для нее нет),
    если нужен ваучер без привязки, передаем userId = '0'
    возвращает массив ваучеров
    */
    addVouchersByEmission(userId, billingEmissionId, count) {
        let result = JSON.parse(this.helpers['TestApi'].addVoucher(userId, '', billingEmissionId, count));
        console.log("Result of addVouchersByEmission: " + result.vouchers);
        return result.vouchers;
    }

    /* добавляет 1 ваучер по промо,
    если нужен ваучер без привязки, передаем userId = '0' */
    addVoucherByPromo(userId, promoId) {
        let count = 1;
        let result = JSON.parse(this.helpers['TestApi'].addVoucher(userId, promoId, '', count));
        console.log("Result of addVoucherByPromo: " + result.vouchers);
        return result.vouchers[0];
    }

    /* добавляет 1 ваучер по эмиссии (использовать когда эмиссия есть, но промо для нее нет),
    если нужен ваучер без привязки, передаем userId = '0' */
    addVoucherByEmission(userId, billingEmissionId) {
        let count = 1;
        let result = JSON.parse(this.helpers['TestApi'].addVoucher(userId, '', billingEmissionId, count));
        console.log("Result of addVoucherByEmission: " + result.vouchers);
        return result.vouchers[0];
    }

    acceptAgreementsForNewUser(userId) {
        this.helpers['TestApi'].acceptLicense(userId, '0', '177');
        this.helpers['TestApi'].acceptLicense(userId, '0', '178');
    }

    /* принимает 2 соглашения для конерктной игры */
    /* game - это игра, которая описана в конфиге games.json, который лежит в корне проекта в папке data */
    acceptLicenceAgreementsForGame(userId, game) {
        this.helpers['TestApi'].acceptLicense(userId, game.serviceId, game.licence1);
        this.helpers['TestApi'].acceptLicense(userId, game.serviceId, game.licence2);
    }

    acceptAionAgreements(userId) {
        this.helpers['TestApi'].acceptLicense(userId, '9', '172');
        this.helpers['TestApi'].acceptLicense(userId, '9', '56');
    }

    /* создать персонажа в игре с рандомным ником */
    createCharacterWithRandomNickname(userId, serviceId) {
        let nickname = Math.random().toString(36).substring(7);
        return this.helpers['TestApi'].createCharacter(userId, serviceId, nickname);
        return nickname;
    }

    /* создать пользователя с четным ID */
    createUserWithEvenId() {
        var user = this.helpers['TestApi'].createUser();
        while (user.id % 2 != 0) {
            user = this.helpers['TestApi'].createUser();
        }
        return user;
    }

    /* создать пользователя с нечетным ID */
    createUserWithOddId() {
        var user = this.helpers['TestApi'].createUser();
        while (user.id % 2 != 1) {
            user = this.helpers['TestApi'].createUser();
        }
        return user;
    }

    setBalanceForUser(userId, balance) {
        this.helpers['TestApi'].setBalance(userId, balance, 0);
    }

    /* начисляет пользователю замороженные бонусы  */
    addFrozenBonuses(user, amount) {
        let product = 'frozen-bonuses-product';
        let token = this.getAccessToken(user.email, user.password);
        let prod = request('GET',
            'https://api2.4gametest.com/users/' + user.id + '/apps/4game/products/' + product, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            });
        let prodObject = JSON.parse(prod.body.toString());
        let prices = prodObject.offer.prices[0];
        let billingId = prices.extra.billingProductId;
        let price = prices.price;
        let order = request('POST',
            'https://api2.4gametest.com/users/' + user.id + '/orders', {
                json: {
                    orderedProducts: [{
                        appId: "4game",
                        productId: product,
                        quantity: amount,
                        price: 0,
                        currency: "RUB"
                    }]
                },
                headers: {
                    'Authorization': 'bearer ' + token
                }
            });
        let orderId = JSON.parse(order.body.toString()).orderId;
        let purchase = request('PUT',
            'https://api2.4gametest.com/users/' + user.id + '/orders/' + orderId + '/purchases/1', {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            });
    }

    getAccessToken(login, password) {
        let client = this.helpers['WebDriverIO'].browser;
        let res = request('POST',
            'https://api2.4gametest.com/tokens', {
                json: {
                    "expiration": "long"
                },
                headers: {
                    'Authorization': 'basic ' + new Buffer(login + ':' + password).toString('base64')
                }
            });
        let token = JSON.parse(res.getBody()).accessToken

        return token;
    }

    setLoginCookieFor(login, password) {
        let client = this.helpers['WebDriverIO'].browser;
        let token = this.getAccessToken(login, password);

        return client.setCookie({
                name: 'inn-user',
                value: token,
                domain: '.4gametest.com',
                'secure': true,
                path: '/'
            })
            .then()
            .catch((e) => {
                throw e;
            });
    }

    /* включает кредит и назначает кредитный лимит */
    turnOnCredit(userId, limit) {
        this.helpers['TestApi'].setOverdraftLimit(userId, limit, "bool_true");
    }

    /* отключает кредит */
    turnOffCredit(userId, limit) {
        this.helpers['TestApi'].setOverdraftLimit(userId, limit, "bool_false");
    }

    buyGameUsingApi(product, user, discount) {
        if (typeof(discount) === 'undefined') {
            discount = false;
        }
        let token = this.getAccessToken(user.email, user.password);
        let prod = request('GET',
            'https://api2.4gametest.com/users/' + user.id + '/apps/31/products/' + product, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            });
        let prodObject = JSON.parse(prod.body.toString());
        let prices;
        if (discount) {
            prices = prodObject.offer.prices[1];
        } else {
            prices = prodObject.offer.prices[0];
        }
        let billingId = prices.extra.billingProductId;
        let price = prices.price;
        let order = request('POST',
            'https://api2.4gametest.com/users/' + user.id + '/orders', {
                json: {
                    products: [billingId],
                    price: price,
                    params: "{\"customOrderId\":" + new Date().getTime() + "}"
                },
                headers: {
                    'Authorization': 'bearer ' + token
                }
            });
        let orderId = JSON.parse(order.body.toString()).orderId;
        let purchase = request('POST',
            'https://api2.4gametest.com/users/' + user.id + '/orders/' + orderId + '/purchases', {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            });
        return orderId;
    }

    deleteFbAccount(socialId) {
        var json = JSON.parse(this.helpers['TestApi'].getContactStatus(socialId, '4')).user_id;
        if ("user_id" in json) {
            return this.helpers['TestApi'].deleteSocialAccount(json.user_id, '4');
        }
    }

    deleteVkAccount(socialId) {
        var json = JSON.parse(this.helpers['TestApi'].getContactStatus(socialId, '5')).user_id;
        if ("user_id" in json) {
            this.helpers['TestApi'].deleteEmail(json.user_id);
            this.helpers['TestApi'].deleteSocialAccount(json.user_id, '5');
        }
    }

    deleteOkAccount(socialId) {
        var json = JSON.parse(this.helpers['TestApi'].getContactStatus(socialId, '14')).user_id;
        if ("user_id" in json) {
            return this.helpers['TestApi'].deleteSocialAccount(json.user_id, '14');
        }
    }

    deleteYaAccount(socialId) {
        var json = JSON.parse(this.helpers['TestApi'].getContactStatus(socialId, '17')).user_id;
        if ("user_id" in json) {
            this.helpers['TestApi'].deleteEmail(json.user_id);
            this.helpers['TestApi'].deleteSocialAccount(json.user_id, '17');
        }
    }

    /* удаления привязки соцсети к любому аккаунту,
    используется SocialId аккаунта в соц.сети
    */
    deleteSocialAccountIfExists(socialId, socialType) {
        var status = JSON.parse(this.helpers['TestApi'].getContactStatus(socialId, socialType));
        if ("user_id" in status) {
            return this.helpers['TestApi'].deleteContact(status.user_id, socialType);
        } else {
            return
        }
    }

    /*
    Добавление в notifications информации о том, что надо показать попап
    userId - id юзера
    popupId - id попапа
    tags - тэги страниц, на которых показывать попап
    подробнее тут https://wiki.inn.ru/pages/viewpage.action?pageId=47420918
    */
    addPopupNotification(userId, popupId, tags) {
        this.helpers['TestApi'].insertRevault(userId, "notifications", 1, {
            popupId: {
                "type": "popup-notification",
                "name": popupId,
                "id": popupId,
                "tags": tags,
                "data": []
            }
        }, null);
    }

    // Удаляет страну в профиле пользователя
    setEmptyCountryForUser(userId) {
        this.helpers['TestApi'].setCountry(userId, 0);
    }

    // Устанавливает значение премиума для пользователя - закончился
    setEndedPremiumForAion(userId) {
        let serviceAcc = this.helpers['TestApi'].createServiceAccount(userId, '9');
        this.helpers['TestApi'].setSubscriptionDate(serviceAcc, Date.now());
    }
}

module.exports = ForGame;
