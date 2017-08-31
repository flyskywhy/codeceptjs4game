'use strict';

var execSync = require('child_process').execSync;
var spawnSync = require('child_process').spawnSync;

var gmCheck = spawnSync('gm', ['version'], {
    encoding: "utf8"
});
if (typeof gmCheck.error != 'undefined') {
    console.log("GraphicsMagick wasn't installed. Please install GraphicsMagick before run tests: http://www.graphicsmagick.org/README.html")
    process.exit(-1);
}

var javaCheck = require('child_process').spawnSync('java', ['-version'], {
    encoding: "utf8"
});
if (typeof javaCheck.error != 'undefined') {
    console.log("Java wasn't installed. Please install java before run tests: http://www.oracle.com/technetwork/java/javase/downloads/index.html")
    process.exit(-1);
}

var phantomjsCheck = require('child_process').spawnSync('phantomjs', ['-h'], {
    encoding: "utf8"
});
if ((typeof phantomjsCheck.error != 'undefined') && (process.env.BROWSER == "phantomjs")) {
    console.log("Phantomjs wasn't installed or added to PATH. Please install Phantomjs before run tests on phantomjs: http://phantomjs.org/download.html")
    process.exit(-1);
}

var closeProcess = ['chrome.exe', 'firefox.exe', "iexplore.exe", "phantomjs.exe", "chromedriver", "geckodriver", "IEDriverServer"]

if (typeof process.env.GO_SERVER != 'undefined') {
    for (var i = 0; i < closeProcess.length; i++) {
        try {
            execSync("WMIC PROCESS WHERE 'Description like '%" + closeProcess[i] + "%'' DELETE", {
                cwd: "../",
                stdio: [0, 1, 2]
            });

        } catch (err) {
            if (err.error != null) {
                throw err;
            }
        }
    }
}

execSync('pm2 ping', {
    cwd: "../",
    stdio: [0, 1, 2]
});

execSync('pm2 stop ./4game-feature-tests/process.json', {
    cwd: "../",
    stdio: [0, 1, 2]
});
if (typeof process.env.proxy != 'undefined') {
    execSync('selenium-standalone install --drivers.ie.arch=ia32 --proxy=' + process.env.proxy, {
        stdio: [0, 1, 2]
    });
} else {
    execSync('selenium-standalone install --drivers.ie.arch=ia32', {
        stdio: [0, 1, 2]
    });
}
execSync('pm2 start ./4game-feature-tests/process.json', {
    cwd: "../",
    stdio: [0, 1, 2]
});


let params = '';
for (let i = 2; i < process.argv.length; i++) {
    params += ' ' + process.argv[i];
};

try {

    var child = execSync('npm run codeceptjs ' + params, {
        stdio: [0, 1, 2]
    })

} catch (error) {
    try {
        execSync('pm2 kill', {
            cwd: "../",
            stdio: [0, 1, 2]
        });
        return process.exit(-1);
    } catch (err) {
        if (err.error == null) {
            return process.exit(-1);
        } else {
            throw err;
        }
    }
}

if (typeof process.env.GO_SERVER != 'undefined') {
    for (var i = 0; i < closeProcess.length; i++) {
        try {
            execSync("WMIC PROCESS WHERE 'Description like '%" + closeProcess[i] + "%'' DELETE", {
                cwd: "../",
                stdio: [0, 1, 2]
            });

        } catch (err) {
            if (err.error != null) {
                throw err;
            }
        }
    }
}

try {

    execSync('pm2 kill', {
        cwd: "../",
        stdio: [0, 1, 2]
    });

} catch (err) {
    if (err.error == null) {
        return
    } else {
        throw err;
    }
}
