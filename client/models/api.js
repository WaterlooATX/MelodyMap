import axios from 'axios'

export function getVenueAPI(venueID) {
  return axios.post('/getVenue', {
    id: venueID
  });
}

export function artistInfoAPI(name) {
  return axios.post('/artistInfo', {
    name: name
  });
}

export function LastFM_getInfoAPI(name) {
  return axios.post("/LastFM.getInfo", {
    name: name
  })
}

export function artistTracksAPI(artistID, countryCode) {
  return axios.post('/artistTracks', {
    id: artistID,
    code: countryCode
  });
}

export function fetchShowsAPI(long, lat) {
  return axios.post("/fetchShows", {
    long: long,
    lat: lat
  });
}

export function getArtistAlbumsAPI(artistID) {
  return axios.post('/getArtistAlbums', {
    id: artistID
  });
}

export function geolocationAPI(success, fail, options) {
  return navigator.geolocation.getCurrentPosition(success, fail, options);
}

export function Songkick_getSimilarArtists(artistID) {
  return axios.post('/Songkick_getSimilarArtists', {
    id: artistID
  });
}

export function ipLocationAPI() {
  return axios('http://ip-api.com/json');
}

export function Songkick_getEventSetlist(eventID) {
  return axios.post('/Songkick_getEventSetlist', {
    id: eventID
  });
}

export function Songkick_getMetroAreaCalendar(metroID) {
  return axios.post('/Songkick_getMetroAreaCalendar', {
    id: metroID
  });
}

export function Songkick_getVenueCalendar(venueID) {
  return axios.post('/Songkick_getVenueCalendar', {
    id: venueID
  });
}

export function Songkick_getArtistCalendar(venueID) {
  return axios.post('/Songkick_getArtistCalendar', {
    id: venueID
  });
}
