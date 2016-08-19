// https://github.com/thelinmichael/spotify-web-api-node
const SpotifyWebApi = require('spotify-web-api-node');
const _ = require('lodash');
const mongoose = require('mongoose');
const db = require('../db');
const ArtistModel = require('../ARTISTS_Schema');
const lastFM = require('./m_lastFM');
const {
  SPOTIFY_CLIENTID,
  SPOTIFY_CLIENTSECRET
} = require('./api_keys');

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENTID,
  clientSecret: SPOTIFY_CLIENTSECRET
})

const cachedArtists = {}
let Spotify_searchArtists = 0;
exports.searchArtists = (name, songKickID) => {
  // check catched artists
  const cacheArtist = cachedArtists[songKickID]
  if (cacheArtist) {
    console.log(`${++Spotify_searchArtists} found cachedArtists ${name}`)
      //return catchArtist
    return new Promise(function(resolve, reject) {
      resolve(cacheArtist)
    })
  }

  return ArtistModel.findOne({
      "songKickID": songKickID
    })
    .then(artist => {
      if (artist) {
        console.log(`${++Spotify_searchArtists} found ${name}`)
        cachedArtists[songKickID] = artist
        return artist
      } else {
        return addToDataBase(name)
      }
    })

  // artist whos names dont match will always make a new api call!
  function addToDataBase(Name) {
    return new Promise(function(resolve, reject) {
      spotifyApi.searchArtists(Name)
        .then(data => {
          let artist_return = null
          let foundName = false;
          data.body.artists.items.forEach((artist, i) => {

              // if songkick name is spotify name
              if (Name == artist.name) {
                foundName = true
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

                // Add Bio
                lastFM.getInfo(Name.toString()).then(data => {
                  if (data && data.artist) {
                    Artist.lastFM_imgs = data.artist.image
                    Artist.summaryBio = data.artist.bio.summary
                    Artist.fullBio = data.artist.bio.content
                    Artist.onTour = data.artist.ontour
                    Artist.genre = data.artist.tags.tag
                    Artist.relatedArtists = data.artist.similar
                  }
                }).catch(err => console.log(err))

                // give API calls 2 secs
                setTimeout(function() {
                  Artist.save(function(err) {
                    if (err) return console.log(err);
                  });
                  cachedArtists[songKickID] = Artist
                  resolve(Artist)
                }, 2000)
              }
            })
            // found no name matches
          if(!foundName) {
            resolve()
          }
        }).catch(err => console.log("ERROR", Name));
    })
  }
}
