const Songkick = require("./m_songkick")
const Spotify = require("./m_spotifyApi")
const LastFM = require("./m_lastFM")
const db = require("../db")
var mongoose = require('mongoose');

// const Artist = new db.artist({
//   spotifyURL: a.external_urls,
//   id: a.id,
//   name: a.name,
// })

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
lookupArtist = (name) => {

  //return db.collection('artists').find({ name: name })
}
var kittySchema = mongoose.Schema({
  name: String
});
var Kitten = mongoose.model('Kitten', kittySchema);
function insertArtist(artist) {
  return db.collection('artists').insert(artist)
}

exports.artistInfo = (name) => {

    // To use our schema definition, we need to convert our blogSchema into a Model we can work with


    // Instances of Models are documents.

    var cat = new Kitten({
      name: name
    });
    console.log(cat.name)
    cat.save(function(err, fluffy) {
      if (err) return console.error(err);
    });

    // if (artists[0]) {
    //   console.log('artist already exists!', artists[0]);
    //   return artists[0];
    // } else {
    //   console.log('this is a new artist, hitting API');
    //   let newArtist = Spotify.searchArtists(name)
    //   .then(data => {
    //     let a = data[0];
    //     return ({
    //       spotifyURL: a.external_urls,
    //       id: a.id,
    //       songKickName: name,
    //       spotifyName: a.name,
    //       artistImages: a.images,
    //       img: a.images.length ? a.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg",
    //       popularity: a.popularity,
    //       followers: a.followers.total
    //     });
    //   })
    //   newArtist.then(data => insertArtist(data));
    //   return newArtist;
    // }

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
