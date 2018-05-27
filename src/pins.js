var express = require("express");
var process = require('child_process');
var router = express.Router();


router.post('/switch/:status', function (req, res) {
    var sysPath = '/sys/class/gpio/gpio4/value'
    process.exec('echo Holaaa', (err, stdout, stderr) => {
        if (err) {
            res.status(400);
            res.send(err)
            return;
        }
        res.status(200);
        res.send(stdout);
    });

});

module.exports = router;