'use strict';

var deepExtend = require('deep-extend');
var defaultEase = require('eases/expo-in-out');
var mergeArray = require('./deep-extend-array');
var uniq = require('lodash.uniq');

module.exports = function (settings, opts) {

    settings = settings || {};

    if(!settings.targets || (Object.keys(settings.targets).length < 1)) throw new Error('You need to supply f1-slot-machine a target(s).');

    // Parses through opts values and returns a states object that overrides state props in settings.
    var getOptStateValues = function(opts){
        var optsList = Object.keys(opts);
        var states = {};
        for(var i = 0; i < optsList.length; i++){
            var stateTargPropArr = optsList[i].split(/(?=[A-Z])/);
            var stateName = stateTargPropArr[0];
            if (stateName.match(/^(off|over|down|selected|disabled|touchstart|touchend)$/) && stateTargPropArr.length >= 3) {
                states[stateName] = {};
                var targetName = stateTargPropArr[1].replace(stateTargPropArr[1].charAt(0), stateTargPropArr[1].charAt(0).toLowerCase());
                states[stateName][targetName] = {};
                var propName = stateTargPropArr[2].replace(stateTargPropArr[2].charAt(0), stateTargPropArr[2].charAt(0).toLowerCase());
                if(stateTargPropArr.length > 3){
                    for(var p = 3; p < stateTargPropArr.length; p++){
                        propName+=stateTargPropArr[p];
                    }
                }
                states[stateName][targetName][propName] = opts[optsList[i]];

            }
        }

        return states;
    };

    settings.states = deepExtend(settings.states, getOptStateValues(opts));

    // override default options with user defined options.
    opts = deepExtend({

        /*---------------*/

        defaultDuration:.3,
        defaultEase: defaultEase, // ExpoInOut

        states: [],
        mouseStates: ['off','over','down', 'selected', 'disabled'],
        touchStates: ['touchstart', 'touchend', 'selected', 'disabled'],
        defaultTargets: ['bg','border','text','icon'],  // getStates() will use these if no targets are provided.
        debug: true,
        slotMachine: true,

        /*---------------*/

        offBtnAlpha: 1,
        TouchstartBtnAlpha:.5,

        offBgBackgroundColor: [0, 0, 256],
        offBorderBorderColor: [256, 256, 0],
        offIconPosition: [0, 0, 0],
        offIconColor: [0, 256, 0],
        offTextColor: [256, 0, 0]

        /*overBgBackgroundColor: [36, 182, 98],
        overBorderBorderColor: [256, 256, 256],
        overIconPosition: [188, 27, 0],
        overIconColor: [256, 256, 256],
        overTextColor: [256, 256, 256],

        downBgBackgroundColor: [36, 182, 98],
        downBorderBorderColor: [23, 149, 76],
        downIconPosition: [188, 27, 0],
        downIconColor: [23, 149, 76],
        downTextColor: [23, 149, 76],

        selectedBgBackgroundColor: [36, 182, 98],
        selectedBorderBorderColor: [23, 149, 76],
        selectedIconPosition: [188, 27, 0],
        selectedIconColor: [23, 149, 76],
        selectedTextColor: [23, 149, 76],

        disabledBgBackgroundColor: [36, 182, 98],
        disabledBorderBorderColor: [23, 149, 76],
        disabledIconPosition: [188, 27, 0],
        disabledIconColor: [23, 149, 76],
        disabledTextColor: [23, 149, 76],

        TouchendBtnAlpha: 1,
        TouchendBtnTransform: [1, 1, 1],
        TouchendBgBackgroundColor: [46, 204, 114],
        TouchendBorderBorderColor: [256, 256, 256],
        TouchendIconPosition: [324, 27, 0],
        TouchendIconColor: [256, 256, 256],
        TouchendTextColor: [256, 256, 256],

        TouchstartBtnAlpha:.5,
        TouchstartBtnTransform: [1, 1, 1],
        TouchstartBgBackgroundColor: [46, 204, 114],
        TouchstartBorderBorderColor: [256, 256, 256],
        TouchstartIconPosition: [324, 27, 0],
        TouchstartIconColor: [256, 256, 256],
        TouchstartTextColor: [256, 256, 256]*/


    }, (opts || {}));

    var getStates = function(statesList){
        var states = {};

        var targetsList = (!settings.targets || (Object.keys(settings.targets).length < 1)) ? opts.targets : Object.keys(settings.targets);

        for(var i = 0; i < statesList.length; i++){

            states[statesList[i]] = {};
            var state = states[statesList[i]];

            var stateName = statesList[i];

            // need to check for touchstart and default to touchend if defined, then default to off.

            for(var t = 0; t < targetsList.length; t++){

                if(targetsList[t] === 'bg'){
                    var defaultBackgroundColor = (stateName === 'down') ? (opts.overBgBackgroundColor || opts.offBgBackgroundColor) : opts.offBgBackgroundColor;
                    state.bg = {
                        backgroundColor: opts[stateName+'BgBackgroundColor'] || defaultBackgroundColor
                    }
                } else if(targetsList[t] === 'border'){
                    var defaultBorderColor = (stateName === 'down') ? (opts.overBorderBorderColor || opts.offBorderBorderColor) : opts.offBorderBorderColor;
                    state.border = {
                        borderColor: opts[stateName+'BorderBorderColor'] || defaultBorderColor
                    }
                } else if(targetsList[t] === 'text'){
                    var defaultTextColor = (stateName === 'down') ? (opts.overTextColor || opts.offTextColor) : opts.offTextColor;
                    state.text = {
                        color: opts[stateName+'TextColor'] || defaultTextColor
                    };
                } else if(targetsList[t] === 'icon'){
                    var defaultIconPosition = (stateName === 'down') ? (opts.overIconPosition || opts.offIconPosition) : opts.offIconPosition;
                    state.icon = {
                        color: opts[stateName+'IconColor'] || opts.offIconColor,
                        position: opts[stateName+'IconPosition'] || defaultIconPosition
                    };
                } else if(targetsList[t] === 'btn'){
                    state.btn = {
                        alpha: opts[stateName+'BtnAlpha'] || opts.offBtnAlpha
                    };
                }

            }

        }
        return deepExtend(states, (settings.states || {}));
    };

    settings.states = deepExtend(getStates(opts.mouseStates), getStates(opts.touchStates));
    settings.states = deepExtend(settings.states, getStates(opts.states));

    var getTransitions = function(states){

        var transitions = [];
        for(var i = 0; i < states.length; i++) {
            var fromState = states[i];
            for(var s = 0; s < states.length; s++){
                var toState = states[s];
                if(fromState !== toState) {
                    transitions.push({
                        from: fromState,
                        to: toState,
                        animation: {
                            duration: opts.defaultDuration,
                            ease: opts.defaultEase
                        }
                    })
                }
            }
        }

        if(settings.transitions){
            return mergeArray(transitions, settings.transitions, ['from', 'to']);
        } else {
            return transitions;
        }


    };

    var getCustomStatesList = function(states){

        // get all states that are not in 'touchStates' and not in 'mouseStates'.

        var customStates = [];
        var defaultStates =  uniq(opts.mouseStates).concat(opts.touchStates);
        var allStates = Object.keys(states);

        for(var i = 0; i < allStates.length; i++){
            var isCustom = true;
            for(var ds = 0; ds < defaultStates.length; ds++){
                if(defaultStates[ds] == allStates[i]) isCustom = false;
            }
            if(isCustom)   customStates.push(allStates[i]);
        }

        return customStates;
    };

    var customStates = getCustomStatesList(settings.states);
    var mouseStatesList = opts.mouseStates.concat(customStates);
    var touchStatesList = opts.touchStates.concat(customStates);

    settings.transitions = getTransitions(mouseStatesList).concat(getTransitions(touchStatesList));

    console.log('settings: ',settings);

    return settings;
};