/**
 * Created by longstone on 20/11/14.
 */
"use strict";
var assert = require("assert");

var parseDescription = require("../../parser/parser-14util/parseDescription");

var oneGroup = "043 - 18:16 Uhr / KA5 / Brand: Ringstrasse, Brüttisellen";
var twoGroups = "150 - 16:03 Uhr / KA2+KA3 / BMA: Rotbuchstrasse, Dübendorf";
var tooMuchWhitespaces = '159 - 22:15 Uhr / Kdo / Wasser im Gebäude: Schlossstrasse, Dübendorf     ';
describe("test description", function () {
    it('should parse "Brand: Ringstrasse, Brüttisellen"', function () {
        var actual = parseDescription(oneGroup);
        var expected = "Brand: Ringstrasse, Brüttisellen";
        assert.deepEqual(actual, expected);
    });

    it('should parse "BMA: Rotbuchstrasse, Dübendorf"', function () {
        var actual = parseDescription(twoGroups);
        var expected = "BMA: Rotbuchstrasse, Dübendorf";
        assert.deepEqual(actual, expected);
    });

    it('should remove more than one whitespace', function(){
       var actual = parseDescription(tooMuchWhitespaces);
        var expected = 'Wasser im Gebäude: Schlossstrasse, Dübendorf';
        assert.deepEqual(actual,expected);
    });
});