var express = require('express');
var app = express();
var pin = require('./src/pins.js');
var gpio = require('./lib/gpio.js');

app.get('/', function (req, res) {
    res.status(200);
    res.send('Hello World!');
});

app.use('/pin/', pin);

app.listen(8000, function () {
    console.log('Server running on port 8000');
});