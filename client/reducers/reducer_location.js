import { LOCATION } from '../actions/actions'

export default function(state = [], action) {
  switch (action.type) {
    case LOCATION:
    return action.payload
  }
  return state
}
