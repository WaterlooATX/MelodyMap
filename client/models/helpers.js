export const topTrack = (Artist) => Artist ? Artist.topTracks[0] ? Artist.topTracks[0].preview_url : null : null
export const getArtistImg = (Artist) => Artist ? Artist.img : "http://assets.audiomack.com/default-artist-image.jpg"
export const getAlbumArt = (Artist) => {
  let albumArt = Artist ? Artist.albumsImages : null
  albumArt = albumArt ? albumArt[0] : null
  albumArt = albumArt ? albumArt.images[1].url : 'http://assets.audiomack.com/default-album-image.jpg'
  return albumArt
}
