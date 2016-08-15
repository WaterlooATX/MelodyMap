import { SELECT_VENUE } from '../actions/actions'

export default function(state = null, action) {
  switch (action.type) {
    case SELECT_VENUE:
    return action.payload;
  }
  return state
}
