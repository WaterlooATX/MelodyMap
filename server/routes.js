const querystring = require('querystring');
const express = require('express');
const router = new express.Router();
// configure the express server

//--------------SPOTIFY LOGIN ROUTES-------------------//
//-----------------------------------------------------//
const SpotifyWebApi = require('spotify-web-api-node')
const client_id = '94433df23e8d4d448cf9cb7d32fbc21f'; // Your client id
const client_secret ='b43fa687da68462eb2c4708bd7445031'; // Your secret
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

//------------------SHOW & ARTIST ROUTES---------------//
//-----------------------------------------------------//
const Songkick = require("./models/m_songkick");
const Spotify = require("./models/m_spotifyApi")
const LastFM = require("./models/m_lastFM")

let LastFM_getInfos = 0;
router.post('/LastFM.getInfo', function(req, res) {
  LastFM.getInfo(req.body.name).then((data) => {
    console.log(`/LastFM.getInfo ${++LastFM_getInfos}`)
    res.send(data)
  }).catch((error) => {
    console.log("error", error)
  })
})

// getArtistRelatedArtists
let getArtistRelatedArtists = 0;
router.post('/getArtistRelatedArtists', function(req, res) {
  Songkick.getVenue(req.body.id).then((data) => {
    console.log(`/getArtistRelatedArtists ${++getArtistRelatedArtists}`)
    res.send(data)
  }).catch((error) => {
    console.log("error", error)
  })
})

let VenueCount = 0;
router.post('/getVenue', function(req, res) {
  Songkick.getVenue(req.body.id).then((data) => {
    console.log(`/getVenue ${++VenueCount}`)
    res.send(data)
  }).catch((error) => {
    console.log("error", error)
  })
})

router.post('/fetchShows', function(req, res) {
  console.log("/fetchShows");
  Songkick.getTonightLocalInfo(req.body).then((data) => {
    res.send(data)
  }).catch((error) => {
    console.log("error", error)
  })
})

let AlbumsCount = 0;
router.post('/getArtistAlbums', function(req, res) {
  Spotify.getArtistAlbums(req.body.id).then(albums => {
    console.log(`/getArtistAlbums ${++AlbumsCount}`)
    res.send(albums)
  }).catch((error) => {
    console.log("error", error)
  })
})

let artistInfoCount = 0;
router.post('/artistInfo', function(req, res) {

  Spotify.searchArtists(req.body.name).then((data) => {

      console.log(`/artistInfo ${++artistInfoCount}`)
      res.send(data)
    })
    .catch((error) => {
      console.log("error", error)
    })
})
let artistTracksCount = 0;
router.post('/artistTracks', function(req, res) {
  Spotify.getArtistTopTracks(req.body.id, req.body.code).then((data) => {
      console.log(`/artistTracks ${++artistTracksCount}`)
      res.send(data)
    })
    .catch((error) => {
      console.log("error", error)
    })
})



module.exports = router;
