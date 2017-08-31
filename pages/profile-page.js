'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

  /*
  timeout - время ожидания загрузки элементов, используется в методах
  */
  timeout: 30,

  header: {
    nickname: '#input1',
    change_nickname_button: '.editable-nickname__icon--first-time',
    save_nickname_button: '.editable-nickname__save--active',
    save_nickname_cancel: '.editable-nickname__icon--close',
    tooltip_success: '.editable-nickname__tooltip--success',
    tooltip_failed: '.editable-nickname__tooltip--error',
  },

  avatar: {
    icon: '.user__avatar-pic',
    hover: '.avatar__icon',
    dropdown: '.user__avatar-dropdown',
    standart: '.user__avatar-dropdown-avatar',
    vk: '.user__avatar-dropdown-avatar-vk',
    fb: '.user__avatar-dropdown-avatar-fb'
  }


  /*
  исключения из проверок webdriverCSS
  userbar - юзербар
  likesVK - блок лайков VK
  likesFB - блок лайков FB
  referral_moreInvited_achieve - ачивка из блока "Хочешь больше призов"
  referral_moreInvited_hover - ховер ачивки из блока "Хочешь больше призов"
  */

  exclude: {
    userbar: '//*[@id="UserBar4Game"]/div[1]',
    likesVK: '//span[contains(@class, "footer-4game__social-item footer-4game__social-item_vk")]',
    likesFB: '//span[contains(@class, "footer-4game__social-item footer-4game__social-item_fb")]',
  },



}
