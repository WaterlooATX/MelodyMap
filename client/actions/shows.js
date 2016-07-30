import axios from 'axios';
export const FETCH_SHOWS = 'FETCH_SHOWS';

export function fetchShows(geo) {
  return {
    type: FETCH_SHOWS,
    payload:  axios.post("/fetchShows", {long: geo.long , lat: geo.lat})
  }
}
