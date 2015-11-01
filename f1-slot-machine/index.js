'use strict';

var deepExtend = require('deep-extend');
var eases = require('eases');
var mergeArray = require('../lib/deep-merge-array');
var uniq = require('lodash.uniq');

module.exports = function (settings, opts) {

    settings = settings || {};

    if(!settings.targets || (Object.keys(settings.targets).length < 1)) throw new Error('You need to supply f1-slot-machine a target(s).');

    opts = deepExtend({
        btnWidth: 250,
        btnHeight: 71,

        bgOffColor: [46, 204, 114],
        bgOverColor: [36, 182, 98],
        bgDownColor: [36, 182, 98],
        bgSelectedColor: [36, 182, 98],
        bgDisabledColor: [36, 182, 98],

        borderOffColor: [256, 256, 256],
        borderOverColor: [256, 256, 256],
        borderDownColor: [23, 149, 76],
        borderSelectedColor: [23, 149, 76],
        borderDisabledColor: [23, 149, 76],

        iconPosition: 'right',
        iconDirection: 'left',
        iconOffPosition: [324, 27, 0],
        iconOverPosition: [188, 27, 0],
        iconDownPosition: [188, 27, 0],
        iconSelectedPosition: [188, 27, 0],
        iconDisabledPosition: [188, 27, 0],

        iconWidth: 33,
        iconHeight: 16,
        iconOffColor: [256, 256, 256],
        iconOverColor: [256, 256, 256],
        iconDownColor: [23, 149, 76],
        iconSelectedColor: [23, 149, 76],
        iconDisabledColor: [23, 149, 76],

        textWidth: 83,
        textHeight: 18,
        textOffColor: [256, 256, 256],
        textOverColor: [256, 256, 256],
        textDownColor: [23, 149, 76],
        textSelectedColor: [23, 149, 76],
        textDisabledColor: [23, 149, 76],

        defaultDuration:.3,
        defaultEase: eases.expoInOut,

        states: ['customState'],
        mouseStates: ['off','over','down', 'selected', 'disabled'],
        touchStates: ['touchestart', 'touchend', 'selected', 'disabled'],

        targets: ['bg','border','text','icon'],
        debug: true


    }, (opts || {}));


    //console.log('getTouchStates: ',getTouchStates());
    //console.log('getMouseStates: ',getMouseStates());
    var getStatesList = function(){
        return uniq(opts.states.concat(opts.mouseStates).concat(opts.touchStates));
    };

    var getStates = function(statesList){
        var states = {};

        var targetsList = (!settings.targets || (Object.keys(settings.targets).length < 1)) ? opts.targets : Object.keys(settings.targets);

        for(var i = 0; i < statesList.length; i++){

            states[statesList[i]] = {};
            var state = states[statesList[i]];

            var stateName = statesList[i];
            stateName = stateName.replace(stateName.charAt(0), stateName.charAt(0).toUpperCase());

            for(var t = 0; t < targetsList.length; t++){

                if(targetsList[t] === 'bg'){
                    state.bg = {
                        backgroundColor: opts['bg'+stateName+'Color'] || opts.bgOffColor
                    }
                } else if(targetsList[t] === 'border'){
                    state.border = {
                        borderColor: opts['border'+stateName+'Color'] || opts.borderOffColor
                    }
                } else if(targetsList[t] === 'text'){
                    state.text = {
                        color: opts['text'+stateName+'Color'] || opts.textOffColor
                    };
                } else if(targetsList[t] === 'icon'){
                    state.icon = {
                        color: opts['icon'+stateName+'Color'] || opts.iconOffColor,
                        position: opts['icon'+stateName+'Position'] || opts.iconOffPosition
                    };
                }/* else {
                    state[targetsList[t]] = {
                        backgroundColor: opts['bg'+stateName+'Color'] || opts.bgOffColor
                    };
                }*/

            }

            /*if(settings.targets.bg)  state.bg = {
                backgroundColor: opts['bg'+stateName+'Color'] || opts.bgOffColor
            };

            if(settings.targets.border)  state.border = {
                borderColor: opts['border'+stateName+'Color'] || opts.borderOffColor
            };

            if(settings.targets.text)  state.text = {
                color: opts['text'+stateName+'Color'] || opts.textOffColor
            };

            if(settings.targets.icon)  state.icon = {
                color: opts['icon'+stateName+'Color'] || opts.iconOffColor,
                position: opts['icon'+stateName+'Position'] || opts.iconOffPosition
            };*/
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

        return mergeArray(transitions, settings.transitions, ['from', 'to']);
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

    //settings.transitions = getTransitions(Object.keys(settings.states));
    settings.transitions = getTransitions(mouseStatesList).concat(getTransitions(touchStatesList));

    console.log('settings: ',settings);

    return settings;
};