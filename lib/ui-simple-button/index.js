'use strict';

var deepExtend = require('deep-extend');
var defaultEase = require('eases/expo-in-out');
var mergeArray = require('./deep-extend-array');
var uniq = require('lodash.uniq');

module.exports = function (settings, opts) {

    settings = settings || {};
    settings.states = settings.states || {};
    settings.transitions = settings.transitions || [];

    if(!settings.targets || (Object.keys(settings.targets).length < 1)) throw new Error('You need to supply f1-slot-machine a target(s).');

    // Parses through opts values and returns a states object that overrides state props in settings.
    var getOptStateValues = function(opts){
        var optsList = Object.keys(opts);
        optsList = optsList.filter(function(optsItem){
            return typeof optsItem !== 'function';
        });
        var states = {};
        for(var i = 0; i < optsList.length; i++){
            var stateTargPropArr = optsList[i].split(/(?=[A-Z])/);
            var stateName = stateTargPropArr[0];
            if (stateName.match(/^(off|over|down|selected|disabled|touchstart|touchend)$/) && stateTargPropArr.length >= 3) {
                if(!states[stateName]) states[stateName] = {};
                var targetName = stateTargPropArr[1].toLowerCase();
                if(!states[stateName][targetName])   states[stateName][targetName] = {};
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
        defaultTargets: ['background','border','text','icon'],  // getStates() will use these if no targets are provided.
        debug: true,
        slotMachine: true,

        /*---------------*/

        offButtonAlpha: 1,
        TouchstartButtonAlpha:.5,

        offBackgroundBackgroundColor: [0, 0, 256],
        offBorderBorderColor: [256, 256, 0],
        offIconPosition: [0, 0, 0],
        offIconColor: [0, 256, 0],
        offTextColor: [256, 0, 0]

        /*overBackgroundBackgroundColor: [36, 182, 98],
        overBorderBorderColor: [256, 256, 256],
        overIconPosition: [188, 27, 0],
        overIconColor: [256, 256, 256],
        overTextColor: [256, 256, 256],

        downBackgroundBackgroundColor: [36, 182, 98],
        downBorderBorderColor: [23, 149, 76],
        downIconPosition: [188, 27, 0],
        downIconColor: [23, 149, 76],
        downTextColor: [23, 149, 76],

        selectedBackgroundBackgroundColor: [36, 182, 98],
        selectedBorderBorderColor: [23, 149, 76],
        selectedIconPosition: [188, 27, 0],
        selectedIconColor: [23, 149, 76],
        selectedTextColor: [23, 149, 76],

        disabledBackgroundBackgroundColor: [36, 182, 98],
        disabledBorderBorderColor: [23, 149, 76],
        disabledIconPosition: [188, 27, 0],
        disabledIconColor: [23, 149, 76],
        disabledTextColor: [23, 149, 76],

        TouchendButtonAlpha: 1,
        TouchendButtonTransform: [1, 1, 1],
        TouchendBackgroundBackgroundColor: [46, 204, 114],
        TouchendBorderBorderColor: [256, 256, 256],
        TouchendIconPosition: [324, 27, 0],
        TouchendIconColor: [256, 256, 256],
        TouchendTextColor: [256, 256, 256],

        TouchstartButtonAlpha:.5,
        TouchstartButtonTransform: [1, 1, 1],
        TouchstartBackgroundBackgroundColor: [46, 204, 114],
        TouchstartBorderBorderColor: [256, 256, 256],
        TouchstartIconPosition: [324, 27, 0],
        TouchstartIconColor: [256, 256, 256],
        TouchstartTextColor: [256, 256, 256]*/


    }, (opts || {}));


    var getBackgroundProps = opts.getBackgroundProps || function(opts, stateName){

            var defaultBackgroundColor = (stateName === 'down') ? (opts.overBackgroundBackgroundColor || opts.offBackgroundBackgroundColor) : opts.offBackgroundBackgroundColor;

            return {
                backgroundColor: opts[stateName+'BackgroundBackgroundColor'] || defaultBackgroundColor
            };
        };

    var getBorderProps = opts.getBorderProps || function(opts, stateName){

            var defaultBorderColor = (stateName === 'down') ? (opts.overBorderBorderColor || opts.offBorderBorderColor) : opts.offBorderBorderColor;
            return  {
                borderColor: opts[stateName+'BorderBorderColor'] || defaultBorderColor
            }
    };

    var getTextProps = opts.getTextProps || function(opts, stateName){

            var defaultTextColor = (stateName === 'down') ? (opts.overTextColor || opts.offTextColor) : opts.offTextColor;
            return {
                color: opts[stateName+'TextColor'] || defaultTextColor
            };
        };

    var getIconProps = opts.getIconProps || function(opts, stateName){

            return {
                color: opts[stateName+'IconColor'] || opts.offIconColor
            };
        };

    var getButtonProps = opts.getButtonProps || function(opts, stateName){

            return {
                alpha: opts[stateName+'ButtonAlpha'] || opts.offButtonAlpha
            };
        };

    var getStates = function(statesList){
        var states = {};

        var targetsList = (!settings.targets || (Object.keys(settings.targets).length < 1)) ? opts.targets : Object.keys(settings.targets);

        for(var i = 0; i < statesList.length; i++){

            states[statesList[i]] = {};
            var state = states[statesList[i]];

            var stateName = statesList[i];

            // need to check for touchstart and default to touchend if defined, then default to off.

            for(var t = 0; t < targetsList.length; t++){

                if(targetsList[t] === 'background'){

                    state.background = getBackgroundProps(opts, stateName);

                } else if(targetsList[t] === 'border'){

                    state.border = getBorderProps(opts, stateName);

                } else if(targetsList[t] === 'text'){

                    state.text = getTextProps(opts, stateName);

                } else if(targetsList[t] === 'icon'){

                    state.icon = getIconProps(opts, stateName);

                } else if(targetsList[t] === 'button'){

                    state.button = getButtonProps(opts, stateName);
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