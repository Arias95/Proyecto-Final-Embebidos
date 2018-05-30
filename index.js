var express = require('express');
var app = express();
var pin = require('./src/pins.js');
var gpio = require('./lib/gpio.js');

function handle(signal) {
    gpio.pinUnexport(4, (err) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log('Shutting down server...');
        process.exit(0);
    });
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);

app.get('/', function (req, res) {
    res.status(200);
    res.send('Hello World!');
});

app.use('/pin/', pin);

app.listen(8000, function () {
    gpio.pinSetup(4, 'out', (err, stdio) => {
        if (err) console.log(err);
        console.log('Server running on port 8000');
    })
});