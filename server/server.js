var express = require('express');
var request = require('request');
var Songkick = require("./models/m_songkick");
var browserify = require('browserify-middleware');
var path = require('path');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var Spotify = require("./models/m_spotifyApi")
var SpotifyWebApi = require('spotify-web-api-node');
var client_id = '94433df23e8d4d448cf9cb7d32fbc21f'; // Your client id
var client_secret ='b43fa687da68462eb2c4708bd7445031'; // Your secret
var redirect_uri = 'http://localhost:4000/callback/'; // Your redirect uri
var stateKey = 'spotify_auth_state';
var scopes = ['user-read-private', 'user-read-email'];
var app = express();

var port = process.env.PORT || 4000;

app.use(require('./controllers'));
app.use(bodyParser.json());

var assetFolder = path.join(__dirname, '..', 'client','public');

// Serve Static Assets
app.use(express.static(assetFolder))
	.use(cookieParser());

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

let artistInfoCount = 0;
app.post('/artistInfo', function(req,res){

	Spotify.searchArtists(req.body.name).then((data) => {

    console.log(`/artistInfo ${++artistInfoCount}`)
		res.send(data)
	})
	.catch((error) => {
		console.log("error",error)
	})
})

let artistTracksCount = 0;
app.post('/artistTracks', function(req,res){
	Spotify.getArtistTopTracks(req.body.id,req.body.code).then((data) => {
		console.log(`/artistInfo ${++artistTracksCount}`)
		res.send(data)
	})
	.catch((error) => {
		console.log("error",error)
	})
})

const spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
});

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
//login a user through Spotify
app.get('/login', function(req, res){
	const state = generateRandomString(16);
	console.log("/login");
	res.cookie(stateKey, state);

	//application requests authorization
	res.redirect(spotifyApi.createAuthorizeURL(scopes,state));
});
app.get('/callback/', (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[stateKey] : null;
  // first do state validation
  if (state === null || state !== storedState) {
    res.redirect('/#/error/state mismatch');
  // if the state is valid, get the authorization code and pass it on to the client
  } else {
    res.clearCookie(stateKey);
    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then(data => {
      const { expires_in, access_token, refresh_token } = data.body;

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      // use the access token to access the Spotify Web API
      spotifyApi.getMe().then(({ body }) => {
        console.log("body",body);//sends user information to the client
        res.send(body)
      });

      // we can also pass the token to the browser to make requests from there
      res.redirect(`/#/user/${access_token}/${refresh_token}`);
    }).catch(err => {
    	console.log("error")
      res.redirect('/#/error/invalid token');
      console.log("error after redurect")
    });
  }
});


// Wild card route for client side routing.
	// do we need this?
app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' );
})

// Start server
app.listen(port);
console.log('Listening on localhost:' + port);
