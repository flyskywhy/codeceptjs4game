'use strict';

let Helper = codecept_helper;

class MobileResolution extends Helper {

    _failed(test) {
        return;
    }

    /**
     * Метод для установки мобильного размера окна
     * берет установленное значение окна и по формуле высчитывает размер,
     * после приравнивает результат к ближайшему размеру популярных размеров мобильных
     * @returns {Promise.<TResult>|*}
     */
    setMobileResolutionEquivalentCurrent() {
        let client = this.helpers['WebDriverIO'].browser;
        return client.getViewportSize('width').then(function (size) {
            var mobileResolutions = [
                {width: 320, height: 480},
                {width: 480, height: 800},
                {width: 640, height: 960},
                {width: 720, height: 1280},
                {width: 750, height: 1334},
                {width: 1080, height: 1920}
            ];
            var delta = Number.MAX_VALUE;
            var resolutionIndex = 0;
            if (size > 1920) {
                size = 1920;
            }
            var proportionalWidthResolution = ((size - 840) * (840 - 150) / (1920 - 840)) + 150;
            console.log(proportionalWidthResolution);
            for (var i = 0; i < mobileResolutions.length; i++) {
                if (Math.abs(proportionalWidthResolution - mobileResolutions[i].width) < delta) {
                    delta = Math.abs(proportionalWidthResolution - mobileResolutions[i].width);
                    resolutionIndex = i;
                }
            }
            console.log("mobile resolution width: " + mobileResolutions[resolutionIndex].width + ", height: " + mobileResolutions[resolutionIndex].height);
            client.windowHandleSize({
                width: mobileResolutions[resolutionIndex].width,
                height: mobileResolutions[resolutionIndex].height
            });
        });

    }
}

module.exports = MobileResolution;
