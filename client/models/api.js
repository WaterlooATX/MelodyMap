import axios from 'axios'

export function Songkick_getVenueAPI(venueID) {
  return axios.post('/Songkick_getVenue', {
    id: venueID
  });
}

export function Spotify_searchArtistsAPI(name) {
  return axios.post('/Spotify_searchArtists', {
    name: name
  });
}

export function LastFM_getInfoAPI(name) {
  return axios.post("/LastFM_getInfo", {
    name: name
  })
}

export function Spotify_getArtistTopTracksAPI(artistID, countryCode) {
  return axios.post('/Spotify_getArtistTopTracks', {
    id: artistID,
    code: countryCode
  });
}

export function getArtistAlbumsAPI(artistID) {
  return axios.post('/getArtistAlbums', {
    id: artistID
  });
}

export function Songkick_getSimilarArtistsAPI(artistID) {
  return axios.post('/Songkick_getSimilarArtists', {

export function getArtistRelatedArtists(artistID) {
  return axios.post('/getArtistRelatedArtists', {
    id: artistID
  });
}

export function fetchShowsAPI(long, lat) {
  return axios.post("/fetchShows", {
    long: long,
    lat: lat
  });
}

export function geolocationAPI(success, fail, options) {
  return navigator.geolocation.getCurrentPosition(success, fail, options);
}

export function ipLocationAPI() {
  return axios('http://ip-api.com/json');
}

export function Songkick_getEventSetlistAPI(eventID) {
  return axios.post('/Songkick_getEventSetlist', {
    id: eventID
  });
}

export function Songkick_getMetroAreaCalendarAPI(metroID) {
  return axios.post('/Songkick_getMetroAreaCalendar', {
    id: metroID
  });
}

export function Songkick_getVenueCalendarAPI(venueID) {
  return axios.post('/Songkick_getVenueCalendar', {
    id: venueID
  });
}

export function Songkick_getArtistCalendarAPI(venueID) {
  return axios.post('/Songkick_getArtistCalendar', {
    id: venueID
  });
}
