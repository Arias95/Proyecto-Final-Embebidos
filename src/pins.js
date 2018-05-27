var express = require("express");
var router = express.Router();
var gpio = require('../lib/gpio.js');

router.post('/switch/:status', function (req, res) {
    var status = req.params.status;
    gpio.pinSetup(4, 'out', function () {
        if (status != 1 && status != 0) {
            res.status(400);
            res.send('Status value must be 1 or 0.');
        } else {
            gpio.pinWrite(4, status, function () {
                //pinUnexport(4);
                res.status(200);
                res.send("Writing successful!");
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
            res.send("Starting to brew!");
            setTimeout(function () {
                gpio.pinUnexport(4);
            }, seconds * 1000);
        });

    });
});

module.exports = router;