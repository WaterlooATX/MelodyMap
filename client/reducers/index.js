import { combineReducers } from 'redux'
import showReducer from './reducer_fetchShows'
import locationReducer from './reducer_location'
import selectShowReducer from './reducer_selectShow'
import selectArtistReducer from './reducer_selectArtist'
import artistReducer from './reducer_artists'
import venuesReducer from './reducer_venues'
//import selectVenueReducer from './reducer_selectVenue'


const rootReducer = combineReducers({
  shows: showReducer,
  selectedShow: selectShowReducer,
  location: locationReducer,
  artists: artistReducer,
  venues: venuesReducer
  //selectedVenue: selectVenueReducer
})

export default rootReducer;
