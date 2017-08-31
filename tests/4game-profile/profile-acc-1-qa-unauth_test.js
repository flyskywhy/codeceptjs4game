Feature('profile-acc-1-qa-unauth. Сюда добавить описание');
var data = require('./data/profile');

Before((I) => {
  I.clearCookie();
});

xScenario('Незалогиненный пользователь заходит на id. Пользователь видит (что-то, уточнить у продактов)', function* (I, profilePage, genericPage) {
  I.amOnPage('/id/');
  //добавить проверки в зависимости от решения
});
