import { SELECT_SHOW } from '../actions/select_show'

export default function(state = null, action) {
  switch (action.type) {
    case SELECT_SHOW:
    return action.payload;
  }
  return state
}
