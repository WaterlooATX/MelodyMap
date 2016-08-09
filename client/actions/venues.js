export const VENUES = 'VENUES'

export function redux_Venues(venue) {
  return {
    type: VENUES,
    payload: venue
  }
}
