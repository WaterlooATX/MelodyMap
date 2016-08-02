import axios from 'axios'

export const artistInfo = () => {

}

export function fetchShowsAPI(geo) {
  return axios.post("/fetchShows", {long: geo.long , lat: geo.lat})
}
