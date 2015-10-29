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
    bg: bg,
    text: text,
    icon: arrow
};

// initialize f1 instance for ui element.
bg.ui = f1(SlotMachine({
        targets: targs,
        states: {
            init: {
                bg: {
                    backgroundColor: [46, 204, 114],
                    borderColor: [256, 256, 256],
                    alpha: 0
                },
                text: {
                    color: [256, 256, 256]
                },
                icon: {
                    position: getIconOffPosition(targs),
                    color: [256, 256, 256]
                }
            },
            idle: {
                bg: {
                    backgroundColor: [46, 204, 114],
                    borderColor: [256, 256, 256],
                    alpha: 1
                },
                text: {
                    color: [256, 256, 256]
                },
                icon: {
                    position: getIconOffPosition(targs),
                    color: [256, 256, 256]

                }
            },
            over: {
                bg: {
                    backgroundColor: [36, 182, 98],
                    borderColor: [256, 256, 256],
                    alpha: 1
                },
                text: {
                    color: [256, 256, 256]
                },
                icon: {
                    position: getIconOverPosition(targs),
                    color: [256, 256, 256]
                }
            },
            down: {
                bg: {
                    backgroundColor: [36, 182, 98],
                    borderColor: [23, 149, 76],
                    alpha: 1
                },
                text: {
                    color: [23, 149, 76]
                },
                icon: {
                    position: getIconOverPosition(targs),
                    color: [23, 149, 76]
                }
            },
            up: {
                bg: {
                    backgroundColor: [36, 182, 98],
                    borderColor: [256, 256, 256],
                    alpha: 1
                },
                text: {
                    color: [256, 256, 256]
                },
                icon: {
                    position: getIconOverPosition(targs),
                    color: [256, 256, 256]
                }
            },
            off: {
                bg: {
                    backgroundColor: [46, 204, 114],
                    borderColor: [256, 256, 256],
                    alpha: 1
                },
                text: {
                    color: [256, 256, 256, 1]
                },
                icon: {
                    position: getIconOffPosition(targs),
                    color: [256, 256, 256]
                }
            },
            out: {
                bg: {
                    backgroundColor: [46, 204, 114],
                    borderColor: [256, 256, 256],
                    alpha: 0
                },
                text: {
                    color: [256, 256, 256]
                },
                icon: {
                    position: getIconOffPosition(targs),
                    color: [256, 256, 256]
                }
            }
        },
        transitions: [
            // from: 'init' transitions.
            // typically 'init' would only go to 'idle',
            // but there may be instances where the pointer is already over ('over' state) and the mouse btn is pressed as well ('down' state).
            {
                from: 'init',
                to: 'idle',
                animation: {
                    duration:.5
                }
            },
            {
                from: 'init',
                to: 'over',
                animation: {
                    duration:.3,
                    ease: eases.ExpoInOut
                }
            },
            {
                from: 'init',
                to: 'down',
                animation: {
                    duration:.3,
                    ease: eases.ExpoInOut
                }
            },
            // from: 'idle' transitions.
            // 'idle' can only go to 'over' state.
            {
                from: 'idle',
                to: 'over',
                animation: {
                    duration:.3,
                    ease: eases.ExpoInOut
                }
            },
            // from: 'over' transitions.
            // 'over' can go to 'down', 'off' & 'out'(animateOut), but not 'init', 'idle' and 'up'
            {
                from: 'over',
                to: 'down',
                animation: {
                    duration:.3,
                    ease: eases.ExpoInOut
                }
            },
            {
                from: 'over',
                to: 'off',
                animation: {
                    duration:.3,
                    ease: eases.ExpoInOut
                }
            },
            {
                from: 'over',
                to: 'out',
                animation: {
                    duration:.3
                }
            },
            // from: 'off' transitions.
            // 'off' can go to 'over' & 'out'(animateOut), but not 'init', 'idle', 'up'
            {
                from: 'off',
                to: 'init',
                animation: {
                    duration:.3
                }
            },
            {
                from: 'off',
                to: 'over',
                animation: {
                    duration:.3,
                    ease: eases.ExpoInOut
                }
            },
            // from: 'down' transitions.
            // 'down' can go to 'up', 'off' & 'out'(animateOut), but not 'init', 'idle', 'over'
            {
                from: 'down',
                to: 'up',
                animation: {
                    duration:.3,
                    ease: eases.ExpoInOut
                }
            },
            {
                from: 'down',
                to: 'over',
                animation: {
                    duration:.3,
                    ease: eases.ExpoInOut
                }
            },
            {
                from: 'down',
                to: 'off',
                animation: {
                    duration:.3,
                    ease: eases.ExpoInOut
                }
            },{
                from: 'down',
                to: 'out',
                animation: {
                    duration:.3
                }
            },
            // from: 'up' transitions.
            // 'up' can go to 'down', 'off' & 'out'(animateOut), but not 'init', 'idle', 'over'
            {
                from: 'up',
                to: 'down',
                animation: {
                    duration:.3,
                    ease: eases.ExpoInOut
                }
            },
            {
                from: 'up',
                to: 'off',
                animation: {
                    duration:.3,
                    ease: eases.ExpoInOut
                }
            },
            {
                from: 'up',
                to: 'off',
                animation: {
                    duration:.3,
                    ease: eases.ExpoInOut
                }
            },
            // from: 'out' transitions.
            // usually out doesn't go anywhere but on the off chance the target object is not destroyed
            // and is just 'hidden' then it can go to the same states as 'init'
            {
                from: 'out',
                to: 'idle',
                animation: {
                    duration:.5
                }
            },
            {
                from: 'out',
                to: 'over',
                animation: {
                    duration:.3,
                    ease: eases.ExpoInOut
                }
            },
            {
                from: 'out',
                to: 'down',
                animation: {
                    duration:.3,
                    ease: eases.ExpoInOut
                }
            }
        ]
    }, {
    btnWidth: 1,
    btnHeight: 1,

    bgOffColor: [],
    bgOverColor: [],
    bgDownColor: [],

    borderThickness: 3,
    borderOffColor: [],
    borderOverColor: [],
    borderDownColor: [],

    iconPosition: 'right',
    iconDirection: 'left',
    iconWidth: 1,
    iconHeight: 1,
    iconOffColor: [],
    iconOverColor: [],
    iconDownColor: [],

    textWidth: 1,
    textHeight: 1,
    textOffColor: [],
    textOverColor: [],
    textDownColor: []


    })).
    parsers(f1Dom).
    parsers({
        update: [require('./lib/borderColor')]
    }).
    init('init').
    go('idle');


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
    el.innerHTML = iconCode;
    el.style.lineHeight = '.5em';
    el.setAttribute('id','arrow');

    return el;
}

function getBtnText(opts){

    opts = opts || {};

    var el = document.createElement('span');
    el.style.fontSize = (opts.fontSize || fontSize) + 'px';
    el.style.color = opts.textColor || textColor;
    el.innerHTML = opts.copy || copy;
    el.setAttribute('id','text');

    return el;
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
}

function onOff(e){
    console.log('from: ',e.target.ui.state,', to: off');
    //console.log('onOff, target: ', e.target);
    e.currentTarget.ui.go('off');
}

function onOver(e){
    console.log('from: ',e.target.ui.state,', to: over');
    //console.log('onOver, target: ', e.target);
    e.currentTarget.ui.go('over');
}

function onDown(e){
    e.stopPropagation();
    console.log('from: ',e.currentTarget.ui.state,', to: down');
    //console.log('onDown, target: ', e.currentTarget);
    e.currentTarget.ui.go('down');
}

function onUp(e){
    console.log('from: ',e.currentTarget.ui.state,', to: over');
    //console.log('onUp, target: ', e.target);
    e.currentTarget.ui.go('over');
}
