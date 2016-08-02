import {fetchShowsAPI} from "../models/api"
export const FETCH_SHOWS = 'FETCH_SHOWS'

export function fetchShows(geo) {
	console.log("fetch shows",geo)
  return {
    type: FETCH_SHOWS,
    payload:  fetchShowsAPI(geo.long, geo.lat)
  }
}
