Feature('profile-acc-1-qa-auth. Просмотр и смена своего никнейма');
var data = require('./data/profile');

Before((I) => {
  I.clearCookie();
});


xScenario('Залогиненный пользователь заходит на страницу своего профиля используя прямую ссылку с логином. Пользователь видит свой рандомносгенерированный никнейм. После рефреша страницы никнейм должен сохраняться', function* (I, profilePage, genericPage) {
  var user = yield I.createUser();
  I.amAuthorizedUser(user.email, user.password);
  I.amOnPage('/id/' + user.login + '/');
  I.waitForVisible(profilePage.header.nickname, profilePage.timeout);
  var nickname = yield I.grabTextFrom(profilePage.header.nickname)
  I.seeCurrentUrlEquals('/id/' + user.login + '/');
  I.refreshPage();
  I.waitForVisible(profilePage.header.nickname, profilePage.timeout);
  I.waitForText(nickname, profilePage.timeout, profilePage.header.nickname)
});

xScenario('Залогиненный пользователь заходит на страницу своего профиля используя прямую ссылку с логином. Юзер видит свой рандомносгенерированный никнейм. Юзер меняет свой никнейм. После рефреша страницы никнейм должен сохраняться', function* (I, profilePage, genericPage) {
  var user = yield I.createUser();
  I.amAuthorizedUser(user.email, user.password);
  I.amOnPage('/id/' + user.login + '/');
  I.waitForVisible(profilePage.header.change_nickname_button, profilePage.timeout);
  I.click(profilePage.header.change_nickname_button);
  I.fillField(profilePage.header.nickname, "Dummy user");
  I.click(profilePage.header.save_nickname_button);
  I.waitForVisible(profilePage.header.tooltip_success, profilePage.timeout);
  I.waitToHide(profilePage.header.tooltip_success, profilePage.timeout);
  I.waitForText("Dummy user", profilePage.timeout, profilePage.header.nickname)
  I.refreshPage();
  I.waitForVisible(profilePage.header.nickname, profilePage.timeout);
  I.waitForText("Dummy user", profilePage.timeout, profilePage.header.nickname)
});

xScenario('Залогиненный пользователь заходит на страницу своего профиля используя прямую ссылку с логином. Юзер видит свой рандомносгенерированный никнейм. Юзер пытается сменить ник на что-то плохое. Пользователь должен получить сообщение об ошибке и не должен сохраниться', function* (I, profilePage, genericPage) {
  var user = yield I.createUser();
  I.amAuthorizedUser(user.email, user.password);
  I.amOnPage('/id/' + user.login + '/');
  I.waitForVisible(profilePage.header.change_nickname_button, profilePage.timeout);
  I.click(profilePage.header.change_nickname_button);
  I.fillField(profilePage.header.nickname, "Блядь");
  I.click(profilePage.header.save_nickname_button);
  I.waitForVisible(profilePage.header.tooltip_failed, profilePage.timeout);
  I.waitToHide(profilePage.header.tooltip_failed, profilePage.timeout);
  //TODO: какое дальше поведение у страницы - не понятно, тут надо будет дописать
  I.refreshPage();
  I.waitForVisible(profilePage.header.nickname, profilePage.timeout);
  I.dontSee('Блядь', profilePage.header.nickname);
});

xScenario('Залогиненный пользователь заходит на страницу своего профиля используя прямую ссылку с логином. Юзер видит свой рандомносгенерированный никнейм. Юзер пытается сменить ник, но передумал. Старый ник должен сохраниться', function* (I, profilePage, genericPage) {
  var user = yield I.createUser();
  I.amAuthorizedUser(user.email, user.password);
  I.amOnPage('/id/' + user.login + '/');
  I.waitForVisible(profilePage.header.nickname, profilePage.timeout);
  var nickname = yield I.grabTextFrom(profilePage.header.nickname)
  I.click(profilePage.header.change_nickname_button);
  I.fillField(profilePage.header.nickname, "Dummy user");
  I.click(profilePage.header.save_nickname_cancel);
  I.waitForText(nickname, profilePage.timeout, profilePage.header.nickname)
  I.refreshPage();
  I.waitForVisible(profilePage.header.nickname, profilePage.timeout);
  I.waitForText(nickname, profilePage.timeout, profilePage.header.nickname)
});
