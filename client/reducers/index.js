import { combineReducers } from 'redux'
import showReducer from './reducer_fetchShows'
import locationReducer from './reducer_location'
import selectShowReducer from './reducer_selectShow'
import selectArtistReducer from './reducer_selectArtist'
import selectVenueReducer from './reducer_selectVenue'


const rootReducer = combineReducers({
  shows: showReducer,
  selectedShow: selectShowReducer,
  location: locationReducer
})

export default rootReducer;
