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