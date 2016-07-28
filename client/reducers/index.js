import { combineReducers } from 'redux'
import showReducer from './reducer_fetchShows'

const rootReducer = combineReducers({
  shows: showReducer
})

export default rootReducer;
