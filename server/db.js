// https://devcenter.heroku.com/articles/nodejs-mongoose
// http://scottksmith.com/blog/2014/05/05/beer-locker-building-a-restful-api-with-node-crud/
// http://www.phil-hudson.com/data-driven-nodejs-tutorials-part-3-integrating-models-mongoose-and-mongodb/
// http://javabeat.net/mongoose-nodejs-mongodb/
// Mongoose/MongoDB Tutorials https://www.youtube.com/playlist?list=PLVBXNyNyLNq0jyDcfjOc9psQYK_leG52r
var mongoose = require('mongoose');

/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */
var options = {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  }
};
var mongodbUri = 'mongodb://MelodyMap:makersquare@ds147995.mlab.com:47995/melodymap'

mongoose.connect(mongodbUri, options);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  // check if artists is in db
  // console.log("open")
  // let bands = "chris,Björk,Nicki Minaj,Dnce,kiiara,R.E.M.,Marilyn Manson, Jonas Blue, Katy Perry, System of a Down, Massive Attack, Foo Fighters, Meghan Trainor, Marvin Gaye, Jimi Hendrix, Oasis, Tame Impala, Kings of Leon"
  // bands.split(',').forEach(name => {
  //   Spotify.searchArtists(name)
  //   .then(data => {
  //    const Artist = new ArtistModel();
  //
  //    let a = data[0];
  //     Artist.spotifyURL = data[0].external_urls.spotify
  //     Artist.id = a.id
  //     Artist.songKickName = name
  //     Artist.spotifyName = a.name
  //     Artist.artistImages = a.images
  //     Artist.img = a.images.length ? a.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"
  //     Artist.popularity = a.popularity
  //     Artist.followers = a.followers.total
  //     Artist.relatedArtists = []
  //     Artist.albums = []
  //     Artist.topTracks = []
  //     Artist.summaryBio = ""
  //     Artist.fullBio = ""
  //
  //     Artist.save(function(err, fluffy) {
  //       if (err) return console.log(err);
  //     });
  //     console.log(Artist.find(songKickName: name))
  //   })
  // })

})
