'use strict';

const Registry = require('winreg');

class WinReg extends Helper {

    _failed(test) {
        return;
    }
    
    /* Запись всех строковых значений из объекта values в ветку реестра key, находящуюся в кусте hive
       ключ реестра сначала создается, затем очищается (если у же существует).
       
       Пример:
       I.regWriteAllValues('HKLM', '\\Software\\Test', { "test_name": "test_value" });
       справка по winreg - http://fresc81.github.io/node-winreg/Registry.html
    */
    writeValuesToRegistry(hive, key, values) {
        let valKeys = Object.keys(values);
        if (process.arch == 'x64') {
            var regKey = new Registry({
                hive: Registry[hive],
                key: key,
                arch: 'x86'
            });
        } else {
            var regKey = new Registry({
                hive: Registry[hive],
                key: key
            });
        }
        regKey.create(function (err) {
            if (err)
                console.log('ERROR: '+err);
        });
        regKey.clear(function (err) {
            if (err)
                console.log('ERROR: '+err);
        });
        valKeys.forEach(function (valkey) {
            regKey.set(valkey, "REG_SZ", values[valkey],  function (err) {
                if (err)
                    console.log('ERROR: '+err);
                });
        });
    }
    
  
}

module.exports = WinReg;
