export const SELECT_ARTIST = 'SELECT_ARTIST';

export function selectArtist(artist) {
  return {
    type: SELECT_ARTIST,
    payload :  artist
  }
}
