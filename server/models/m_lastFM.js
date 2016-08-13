// https://github.com/leemm/last.fm.api
const { LAST_FM_APIKEY, LAST_FM_APISECRET } = require('./api_keys');

const API = require('last.fm.api'),
  api = new API({
    apiKey: LAST_FM_APIKEY,
    apiSecret: LAST_FM_APISECRET
  });


exports.getInfo = (name) => {
  return api.artist.getInfo({artist: name})
  .then(json => json)
  .catch(err => console.error(err));
}
