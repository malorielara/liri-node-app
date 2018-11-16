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

var spotify = new Spotify(keys.spotify);

var getArtistNames = function (artist) {
    return artist.name;
};

var getSpotify = function (songName) {
    if (songName === undefined) {
        songName = "Que es mi numero favorito?";
    }

    spotify.search({
            type: "track",
            query: userCommand
        },
        function (err, data) {
            if (err) {
                console.log("Error: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
};

// artists names

// spotify function
// search spotify

// get tweets function

// get movie function
// OMDB