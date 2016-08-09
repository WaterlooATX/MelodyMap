// https://github.com/leemm/last.fm.api

const API = require('last.fm.api'),
    api = new API({
        apiKey: 'fb53a66a5f324cfd2cfd15ec4fc5fbcd',
        apiSecret: '3e43c10b9e2e55a1c45952c13ad150cd'
    });


exports.getInfo = (name) => {
  return api.artist.getInfo({artist: name})
    .then(json => json)
    .catch(err => console.error(err));
}
