'use strict';

var f1 = require('f1');
var f1Dom = require('f1-dom');
var eases = require('eases');
var SlotMachine = require('./f1-slot-machine');

// button bg defaults
var bgColor = '#2ecc71';
var borderRadius = 50;
var borderStyle = 'solid';
var borderColor = '#fff';
var borderWidth = 3;
var btnHeight = 71;

// button text defaults
var textColor = "#fff";
var copy = 'CONTINUE';
var fontSize = 16;
var padding = '25px 80px';

// button arrow defaults
var arrowColor = '#fff';
var arrowFontSize = '300%';

// create elements and append to dom.
var container = document.body;
container.style.backgroundColor = "#ccc";

var bg = getBtnBg();
container.appendChild(bg);
var text = getBtnText();
bg.appendChild(text);
var arrow = getBtnArrow();
bg.appendChild(arrow);

var targs = {
    btn: bg,
    bg: bg,
    border: bg,
    text: text,
    icon: arrow
};

//console.log('background color: ',bg.getComputedStyle().backgroundColor);

var styl = window.getComputedStyle( bg ,null).getPropertyValue('width');
console.log('style: ',styl);

// initialize f1 instance for ui element.
bg.ui = f1(SlotMachine({
        targets: targs,
        states: {
            //over: {
            //    border: {
            //        borderColor: [256, 256, 256]
            //    },
            //    bg: {
            //        backgroundColor: [0, 0, 256]
            //        //backgroundColor: [36, 182, 98]
            //    },
            //    text: {
            //        color: [256, 256, 256]
            //    },
            //    icon: {
            //        position: getIconOverPosition(targs),
            //        color: [256, 256, 256]
            //    }
            //}
            //down: {
            //    border: {
            //        borderColor: [23, 149, 76]
            //    },
            //    bg: {
            //        backgroundColor: [36, 182, 98]
            //    },
            //    text: {
            //        color: [23, 149, 76]
            //    },
            //    icon: {
            //        position: getIconOverPosition(targs),
            //        color: [23, 149, 76]
            //    }
            //},
            //selected: {
            //    border: {
            //        borderColor: [256, 256, 256]
            //    },
            //    bg: {
            //        backgroundColor: [46, 204, 114]
            //    },
            //    text: {
            //        color: [256, 256, 256]
            //    },
            //    icon: {
            //        position: getIconOffPosition(targs),
            //        color: [256, 256, 256]
            //    }
            //}
        },
        transitions: [
            // from: 'off' transitions.
            // 'off' can go to 'over'.
            //{
            //    from: 'off',
            //    to: 'over',
            //    animation: {
            //        duration:.3,
            //        ease: eases.ExpoInOut,
            //        bg:{
            //            backgroundColor: {
            //                duration:.4
            //            }
            //        },
            //        icon: {
            //            duration: 3
            //        }
            //    }
            //},
            //// from: 'over' transitions.
            //// 'over' can go to 'down' & 'off'.
            //{
            //    from: 'over',
            //    to: 'down',
            //    animation: {
            //        duration:.3,
            //        ease: eases.ExpoInOut
            //    }
            //},
            //{
            //    from: 'over',
            //    to: 'off',
            //    animation: {
            //        duration:.3,
            //        ease: eases.ExpoInOut
            //    }
            //},
            //// from: 'down' transitions.
            //// 'down' can go to 'over' & 'off'.
            //{
            //    from: 'down',
            //    to: 'over',
            //    animation: {
            //        duration:.3,
            //        ease: eases.ExpoInOut
            //    }
            //},
            //{
            //    from: 'down',
            //    to: 'off',
            //    animation: {
            //        duration:.3,
            //        ease: eases.ExpoInOut
            //    }
            //},
            //{
            //    from: 'selected',
            //    to: 'off',
            //    animation: {
            //        duration:.2,
            //        ease: eases.ExpoInOut
            //    }
            //}
        ]
    }, {

    offBgBackgroundColor: [46, 204, 114],
    offBorderBorderColor: [256, 256, 256],
    offIconPosition: [324, 27, 0],
    offIconColor: [256, 256, 256],
    offTextColor: [256, 256, 256],

    overBgBackgroundColor: [36, 182, 98],
    overIconPosition: [188, 27, 0],

    downBorderBorderColor: [23, 149, 76],
    downIconColor: [23, 149, 76],
    downTextColor: [23, 149, 76],

    //defaultDuration: 3


    })).
    parsers(f1Dom).
    parsers({
        update: [require('./lib/borderColor')]
    }).
    init('off');

