var express = require('express');
var app = express();
var pin = require('./src/pins.js');

app.use('/pin/', pin);

app.get('/', function (req, res) {
    res.status(200);
    res.send('Hello World!');
});

app.listen(8000, function () {
    console.log('Server running on port 8000');
});