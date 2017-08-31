Feature('profile-acc-1-qa-auth. Просмотр и смена своего аватара');
var data = require('./data/profile');

Before((I) => {
  I.clearCookie();
});

xScenario('Залогиненный пользователь заходит на страницу своего профиля, у юзера нет соцсетей. Юзер видит дефолтный юзерпик. Юзер пытается поменять юзерпик', function* (I, profilePage, genericPage) {
  var user = yield I.createUser();
  I.amAuthorizedUser(user.email, user.password);
  I.amOnPage('/id/' + user.login + '/');
  I.waitForVisible(profilePage.avatar.icon, profilePage.timeout);
  I.click(profilePage.avatar.icon);
  //TODO: проверить, что отображаются как задизейбленные
  I.waitForVisible(profilePage.header.dropdown, profilePage.timeout);
  I.waitForVisible(profilePage.header.vk, profilePage.timeout);
  I.click(profilePage.header.vk);
  I.waitTabsLoading(2, profilePage.timeout);
  I.changeTab(2);
  //Тут либо логинимся, либо просто проверяем урл
});
