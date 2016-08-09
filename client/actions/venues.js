export const VENUES = 'VENUES'

export function redux_Venues(venues) {
  return {
    type: VENUES,
    payload: venues
  }
}
