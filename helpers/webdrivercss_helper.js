'use strict';

let Helper = codecept_helper;
let assert = require('assert');
let webdrivercss = require('webdrivercss');


var fs = require('fs-extra'),
    tar = require('tar'),
    zlib = require('zlib'),
    targz = require('tar.gz'),
    rimraf = require('rimraf'),
    request = require('sync-request'),
    git = require('git-rev-sync'),
    stream = require('stream'),
    ncp = require('ncp').ncp;

var codeceptConfig = require('../codecept.conf').config

var config = {
    webdrivercss: {
        'screenshotRoot': 'tests/visual/reference',
        'failedComparisonsRoot': 'tests/visual/failed',
        'misMatchTolerance': 0.05,
        'removeScreenshot': true,
        'screenWidth': [1024],
        'viewportChangePause': 500,
        'api': 'http://10.32.68.11:8080/api/tar/'
    }
};
var browser = codeceptConfig.helpers.WebDriverIO.browser;

class WebdriverCSS extends Helper {

    _failed(test) {
        return;
    }

    /*
     Метод для проверки Layout с помощью фреймворка WebdriverCSS
     id - уникальный id для скриншота/страницы
     options - опции проверки страницы, подробнее https://github.com/webdriverio/webdrivercss#usage
     misMatchTolerance - Максимальное возможное отклонение в скриншотах (по умолчанию 0.05)
     project - название папки проекта
     folder - папка для скриншотов сьюта
     */
    checkLayout(id, options, misMatchTolerance, project, folder) {

        console.log('object options:');
        console.log(options);
        if (codeceptConfig.checkLayoutEnabled == 'false') {
            console.log('checkLayout disabled in codecept.js...Skiping.');
            return;
        }
        //получаем информацию о webdriver
        let client = this.helpers['WebDriverIO'].browser;

        //обновляем информацию для фреймворка webdrivercss
        config.webdrivercss.screenshotRoot = 'tests/' + project + '/visual/' + folder;
        config.webdrivercss.failedComparisonsRoot = 'output/' + project + '/visual/' + folder + '/failed';
        config.webdrivercss.misMatchTolerance = misMatchTolerance;
        //логирование конфига
        //console.log(config);
        //логирование вебдрайвера
        //console.log(client);


        return client.getViewportSize('width').then(function(size) {
            size = Math.ceil(size / 10) * 10;
            config.webdrivercss.screenWidth[0] = parseFloat(size); // outputs: {width: 1024, height: 768}
            //
            // Определяем браузер в котором запущен тест

            browser = client.desiredCapabilities.browserName;
            if (browser == 'internet explorer') {
                browser = 'ie'
            }
            if (browser === 'phantomjs') {
                console.log('We do not check layout in PhantomJS...Skiping.');
                return;
            }

            //делаем маску скриншота
            var uniqueId = browser + '_' + id;

            webdrivercss.init(client, config.webdrivercss);
            return client.webdrivercss(uniqueId, options, function(err, res) {
                //Логирование ошибок и результата
                //console.log(err);
                //console.log(res);

                if (typeof err != 'undefined') {
                    //произошла непредвиденная ошибка
                    assert.fail(err, 'undefined', 'Unexpected error');
                    return;
                } else {
                    //отправляем результат проверки
                    //т.к. не знаем, какое название у объекта, берем первый (он же единственный)
                    var resPrepare = res[Object.keys(res)[0]];
                    var reportOpt = ''
                    if ("name" in options[0]) {
                        reportOpt = options[0].name
                    }

                    assert.ok(resPrepare[0].isWithinMisMatchTolerance, "misMatchPercentage = " + resPrepare[0].misMatchPercentage +
                        "\nSave screenshot to: " + project + '/visual/' + folder + '/failed/' + uniqueId + "." + reportOpt + "." +
                        config.webdrivercss.screenWidth[0] + "px.diff.png");
                    return;
                }
            });
        });

        //инициализируем фреймворк webdrivercss
        //возвращаем в основной тест результаты проверки фреймворком webdrivercss

    }

