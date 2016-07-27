import { connect } from 'react-redux';
import { UPDATE_TEXT, CLEAR_TEXT } from '../actions';
import PageOne from '../components/pageOne';

const mapState = (store) => ({
  textFieldValue: store.textField
});

const mapDispatch = (dispatch) => ({
  updateTextFieldValue: (newText) => {
    dispatch({ type: UPDATE_TEXT, data: newText });
  },
  clearTextFieldValue: () => {
    dispatch({ type: CLEAR_TEXT });
  }
});

export default connect(mapState, mapDispatch)(PageOne);
