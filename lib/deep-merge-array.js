'use strict';

var find = require('lodash.find');
var deepExtend = require('deep-extend');

module.exports = function () {

    var arrays = Array.prototype.map.call(arguments, function(item){ return item; });
    var keys = arrays.pop();
    arrays.reverse();

    var getKeysObj = function(item){

        var keysObj = {};

        for(var k = 0; k < keys.length; k++){
            keysObj[keys[k]] = item[keys[k]];
        }

        return keysObj;
    };

    var different = function(arr1, arr2){


        var arr1temp = arr1.filter(function(item){

            return (find(arr2, getKeysObj(item))) ? false : true;

        });

        var arr2temp = arr2.filter(function(item){

            return (find(arr1, getKeysObj(item))) ? false : true;

        });

        return arr1temp.concat(arr2temp);

    };

    var same = function(arr1, arr2){

        var arr2temp = arr2.filter(function(item){

            return (find(arr1, getKeysObj(item))) ? true : false;

        });

        return arr2temp.map(function(item){

            return deepExtend(find(arr1, getKeysObj(item)), item);

        });

    };

    return arrays.reduce(function(prevArr, nextArr, i, arr){

        var diffs = different(prevArr, nextArr);
        var sames = same(nextArr, prevArr);

        return sames.concat(diffs);

    });

};