var express = require('express');
var gpio = require("rpi-gpio");
var router = express.Router();

router.get('/', function(req, res, next) {

    gpio.setup(7, gpio.DIR_IN, readInput);

    function readInput() {
        gpio.read(7, function(err, value) {
            console.log('The value is ' + value);
            res.status(200);
            res.send("Value is " + value);
        });
    }
});

module.exports = router;
