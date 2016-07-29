import axios from 'axios';
export const FETCH_SHOWS = 'FETCH_SHOWS';

// getLocation();
// its own location state
function getLocation() {
    console.log('asking for geolocation..')
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => fetchShows(position));
    } else {
      console.log("Geolocation is not supported by this browser.")
    }
}
// export function fetchShows(position, start, end) {

export function fetchShows() {

  // let pos = position || {};
  // if (!position) {
  //   console.log('asking for geolocation..')
  //   if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((location) => { pos = location });
  //   } else {
  //     console.log("Geolocation is not supported by this browser.")
  //   }
  // }
  //
  // const lat = pos.coords.latitude;
  // const long = pos.coords.longitude;
  // console.log(lat,long);
  //
  // let startDate = start || new Date();
  // let endDate = end || new Date();
  //
  // startDate = startDate.toISOString().slice(0, 10);
  // endDate = endDate.toISOString().slice(0, 10);
  //
  // const body = {
  //   lat,
  //   long,
  //   startDate,
  //   endDate
  // }
  //
  // console.log('fetchShows body', body);

  //const request = axios.get(body)// url?

  // redux middleware sends promise
  return {
    type: FETCH_SHOWS,
    payload : axios.get(`http://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7431&apikey=J4PGT8rVCHdtcfcG`)
  }
}
