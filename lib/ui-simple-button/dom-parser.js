'use strict';
module.exports = function (targs, opts) {
    // takes targets and parses out f1 friendly values

    //defaults

    opts = {
        type: opts.type || 'simple',
        slotMachine: opts.slotMachine || false,
        iconPosition: opts.iconPosition || 'right',
        iconDirection: opts.iconDirection || 'left'
    };

    /*offBgBackgroundColor: [46, 204, 114],
     offBorderBorderColor: [256, 256, 256],
     offIconPosition: [324, 27, 0],
     offIconColor: [256, 256, 256],
     offTextColor: [256, 256, 256],

     overBgBackgroundColor: [36, 182, 98],
     overIconPosition: [188, 27, 0],

     downBorderBorderColor: [23, 149, 76],
     downIconColor: [23, 149, 76],
     downTextColor: [23, 149, 76]*/

    var getBgBackgroundColor = function(bg){
        return window.getComputedStyle(bg, null).getPropertyValue("background-color");
    };

    var states = {};
    states.off = {};

    if(targs.bg){
        states.off.bg = {
            backgroundColor: getBgBackgroundColor(targs.bg)
        }
    }



    return states;

};

/*
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

}*/
