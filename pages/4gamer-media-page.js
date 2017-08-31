/**
 * Элементы и методы для работы со страницей статьи
 */
'use strict';

let I;

module.exports = {

    init() {
        I = require('../steps_file.js')();
    },

    /**
     * Элементы статьи about
     * @footer - элемент для скролла до футера (статья about), использовать, чтобы хедер не перекрывал футер
     */
    about: {
        title: 'О нас — Фогеймер',
        url: '/about',
        footer: 'article ul:nth-child(44) '
    },

    /**
     * Элементы статьи sborkaformatov
     * @footer - элемент для скролла до футера (статья sborkaformatov), использовать, чтобы хедер не перекрывал футер
     */
    sborkaformatov: {
        title: 'СБОРКА ФОРМАТОВ — Фогеймер',
        url: '/sborkaformatov',
        footer: '#content-article :nth-child(37) .Gallery__previews',
        quizOnPlaybase: "#content-article :nth-child(30)",
        quizPlayButton: "#content-article :nth-child(32) .Article__embedButton",
        quizFeedBody: ".Modal__contentWrapper"
    },

    /**
     * Элементы статьи testBlokov
     * @footer - элемент для скролла до футера (статья test-novyh-blokov-formatirovanija), использовать, чтобы хедер не перекрывал футер
     */
    testBlokov: {
        title: 'Тест новых блоков форматирования — Фогеймер',
        url: '/test-novyh-blokov-formatirovanija',
        footer: '//*[@id="content-article"]/article//p[37]'
    },

    /**
     * Элементы статьи testFoto
     * @link - ссылка  В прошлый раз
     * @ExternalLink - ссылка Джессика Нигри
     */
    testFoto: {
        title: 'ТЕСТОВАЯ ФОТОСТОРИ — Фогеймер',
        url: '/testfoto',
        footer: '#content-article .Gallery__item--active .Gallery__copyright',
        link: "//*[@id='content-article']//div//div//div[1]/div[2]//a",
        externalLink: "[href='https://ru.wikipedia.org/wiki/%D0%9D%D0%B8%D0%B3%D1%80%D0%B8,_%D0%94%D0%B6%D0%B5%D1%81%D1%81%D0%B8%D0%BA%D0%B0']"
    },

    /**
     * Блок ссылок - Выбор редакции
     */
    popularFooter: '.articles_rotator-list',
    popularFooterNews: '.articles_rotator-list [data-type="news"]',
    firstNews: "//*[@class='articles_rotator-list']/div[1]",
    secondNews: "//*[@class='articles_rotator-list']/div[2]",
    thirdNews: "//*[@class='articles_rotator-list']/div[3]",
    lastNews: "//*[@class='articles_rotator-list']/div[4]",
    firstNewsLink: "//*[@class='articles_rotator-list']/div[1]//*[@class='default_tile-link']",
    firstNewsContent: "//*[@class='articles_rotator-list']/div[1]//*[@class='default_tile-content']",
    secondNewsLink: "//*[@class='articles_rotator-list']/div[2]//*[@class='default_tile-link']",
    secondNewsContent: "//*[@class='articles_rotator-list']/div[2]//*[@class='default_tile-content']",
    thirdNewsLink: "//*[@class='articles_rotator-list']/div[3]//*[@class='default_tile-link']",
    lastNewsLink: "//*[@class='articles_rotator-list']/div[4]//*[@class='default_tile-link']",
    firstNewsTitle: "//*[@class='articles_rotator-list']/div[1]//*[@class='default_tile-title_text']",
    secondNewsTitle: "//*[@class='articles_rotator-list']/div[2]//*[@class='default_tile-title_text']",
    thirdNewsTitle: "//*[@class='articles_rotator-list']/div[3]//*[@class='default_tile-title_text']",
    lastNewsTitle: "//*[@class='articles_rotator-list']/div[4]//*[@class='default_tile-title_text']",

    /**
     * Общие элементы тестовых статей
     * @content - все содержимое страницы
     * @closeButton - кнопка закрыть
     * @previewArrow - стрелка назад
     * @nextArrow - стрелка вперед
     * @tagsSelector - все теги
     * @firstTagSelector - первый тег
     * @authorAvatar - аваторка автора
     * @authorName - имя автора
     * @header - обычный заголовок
     * @headerWithVideo - видеозаголовок
     * @headerPhotoStory - фотостори заголовок
     * @viewCountElement - элемент кол-ва просмотров статьи
     * @yandexLink - внешняя ссылка на яндекс
     * @wikiLink -  ссылка на вики
     * @indbLink -  ссылка на сайт
     * @blockquoteElement - элемент горизонтальной линии для статьи
     * @body - локатор любой страницы, для ожиданий загрузки внешних сайтов
     */
    content: '#content-article',
    closeButton: '.Article__headerCloseButton',
    previewArrow: '.ArticleNavigation__left',
    nextArrow: '.ArticleNavigation__right',
    tagsSelector: '.Article__tags a',
    firstTagSelector: '.Article__tags a:nth-child(1)',
    authorAvatar: '.w_author__avatar',
    authorName: '.w_author__name',
    header: '.Article__header',
    headerWithVideo: '.Article__header--withVideo',
    headerPhotoStory: '.Article__header--photostory',
    viewCountElement: '.Article__headerInfoBar .w_views',
    yandexLink: '[href="https://yandex.ru/"]',
    wikiLink: "[href='http://ru.masseffect.wikia.com/wiki/%D0%A8%D0%B5%D0%BF%D0%B0%D1%80%D0%B4']",
    indbLink: "[href='http://www.imdb.com/name/nm1035752/?ref_=nv_sr_1']",
    blockquoteElement: '//*[@id="content-article"]//blockquote[2]',
    body: 'body',
    titleText: ".Article__title > h1 > span",
    galleryTitle: "//*[@class = 'Article__content']//h1",

    /**
     * Элементы новой галереи
     * @galleryElement - элемент галереи (новой)
     * @galleryArrowPrev - стрелка назад для новой галереи
     * @galleryArrowNext - стрелка вперед для новой галереи
     * @activeSlide0 - Aктивный слайд в превью галлереи номер 1
     * @activeSlide1 - Aктивный слайд в превью галлереи номер 2
     * @activeSlide2 - Aктивный слайд в превью галлереи номер 3
     * @activeSlide3 - Aктивный слайд в превью галлереи номер 4
     * @activeSlide4 - Aктивный слайд в превью галлереи номер 5
     */
    galleryElement: '#content-article :nth-child(21) .Gallery__slider :nth-child(1) img',
    galleryArrowPrev: '#content-article :nth-child(21) .Gallery__stage .Gallery__control--prev',
    galleryArrowNext: '#content-article :nth-child(21) .Gallery__stage .Gallery__control--next',
    activeSlide0: '[data-index="0"][class="Gallery__preview Gallery__preview--active"]',
    activeSlide1: '[data-index="1"][class="Gallery__preview Gallery__preview--active"]',
    activeSlide2: '[data-index="2"][class="Gallery__preview Gallery__preview--active"]',
    activeSlide3: '[data-index="3"][class="Gallery__preview Gallery__preview--active"]',
    activeSlide4: '[data-index="4"][class="Gallery__preview Gallery__preview--active"]',

    /**
     *  блок ссылок в хедере
     */
    popularHeader: '[data-placeholder="pre-navigation"].ArticleTopNavigation',
    popularHeaderNews: '[data-placeholder="pre-navigation"].ArticleTopNavigation [data-type="news"]',
    popularHeaderCurrentNews: ".ArticleTopNavigation [data-type='news']:nth-child(11)",
    popularHeaderNextNews: ".ArticleTopNavigation [data-type='news']:nth-child(10)",
    popularHeaderPrevNews: ".ArticleTopNavigation [data-type='news']:nth-child(12)",
    popularNewsTitle: ".ArticleTopNavigation [data-type='news']:nth-child(11) .default_tile-title_text",
    popularNextNewsTitle: ".ArticleTopNavigation [data-type='news']:nth-child(10) .default_tile-title_text",
    popularPrevNewsTitle: ".ArticleTopNavigation [data-type='news']:nth-child(12) .default_tile-title_text",
    popularNewsLink: ".ArticleTopNavigation [data-type='news']:nth-child(11) .default_tile-link",
    popularNextNewsLink: ".ArticleTopNavigation [data-type='news']:nth-child(10) .default_tile-link",
    popularPrevNewsLink: ".ArticleTopNavigation [data-type='news']:nth-child(12) .default_tile-link",

    /**
     * Кнопки социальных сетей
     * @headerFacebook -  кнопка фейсбука вверху страницы
     * @headerVk -  кнопка вконтакте вверху страницы
     * @footerFacebookButton - кнопка фейсбука внизу страницы
     * @footerVk - кнопка вконтакте внизу страницы
     * @commentsButtonVk -  кнопка комментариев ВКОНТАКТЕ
     * @commentsButtonFb - кнопка комментариев FACEBOOK
     * @footerCommentsVk -  комментарии в футере ВКОНТАКТЕ
     * @footerCommentsFb -  комментарии в футере FACEBOOK
     * @socialButtons - блок Поделиться (обе кнопки ВК и ФБ)
     * @readVkLink - ссылка "Читай наш паблик ВКонтакте"
     */
    socialButton: {
        headerFacebook: '.Article__headLikely .likely__icon_facebook',
        headerVk: '.Article__headLikely .likely__icon_vkontakte',
        footerFacebookButton: '.Article__preFooter .likely__widget_facebook',
        footerVk: '.Article__preFooter .likely__widget_vkontakte',
        commentsButtonVk: '.Article__commentSwitch__VK',
        commentsButtonFb: '.Article__commentSwitch__FB',
        footerCommentsVk: '.Article__socialFooter__VK',
        footerCommentsFb: '.Article__socialFooter__FB',
        socialButtons: '.Article__socialButtons',
        readVkLink: '.VKWidget.small [target="_blank"]'
    },

    /**
     * Айфреймы внешних страниц
     * @twitter - айфрейм твитера
     * @twitterMedia - содержимое фрейма твитера
     * @twitterFollowButton - кнопка читать твитер
     * @youTube - айфрейм youtube
     * @youTubePlayButton - кнопка плей
     * @videoStream - видеопоток youtube
     */
    frame: {
        twitter: 'twitter-widget-0',
        twitterMedia: '.EmbeddedTweet-tweet',
        twitterFollowButton: '.FollowButton',
        youTube: '.Article__video iframe.lazyPlayer',
        youTubePlayButton: '.lazyPlayer__play',
        videoStream: ".playing-mode"
    },


    /**
     * Элементы страницы, которые мы исключаем из проверки верстки из-за диинамики
     */
    exclude: [
        '.UniversalIframe',     // айфреймы (коуб, твитер и т.д.)
        'img[src$=".gif"]',     // динамическая картинка на одной из страниц
        '.Article__tweet',      // твитер
        '.Article__head',       // заголовок новости содержит динамические значения количества просмотров и лайков
        '.Article__footer',     // содержит конпки вк и фб с количеством лайков, блок с коментариями и виджетом группы и плитки выбора редакции
		'.w_views.Article__pubDate' // счетчик просмотров (отдельно от заголовка в мобильной версии)
    ],

    /**
     * Элементы статей в мобильной версии
     * @viewCountElement - элемент кол-ва просмотров статьи
     * @sborkaformatovFooter - элемент для скролла до футера (статья sborkaformatov), использовать, чтобы хедер не перекрывал футер
     * @testBlokovFooter - элемент для скролла до футера (статья test-novyh-blokov-formatirovanija), использовать, чтобы хедер не перекрывал футер
     */
    mobile: {
        viewCountElement: '.Article__content .w_views',
        sborkaformatovFooter: '//*[@id="content-article"]//div[11]',
        testBlokovFooter: '//*[@id="content-article"]/article//p[37]'
    }
}
