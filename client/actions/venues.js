import {fetchShowsAPI} from "../models/api"
export const FETCH_VENUE = 'FETCH_VENUE'

export function fetchVenue(venueID) {
  return {
    type: FETCH_VENUE,
    payload: getVenueAPI(venueID)
  }
}
