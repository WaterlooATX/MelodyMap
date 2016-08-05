import { combineReducers } from 'redux'
import showReducer from './reducer_fetchShows'
import locationReducer from './reducer_location'
import selectShowReducer from './reducer_selectShow'
import selectArtistReducer from './reducer_selectArtist'
import selectVenueReducer from './reducer_selectVenue'
import artistReducer from './reducer_artists'


const rootReducer = combineReducers({
  shows: showReducer,
  selectedShow: selectShowReducer,
  location: locationReducer,
  artists: artistReducer
})

export default rootReducer;
