// https://github.com/thelinmichael/spotify-web-api-node
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId : 'c7364a23c3714de1882fded9f4142b18',
  clientSecret : 'abdbe447833643d5b85616f5691e2142'
});

// Search artists whose name contains 'Love'
exports.searchArtists = (name) => {
  return spotifyApi.searchArtists(name)
    .then(function(data) {
        return data.body.artists.items
    }, function(err) {
      console.error(err);
    });
}

exports.getArtistTopTracks = (artistID, countryCode) => {
  return spotifyApi.getArtistTopTracks(artistID,countryCode)
  .then(function(data) {
    //console.log("INSIDE ARTIST TRACKS",data.body);
    return data.body
    }, function(err) {
    console.log('Something went wrong!', err);
  });

}
