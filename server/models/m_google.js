const axios = require('axios');

exports.placeIdAPI = (metroID) => {
    console.log('m_google runnning');
  return axios(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&name=cruise&key=AIzaSyC0pNgm6l6mEWEfBNNyuDAr-wIpoHuHNew`)
    .then(data => {
      console.log('.then data', data.data.results)
      return data.data.results;
    })
    .catch(err => console.error(err));
}