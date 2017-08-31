'use strict';

let Helper = codecept_helper;
let assert = require('assert');
//вот тут опасная загрузка либы, надо подумать как это сделать лучше
let stringIncludes = require('../node_modules/codeceptjs/lib/assert/include').includes;

var codeceptConfig = require('../codecept.conf').config;
var browser;

class WebdriverIOExtra extends Helper {

    _failed(test) {
        return;
    }

    /* Возвращает значение видимости элемента */
    grabElementVisibleStatus(locator) {
        let client = this.helpers['WebDriverIO'].browser;
        return client.isVisible(locator);
    }

    /*
     Метод для смены вкладки в браузере
     num - номер вкладки
     */
    changeTab(num) {
        //получаем информацию о webdriver
        let client = this.helpers['WebDriverIO'].browser;
        return client
            .getTabIds(function(err, handles) {
                this.switchTab(handles[num - 1]);
                return;
            })
    }

    /*
    метод прокручивает страницу до самого низа
    */
    scrollToBotton() {
        this.executeScript('window.scrollTo(0, Math.max($(document).height(), $(window).height()) )');
    }

    /*
     Метод для ожидания открытия вкладок
     ammountOfTabs - количество вкладок, которое должно быть после проверки
     timeout - сколько времени ждем в секундах
     */
    waitTabsLoading(ammountOfTabs, timeout) {
        //получаем информацию о webdriver
        let client = this.helpers['WebDriverIO'].browser;
        return client
            .waitUntil(function() {
                return this.getTabIds().then(function(handles) {
                    return handles.length === ammountOfTabs
                });
            }, timeout * 1000);
    }

    /*
     Метод для закрытия лишних вкладок
     Закрывает текущую вкладку и возвращает на первую
     */
    closeTab() {
        //получаем информацию о webdriver
        let client = this.helpers['WebDriverIO'].browser;
        return client.close();
    }

    /*
     Закрывает все вкладки, кроме одной
     */
    closeTabsExceptForOne() {
        let client = this.helpers['WebDriverIO'].browser;
        return client
            .waitUntil(function() {
                return this.getTabIds().then(function(handles) {
                    for (var i = 1; i < handles.length; i++) {
                        this.close(handles[i]);
                    }
                    return this.switchTab();
                });
            }, 30000);
    }

    /*
     Метод для проверки тега description
     Из-за специфики FF проверяем, является ли открытый браузер FF и по разному проверяем
     text - текст, который должен быть в description
     */
    checkPageDescription(text) {
        //получаем информацию о webdriver
        let client = this.helpers['WebDriverIO'].browser;
        var browser = client.desiredCapabilities.browserName;
        return client.getSource().then((source) => {
            if (browser == 'firefox') {
                return stringIncludes('HTML source of a page').assert('<meta content="' + text + '" name="description"', source);
            } else {
                return stringIncludes('HTML source of a page').assert('meta name="description" content="' + text + '"', source);
            }
        });
    }

    /*
     Метод для сверки URL предварительно декодировав url
     expected - url, который ожидается (без кракозябр)
     */
    decodeUrlAndCompare(expected) {
        let client = this.helpers['WebDriverIO'].browser;
        return client.getUrl().then((url) => {
            return assert.equal(decodeURIComponent(decodeURIComponent(url.replace(/\+/g, " "))).replace(/\+/g, " "), expected.replace(/\+/g, " "));
        });
    }

    /*
     Метод для клика на кнопку копирования сделанную с ClipBoard.JS
     т.к. в PhantomJS полной поддержки execCommand нет, то приходится изворачиваться
     locator - локатор кнопки
     timeout - сколько времени ждем текста на кнопке
     text - текст на кнопке после нажатия
     */
    clickClipboardButton(locator, timeout, text) {
        let client = this.helpers['WebDriverIO'].browser;
        var browser = client.desiredCapabilities.browserName;
        if (browser != 'phantomjs') {
            this.helpers['WebDriverIO'].click(locator);
            return this.helpers['WebDriverIO'].waitForText(text, timeout, locator);
        } else {
            this.helpers['WebDriverIO'].click(locator);
            return this.helpers['WebDriverIO'].pressKey(['Control', 'c']);
        }
    }

    /* Метод для имитации клика левой кнопкой мышки по локатору
    (нужен для того, чтобы кликать в некликабельные, по мнению вебдрайвера, элементы)
    */
    mouseLeftClick(locator) {
        let client = this.helpers['WebDriverIO'].browser;
        client.leftClick(locator);
    }

    /**
     * Метод для сравнения текста
     * @param actual - полученное значение
     * @param expected - ожидаемое значение
     */
    textShouldBeSameAs(actual, expected) {
        assert.equal(actual, expected);
    }

    /**
     * Обновление текущей страницы
     */
    refreshPage() {
        let client = this.helpers['WebDriverIO'].browser;
        return client.refresh();
    }

    /*
     Метод для проверки какого-либо CSS стиля элемента
     selector - селектор элемента
     cssProperty - какой стиль хотим проверить
     value - какое значение должно быть у стиля
     */
    validateCssStyle(selector, cssProperty, value) {
        let client = this.helpers['WebDriverIO'].browser;
        return client.getCssProperty(selector, cssProperty).then((res) => {
            return assert.equal(res.value, value);
        });
    }

    /*
     Метод для ожидания в url какого-то значения
     urlPart - часть урла, которую проверяем
     timeout - время ожидания, когда в урле появится то, что нам надо
     */
    waitInUrl(urlPart, timeout) {
        //получаем информацию о webdriver
        let client = this.helpers['WebDriverIO'].browser;
        let currUrl;
        return client
            .waitUntil(function() {
                return this.url().then(function(res) {
                    currUrl = res.value;
                    return (decodeURIComponent(decodeURIComponent(decodeURIComponent(res.value.replace(/\+/g, " "))).replace(/\+/g, " "))).indexOf(urlPart.replace(/\+/g, " ")) > -1;
                });
            }, timeout * 1000);
    }

    /*
    Метод для проверки количества элементов по селектору
    */
    validateCountOfElements(selector, expected) {
        let client = this.helpers['WebDriverIO'].browser;
        return client.elements(selector, function(err, res) {
            return assert.equal(res.value.length, expected, 'Incorrect elements count');
        });
    }

    getElement(selector) {
        let client = this.helpers['WebDriverIO'].browser;
        return client.element(selector);
    }

    getAttribute(selector, attr) {
        let client = this.helpers['WebDriverIO'].browser;
        return this.getElement(selector).then((element) => {
            return client.elementIdAttribute(element.value.ELEMENT, attr);
        });
    }

    checkAttributeValue(selector, attr, value) {
        let client = this.helpers['WebDriverIO'].browser;
        return this.getAttribute(selector, attr).then((result) => {
            assert.equal(result['value'], value);
        }).catch((e) => {
            throw e;
        })
    }

    /**
     * Метод для переключения в iframe по порядковому номеру на странице
     * @number - порядковый номер фрейма на странице
     */
    switchToIframeByNumber(number) {
        let client = this.helpers['WebDriverIO'].browser;
        client.element()
        return client.frame(number);
    }
}

module.exports = WebdriverIOExtra;
