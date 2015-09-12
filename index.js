/**
 * Created by longstone on 15/11/14.
 */
"use strict";
var request = require('request');
var cheerio = require('cheerio');
var parser14 = require("./parser/parser-14");
var q = require('q');
require('iconv-lite').extendNodeEncodings();
var express = require('express');
var router = express.Router();
var app = express();
var utf8 = require('utf8');


app.get('/', function(req, res) {
    pageLoader().then(function(parsedEntries) {
        res.header("Content-Type", "application/json; charset=utf-8");
        res.json(parsedEntries);
    });
});


var pageLoader = function pageLoaderF(url) {
    var deferred = q.defer();
    var parsedEntries = [];
     url = 'http://www.lodur-zh.ch/duebendorf/index.php?modul=6';
    // encoding for umlaute

    request({
        uri: url,
        method: 'GET',
        encoding: "ISO-8859-1"
    }, function (err, resp, body) {


        var $ = cheerio.load(body);
        var contentsOfPage = $('div .content table');
        var entries = [];
        contentsOfPage.each(function (position, element) {

            // returns something like:
            /**
             *19.11.2014
             164 - 22:32 Uhr / BAG N1 / Rauch/gelöschter Brand: Hörnlistrasse, Dübendorf
             */
            var entry = $(element);
            // extract text only
            entries.push(entry.text());

        });
        entries.shift(); // remove Einsatzberichte des Jahres...
        entries.forEach(function (element) {
            parsedEntries.push(parser14(element));
        });
        deferred.resolve(parsedEntries);
//        $(links).each(function(i, link){
        ///          console.log($(link).text() + ':\n  ' + $(link).attr('href'));
        //   });
    });

    return deferred.promise;
};

var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('app serving at http://%s:%s',host,port);
})