'use strict';

var simpleButton = require('../ui-simple-button');

module.exports = function (settings, opts) {

    settings = settings || {};

    opts = opts || {};

    if(!settings.targets || (Object.keys(settings.targets).length < 1)) throw new Error('You need to supply f1-slot-machine a target(s).');

    opts.getIconProps = function(opts, stateName){

        var defaultIconPosition = (stateName === 'down') ? (opts.overIconPosition || opts.offIconPosition) : opts.offIconPosition;
        return {
            color: opts[stateName+'IconColor'] || opts.offIconColor,
            position: opts[stateName+'IconPosition'] || defaultIconPosition
        };
    };

    return simpleButton(settings, opts);
};