import { FETCH_SHOWS } from '../actions/actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_SHOWS:
    return action.payload.data
  }
  return state;
}
