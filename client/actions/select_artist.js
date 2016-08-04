export const SELECT_ARTIST = 'SELECT_ARTIST';

export function selectShow(artist) {
  return {
    type: SELECT_ARTIST,
    payload :  artist
  }
}
