export const FETCH_ARTIST = 'FETCH_ARTIST'

export function redux_Artists(artist) {
  return {
    type: FETCH_ARTIST,
    payload: artist
  }
}
