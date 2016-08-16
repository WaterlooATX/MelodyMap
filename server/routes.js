const querystring = require('querystring');
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const { SPOTIFYWEB_CLIENTID, SPOTIFYWEB_CLIENTSECRET } = require('./models/api_keys');

const router = new express.Router();
// configure the express server

//--------------SPOTIFY LOGIN ROUTES-------------------//
//-----------------------------------------------------//
const client_id = SPOTIFYWEB_CLIENTID;
const client_secret = SPOTIFYWEB_CLIENTSECRET;
const redirect_uri = 'http://localhost:4000/callback/'; // Your redirect uri
const stateKey = 'spotify_auth_state';
// your application requests authorization
const scopes = ['user-read-private', 'user-read-email'];
const spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
});

/** Generates a random string containing numbers and letters of N characters */
const generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};


/**
 * The /login endpoint
 * Redirect the client to the spotify authorize url, but first set that user's
 * state in the cookie.
 */
router.get('/login', function(req, res){
	const state = generateRandomString(16);
	res.cookie(stateKey, state);
	//application requests authorization
	res.redirect(spotifyApi.createAuthorizeURL(scopes,state));
});

/**
 * The /callback endpoint - hit after the user logs in to spotifyApi
 * Verify that the state we put in the cookie matches the state in the query
 * parameter. Then, if all is good, redirect the user to the user page. If all
 * is not good, redirect the user to an error page
 */
router.get('/callback/', (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[stateKey] : null;
  // first do state validation
  if (state === null || state !== storedState) {
    res.redirect('/#/error/state mismatch');
  // if the state is valid, get the authorization code and pass it on to the client
  } else {
    //res.clearCookie(stateKey);
    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then(data => {
      const { expires_in, access_token, refresh_token } = data.body;

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);


      // use the access token to access the Spotify Web API
      spotifyApi.getMe().then(({ body }) => {
        //sends user information to the client
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

//------------------SHOW, VENUE, ARTIST ROUTES---------------//
//-----------------------------------------------------//
const Songkick = require("./models/m_songkick");
const Spotify = require("./models/m_spotifyApi")
const LastFM = require("./models/m_lastFM")
const Artist = require("./models/m_artist")
const Google = require("./models/m_google")


// let AlbumsCount = 0;
// router.post('/getArtistAlbums', function(req, res) {
//   console.log(`/getArtistAlbums ${++AlbumsCount}`)
//   Spotify.getArtistAlbums(req.body.id)
//     .then(albums => res.send(albums))
//     .catch(error => console.log("error", error))
// })


// let Spotify_getArtistTopTracks = 0;
// router.post('/Spotify_getArtistTopTracks', function(req, res) {
//   console.log(`/Spotify_getArtistTopTracks ${++Spotify_getArtistTopTracks}`)
//   Spotify.getArtistTopTracks(req.body.id, req.body.code)
//     .then(data => res.send(data))
//     .catch(error => console.log("error", error))
// })

// let LastFM_getInfos = 0;
// router.post('/LastFM_getInfo', function(req, res) {
//   console.log(`/LastFM_getInfo ${++LastFM_getInfos}`)
//   LastFM.getInfo(req.body.name)
//     .then(data => res.send(data))
//     .catch(error => console.log("error", error))
// })

router.get('/Google_placeIdAPI', function(req, res) {
  Google.placeIdAPI(req.param('name'), req.param('lat'), req.param('long'))
    .then(data => res.send(data))
    .catch(error => console.log('error', error))
})

router.get('/Google_photoAPI', function(req, res) {
  // console.log('routes Google_photoAPI photoReference', req.param('photoReference'));
  Google.photoAPI(req.param('photoReference'))
    .then((data) => {
      // console.log('routes Google_photoAPI data' , data.data);
      res.send(data.data)
    })
    .catch(error => console.log('BOOM', error))
})

let Spotify_getArtistRelatedArtists = 0;
router.post('/Spotify_getArtistRelatedArtists', function(req, res) {
  console.log(`/Spotify_getArtistRelatedArtists ${++Spotify_getArtistRelatedArtists}`)
  Spotify.getArtistRelatedArtists(req.body.id)
    .then(data => res.send(data))
    .catch(error => console.log("error", error))
})


router.post('/Spotify_searchArtists', function(req, res) {
  Spotify.searchArtists(req.body.name, req.body.id)
    .then(data => res.send(JSON.stringify(data)))
    .catch(error => console.log("error", error))
})

// Artist Data
let Artist_artistInfo = 0;
router.post('/Artist_artistInfo', function(req, res) {
  console.log(`/Artist_artistInfo ${++Artist_artistInfo}`)
  Artist.artistInfo(req.body.name)
    .then(data => res.send(data))
    .catch(error => console.log("error", error))
})

let Songkick_getEventSetlist = 0;
router.post('/Songkick_getEventSetlist', function(req, res) {
  console.log(`/Songkick_getEventSetlist ${++Songkick_getEventSetlist}`)
  Songkick.getEventSetlist(req.body.id)
    .then(data => res.send(data))
    .catch(error => console.log("error", error))
})

let Songkick_getMetroAreaCalendar = 0;
router.post('/Songkick_getMetroAreaCalendar', function(req, res) {
  console.log(`/Songkick_getMetroAreaCalendar ${++Songkick_getMetroAreaCalendar}`)
  Songkick.getMetroAreaCalendar(req.body.id)
    .then(data => res.send(data))
    .catch(error => console.log("error", error))
})

let Songkick_getVenueCalendar = 0;
router.post('/Songkick_getVenueCalendar', function(req, res) {
  console.log(`/Songkick_getVenueCalendar ${++Songkick_getVenueCalendar}`)
  Songkick.getVenueCalendar(req.body.id)
    .then(data => res.send(data))
    .catch(error => console.log("error", error))
})

let Songkick_getArtistCalendar = 0;
router.post('/Songkick_getArtistCalendar', function(req, res) {
  console.log(`/Songkick_getArtistCalendar ${++Songkick_getArtistCalendar}`)
  Songkick.getArtistCalendar(req.body.id)
    .then(data => res.send(data))
    .catch(error => console.log("error", error))
})

router.post('/Songkick_getVenue', function(req, res) {
  Songkick.getVenue(req.body.id)
    .then(data => res.send(data))
    .catch(error => console.log("error", error))
})

router.post('/fetchShows', function(req, res) {
  console.log("/fetchShows", req.body);
  Songkick.getShows(req.body)
    .then(data => res.send(data))
    .catch(error => console.log("error", error))
})

router.post('/fetchArtists', function(req,res){
  console.log("/fetchArtists", req.body)
  Songkick.getArtists(req.body)
    .then(data => res.send(data))
    .catch(error => console.log("error", error))
})

module.exports = router;
