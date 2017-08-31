'use strict';

let I;

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    timeout: 30,

    notFound: {
        url: "/404",
        header: {
            locator: ".b404__header",
            text: "Ошибка 404"
        },
        description: {
            locator: ".b404__text",
            text: "Такой страницы у нас нет, а может, никогда\nи не было. Проверь адрес или начни с главной."
        },
        link: ".b404 a:link"
    },

    overload: {
        url: "/504.html",
        header: {
            locator: ".b504__header",
            text: "Фогейм перегружен"
        },
        description: {
            locator: ".b504__text",
            text: "Следующая попытка входа не позднее чем через"
        },
        timer: "//strong",
        twitter: "//iframe",
        twitterIframe: "twitter-widget-0",
        twitterHeader: {
            locator: "//h1",
            text: "Твиты от @4game_ru"
        },
        exclude: ["//strong", "//iframe"]
    },

    phpException: {
        url: "/licence/view/serviceId/1099/type/2/",
        header: {
            locator: ".bError__header",
            text: "Дорогой друг!"
        },
        description: {
            locator: ".bError__text",
            text: "Прости нас, пожалуйста, но на сайте произошла\nкакая-то ошибка. Мы уже в курсе и работаем над ней."
        },
        hide: [".bError__backtrace", ".bError__backtrace-file"]
    }

}
