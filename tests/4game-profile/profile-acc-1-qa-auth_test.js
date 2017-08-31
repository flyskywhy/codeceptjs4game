Feature('profile-acc-1-qa-auth. Сюда добавить описание');
var data = require('./data/profile');

Before((I) => {
  I.clearCookie();
});

xScenario('Залогиненный пользователь заходит на id, но у него еще нет логина. Пользователя должно редиректнуть на страницу своего профиля', function* (I, profilePage, genericPage) {
  var user = yield I.createUserWithoutLogin();
  I.amAuthorizedUser(user.email, user.password);
  I.amOnPage('/id/');
  I.waitForVisible(profilePage.header.nickname, profilePage.timeout);
  I.seeInTitle(data.common.title);
  I.checkPageDescription(data.common.description);
  I.seeCurrentUrlEquals('/id/' + user.id + '/');
  I.hideAchievementsNotifications();
  I.checkLayout('profile_fromId', [ {name: 'body', exclude: [ profilePage.exclude.userbar, profilePage.exclude.likesVK, profilePage.exclude.likesFB]} ], 0.1, '4game-profile');
});

xScenario('Залогиненный пользователь заходит на страницу своего профиля используя прямую ссылку с userId, и у него нет логина. Пользователь должен увидеть свою страницу профиля', function* (I, profilePage, genericPage) {
  var user = yield I.createUserWithoutLogin();
  I.amAuthorizedUser(user.email, user.password);
  I.amOnPage('/id/' + user.id + '/');
  I.waitForVisible(profilePage.header.nickname, profilePage.timeout);
  I.seeInTitle(data.common.title);
  I.checkPageDescription(data.common.description);
  I.seeCurrentUrlEquals('/id/' + user.id + '/');
  I.hideAchievementsNotifications();
  I.checkLayout('profile_fromId', [ {name: 'body', exclude: [ profilePage.exclude.userbar, profilePage.exclude.likesVK, profilePage.exclude.likesFB]} ], 0.1, '4game-profile');
});

xScenario('Залогиненный пользователь заходит на id, и у него есть логин. Пользователя должно редиректнуть на страницу своего профиля, а в урле должен быть логин', function* (I, profilePage, genericPage) {
  var user = yield I.createUser();
  I.amAuthorizedUser(user.email, user.password);
  I.amOnPage('/id/');
  I.waitForVisible(profilePage.header.nickname, profilePage.timeout);
  I.seeInTitle(data.common.title);
  I.checkPageDescription(data.common.description);
  I.seeCurrentUrlEquals('/id/' + user.login + '/');
  I.hideAchievementsNotifications();
  I.checkLayout('profile_fromId', [ {name: 'body', exclude: [ profilePage.exclude.userbar, profilePage.exclude.likesVK, profilePage.exclude.likesFB]} ], 0.1, '4game-profile');
});

xScenario('Залогиненный пользователь заходит на страницу своего профиля используя прямую ссылку с userId и у юзера есть логин. Пользователь должен увидеть свою страницу профиля, а в урле должен быть логин', function* (I, profilePage, genericPage) {
  var user = yield I.createUser();
  I.amAuthorizedUser(user.email, user.password);
  I.amOnPage('/id/' + user.id + '/');
  I.waitForVisible(profilePage.header.nickname, profilePage.timeout);
  I.seeInTitle(data.common.title);
  I.checkPageDescription(data.common.description);
  I.seeCurrentUrlEquals('/id/' + user.login + '/');
  I.hideAchievementsNotifications();
  I.checkLayout('profile_fromId', [ {name: 'body', exclude: [ profilePage.exclude.userbar, profilePage.exclude.likesVK, profilePage.exclude.likesFB]} ], 0.1, '4game-profile');
});

xScenario('Залогиненный пользователь заходит на страницу своего профиля используя прямую ссылку с логином. Пользователь должен увидеть свою страницу профиля, а в урле должен быть логин', function* (I, profilePage, genericPage) {
  var user = yield I.createUser();
  I.amAuthorizedUser(user.email, user.password);
  I.amOnPage('/id/' + user.login + '/');
  I.waitForVisible(profilePage.header.nickname, profilePage.timeout);
  I.seeInTitle(data.common.title);
  I.checkPageDescription(data.common.description);
  I.seeCurrentUrlEquals('/id/' + user.login + '/');
  I.hideAchievementsNotifications();
  I.checkLayout('profile_fromId', [ {name: 'body', exclude: [ profilePage.exclude.userbar, profilePage.exclude.likesVK, profilePage.exclude.likesFB]} ], 0.1, '4game-profile');
});
