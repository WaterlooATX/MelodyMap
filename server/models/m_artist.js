const Songkick = require("./models/m_songkick")
const Spotify = require("./models/m_spotifyApi")
const LastFM = require("./models/m_lastFM")


exports.artistInfo = (name) => {
  Spotify.searchArtists(name)
    .then(data => callAPIs(data.id))
    .catch(error => console.log("error", error))
}

function callAPIs(spotifyID) {
  LastFM.getInfo(name)
    .then((obj) => {
      res.send(obj)
    }).catch((error) => {
      console.log("error", error)
    })

  Spotify.getArtistRelatedArtists(spotifyID)
    .then((data) => {
      res.send(data)
    }).catch((error) => {
      console.log("error", error)
    })

  Songkick.getSimilarArtists(spotifyID)
    .then((data) => {
      res.send(data)
    }).catch((error) => {
      console.log("error", error)
    })


  Spotify.getArtistAlbums(spotifyID)
    .then(albums => {
      res.send(albums)
    }).catch((error) => {
      console.log("error", error)
    })


  Spotify.getArtistTopTracks(spotifyID, countryCode)
    .then((data) => {
      res.send(data)
    }).catch((error) => {
      console.log("error", error)
    })
}