    /*
    Выкачивание картинок с удаленного сервера
    */
    syncDown(project, suite) {
        var screenshotRoot = 'tests/' + project + '/visual/' + suite,
            failedComparisonsRoot = 'output/' + project + '/visual/' + suite + '/failed';

        if (codeceptConfig.checkLayoutEnableSyncDown == 'false') {
            console.log('Sync Screenshots with remote server is disabled!');
            return;
        } else {

            //Выполняем синхронный запрос
            let r = request('GET', config.webdrivercss.api + project + '_' + browser + '/' + git.branch() + '/' + suite + '.tar.gz', {
                'accept-encoding': 'gzip,deflate'
            });

            /*
            не алертим, если репозитория нет
             */
            if (r.statusCode === 404) {
                if (git.branch() == "master") {
                    return assert.ok(true)
                } else {
                    r = request('GET', config.webdrivercss.api + project + '_' + browser + '/' + "master" + '/' + suite + '.tar.gz', {
                        'accept-encoding': 'gzip,deflate'
                    });
                    if (r.statusCode === 404) {
                        return assert.ok(true);
                    }
                }
            }


            /*
            Проверяем, что ответ корректный, иначе стопаем все
            */
            if (r.statusCode !== 200 || r.headers['content-type'] !== 'application/octet-stream') {
                return assert.ifError(new Error('unexpected statusCode (' + r.statusCode + ' != 200) or content-type (' + r.headers['content-type'] + ' != application/octet-stream)'));
            }

            /*
            Проверяем, существуют ли директории со скриншотами
            и если существуют, чистим их
             */
            if (fs.existsSync(screenshotRoot)) {
                rimraf.sync(screenshotRoot);
                fs.mkdirsSync(screenshotRoot, '0755', true);
            }

            if (fs.existsSync(failedComparisonsRoot)) {
                rimraf.sync(failedComparisonsRoot);
                fs.mkdirsSync(failedComparisonsRoot, '0755', true);
            }

            /*
            Создаем стрим из полученного из Body архива
            */
            var rs = new stream.Readable({
                objectMode: true
            });
            rs.push(r.body);
            rs.push(null);

            /*
            Распаковываем архив
            */
            return rs.pipe(zlib.Gunzip()).pipe(tar.Extract({
                path: screenshotRoot,
                strip: 1
            })).on('end', function() {
                /*
                удаляем папку с diff, потому что у нас сфейленные скриншоты храняться в output
                */
                if (fs.existsSync(screenshotRoot + '/diff')) {
                    rimraf.sync(screenshotRoot + '/diff');
                    fs.mkdirsSync(screenshotRoot, '0755', true);
                }
            });
        }
    }

    /*
    Загрузка архива с картинками на удаленный сервер
    */
    syncUp(project, suite) {
        var screenshotRoot = 'tests/' + project + '/visual/' + suite,
            tarballPath = screenshotRoot + '.tar.gz';

        const form = new(require('form-data'));

        if (codeceptConfig.checkLayoutEnableSyncUp == 'false') {
            return;
        } else {

            form.append('gz', fs.createReadStream(tarballPath));

            const p = new Promise(function(resolve, reject) {
                form.submit(config.webdrivercss.api + project + '_' + browser + '/' + git.branch() + '/' + /[^/]*$/.exec(screenshotRoot)[0], function(err, res) {
                    console.log(err);
                    console.log(res);
                    if (res.statusCode > 300) {
                        console.log('Failed to upload Arhive:')
                        console.log(err)
                        console.log(res.statusCode())
                    }
                    resolve()
                })
            })
            return p;
        }
    }

    /*
    Создания архива для загрузки
    */
    createTar(project, suite) {
        var screenshotRoot = 'tests/' + project + '/visual/' + suite,
            failedComparisonsRoot = 'output/' + project + '/visual/' + suite + '/failed',
            tarballPath = screenshotRoot + '.tar.gz';

        if (codeceptConfig.checkLayoutEnableSyncUp == 'false') {
            return;
        } else {

            /*
            копируем папку с Diff
            */
            ncp(failedComparisonsRoot, screenshotRoot + '/diff', function(err) {
                if (err) {
                    return assert.ifError(err);
                }
            });

            /*
            Создаем архив
            */
            return new targz().compress(screenshotRoot, tarballPath, function(err) {
                if (err) {
                    return assert.ifError(err);
                } else {
                    return assert.ok(true);
                }
            });
        }
    }

    /*
    Очистка папок после заливки архива
    удаляем скриншоты с скопированные diff
    */
    clearDir(project, suite) {

        if (codeceptConfig.checkLayoutEnableSyncUp == 'false') {
            console.log('Upload Screenshots to remote server is disabled!');
            return;
        } else {

            var screenshotRoot = 'tests/' + project + '/visual/' + suite,
                failedComparisonsRoot = 'output/' + project + '/visual/' + suite + '/failed',
                tarballPath = screenshotRoot + '.tar.gz';

            rimraf.sync(tarballPath);
            rimraf.sync(screenshotRoot + '/diff')
        }
    }

    /**
     * Метод отключения анимации на странице
     * @param element
     * @return
     */
    stopAnimation(element) {
        let client = this.helpers['WebDriverIO'].browser;
        return client.execute(function(element) {
            $(element).css("-webkit-animation", "none");
            $(element).css("-moz-animation", "none");
            $(element).css("-ms-animation", "none");
            $(element).css("animation", "none");
        }, element);
    }

}

module.exports = WebdriverCSS;
