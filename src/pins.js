var express = require("express");
var process = require('child_process');
var router = express.Router();


function pinSetup(pinNum, direction, callback) {
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

function pinUnexport(pinNum) {
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

function pinWrite(pinNum, value, callback) {
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

router.post('/switch/:status', function (req, res) {
    var status = req.params.status;
    pinSetup(4, 'out', function () {
        if (status != 1 && status != 0) {
            res.status(400);
            res.send('Status value must be 1 or 0.');
        } else {
            pinWrite(4, status, function () {
                //pinUnexport(4);
                res.status(200);
                res.send("Writing successful!");
            });
        }
    });
});

module.exports = router;