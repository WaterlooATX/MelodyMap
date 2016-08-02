import axios from 'axios'

export function artistInfoAPI(name) {
  return axios.post('/artistInfo', {name: name})
}

export function fetchShowsAPI(long, lat) {
  return axios.post("/fetchShows", {long: long , lat: lat})
}

export function geolocationAPI(success, fail, options) {
  return navigator.geolocation.getCurrentPosition(success, fail, options)
}

export function ipLocationAPI() {
  return axios('http://ip-api.com/json')
}
