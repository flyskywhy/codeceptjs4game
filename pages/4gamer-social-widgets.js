/**
 * Элементы и методы для работы с социальными сетями
 */
'use strict';

let I;

module.exports = {

    init() {
        I = require('../steps_file.js')();
    },

    urlVk: 'vk.com/4game',

    /**
     * Кнопки социальных сетей
     * @headerVkPublic - ссылка в заголовке Наш паблик ВКонтакте
     * @footerButtons - кнопки фб и вк снизу страницы
     * @footerFbButton - кнопка фейсбука внизу страницы
     * @footerVkButton - кнопка вконтакте внизу страницы
     * @footerVkPublic - ссылка в футере Наш паблик ВКонтакте
     */
    headerVkPublic: '.SiteHeader__link.SiteHeader__vkLink',
    footerButtons: '.SiteFooter__socials',
    footerFbButton: '.likely__widget_facebook',
    footerVkButton: '.likely__widget_vkontakte',
    footerVkPublic: '.SiteFooter__vkPublic [href="https://vk.com/4game"]',
    mobileHeaderVkPublic: '.SiteHeader__center .SiteHeader__vkLink'
}