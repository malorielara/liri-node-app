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

// user commands
var userCommand = process.argv[2];
var secondCommand = process.argv[3];

for (var i = 4; i < process.argv.length; i++) {
    secondCommand += '+' + process.argv[i];
}

// to get spotify
// spotify function
// search spotify

var spotify = new Spotify(keys.spotify);

// artists names
var getArtistNames = function (artist) {
    return artist.name;
};

var getSpotify = function (songName) {
    if (songName === undefined) {
        songName = "Que es mi numero favorito?";
    }

    // search song in spotify
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

// switch command
// tells what to switch to 
function mySwitch(userCommand) {

    switch (userCommand) {
        case "my-tweets":
            getTweets();
            break;

        case "spotify-this-song":
            getSpotify();
            break;

        case "movie-this":
            getMovie();
            break;

        case "do-what-it-says":
            doWhat();
            break;
    }
}

// get tweets function
function getTweets() {
    var client = new Twitter(keys.twitter);
    var screenName = {
        screen_name: 'malorielara'
    };

    client.get('statuses/user_timeline', screenName, function (error, tweets, response) {
    
        // throw da errrr
        if (error) throw error;

        for (var i = 0; i < tweets.length; i++) {
            var date = tweets[i].created_at;
            logOutput("@malorielara: " + tweets[i].text + " Created At: " + date.substring(0, 19));
            logOutput("-----------------------");
        }

    });
}

// get movie function
// OMDB
function getMovie() {
    var movieName = secondCommand;
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    // look into if
    request(queryUrl, function(err, response, body) {
        if(!error && response == 200) {
            var body = JSON.parse(body);

            logOutput('MOVIE INFO:');
            logOutput("Title: " + body.Title);
            logOutput("Year Released: " + body.Year);
            logOutput("Plot: " + body.plot);
            logOutput("Country: " + body.Country);
            logOutput("IMDB Rating: " + body.imdbRating);
            logOutput("Language: " + body.Language);
            logOutput("Actors: " + body.Actors);
            logOutput("NO MAS!");

        } else {
            console.log("ERROR!");
        }

        // movie name presented when user doesnt enter a movie name
        // finding nemo imdb link: https://www.imdb.com/title/tt0266543/?ref_=fn_al_tt_1 
        if(movieName === "Finding Nemo") {
            console.log("Watch Finding Nemo!");
            console.log("https://www.imdb.com/title/tt0266543/?ref_=fn_al_tt_1");
        }
    })

    // dowhat function
    function doWhat() {
        fs.readFile("random.txt", "utf8", function(err, data){

        })
    }
}

mySwitch(userCommand);