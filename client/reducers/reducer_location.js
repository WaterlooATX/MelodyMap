import { FETCH_GEOLOCATION } from '../actions/shows'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_GEOLOCATION:
    return [action.payload.data, ...state]
  }
  return state
}
