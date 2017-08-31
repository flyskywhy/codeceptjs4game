exports.config = {

    tests: process.env.SUITE_TESTS || './tests/*/*_test.js',
    timeout: 10000,
    output: './output/',

    helpers: {
        WebDriverIO: {
            url: process.env.BASE_URL || 'https://ru.4gametest.com',
            browser: process.env.BROWSER || 'chrome',
            windowSize: process.env.SCREEN || '1360x840',
            restart: process.env.RESTART || false,
            port: 4444,
            waitForTimeout: 30000,
            desiredCapabilities: {
                "IE_ENSURE_CLEAN_SESSION": true,
                "javascriptEnabled": true,
                "phantomjs.page.customHeaders.Accept-Language": "en_GB"
            }
        },
        WebdriverCSS: {
            require: './helpers/webdrivercss_helper.js'
        },
        ForGame: {
            require: './helpers/forgame_helper.js'
        },
        TestApi: {
            require: './helpers/testapi_helper.js'
        },
        WebdriverIOExtra: {
            require: './helpers/webdriverioextra_helper.js'
        },
        MobileResolution: {
            require: "./helpers/mobile-resolution_helper.js"
        },
        EmailHelper: {
            require: './helpers/email_helper.js'
        },
        ShellHelper: {
            require: './helpers/shell_helper.js'
        },
        WinregHelper: {
            require: './helpers/winreg_helper.js'
        },
        ForGamePresents: {
            require: './helpers/forgame_presents_helper.js'
        }
    },
    include: {
        I: "./steps_file.js",
        achievementsPage: "./pages/achievements-page.js",
        authPopup: "./pages/auth-popup.js",
        dailyPage: "./pages/daily-events-page.js",
        eventsPage: "./pages/events-page.js",
        genericPage: "./pages/generic.js",
        giftCodePage: "./pages/giftcode-page.js",
        headerMenu: "./pages/4gamer-header-switch-menu.js",
        indexPage: "./pages/4gamer-index-page.js",
        aionInstallPage: "./pages/aion/install-page.js",
        lineageInstallPage: "./pages/lineage/install-page.js",
        gamePanelPage: "./pages/game-panel-page.js",
        mediaPage: "./pages/4gamer-media-page.js",
        aionPlayPage: "./pages/aion/play-page.js",
        paymentTerminal: "./pages/payment-terminal-page.js",
        pocketFortInstallPage: "./pages/pocket-fort/install-page.js",
        pointblankInstallPage: "./pages/pointblank/install-page.js",
        pointblankPlayPage: "./pages/pointblank/play-page.js",
        pointblankShootingPage: "./pages/pointblank/shooting-page.js",
        pointblankRatingsPage: "./pages/pointblank/ratings-page.js",
        registrationConfirmPage: "./pages/registration-confirm-page.js",
        rfonlineInstallPage: "./pages/rfonline/install-page.js",
        rfonlinePlayPage: "./pages/rfonline/play-page.js",
        rfonlineRatingsPage: "./pages/rfonline/ratings-page.js",
        rfonlinePatchnotesPage: "./pages/rfonline/patchnotes-page.js",
        rfonlineAuthPage: "./pages/rfonline/auth-page.js",
        referralPage: "./pages/referral-system-page.js",
        settings: "./pages/settings.js",
        socialNetworkPage: "./pages/social-network-page",
        socialRegisterPopup: "./pages/social-register-popup",
        socialWidget: "./pages/4gamer-social-widgets.js",
        spgPage: "./pages/single-player-games.js",
        userbar: "./pages/userbar.js",
        buffsPopup: "./pages/popups/buffs-popup.js",
        creditPage: "./pages/credit-page.js",
        paymentTerminalPopup: "./pages/payment-terminal-popup.js",
        specialPages: "./pages/special-pages.js",
        superSecurityPage: "./pages/super-security-page.js",
        legalPage: "./pages/legal-page.js",
        mainPage: "./pages/main-page.js",
        installGamePopup: "./pages/popups/install-game-popup.js",
        premiumPopup: "./pages/popups/premium-popup.js",
        pagattiPopup: "./pages/popups/pagatti-popup.js"
    },
    bootstrap: false,
    mocha: {},
    name: '4game-feature-tests',
    checkLayoutEnabled: process.env.CHECK_LAYOUT_ENABLED || 'true',
    checkLayoutEnableSyncDown: process.env.CHECK_LAYOUT_ENABLE_SYNC_DOWN || 'false',
    checkLayoutEnableSyncUp: process.env.CHECK_LAYOUT_ENABLE_SYNC_UP || 'false',
    testGame: process.env.MMO_GAME || "Pointblank",
    testMobileGame: process.env.MOBILE_GAME || "Pocketfort",
    testHitsGame: process.env.HITS_GAME || "TWWarhammer",
};
