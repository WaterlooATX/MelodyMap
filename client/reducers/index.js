import { combineReducers } from 'redux';
import showReducer from './reducer_fetchShows';
import locationReducer from './reducer_location';
import selectShowReducer from './reducer_selectShow';
import selectArtistReducer from './reducer_selectArtist';
import artistReducer from './reducer_artists';
import venuesReducer from './reducer_venues';
import spekaerReducer from './reducer_speaker';
import spotifyUser from './spotify';


const rootReducer = combineReducers({
  shows: showReducer,
  selectedShow: selectShowReducer,
  location: locationReducer,
  artists: artistReducer,
  venues: venuesReducer,
  speaker: spekaerReducer,
  spotifyUser,
});

export default rootReducer;
