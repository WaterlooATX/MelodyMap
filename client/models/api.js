import axios from 'axios'

export function getVenueAPI(venueID) {
  return axios.post('/getVenue', {
    id : venueID
  })
}

export function artistInfoAPI(name) {
  return axios.post('/artistInfo', {
    name: name
  })
}

export function artistTracksAPI(artistID, countryCode) {
  return axios.post('/artistTracks', {
    id: artistID,
    code: countryCode
  })
}

export function fetchShowsAPI(long, lat) {
  return axios.post("/fetchShows", {
    long: long,
    lat: lat
  })
}

export function getArtistAlbumsAPI(artistID) {
  return axios.post('/getArtistAlbums', {
    id: artistID
  })
}

export function geolocationAPI(success, fail, options) {
  return navigator.geolocation.getCurrentPosition(success, fail, options)
}

export function getArtistRelatedArtists(artistID) {
  return axios.post('/getArtistRelatedArtists', {
    id: artistID
  })
}
export function ipLocationAPI() {
  return axios('http://ip-api.com/json')
}
