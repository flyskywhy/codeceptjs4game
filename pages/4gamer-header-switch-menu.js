/**
 * Элементы и методы для работы с навигационным меню вверху страницы
 */
'use strict';

let I;

module.exports = {

    init() {
        I = require('../steps_file.js')();
    },

    /**
     * Навигационное меню
     * @allMenu - все меню (4 кнопки)
     * @indexLink - Главная
     * @newsLink - Новости
     * @articlesLink - Статьи
     * @videoLink - Видео
     */
    allMenu: '.section_switch',
    indexLink: '.section_switch-link[href="/4gamer/"]',
    newsLink: '.section_switch-link[href="/4gamer/news/"]',
    articlesLink: '.section_switch-link[href="/4gamer/articles/"]',
    videoLink: '.section_switch-link[href="/4gamer/video/"]'
}