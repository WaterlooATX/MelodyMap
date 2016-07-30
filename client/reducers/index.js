import { combineReducers } from 'redux'
import showReducer from './reducer_fetchShows'
import selectShowReducer from './reducer_selectShow'

const rootReducer = combineReducers({
  shows: showReducer,
  selectedShow: selectShowReducer
})

export default rootReducer;
