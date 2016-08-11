const Songkick = require("./m_songkick")
const Spotify = require("./m_spotifyApi")
const LastFM = require("./m_lastFM")
const db = require("../db")
const artistSchema = require("../ARTISTS_Schema")
const mongoose = require('mongoose');

// Instances of Models are documents.
const Artist = mongoose.model('Artist', artistSchema);

// addArtist()
//  - check if in db
//  - create artist if not
//  - return artist data
//  - update data if old

// Artist.addArtist().then()
// exports.artistInfo = (name) => {
//   return Spotify.searchArtists(name)
//     .then(data => {
//       if (data) {
//         let a = data[0]
//         if (a) {
//           return {
//             spotifyURL: a.external_urls,
//             id: a.id,
//             songKickName: name,
//             spotifyName: a.name,
//             artistImages: a.images,
//             img: a.images.length ? a.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg",
//             popularity: a.popularity,
//             followers: a.followers.total,
//           }
//         }
//       }
//     })
// }
findArtist = (name) => Artist.findOne({name: name})
insertArtist = (artist) => Artist.insert(artist)
isArtist = (name) => findArtist(name).then(data => data ? true : false)



exports.artistInfo = (name) => {
  // check if artists is in db
  return findArtist(name)
      //  return Spotify.searchArtists(name)
      //  .then(data => {
      //    let a = data[0];
      //    let artist = new Artist({
      //      spotifyURL: a.external_urls,
      //      id: a.id,
      //      songKickName: name,
      //      spotifyName: a.name,
      //      artistImages: a.images,
      //      img: a.images.length ? a.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg",
      //      popularity: a.popularity,
      //      followers: a.followers.total,
      //      relatedArtists: [],
      //      albums: [],
      //      topTracks: [],
      //      summaryBio: "",
      //      fullBio: ""
      //    })
      //    artist.save(function(err, fluffy) {
      //      if (err) return console.error(err);
      //    });
      //    return artist;
      //  })
       //
       //



    //return isArtist(name)

    // var cat = new Kitten({
    //   name: name
    // });
    // console.log(cat.name)
    // cat.save(function(err, fluffy) {
    //   if (err) return console.error(err);
    // });


}

// Spotify.searchArtists(name)
//   .then(data => {
//     if (data) {
//       let a = data[0]
//       if (a) {
//         return {
//           spotifyURL: a.external_urls,
//           id: a.id,
//           songKickName: name,
//           spotifyName: a.name,
//           artistImages: a.images,
//           img: a.images.length ? a.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg",
//           popularity: a.popularity,
//           followers: a.followers.total,
//         }
//       }
//     }
//   })
//
// Spotify.getArtistRelatedArtists(artist.id)
//   .then(artist => {
//     return {
//       relatedArtists: data.artists
//     }
//   })
//
//   Spotify.getArtistAlbums(artist.id)
//     .then(albums => {
//       return {
//         albums: albums.items.map(album => {
//           return {
//             name: album.name,
//             images: album.images,
//             id: album.id
//           }
//         })
//       }
//     })
//
// Spotify.getArtistTopTracks(artist.id, countryCode = "us")
//   .then(artist => {
//     return {
//       topTracks: artist.tracks
//     }
//   })
//
// LastFM.getInfo(name)
//   .then(data => {
//     return {
//       summaryBio: data.artist.bio.summary,
//       fullBio: data.artist.bio.content
//     }
//   })

//.catch(error => console.log("error", error))
