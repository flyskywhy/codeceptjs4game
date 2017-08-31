# 4game-feature-tests

Проект для Acceptance и E2E тестов по фронтенду.

Базовые фреймворки:
* [CodeceptJS](http://codecept.io/) - Верхнеeуровневый фреймворк для описания тестовых сценариев в формате BDD
* [WebdriverIO](http://webdriver.io/) - Прослойка, между CodeceptJS и Webdriver
* [WebdriverCSS](https://github.com/webdriverio/webdrivercss) - Фреймворк для тестирования верстки методом сверки скриншотов

## Установка
0. Устанавливаем [NodeJS](https://nodejs.org/en/) - гарантированно работает с v4.4.7 и [Java](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
1. Клонируем репозиторий
	```
	git clone git@github.com:InnovaCo/4game-feature-tests.git
	```
2. Заходим в папку проекта и устанавливаем зависимости

	```
	npm install
	npm update
	npm install pm2 -g
	npm install selenium-standalone -g
	```
3. Устанавливаем GraphicsMagick для работы webdriverCSS. Подробнее [здесь](https://github.com/webdriverio/webdrivercss#install)
4. Устанавливаем PhantomJs, если хотим запускать тесты в нем, прописываем путь до папки с PhantomJS в PATH
5. В codecept.conf.js указываем настройки вебрайвера:
	* Браузер
	* Разрешение
	* baseUrl теструемого проекта

	Пример:
	```
	"WebDriverIO": {
      		"url": "https://ru.4gametest.com",
      		"browser": "chrome",
      		"windowSize": "1360x840",
      		"port": "3244",
      		"desiredCapabilities": {
        		"IE_ENSURE_CLEAN_SESSION": true
      		}
	```
	! Внимание: для IE необходимо отключить безопасный режим
6. Скачиваем драйвера селениума и запускаем
	```
	selenium-standalone install --drivers.ie.arch=ia32
	selenium-standalone start --drivers.ie.arch=ia32
	```
7. После настройки можно запустить все тесты c помощью команды `npm run codeceptjs`
8. Пункты 6-7 можно не делать, если запускать через runner.js, запуск работает также как и для `npm run codeceptjs`
	```
	node runner.js
	```


## Про запуск тестов в IE
Для того чтобы тесты в IE корректно работали, необходимо провести первоначальную настройку IE
* Открыть Свойства браузера -> Безопасность. Для каждой зоны отключить защищенный рещим http://joxi.ru/krD036I0nN9krp
* Открыть Свойства браузера -> Общие. Поставить галочку "Удалять журнал браузера при выходе" http://joxi.ru/Dr8OlXckbe9MA6

Для нормальной работы с буффером обмена необходимо выставить кастомный уровень безопасности:
* Открыть Свойства браузера -> Безопасность. Для зоны  Internet выбрать Custom Level http://joxi.ru/n2YVWQsj8MGbA6
* Сбросить кастомные настройки на Medium http://joxi.ru/DmB0aQIND0d4AP
* Разрешить доступ к буфферу обмена http://joxi.ru/52aZOaFG589NA0

##Структура проекта
```
├───helpers
├───pages
├───selenium
└───tests
    ├───4game-aion
    ├───4game-apb
    ├───4game-atlantica
    ├───4game-bns
    ├───4game-common
    │   ├───achievements
    │   ├───authorization
    │   ├───.......
    │   ├───special-pages
    │   └───userbar
    ├───.......
    ├───4game-referral-system
    │   ├───data
    │   └───visual
    │       └───reference
    ├───.......
    └───tiny-fort
```
* helpers - директория с вспомогательными хелперами, подробнее о хелперах [тут](http://codecept.io/helpers/)
* pages - директория с PageObjects, подробнее [тут](http://codecept.io/pageobjects/)
* selenium - директория с вебдрайвером и драйверами браузеров
* tests - тесты, разбитые по папкам. Каждая папка - проект, который деплоиться на фогейме. Основная папка может содержать подпапки.
* tests/*/visual/reference - Папка с референсными скриншотами для тестов данного проекта
* cli.js - консоль репортер. Может изменяться для добавления новых фич (например нотифакация в slack для Live тестов)
* codecept.json - основной конфиг codeceptJS. Должен содержать в себе ссылки на все helpers и pages
* reporterOptions.json - файл с настройками репортеров. Есть возможность подключать неограниченное число репортеров от [Mocha](https://mochajs.org/)
* runner.js - скрипт для запуска тестов (в разработке)

## Ньюансы по работе с хелперами
* Названия методов должны быть "говорящими"
* У каждого метода должно быть текстовое сопровождение (комментарий) о том, что этот метод делает и ньюансы по входным данным
* Базовые методы testapi должны находиться в `testapi_helper.js`. Все дочерние хэлперы, которые используют методы testapi (например принятие лицензий фогейма) должны находиться в `forgame_helper.js`
* Конечные методы, используемые в тестах должны быть "говорящими" в концепции BDD.
	Пример плохого сочетания методов в тесте:
```
var user = yield I.createRandomUser();
  I.clearCookie();
  I.amOnPage('/404');
  I.setLoginCookieFor(user.email, user.password);
  I.amOnPage('/summon/');
```
Как в таком случае должно быть:
```
  I.amAuthorizedUser();
  I.amOnPage('/summon/');
```
Такие штуки в основном должны выносится в PageObjects, но иногда это можно делать и в Helpers, если такой метод достаточно общий

## Ньюансы по работе с PageObjects
* Название файла с PageObjects должно быть говорящим, чтобы из него было понятно к какому проекту относится. Шаблон создания названия PageObject файла [project name без 4game]-[опциональное деление одного файла на разные].js
* Все локаторы храним в PageObjects. Для локаторов оставляем коментарии что это за локатор и где он находится на странице.
* Максимальная вложенность локаторов - 3
* Приоритет локаторов: Id, CSS, XPath. Стараемся выбирать самые короткие и говорящие локаторы
* Повторяющиеся в тестах шаги выносим в PageObjects в виде методов
* Общие вещи для фогейма храним в generic.js

## Ньюансы по написанию тестов
Пример обычного теста:
```
Feature('4game-referral-system-unauth');
var data = require('./data/referral');
var testGame = data[data.common.testingGame];

Scenario('Незалогиненный пользователь заходит на страницу реферальной системы', (I, referralPage, genericPage) => {
	I.clearCookie();
	I.amOnPage('/summon/');
	I.waitForVisible(referralPage.headers.summon.selector, referralPage.timeout);
  I.waitForText(referralPage.headers.summon.text, referralPage.timeout, referralPage.headers.summon.selector);
	I.seeInTitle(data.common.title);
	I.checkPageDescription(data.common.description);
	//I.checkLayout('referrer_unauth', [ {name: 'body', elem: referralPage.webdriverCSS.referrer_unauth, exclude: [ referralPage.exclude.userbar, referralPage.exclude.likesVK, referralPage.exclude.likesFB ]} ], 0.1, '4game-referral-system');
});
```
* Название файла теста должно быть говорящим, чтобы по нему можно было определить для чего этот тест предназначен. Шаблон имени файла с тестами [project name без 4game]-[Acceptance или E2E]-[номер сьюта]-[live/qa]-[говорящее название сьюта]_tests.js

	Пример:

	project name без 4game: referral-system

	Acceptance или E2E: acc или e2e

	Номер сьюта: 1, 2, 3 и т.д.

	live/qa : live или qa

* Название Feature должно содержать в себе название файла без _tests.js. После названия файла необходимо русским языком описать какие тесты находятся в этом сьюте.

	Пример хорошего названия: `referral-system-acc-1-qa-unauth. Тесты состояний страниц реферальной системы для незалогиненного пользователя`

* Названия Scenario должны быть на русском и отражать суть теста с точки зрения пользователя. Должна быть передана информация When->Then.

	Пример: `Незалогиненный пользователь заходит на дефолтную страницу страницу реферальной системы. Пользователь должен увидеть предложение авторизоваться и правильные метатеги`

* Шаги теста должны быть описаны с точки зрения конечного пользователя и должны быть говорящими
* Все селекторы должны быть в pageObjects
* Все таймауты должны быть в pageObjects
* Статься делать тесты максимально конфигурабельными
* Тесты на Acceptance должны проходить с использованием моков. Все запросы к API и PHP должны проксироваться на мок-сервер (В разработке). E2E тесты должны работать через testapi или без каких-либо прослоек
* Тесты должны писаться с учетом требования работоспособности в PhantomJS (с него лучше все начинать при разработке тестов). В браузерах Chrome, FF, IE тесты также должны проходить и быть "зелеными".
* PhantomJS очень плохо оценивает загрузку страницы/элементов - загружен только основной лэйаут, а он уже бежит на след. шаг теста. Необходимо правильно работать с сущностями WaitUntil
* Очистка кук не всегда корректно отрабатывает в PhantomJS. Опять же фантом бежит вперед паровоза
* Некоторые вещи не работают в PhantomJS. Например копирование в буфер обмена с помощью .js, который подключен в реферальной системе
* В название сценария не допускается использование кавычек и слешей. Если их использовать, то при падении теста, CodeceptJS валится без ошибок

## Ньюансы по запуску тестов
* Пока что запуск работает через команду `npm run codeceptjs`. При этом никакие параметры поменять нельзя. При необходимости что-то изменить, необходимо отредактировать скрипт в package.json. Только перед коммитом в Мастер надо проверить, что ваши обновленные настройки не попали в коммит
* Команда `сodeceptjs --grep` - ищет тест сьюты, в Feature которых указан искомый текст, а не файлы, с нужным наименованием, поэтому очень важно придерживаться вышеописанных правил наименования тестов и Feature
* Edge пока не поддерживается в тестах - не исследовали его работоспособность с этими фреймворками
