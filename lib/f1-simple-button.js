'use strict';
var btnParser = require('./ui-simple-button/dom-parser');
var f1 = require('f1');
var f1Dom = require('f1-dom');
var eases = require('eases');
var SimpleButtonUI = require('./ui-simple-button');


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


function SimpleButton(opts){

    if(!(this instanceof SimpleButton)) {
        return new SimpleButton(opts);
    }

    opts = opts || {};

    this.isSelected = false;

    this.bg = this.getBtnBg(opts);
    this.text = this.getBtnText(opts);
    this.icon = this.getBtnArrow(opts);

    this.bg.appendChild(this.text);
    this.bg.appendChild(this.icon);

    var targets = {
        btn: this.bg,
        bg: this.bg,
        border: this.bg,
        text: this.text,
        icon: this.icon
    };

    var defaultStates = btnParser(targets, {
        type: 'simple', // maybe other type of slotMachine is 'double'. So bg and text and icon get cloned and states set up for them.
        slotMachine: true,
        iconPosition: 'right',
        iconDirection: 'left'
    });

    console.log('defaultStates: ',defaultStates);

    this.ui = f1(SimpleButtonUI({
        targets: targets
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
        downTextColor: [23, 149, 76]

        //defaultDuration: 3

    })).
        parsers(f1Dom).
        parsers({
            update: [require('./borderColor')]
        }).
        init('off');

}

SimpleButton.prototype.getBtnBg = function(opts){

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

    el.addEventListener('mouseenter', this.onOver.bind(this));
    el.addEventListener('mouseleave', this.onOff.bind(this));
    el.addEventListener('mousedown', this.onDown.bind(this));
    el.addEventListener('mouseup', this.onUp.bind(this));
    //el.addEventListener('touchstart', this.onTouchstart);
    // el.addEventListener('touchend', this.onTouchend);
    //el.addEventListener('click', this.onClick);

    return el;
};

SimpleButton.prototype.getBtnText = function(opts){

    opts = opts || {};

    var el = document.createElement('div');
    el.style.fontSize = (opts.fontSize || fontSize) + 'px';
    el.style.color = opts.textColor || textColor;
    el.innerHTML = opts.copy || copy;
    el.setAttribute('id','text');

    return el;
};

SimpleButton.prototype.getBtnArrow = function(opts){

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
};


SimpleButton.prototype.onOff = function(e){

    if(!this.isSelected){
        console.log('onOff(), from: ',this.ui.state,', to: ','off');
        this.ui.go('off');
    }
};

SimpleButton.prototype.onOver = function(e){
    console.log('this.ui: ',this);
    if(!this.isSelected){
        console.log('onOver(), from: ',this.ui.state,', to: ','over');
        this.ui.go('over');
    }
};

SimpleButton.prototype.onDown = function(e){
    console.log('onDown(), from: ',this.ui.state,', to: ','down');
    //isSelected = !isSelected;
    this.ui.go('down');
};

SimpleButton.prototype.onUp = function(e){
    //var state = (this.ui.state !== 'selected') ? 'selected' : 'over';
    //console.log('onUp(), from: ',this.ui.state,', to: ',state);

    if(!this.isSelected){
        console.log('onUp(), from: ',this.ui.state,', to: ','over');
        this.ui.go('over');
    }

};

SimpleButton.prototype.onTouchstart = function(e){
    //var state = (this.ui.state !== 'selected') ? 'selected' : 'over';
    //console.log('onUp(), from: ',this.ui.state,', to: ',state);
    console.log('onTouchstart(), from: ',this.ui.state,', to: ','touchstart');
    this.ui.go('touchstart');

};

SimpleButton.prototype.onTouchend = function(e){
    //var state = (this.ui.state !== 'selected') ? 'selected' : 'over';
    //console.log('onUp(), from: ',this.ui.state,', to: ',state);
    console.log('onTouchend(), from: ',this.ui.state,', to: ','touchend');
    this.ui.go('touchend');

};

module.exports = SimpleButton;