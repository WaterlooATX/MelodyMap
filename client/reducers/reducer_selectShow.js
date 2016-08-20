import { SELECT_SHOW } from '../actions/actions';

export default function (state = null, action) {
  switch (action.type) {
    case SELECT_SHOW:
      return action.payload;
  }
  return state;
}
