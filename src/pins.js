var express = require("express");
var schedule = require('node-schedule');
var router = express.Router();
var gpio = require('../lib/gpio.js');

router.post('/switch/:status', function (req, res) {
    var status = req.params.status;
    gpio.pinSetup(4, 'out', function () {
        if (status != 1 && status != 0) {
            res.status(400);
            res.send('ERROR');
        } else {
            gpio.pinWrite(4, status, function () {
                //pinUnexport(4);
                res.status(200);
                res.send("OK");
            });
        }
    });
});

router.post('/brew/:seconds', function (req, res) {
    var seconds = req.params.seconds;
    gpio.pinSetup(4, 'out', function () {
        gpio.pinWrite(4, 1, function () {
            //pinUnexport(4);
            res.status(200);
            res.send("OK");
            setTimeout(function () {
                gpio.pinUnexport(4);
            }, seconds * 1000);
        });

    });
});

router.post('/schedule/:hours/:minutes/:seconds', function (req, res) {
    var hours = req.params.hours;
    var minutes = req.params.minutes;
    var seconds = req.params.seconds;
    res.status(200);
    res.send(minutes + ' ' + hours + ' * * *');
    schedule.scheduleJob(minutes + ' ' + hours + ' * * *', function() {
        console.log('Listo!');
    });
});

module.exports = router;