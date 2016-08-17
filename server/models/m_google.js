const axios = require('axios');
const querystring = require('querystring');
const {GOOGLE_PLACES_API_KEY, GOOGLE_PLACES_OUTPUT_FORMAT} = require('./api_keys')
const GooglePlaces = require('googleplaces')
const Places = new GooglePlaces(GOOGLE_PLACES_API_KEY, GOOGLE_PLACES_OUTPUT_FORMAT)

exports.placeIdAPI = (name, lat, long) => {
    // console.log('m_google runnning');
  return axios(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=500&type=establishment&name=${name}&key=${GOOGLE_PLACES_API_KEY}`)
    .then(data => data.data.results)
    .catch(err => console.error('error', err))
}

exports.photoAPI = (photoreference) => {
  const parameters = {
    photoreference: photoreference,
    sensor: false
  };

  return new Promise( function(resolve, reject) {
    Places.imageFetch(parameters, (error, response) => {
      if (error) throw error;
      console.log(response)
      resolve(response)
    })
  })
}
