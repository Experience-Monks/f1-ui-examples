'use strict';

var f1SimpleButton = require('../lib/f1-simple-button');


// create elements and append to dom.
var container = document.body;
container.style.backgroundColor = "#ccc";

var slotPosRightDirLeft = f1SimpleButton({
    offBgBackgroundColor: [46, 204, 114],
    offBorderBorderColor: [256, 256, 256],
    offIconPosition: [324, 27, 0],
    offIconColor: [256, 256, 256],
    offTextColor: [256, 256, 256],

    overBgBackgroundColor: [36, 182, 98],
    overIconPosition: [188, 27, 0],

    downBorderBorderColor: [23, 149, 76],
    downIconColor: [23, 149, 76],
    downTextColor: [23, 149, 76]
});

container.appendChild(slotPosRightDirLeft.bg);




