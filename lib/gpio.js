var process = require('child_process');
var gpio = {};

gpio.pinSetup = function (pinNum, direction, callback) {
    var sysPath = '/sys/class/gpio/';
    process.exec('echo ' + pinNum + ' > ' + sysPath + 'export ; echo '
        + direction + ' > ' + sysPath + 'gpio' + pinNum + '/direction',
        (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log('Pin ' + pinNum + ' successfully exported!');
                callback();
            }
        });
}

gpio.pinUnexport = function (pinNum) {
    var sysPath = '/sys/class/gpio/';
    process.exec('echo ' + pinNum + ' > ' + sysPath + 'unexport', (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('Pin ' + pinNum + ' unexported!');
            return;
        }
    });
}

gpio.pinWrite = function (pinNum, value, callback) {
    var sysPath = '/sys/class/gpio/gpio';
    process.exec('echo ' + value + ' > ' + sysPath + pinNum + '/value', (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('Wrote ' + value + ' on pin ' + pinNum);
            callback();
        }
    });
}

module.exports = gpio;