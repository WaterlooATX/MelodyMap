import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();

export function followArtist(token, artistid) {
  spotifyApi.setAccessToken(token)
  spotifyApi.followArtists(artistid)
    .then(function(data) {
      console.log("DATA", data)
      return data
    }, function(err) {
      console.error("ERROR", err)
    })
}
