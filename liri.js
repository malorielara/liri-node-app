require("dotenv").config();

// required vars for it to wurrrk
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");

// twittah
var Twitter = require("twitter");

// spotify 
var Spotify = require('node-spotify-api');

var filename = './log.txt';

var log = require('simple-node-logger').createSimpleFileLogger(filename);

log.setLevel('all');

var userCommand = process.argv[2];
var secondCommand = process.argv[3];

for (var i = 4; i < process.argv.length; i++) {
    secondCommand += '+' + process.argv[i];
}

// to get spotify

// artists names

// spotify function
    // search spotify

// get tweets function

// get movie function
// OMDB