import axios from 'axios';
import AustinJSON from '../../songkickEventsAustinJSON'
const austinEvents = AustinJSON().resultsPage.results.event;

export const FETCH_SHOWS = 'FETCH_SHOWS';

getLocation();
function getLocation() {
    console.log('asking for geolocation..')
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => fetchShows(position));
    } else {
      console.log("Geolocation is not supported by this browser.")
    }
}

export function fetchShows(position, start, end) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  console.log(lat,long);

  let startDate = start || new Date();
  let endDate = end || new Date();

  startDate = startDate.toISOString().slice(0, 10);
  endDate = endDate.toISOString().slice(0, 10);

  const body = {
    lat,
    long,
    startDate,
    endDate
  }

  console.log('fetchShows body', body);
  console.log(austinEvents)

  //const request = axios.get(body)// url?

  // redux middleware sends promise
  return {
    type: FETCH_SHOWS,
    payload : austinEvents
  }
}
