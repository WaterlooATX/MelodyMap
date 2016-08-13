const axios = require('axios');
const querystring = require('querystring');

// hide api key

exports.placeIdAPI = (name, lat, long) => {
    console.log('m_google runnning');
  return axios(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=500&type=establishment&name=${name}&key=AIzaSyC0pNgm6l6mEWEfBNNyuDAr-wIpoHuHNew`)
    .then(data => {
      console.log('.then data', data.data.results)
      return data.data.results;
    })
    .catch(err => console.error(err));
}