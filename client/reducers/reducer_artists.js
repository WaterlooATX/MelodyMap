import { FETCH_ARTIST } from '../actions/actions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ARTIST:
      return action.payload;
  }
  return state;
}
