var express = require('express');
var gpio = require("rpi-gpio");
var router = express.Router();

router.get('/', function(req, res, next) {

    gpio.setup(7, gpio.DIR_IN, readInput);

    var previousValue = false;
    var timestampLastChange = 0;

    function readInput() {
        gpio.read(7, function(err, currentValue) {
            console.log('The value is ' + currentValue);

            if(previousValue != currentValue){
                previousValue = currentValue;
                timestampLastChange = getCurrentTimeInSeconds();
            }

            var lastChange = getCurrentTimeInSeconds() - timestampLastChange;
            res.status(200);
            res.send({"currentState" : currentValue, "lastChanged" : lastChange});

        });
    }

    function getCurrentTimeInSeconds() {
        return Math.round(new Date() / 1000);
    }
});

module.exports = router;
