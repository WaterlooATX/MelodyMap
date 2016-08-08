const Songkick = require("./m_songkick")
const Spotify = require("./m_spotifyApi")
const LastFM = require("./m_lastFM")


exports.artistInfo = (name) => {
  return Spotify.searchArtists(name)
    .then(data => {
      let a = data[0]
      return {
        spotifyURL: a.external_urls,
        id: a.id,
        name: a.name,
        artistImages: a.images,
        img: a.images.length ? a.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg",
        popularity: a.popularity,
        followers: a.followers.total
      }
    })
    .then(artist => {
      return Spotify.getArtistRelatedArtists(artist.id)
        .then(data => {
          artist['relatedArtists'] = data.artists
          return artist
        })
        .catch(data => artist)
    })
    .then(artist => {
      return Spotify.getArtistAlbums(artist.id)
        .then(albums => {
          let a = albums.items.map(album => {
            return {
              name: album.name,
              images: album.images,
              id: album.id
            }
          })
          artist['albums'] = a
          return artist
        })
        .catch(data => artist)
    })
    .then(artist => {
      return Spotify.getArtistTopTracks(artist.id, countryCode = 'us')
        .then((data) => {
          artist['topTracks'] = data.tracks
          return artist
        })
        .catch(data => artist)
    })
    .then(artist => {
      return LastFM.getInfo(artist.name)
        .then((data) => {
          artist['summaryBio'] = data.artist.bio.summary
          artist['fullBio'] = data.artist.bio.content
          return artist
        })
        .catch(data => artist)
    })
    .catch(error => console.log("error", error))
}
