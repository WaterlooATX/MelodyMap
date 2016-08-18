const Songkick = require("./m_songkick")
const Spotify = require("./m_spotifyApi")
const LastFM = require("./m_lastFM")
const db = require("../db")
const ArtistModel = require("../ARTISTS_Schema")
const mongoose = require('mongoose');

exports.artistInfo = (name) => {

  return Spotify.searchArtists(name)
    .then(data => {
      const Artist = new ArtistModel();

      Artist.spotifyURL = data[0].external_urls.spotify
      Artist.id = data[0].id
      Artist.songKickName = name
      Artist.spotifyName = data[0].name
      Artist.artistImages = data[0].images
      Artist.img = data[0].images.length ? data[0].images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"
      Artist.popularity = data[0].popularity
      Artist.followers = data[0].followers.total
      Artist.songKickID = 1337

      Artist.save(function(err, fluffy) {
        if (err) return console.log(err);
      });

      return Artist
    })

}
