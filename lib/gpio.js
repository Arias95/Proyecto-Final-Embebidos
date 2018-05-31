var process = require('child_process');
var filesys = require('fs');
var gpio = {};

gpio.sysPath = '/sys/class/gpio/';

gpio.pinSetup = (pinNum, direction, callback) => {
    process.exec('echo ' + pinNum + ' > ' + gpio.sysPath + 'export ; echo '
        + direction + ' > ' + gpio.sysPath + 'gpio' + pinNum + '/direction',
        (err, stdout, stderr) => {
            callback(err);
        });
}

gpio.pinUnexport = (pinNum, callback) => {
    process.exec('echo ' + pinNum + ' > ' + gpio.sysPath + 'unexport', (err, stdout, stderr) => {
        callback(err);
    });
}

gpio.pinWrite = (pinNum, value, callback) => {
    process.exec('echo ' + value + ' > ' + gpio.sysPath + 'gpio' + pinNum + '/value', (err, stdout, stderr) => {
        callback(err);
    });
}

gpio.pinRead = (pinNum, callback) => {
    filesys.readFile(gpio.sysPath + 'gpio' + pinNum + '/value', { encoding: 'utf-8' }, (err, data) => {
        callback(err, data);
    });
}

module.exports = gpio;