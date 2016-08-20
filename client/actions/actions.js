export const FETCH_ARTIST = 'FETCH_ARTIST';
export const FETCH_SHOWS = 'FETCH_SHOWS';
export const LOCATION = 'LOCATION';
export const SELECT_ARTIST = 'SELECT_ARTIST';
export const SELECT_SHOW = 'SELECT_SHOW';
export const SELECT_VENUE = 'SELECT_VENUE';
export const SET_SPEAKER = 'SET_SPEAKER';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const VENUES = 'VENUES';

import Spotify from 'spotify-web-api-js';
import { fetchShowsAPI } from '../models/api';
const spotifyApi = new Spotify();

export function setSpeaker(speaker) {
  return {
    type: SET_SPEAKER,
    payload: speaker,
  };
}

export function redux_Artists(artist) {
  return {
    type: FETCH_ARTIST,
    payload: artist,
  };
}

export function setLocation(location) {
  return {
    type: LOCATION,
    payload: location,
  };
}

export function selectArtist(artist) {
  return {
    type: SELECT_ARTIST,
    payload: artist,
  };
}

export function selectShow(show) {
  return {
    type: SELECT_SHOW,
    payload: show,
  };
}

export function selectVenue(venue) {
  return {
    type: SELECT_VENUE,
    payload: venue,
  };
}

export function fetchShows(data) {
  return {
    type: FETCH_SHOWS,
    payload: fetchShowsAPI(data.long, data.lat, data.startDate, data.endDate),
  };
}

/** set the app's access and refresh tokens */
export function setTokens(accessToken, refreshToken) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  return {
    type: SPOTIFY_TOKENS,
    accessToken,
    refreshToken,
  };
}

export function getMyInfo() {
  return {
    type: SPOTIFY_ME_BEGIN,
    payload: spotifyApi.getMe().then(data => {
      return data;
    }),
  };
}


export function redux_Venues(venue) {
  return {
    type: VENUES,
    payload: venue,
  };
}
