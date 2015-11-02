'use strict';

var f1SimpleButton = require('../lib/f1-simple-button');


// create elements and append to dom.
var container = document.body;
container.style.backgroundColor = "#ccc";

var slotPosRightDirLeft = f1SimpleButton();
container.appendChild(slotPosRightDirLeft.bg);



function getBtnTextPosition(txt){
    return [txt.offsetLeft, txt.offsetTop, 0]
}

function getIconOverPosition(targs, opts){

    if(!targs)  console.warn('You need to supply "getIconOverPosition()", a target object.');

    opts = opts || {
            position: 'right',
            direction: 'left'
        };

    var edgeOfText = targs.text.offsetLeft + targs.text.offsetWidth;
    var availSpace = targs.bg.offsetWidth - edgeOfText - borderWidth;

    var left = edgeOfText + ((availSpace - targs.icon.offsetWidth) * .5);
    var top = (targs.bg.offsetHeight - targs.icon.offsetHeight) * .5;

    return [Math.floor(left), Math.floor(top), 0];
}

function getIconOffPosition(targs, opts){

    if(!targs)  console.warn('You need to supply "getIconOverPosition()", a target object.');

    opts = opts || {
            position: 'right',
            direction: 'left'
        };

    var left = targs.bg.offsetWidth * 1.3;
    var top = (targs.bg.offsetHeight - targs.icon.offsetHeight) * .5;

    return [left, top, 0];

}


