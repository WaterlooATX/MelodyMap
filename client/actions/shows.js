import {fetchShowsAPI} from "../models/api"
export const FETCH_SHOWS = 'FETCH_SHOWS'

export function fetchShows(data) {
  return {
    type: FETCH_SHOWS,
    payload:  fetchShowsAPI(data.long, data.lat, data.startDate, data.endDate)
  }
}