import initialState from '../store/initialState';
import { UPDATE_TEXT, CLEAR_TEXT } from '../actions';

export default (state = initialState.textField, action) => {
  switch (action.type) {
    case UPDATE_TEXT:
      return action.data;

    case CLEAR_TEXT:
      return '';

    default:
      return state;
  }
};
