export const topTrack = (Artist) => Artist ? Artist.topTracks[0] ? Artist.topTracks[0].preview_url : null : null
export const getArtistImg = (Artist) => Artist ? Artist.img : "http://assets.audiomack.com/default-artist-image.jpg"
export const getAlbumArt = (Artist) => {
  let albumArt = Artist ? Artist.albumsImages : null
  albumArt = albumArt ? albumArt[0] : null
  albumArt = albumArt ? albumArt.images[1].url : 'http://assets.audiomack.com/default-album-image.jpg'
  return albumArt
}
export const getBio = (Artist) => {
  const randomBio = "The music sails alive with the compelling combination of rich layers among mixed styles of rhythm that hit the soul. By melding hook-filled melody within hard and heavy beats, has the ability to compact a vast array of influence and experience into a singular song"

  const checkBio = (fullBio) => {
    if(fullBio && fullBio.length) {
      return fullBio.slice(0,225).split('/').join(' /').split('%').join('% ').split('<a')[0] + '...'
    } else {
      return randomBio
    }
  }

  return Artist ? checkBio(Artist.fullBio) : randomBio
}
export const isReduxLoaded = (obj) => {
  if(Object.keys(obj).length) {
    return true
  } else {
    return false
  }
}
export const getRandomAlbumArt = (Artist) => {
  let albumArt = Artist ? Artist.albumsImages : null

  if (albumArt && Artist) {
    const albumsImages = Artist.albumsImages.map(album => {
      return album.images ? album.images[1].url : null
    })

    if (albumsImages) {
      let num = albumsImages.length
      return albumsImages[Math.floor(Math.random() * num)]
    }
  }
}
