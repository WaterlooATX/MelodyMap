// https://github.com/thelinmichael/spotify-web-api-node
const SpotifyWebApi = require('spotify-web-api-node')
const db = require("../db")
const ArtistModel = require("../ARTISTS_Schema")
const mongoose = require('mongoose');
// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: 'c7364a23c3714de1882fded9f4142b18',
  clientSecret: 'abdbe447833643d5b85616f5691e2142'
})

exports.searchArtists = (name, songKickId) => {
  // if(name is matched in DB) {
  //   return result
  // } else {
  //   spotifyApi.searchArtists(name)
  //   add every result into db
  //   if(name is matched in DB) {
  //     add spongKick id
  //     return result
  //   } else {
  //     return closest name match
  //   }
  // }


  ArtistModel.findOne({ "songKickId" : songKickId }, function (err, artist) {
    if (err) return handleError(err);
    console.log(artist)
  })

  return spotifyApi.searchArtists(name, songKickId)
    .then(data => {
      data.body.artists.items.forEach(artist => {

        const Artist = new ArtistModel();
        //Artist.find({songKickId: songKickId}, artist => console.log(artist))
        // if songkick name is spotify name

        if(name == artist.name) {
          Artist.songKickID = songKickId
          Artist.spotifyURL = artist.external_urls.spotify
          Artist.id = artist.id
          Artist.spotifyName = artist.name
          Artist.images = artist.images
          Artist.img = artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"
          Artist.popularity = artist.popularity
          Artist.followers = artist.followers.total

          Artist.save(function(err) {
            if (err) return console.log(err);
          });
          //return Artist
          return data.body.artists.items
        }
      })

    })
    .catch(err => console.error(err));
}

exports.getArtistTopTracks = (artistID, countryCode) => {
  return spotifyApi.getArtistTopTracks(artistID, countryCode)
    .then(data => data.body)
    .catch(err => console.error(err));
}

exports.getArtistAlbums = (artistID) => {
  return spotifyApi.getArtistAlbums(artistID)
    .then(data => data.body)
    .catch(err => console.error(err));
}

exports.getArtistRelatedArtists = (artistID) => {
  return spotifyApi.getArtistRelatedArtists(artistID)
    .then(data => data.body)
    .catch(err => console.error(err));
}