//console.log(getBtnTextPosition(text));

function getBtnBg(opts){

    opts = opts || {};

    var el = document.createElement('button');
    el.style.boxSizing = 'border-box';
    el.style.display = 'block';
    el.style.height = (opts.btnHeight || btnHeight) + 'px';
    el.style.padding = opts.padding || padding;
    el.style.backgroundColor = opts.bgColor || bgColor;
    el.style.borderRadius = (opts.borderRadius || borderRadius) + 'px';
    el.style.borderStyle = opts.borderStyle || borderStyle;
    el.style.borderColor = opts.borderColor || borderColor;
    el.style.borderWidth = (opts.borderWidth || borderWidth) + 'px';
    el.style.overflow = opts.overflow || 'hidden';
    el.style.outline = 'none';
    el.style.position = 'relative';
    el.setAttribute('id','bg');

    el.addEventListener('mouseenter', onOver);
    el.addEventListener('mouseleave', onOff);
    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseup', onUp);
    /*el.addEventListener('touchstart', onTouchstart);
    el.addEventListener('touchend', onTouchend);*/
    el.addEventListener('click', onClick);

    return el;
}

function getBtnArrow(opts){

    opts = opts || {};

    var iconCode = opts.iconCode || '&#8594;';
    var el = document.createElement('div');
    el.style.fontSize = opts.arrowFontSize || arrowFontSize;
    el.style.color = opts.arrowColor || arrowColor;
    el.style.width = '33px';
    el.style.height = '16px';
    el.style.position = 'absolute';
    el.innerHTML = iconCode;
    el.style.lineHeight = '.5em';
    el.style.top = '50%';
    //el.style.marginTop = '-8px';
    //el.style.left = '130%';
    el.style.left = '76%';
    el.setAttribute('id','arrow');

    return el;
}

function getBtnText(opts){

    opts = opts || {};

    var el = document.createElement('div');
    el.style.fontSize = (opts.fontSize || fontSize) + 'px';
    el.style.color = opts.textColor || textColor;
    el.innerHTML = opts.copy || copy;
    el.setAttribute('id','text');

    return el;
}

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

function onClick(e){
    //console.log('onClick, target: ', e.target);
    //console.log('from: ',e.target.ui.state,', to: off');
    /*if(e.target.ui.state === 'selected'){
        e.currentTarget.ui.go('over');
    }else{
        e.currentTarget.ui.go('over');
    }*/
}

var isSelected = false;

function onOff(e){

    if(!isSelected){
        console.log('onOff(), from: ',e.currentTarget.ui.state,', to: ','off');
        e.currentTarget.ui.go('off');
    }
}

function onOver(e){

    if(!isSelected){
        console.log('onOver(), from: ',e.currentTarget.ui.state,', to: ','over');
        e.currentTarget.ui.go('over');
    }
}

function onDown(e){
    console.log('onDown(), from: ',e.currentTarget.ui.state,', to: ','down');
    //isSelected = !isSelected;
    e.currentTarget.ui.go('down');
}

function onUp(e){
    //var state = (e.currentTarget.ui.state !== 'selected') ? 'selected' : 'over';
    //console.log('onUp(), from: ',e.currentTarget.ui.state,', to: ',state);

    if(!isSelected){
        console.log('onUp(), from: ',e.currentTarget.ui.state,', to: ','over');
        e.currentTarget.ui.go('over');
    }

}

function onTouchstart(e){
    //var state = (e.currentTarget.ui.state !== 'selected') ? 'selected' : 'over';
    //console.log('onUp(), from: ',e.currentTarget.ui.state,', to: ',state);
    console.log('onTouchstart(), from: ',e.currentTarget.ui.state,', to: ','touchstart');
    e.currentTarget.ui.go('touchstart');

}

function onTouchend(e){
    //var state = (e.currentTarget.ui.state !== 'selected') ? 'selected' : 'over';
    //console.log('onUp(), from: ',e.currentTarget.ui.state,', to: ',state);
    console.log('onTouchend(), from: ',e.currentTarget.ui.state,', to: ','touchend');
    e.currentTarget.ui.go('touchend');

}
