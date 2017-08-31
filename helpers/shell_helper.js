'use strict';

const spawn = require('child_process').spawnSync;
const parse = require('csv-parse/lib/sync');
const assert = require('assert');


class Shell extends Helper {

    _failed(test) {
        return;
    }

    // Запуск команды. Параметры должны быть в массиве.
    _runShellCommand(name, params) {
        let cmd = spawn(name, params, {
            shell: true
        });
        return cmd
    }

    // Получение данных через tasklist
    _getProcessData(name) {
        let cmd = this._runShellCommand('tasklist', ['/FI', '"IMAGENAME eq ' + name + '"', '/FO', 'CSV', ]);
        return parse(cmd.output.toString().split('\r\n').slice(1, -1), {
            skip_empty_lines: true
        })
    }

    // Убиваем процесс по имени
    _killProcess(name) {
        let cmd = this._runShellCommand('taskkill', ['/F', '/IM', name]);
        return parse(cmd.output.toString().split('\r\n').slice(1, -1), {
            skip_empty_lines: true
        })
    }

    // Получение данных о параметрах запуска процесса
    _getCommandLineData(pid) {
        let cmd = spawn('wmic', ['path', 'Win32_Process', 'where', 'handle="' + pid + '"', 'get', 'commandline', '/format:csv'], {
            shell: true
        });
        let result = cmd.output.toString().slice(1, -1).split('\r\r\n').slice(2, -1)
        return result[0].split(',')[1]
    }

    // Ожидание получения данных процесса
    _waitForProcessData(name, timeout) {
        var run = [];
        var end = Date.now() + timeout * 1000;
        while (Date.now() <= end) {
            run = this._getProcessData(name);
            if (run.length > 0) break;
        };
        return run
    }

    // Ожидание отсутствия данных процесса
    _waitForNoProcessData(name, timeout) {
        var run = [];
        var end = Date.now() + timeout * 1000;
        while (Date.now() <= end) {
            run = this._getProcessData(name);
            if (run.length == 0) break;
        };
        return run
    }

    // Ожидание наличия процесса (с таймаутом). Если таймаут не указан - будет ждать 30 s
    waitForProcess(name, timeout) {
        let data = this._waitForProcessData(name, timeout);
        assert.notEqual([], data, "Process " + name + " not found in " + timeout + " seconds");
        return data
    }


    // Ожидание закрытия процесса (с таймаутом). Если таймаут не указан - будет ждать 30 s
    waitForProcessClose(name, timeout) {
        let data = this._getProcessData(name);
        this._killProcess(name);
        let result = this._waitForNoProcessData(name, timeout);
        assert.notEqual(data, result, "Process " + name + " exists after timeout");
        return result
    }

    // Получаем параметры запуска процесса
    getProcessCommandLine(name, timeout) {
        let data = this._getProcessData(name);
        assert.notEqual([], data, "Process " + name + " not found");
        let pid = parseInt(data[0][1]);
        let cmdline = this._getCommandLineData(pid);
        let result = cmdline.split(' ');
        return result
    }

    stopGameService() {
        let data = this._getProcessData('4game-service.exe');
        this._runShellCommand("net stop 4game-service");
        let result = this._waitForNoProcessData('4game-service.exe', 3);
        assert.notEqual(data, result, "Failed to stop 4game service");
        return result
    }

    startGameService() {
        let pid = this._getProcessData('4game-service.exe');
        this._runShellCommand("net start 4game-service");
        let result = this.waitForProcess('4game-service.exe', 3);
        assert.notEqual(0, result, "Failed to stop 4game service");
        return result
    }
}

module.exports = Shell;
