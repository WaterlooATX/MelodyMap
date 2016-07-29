import { combineReducers } from 'redux'
import showReducer from './reducer_fetchShows'
import locationReducer from './reducer_location'

const rootReducer = combineReducers({
  shows: showReducer,
  location: locationReducer
})

export default rootReducer;
