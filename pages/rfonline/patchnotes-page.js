'use strict';
/**
 * Элементы и методы для работы со страницей servermerge - RF Online — сайт сообщества.
 */

let I;

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    /**
     * Элементы основной страницы servermerge
     */
    url: "/rf/play/servermerge/",
    title: "RF Online — сайт сообщества",
    titles: [
        "Слияние миров",
        "Новый мир Месса",
        "Другие изменения",
        "Обзор изменений"
    ],
    planets: {
        "planet_3": [
            "Дейвул",
            "Асу + Новус",
            "Дата слияния: 24 ноября 2015",
            "Говорят, в давно забытые альянсы Новуса и Асу вернулись сотни героев. Не упусти шанс стать участником исторических событий!"
        ],
        "planet_1": [
            "Хаст",
            "Бекар + Катан + Азурия",
            "Дата слияния: 24 ноября 2015",
            "Патриархи Бекара, Катана и Азурия планируют захватить новый мир. Выбери на чьей ты стороне!"
        ],
        "planet_2": [
            "Аур",
            "Сидон + Фалгон",
            "Дата слияния: 17 ноября 2015",
            "Герои Сидона и Фалгона уже готовы к напряженным схваткам друг с другом. Реши, за кого ты хочешь воевать!"
        ],
        "planet_4": [
            "Агат",
            "Триан + Аномия",
            "Дата слияния: 03 ноября 2015",
            "Смогут ли представители рас Триана и Аномия договориться, чтобы привести свою расу к могуществу на новом сервере? Твое слово — решающее!"
        ],
        "planet_5": [
            "Месса",
            "Новый мир",
            "Дата создания: 22 декабря 2015",
            "Сюда еще не ступала нога народа Беллато, Кора или Аккретии. Совсем скоро и эта планета окажется под властью одной из трех рас. Может быть твоей?"
        ]
    },
    offsets: {
        "planet_1": 100,
        "planet_2": 100,
        "planet_3": 100,
        "planet_4": 100,
        "planet_5": 50
    },


    exclude: [
        ".footer-4game__social-section",    // соцсети в футере
        ".bGamePanelCommon",                // геймпанель
        ".userbar-tray",                    // юзербар
    ]
}