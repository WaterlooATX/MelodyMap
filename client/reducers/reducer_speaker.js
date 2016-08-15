import { SET_SPEAKER } from '../actions/actions'

export default function(state = {songPlayed: false, songButton: null}, action) {
  switch (action.type) {
    case SET_SPEAKER:
    return action.payload
  }
  return state
}
