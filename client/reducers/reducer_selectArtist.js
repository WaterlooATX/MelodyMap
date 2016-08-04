import { SELECT_ARTIST } from '../actions/select_artist'

export default function(state = null, action) {
  switch (action.type) {
    case SELECT_ARTIST:
    return action.payload;
  }
  return state
}
