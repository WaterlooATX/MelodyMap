import { FETCH_SHOWS } from '../actions/shows'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SHOWS:
    return [action.payload.data, ...state]
  }
  return state
}
