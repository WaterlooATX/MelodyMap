// https://github.com/thelinmichael/spotify-web-api-node
const SpotifyWebApi = require('spotify-web-api-node')
const db = require("../db")
const ArtistModel = require("../ARTISTS_Schema")
const mongoose = require('mongoose');
const lastFM = require("./m_lastFM")
const _ = require("lodash")

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: 'c7364a23c3714de1882fded9f4142b18',
  clientSecret: 'abdbe447833643d5b85616f5691e2142'
})

const catchedArtists = {}
let Spotify_searchArtists = 0;
exports.searchArtists = (name, songKickID) => {
  return ArtistModel.findOne({
      "songKickID": songKickID
    })
    .then(artist => {
      if (artist) {
        console.log(`${++Spotify_searchArtists} found ${name}`)
        return artist
      } else {
        return addToDataBase(name)
      }
    })

  // artist whos names dont match will always make a new api call!
  function addToDataBase(Name) {
    catchedArtists[songKickID] = true

    return spotifyApi.searchArtists(Name)
      .then(data => {

        data.body.artists.items.forEach((artist, i) => {

          // if songkick name is spotify name
          if (Name == artist.name) {
            console.log(`${++Spotify_searchArtists} adding ${Name}`)
            const Artist = new ArtistModel();

            Artist.songKickID = songKickID
            Artist.spotifyURL = artist.external_urls.spotify
            Artist.id = artist.id
            Artist.name = artist.name
            Artist.images = artist.images
            Artist.img = artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"
            Artist.popularity = artist.popularity
            Artist.followers = artist.followers.total

            // Add Top Tracks
            spotifyApi.getArtistTopTracks(artist.id, "US").then(data => {
              Artist.topTracks = data.body.tracks.map(track => {
                return {
                  preview_url: track.preview_url,
                  popularity: track.popularity,
                  name: track.name,
                  id: track.id
                }
              })

            }).catch(err => console.log(err))

            // Add Alubm cover images
            spotifyApi.getArtistAlbums(artist.id).then(data => {
              Artist.albumsImages = data.body.items.map(album => {
                return {
                  images: album.images,
                  name: album.name
                }
              })
            }).catch(err => console.log(err))

            // //wait and call relatedArtists to stay under api limits
            // setTimeout(function() {
            //   spotifyApi.getArtistRelatedArtists(artist.id).then(data => {
            //
            //     Artist.relatedArtists = data.body.artists.map(art => {
            //       return {
            //         songKickID: songKickID,
            //         spotifyURL: artist.external_urls.spotify,
            //         id: artist.id,
            //         name: artist.name,
            //         images: artist.images,
            //         img: artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg",
            //         popularity: artist.popularity,
            //         followers: artist.followers.total
            //       }
            //     })
            //     //Save to DB

            //   })
            // }, 5000)


            // Add Bio
            lastFM.getInfo(Name).then(data => {
              if (data.artist) {
                Artist.lastFM_imgs = data.artist.image
                Artist.summaryBio = data.artist.bio.summary
                Artist.fullBio = data.artist.bio.content
                Artist.onTour = data.artist.ontour
                Artist.genre = data.artist.tags.tag
                Artist.relatedArtists = data.artists.similar
              }
            }).catch(err => console.log(err))

            // give API calls 2 secs
            setTimeout(function() {
              Artist.save(function(err) {
                if (err) return console.log(err);
              });

            }, 2000)
            return Artist

          }
        })
      }).catch(err => console.log("ERROR", Name));
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
