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
        console.log('\nShutting down server...');
        process.exit(0);
    });
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);

app.get('/', function (req, res) {
    res.status(200);
    res.send('Welcome to the Smart Coffee Maker! Say hi!');
});

app.use('/pin/', pin);

app.listen(8000, function () {
    gpio.pinSetup(4, 'out', (err, stdio) => {
        if (err) console.log(err);
        console.log('Server running on port 8000');
    })
});