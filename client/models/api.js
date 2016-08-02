import axios from 'axios'

export function artistInfoAPI(name) {
  return axios.post('/artistInfo', {name: name})
}

export function fetchShowsAPI(long, lat) {
  return axios.post("/fetchShows", {long: long , lat: lat})
}
