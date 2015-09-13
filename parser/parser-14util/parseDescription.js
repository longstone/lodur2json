"use strict";
var S = require('string');
/**
 * Created by longstone on 31/12/14.
 */
var POSITION_OF_FIRST_SLASH = 17;
module.exports = function parseDescriptionF(line) {
    line = S(line).replaceAll('\t', '').s;
    var start = line.indexOf(' / ', POSITION_OF_FIRST_SLASH) + 3;
    var end = line.length;
    var description =  line.substring(start, end);
    return description.replace(/  +/g, ' ').trim();
};
