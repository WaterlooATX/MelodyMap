import { combineReducers } from 'redux'
import showReducer from './reducer_fetchShows'
import selectShowReducer from './reducer_selectShow'
import locationReducer from './reducer_location'

const rootReducer = combineReducers({
  shows: showReducer,
  selectedShow: selectShowReducer,
  location: locationReducer
})

export default rootReducer;
