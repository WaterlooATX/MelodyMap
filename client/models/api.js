import axios from 'axios';
import { GOOGLE_MAP_KEY, GOOGLE_GEOLOCATION_KEY } from '../../server/models/api_keys';


export function Google_placeIdAPI(name, lat, long) {
  return axios.post('/Google_placeIdAPI', {
    name,
    lat,
    long,
  });
}

export function Google_photoAPI(photoReference) {
  return axios('/Google_photoAPI', {
    params: {
      photoReference,
    },
  });
}

export function googleapis_geolocation() {
  return axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_GEOLOCATION_KEY}`);
}

export function geolocationAPI(success, fail, options) {
  return navigator.geolocation.getCurrentPosition(success, fail, options);
}

export function ipLocationAPI() {
  return axios('http://ip-api.com/json');
}

export function Google_geocoder(city) {
  return axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_MAP_KEY}`);
}

export function Spotify_searchArtistsAPI(artist) {
  return axios.post('/Spotify_searchArtists', {
    name: artist.name,
    id: artist.id,
  });
}

export function Spotify_getArtistTopTracksAPI(artistID, countryCode) {
  return axios.post('/Spotify_getArtistTopTracks', {
    id: artistID,
    code: countryCode,
  });
}

export function LastFM_getInfoAPI(name) {
  return axios.post('/LastFM_getInfo', {
    name,
  });
}

export function fetchShowsAPI(long, lat, dateA, dateB) {
  return axios.post('/fetchShows', {
    long,
    lat,
    dateA,
    dateB,
  });
}

export function fetchArtistsAPI(query) {
  return axios.post('/fetchArtists', {
    query,
  });
}

export function fetchVenuesAPI(query) {
  return axios.post('/fetchVenues', {
    query,
  });
}

export function getArtistAlbumsAPI(artistID) {
  return axios.post('/getArtistAlbums', {
    id: artistID,
  });
}

export function Songkick_getShows(city, dateA, dateB) {
  return axios.post('/Songkick_getShows', {
    city,
    dateA,
    dateB,
  });
}

export function Songkick_getVenueAPI(venueID) {
  return axios.post('/Songkick_getVenue', {
    id: venueID,
  });
}

export function Songkick_getSimilarArtistsAPI(artistID) {
  return axios.post('/Songkick_getSimilarArtists', {
    id: artistID,
  });
}

export function Songkick_getEventSetlistAPI(eventID) {
  return axios.post('/Songkick_getEventSetlist', {
    id: eventID,
  });
}

export function Songkick_getMetroAreaCalendarAPI(metroID) {
  return axios.post('/Songkick_getMetroAreaCalendar', {
    id: metroID,
  });
}

export function Songkick_getVenueCalendarAPI(venueID) {
  return axios.post('/Songkick_getVenueCalendar', {
    id: venueID,
  });
}

export function Songkick_getArtistCalendarAPI(venueID) {
  return axios.post('/Songkick_getArtistCalendar', {
    id: venueID,
  });
}

export function Artist_artistInfoAPI(name) {
  if (name.length > 2) {
    return axios.post('/Artist_artistInfo', {
      name,
    });
  }
}
