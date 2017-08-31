'use strict';

var execSync = require('child_process').execSync;

execSync('selenium-standalone start --drivers.ie.arch=ia32');
