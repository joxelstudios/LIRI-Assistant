// Defining variables and requiring files.
var request = require("request");
require("dotenv").config();
var keys = require('./keys');
var fs = require("fs");
var Spotify = require('node-spotify-api')
var moment = require('moment');
moment().format();
var spotify = new Spotify(keys.spotify);
var bid = keys.bands
var bandsintown = require('bandsintown')(bid);
var date = moment().format("MM/DD/YYYY")
var colors = require('colors')




//Defining Functions
function spotify(){
    spotify.search({ type: 'track', query: value, limit: 5 }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log('');
        console.log('Here are some matching details about the song you requested:'.blue)
        console.log('');
        
        data.tracks.items.forEach(element => {
            
            console.log(element.name);
            console.log(element.album.name);
            console.log(element.album.artists[0].name);
            console.log(element.album.external_urls.spotify);
            console.log('______________________________________________________')
            
        });
        
     
    });
}
function movie(){
    request(queryUrl, function (error, response, body) {
        if (error) {
            console.log('error', error);
        }
       
        // console.log('statusCode:', response && response.statusCode);
        console.log('');
        console.log('Here is some info about the movie you searched.'.blue)
        console.log('');
        console.log(JSON.parse(body).Title);
        console.log('This movie was released in: '+JSON.parse(body).Year);
        console.log('Rated: '+JSON.parse(body).Rated);
        console.log('Country: '+JSON.parse(body).Country);
        console.log('Language: '+JSON.parse(body).Language);
        console.log('Plot: '+JSON.parse(body).Plot);
        console.log('Actors: '+JSON.parse(body).Actors);
        console.log('______________________________________________________')
    })
}
function concert(){
    let value = process.argv.slice(3).join('%20')
    bandsintown.getArtistEventList(value, 'upcoming').then(function(data) {
        console.log('Upcoming events:'.blue)
        data.forEach(element => {
            
            console.log(moment(element.datetime).format("MM/DD/YYYY")+" - "+ element.venue.place + ", "+ element.venue.city+ ", "+ element.venue.country )
            
        });
  });
}




// Defining user inputs
var func = process.argv[2];
var value = process.argv.slice(3).join('+')



if(func === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log("There was an error parsing the file.")
        } else {
            console.log("Random.text succesfully accessed.")
            console.log(data);
        }
    })
}





if (func === "spotify-this-song"){
    spotify();
}

if (func === 'movie-this') {
    // Then run a request to the OMDB API with the movie specified
    if (value === ''){
         value = 'Mr+Nobody'
        
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";
    // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);
   movie();
}



if (func === 'concert-this'){
  concert();
}