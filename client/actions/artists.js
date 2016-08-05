import {fetchShowsAPI} from "../models/api"
export const FETCH_ARTIST = 'FETCH_ARTIST'

export function fetchArtist(artist) {


  return {
    type: FETCH_ARTIST,
    payload: artist
  }
}
