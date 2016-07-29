import axios from 'axios';
export const FETCH_SHOWS = 'FETCH_SHOWS';
export const FETCH_GEOLOCATION = 'FETCH_GEOLOCATION';

export function fetchShows(geo) {
  //const shows = axios.post("/fetchShows", {long: "-97.7431" , lat: "30.2669444"}).then((data) => console.log("axios.get(/test)", data))
  // redux middleware sends promise
  // return {
  //   type: FETCH_SHOWS,
  //   payload : axios.get(`http://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7431&apikey=J4PGT8rVCHdtcfcG`)
  // }
  return {
    type: FETCH_SHOWS,
    payload:  axios.post("/fetchShows", {long: geo.coords.longitude , lat: geo.coords.latitude})
  }
}

export function fetchGeoLocation() {
  var getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

// getPosition()
//   .then((position) => {
//     console.log(position);
//   })
//   .catch((err) => {
//     console.error(err.message);
//   });
  return {
    type: FETCH_GEOLOCATION,
    payload: getPosition()
  }
}
