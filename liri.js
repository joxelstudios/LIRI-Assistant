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
   





// Defining user inputs
var func = process.argv[2];
var value = process.argv.slice(3).join('+')




// fs.readFile("random.txt", "utf8", function (error, data) {
//     if (error) {
//         console.log("There was an error parsing the file.")
//     } else {
//         console.log("Random.text succesfully accessed.")
//         console.log(data);
//     }
// })




if (func === "spotify-this-song"){
    
spotify.search({ type: 'track', query: value, limit: 1 }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    data.tracks.items.forEach(element => {
        
        console.log(element.name);
        console.log(element.album.name);
        console.log(element.album.artists[0].name);
        console.log(element.album.external_urls.spotify);
        
    });
    
 
});
}

if (func === 'movie-this') {
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    request(queryUrl, function (error, response, body) {
        if (error) {
            console.log('error', error);
        }
        console.log('statusCode:', response && response.statusCode);
        console.log(JSON.parse(body).Title);
        console.log(JSON.parse(body).Year);
        console.log(JSON.parse(body).Rated);
        console.log(JSON.parse(body).Country);
        console.log(JSON.parse(body).Language);
        console.log(JSON.parse(body).Plot);
        console.log(JSON.parse(body).Actors);
    })
}



if (func === 'concert-this'){
    // var queryUrl = 'https://rest.bandsintown.com/artists/'+ value +'/events?app_id='+ bid +'&date=upcoming'
    // request(queryUrl, function (error, data) {
    //     if ( error ) {
    //         console.log('Error occurred: ' + err);
    //         return;
    //     }
    //     var obj = JSON.parse(body);
    //     for (var set in obj) {
    //         var date = moment(obj[set].datetime).format("YYYY/MM/DD");
    //         console.log("At " + obj[set].venue.name + " " + obj[set].venue.city + " " + date);
    //     } console.log(data)
    
        
    // })
       
    bandsintown.getArtistEventList(value, 'all').then(function(data) {
       console.log(data);
        data.forEach(element => {
            console.log(moment(element.datetime).format("MM/DD/YYYY"))
            console.log(element.venue.place + ", "+ element.venue.city+ ", "+ element.venue.country )
        });
  });
}
