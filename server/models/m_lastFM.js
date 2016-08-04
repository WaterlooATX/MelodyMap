// https://github.com/leemm/last.fm.api

const API = require('last.fm.api'),
    api = new API({
        apiKey: 'fb53a66a5f324cfd2cfd15ec4fc5fbcd',
        apiSecret: '3e43c10b9e2e55a1c45952c13ad150cd'
    });

api.artist.getInfo({
	artist: 'Nirvana',
	username: 'cheweduppunk', // optional
	lang: 'eng', // optional
	//autocorrect: 1 // autocorrect is optional
	//mbid: 'nevermind' Musicbrainz ID (optional)
})
	.then(json => { console.log(json); })
	.catch(err => { console.error(err); });
