var express = require('express');
var Songkick = require("./models/m_songkick");
var browserify = require('browserify-middleware');
var path = require('path');
var bodyParser = require('body-parser');
var Spotify = require("./models/m_spotifyApi")

var app = express();

var port = process.env.PORT || 4000;

app.use(require('./controllers'));
app.use(bodyParser.json());

var assetFolder = path.join(__dirname, '..', 'client','public');

// Serve Static Assets
app.use(express.static(assetFolder));

// Serve JS Assets
app.get('/app-bundle.js',
 browserify('./client/index.js', {
    transform: [ [ require('babelify'), { presets: ['es2015', 'react'] } ] ]
  })
);

//declare some route that connects to client model
app.post('/fetchShows', function(req,res){
  console.log("/fetchShows");
	Songkick.getTonightLocalInfo(req.body).then((data) => {
    res.send(data)
  })
})

app.post('/artistInfo', function(req,res){	
	console.log("/artistInfo")
	console.log("REQBODY", req.body.name)
	Spotify.searchArtists(req.body.name).then((data) => {
		console.log("DATAAAAAA",data)
		res.send(data)
	})
	.catch((error) => {
		console.log("error",error)
	})
})

// Wild card route for client side routing.
	// do we need this?
app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' );
})

// Start server
app.listen(port);
console.log('Listening on localhost:' + port);
