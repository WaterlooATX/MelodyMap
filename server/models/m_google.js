const axios = require('axios');
const querystring = require('querystring');
const apiKey = require('./api_keys')

// hide api key

exports.placeIdAPI = (name, lat, long) => {
    // console.log('m_google runnning');
  return axios(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=500&type=establishment&name=${name}&key=AIzaSyC0pNgm6l6mEWEfBNNyuDAr-wIpoHuHNew`)
    .then(data => {return data.data.results})
    .catch(err => console.error('error', err))
}

exports.photoAPI = (photoReference) => {
  // console.log('m_google.js photoReference ' , photoReference);
  return axios(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyC0pNgm6l6mEWEfBNNyuDAr-wIpoHuHNew`)
    .then(data => {
      // console.log('m_google response data ' , data);
      return data
    })
    .catch(err => console.log('error', err))
}