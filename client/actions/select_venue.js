export const SELECT_VENUE = 'SELECT_VENUE';

export function selectShow(venue) {
  return {
    type: SELECT_VENUE,
    payload :  venue
  }
}
