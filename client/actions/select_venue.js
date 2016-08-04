export const SELECT_VENUE = 'SELECT_VENUE';

export function selectVenue(venue) {
  return {
    type: SELECT_VENUE,
    payload :  venue
  }
}
