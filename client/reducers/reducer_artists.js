import { FETCH_ARTIST } from '../actions/artist'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ARTIST:
    return action.payload.data
  }
  return state
}
