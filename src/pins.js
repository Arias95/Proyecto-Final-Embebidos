var express = require("express");
var router = express.Router();
var gpio = require('../lib/gpio.js');

router.get('/status', function (req, res) {
    console.log("Client GET on /pin/status");
    gpio.pinRead(4, function (data) {
        res.status(200);
        res.send(data);
    });
});

router.post('/switch/:status', function (req, res) {
    var status = req.params.status;
    console.log("Client POST on /pin/switch/ with value " + status);
    if (status != 0 && status != 1) {
        res.status(400);
        res.send("WRONG");
    } else {
        gpio.pinWrite(4, status, (err) => {
            if (err) {
                res.status(500);
                res.send(err);
            }
            res.status(200);
            res.send("OK");
        });
    }
});

router.post('/brew/:seconds', function (req, res) {
    var seconds = req.params.seconds;
    console.log("Client POST on /pin/brew/ with value " + seconds);
    gpio.pinRead(4, (err, data) => {
        if (err) {
            res.status(500);
            res.send(err);
        } else if (data == 1) {
            res.status(200);
            res.send("BUSY");
        } else {
            gpio.pinWrite(4, 1, (err) => {
                if (err) {
                    res.status(500);
                    res.send(err);
                }
                res.status(200);
                res.send("OK");
                setTimeout(() => {
                    gpio.pinWrite(4, 0, (err) => {
                        if (err) console.log(err);
                        else console.log("Coffee done!");
                    });
                }, seconds * 1000);
            });
        }
    });
});

module.exports = router;