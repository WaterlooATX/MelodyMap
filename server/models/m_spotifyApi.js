// https://github.com/thelinmichael/spotify-web-api-node
const SpotifyWebApi = require('spotify-web-api-node')
const db = require("../db")
const ArtistModel = require("../ARTISTS_Schema")
const mongoose = require('mongoose');
const lastFM = require("./m_lastFM")

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: 'c7364a23c3714de1882fded9f4142b18',
  clientSecret: 'abdbe447833643d5b85616f5691e2142'
})

exports.searchArtists = (name, songKickId) => {
  return ArtistModel.findOne({ "name" : name.name}).then(artist => {
    if(artist) {
      return artist
    } else {
      return addToDataBase()
    }
  })
  //console.log(abc)


  function addToDataBase() {
    return spotifyApi.searchArtists(name, songKickId)
      .then(data => {
        data.body.artists.items.forEach(artist => {

          // if songkick name is spotify name
          if(name == artist.name) {
            let bool = true;
            if(bool) {
              bool = false
              const Artist = new ArtistModel();
              Artist.songKickID = songKickId
              Artist.spotifyURL = artist.external_urls.spotify
              Artist.id = artist.id
              Artist.name= artist.name
              Artist.images = artist.images
              Artist.img = artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"
              Artist.popularity = artist.popularity
              Artist.followers = artist.followers.total

              // Add Top Tracks
              spotifyApi.getArtistTopTracks(artist.id, "US").then(data => {
                Artist.topTracks = data.body.tracks.map(track => {
                  return {preview_url: track.preview_url, popularity: track.popularity, name: track.name }
                })

              }).catch(err => console.log(err))

              // Add Alubm cover images
              spotifyApi.getArtistAlbums(artist.id).then(data => {
                Artist.albumsImages = data.body.items.map(album => {
                  return {images: album.images, name: album.name}
                })
              }).catch(err => console.log(err))

              //wait and call relatedArtists to stay under api limits
              setTimeout(function() {
                spotifyApi.getArtistRelatedArtists(artist.id).then(data => {

                  Artist.relatedArtists = data.body.artists.map(art => {
                    return {
                      songKickID: songKickId,
                      spotifyURL: artist.external_urls.spotify,
                      id: artist.id,
                      name: artist.name,
                      images: artist.images,
                      img: artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg",
                      popularity: artist.popularity,
                      followers: artist.followers.total
                    }
                  })
                  //Save to DB
                  Artist.save(function(err) {
                    if (err) return console.log(err);
                  });
                })
              }, 5000)

              // Add Bio
              lastFM.getInfo(name).then(data => {
                  Artist.lastFM_imgs = data.artist.images
                  Artist.summaryBio = data.artist.bio.summary
                  Artist.fullBio = data.artist.bio.content

              }).catch(err => console.log(err))

              // give API calls 2 secs
              setTimeout(function() {
                return Artist
              }, 2000)
            }
          }
        })
      })
      .catch(err => console.error(err));
  }
}

// exports.getArtistTopTracks = (artistID, countryCode) => {
//   return spotifyApi.getArtistTopTracks(artistID, countryCode)
//     .then(data => data.body)
//     .catch(err => console.error(err));
// }
//
// exports.getArtistAlbums = (artistID) => {
//   return spotifyApi.getArtistAlbums(artistID)
//     .then(data => data.body)
//     .catch(err => console.error(err));
// }
//
// exports.getArtistRelatedArtists = (artistID) => {
//   return spotifyApi.getArtistRelatedArtists(artistID)
//     .then(data => data.body)
//     .catch(err => console.error(err));
// }
