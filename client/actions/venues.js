export const VENUES = 'VENUES'

export function setVenue(venues) {
  return {
    type: VENUES,
    payload: venues
  }
}
