/**
 * Элементы и методы для работы с страницами: Главная, Новости, Статьи и Видео
 */
'use strict';

let I;

module.exports = {

    init() {
        I = require('../steps_file.js')();
    },

    /**
     * Главная страница
     * @title - заголовок
     * @url - урл
     * @pageSelector - локатор главной страницы
     * @headerNews элемент новостей вверху страницы
     * @headerFirstNews - первая новость в хедере
     * @headerMiddleNews - средняя новость в хедере
     * @headerLastNews - последняя новость в хедере
     * @ourVideoLink
     * @firstOurVideoNews
     * @secondOurVideoNews
     * @allOurVideoLink
     * @footer - футер
     * @siteHeaderLink - ссылка О нас
     */
    index: {
        title: 'Фогеймер — об играх без воды и рекламы',
        url: '/4gamer',
        pageSelector: "[data-section='index']",
        headerNews: ".PromoSlider [data-type='news']",
        headerFirstNews: ".PromoSlider [data-type='news']:nth-child(1) .default_tile-link",
        headerMiddleNews: ".PromoSlider [data-type='news']:nth-child(2) .default_tile-link",
        headerLastNews: ".PromoSlider [data-type='news']:nth-child(3) .default_tile-link",
        ourVideoLink: ".IndexContent__videosContainer [href='our-video/']",
        firstOurVideoNews: ".news_grid--video_block:nth-child(1) [data-section='video']:nth-child(1) .default_tile-link",
        secondOurVideoNews: ".news_grid--video_block:nth-child(1) [data-section='video']:nth-child(2) .default_tile-link",
        allOurVideoLink: ".news_grid--video_block:nth-child(1) [data-section='video']:nth-child(2) .default_tile-title_link a",
        footer: '//*[@id="content"]//article[59]',
        siteHeaderLink: '.SiteHeader__right [href="about"]'
    },

    /**
     * Мобильная главная страница
     * @headerFirstNews - первая новость в хедере
     * @headerMiddleNews - средняя новость в хедере
     * @headerLastNews - последняя новость в хедере
     * @menuButton - кнопка меню хедера
     */
    indexMobile: {
        headerFirstNews: ".PromoSlider [data-type='news']:nth-child(1) .default_tile-link",
        headerMiddleNews: ".PromoSlider [data-type='news']:nth-child(3) .default_tile-link",
        headerLastNews: ".PromoSlider [data-type='news']:nth-child(5) .default_tile-link",
        menuButton: "[class='SiteHeader__burgerMenu']"
    },

    /**
     * Страницa новостей
     * @pageSelector - локатор страницы новостей
     * @content -список статей
     * @gridTitle - плитка новости
     * @footer - футер
     * @firstNewsLocator - первая новость на странице
     * @firstNewsCounter - счетчик первой новости на странице
     */
    news: {
        title: 'Фогеймер — об играх без воды и рекламы',
        url: '/news',
        pageSelector: "[data-section='news']",
        content: ".NewsGrid__content",
        gridTitle: ".GridTile",
        footer: '.IndexContent article:nth-child(51)',
        firstNewsLocator: '//*[@id="content"]//article/article[1]/div/div[1]',
        firstNewsCounter: "//*[@id='content']//article/article[1]/div/div[1]//*[@class='w_views js-HitCount-count']"
    },


    /**
     * Страницa статей
     * @pageSelector - локатор страницы
     * @firstArticleSelector - локатор первой статьи на странице
     * @firstArticleTag - тег первой статьи
     * @firstArticleText - текст первой статьи
     * @firstArticleViewCount - счетчик просотров первой статьи
     * @footer - футер
     * @firstArticlesLocator - первая статья на странице
     * @firstArticlesCounter - счетчик первой статьи на странице
     */
    articles: {
        title: 'Фогеймер — об играх без воды и рекламы',
        url: '/articles',
        pageSelector: "[data-section='articles']",
        firstArticleSelector: ".IndexContent [data-type='news']:nth-child(1) .default_tile-link",
        firstArticleTag: ".IndexContent [data-type='news']:nth-child(1) .default_tile-tag",
        firstArticleText: ".IndexContent [data-type='news']:nth-child(1) .default_tile-title_text",
        firstArticleViewCount: ".IndexContent [data-type='news']:nth-child(1) .js-HitCount-count",
        footer: '//*[@id="content"]//div[160]//article'
    },

    /**
     * Страница видео
     * @pageSelector
     * @firstVideoSelector
     * @firstVideoTag
     * @firstVideoText
     * @firstVideoCount
     * @footer - футер
     * @firstVideoLocator - первое видео на странице
     * @firstVideoCounter - счетчик первого видео на странице
     */
    video: {
        title: 'Фогеймер — об играх без воды и рекламы',
        url: '/video',
        pageSelector: "[data-section='video']",
        firstVideoSelector: ".IndexContent [data-type='news']:nth-child(1) .default_tile-link",
        firstVideoTag: ".IndexContent [data-type='news']:nth-child(1) .default_tile-tag",
        firstVideoText: ".IndexContent [data-type='news']:nth-child(1) .default_tile-title_text",
        firstVideoCount: ".IndexContent [data-type='news']:nth-child(1) .js-HitCount-count",
        footer: ".IndexContent article :nth-child(50)"
    },

    // весь контент
    allContentSelector: '.IndexContent__section',
    // виджет группы вконтакте
    vkWidget: '.NewsGrid__VKWidget',
    // внутренняя ссылка Фогейм игры
    forgameLink: '.SiteHeader__outerLink',
    // ссылка О нас
    siteHeaderLink: '.SiteHeader__right [href="about"]',
    // список статей
    content: ".NewsGrid__content",
    // плитка новости
    gridTitle: ".GridTile",
    // элемент на странице по тегу
    tagsContent: ".news_grid-content",
    // улр игр
    urlGame: "https://ru.4game.com/"

}