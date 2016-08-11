export const VENUE_SHOWS = 'VENUE_SHOWS'

export function redux_Artists(show) {
  return {
    type: VENUE_SHOWS,
    payload: show
  }
}
