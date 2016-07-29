import axios from 'axios';
export const FETCH_SHOWS = 'FETCH_SHOWS';

function getLocation() {
    console.log('asking for geolocation..')
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => fetchShows(position));
    } else {
      console.log("Geolocation is not supported by this browser.")
    }
}

export function fetchShows(long,lat) {
  //const shows = axios.post("/fetchShows", {long: "-97.7431" , lat: "30.2669444"}).then((data) => console.log("axios.get(/test)", data))
  // redux middleware sends promise
  // return {
  //   type: FETCH_SHOWS,
  //   payload : axios.get(`http://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7431&apikey=J4PGT8rVCHdtcfcG`)
  // }
  return {
    type: FETCH_SHOWS,
    payload :  axios.post("/fetchShows", {long: "-97.7431" , lat: "30.2669444"})
  }
}
