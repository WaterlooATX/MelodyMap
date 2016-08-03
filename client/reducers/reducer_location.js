import { LOCATION } from '../actions/location'

export default function(state = [], action) {
  switch (action.type) {
    case LOCATION:
    return action.payload.data
  }
  return state
}
