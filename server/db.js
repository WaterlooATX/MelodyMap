// mongoose 4.3.x
var mongoose = require('mongoose');

/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var mongodbUri = 'mongodb://MelodyMap:makersquare@ds147995.mlab.com:47995/melodymap'

mongoose.connect(mongodbUri, options);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {

  // Create a Artist schema
  const artistSchema = mongoose.Schema({
    spotifyURL: String,
    id: Number,
    name: String,
    artistImages: Array,
    img: String,
    popularity: Number,
    followers: Number,
    relatedArtists: Array,
    albums: Array,
    topTracks: Array,
    summaryBio: String,
    fullBio: String
  })

  // Store artist documents in a collection called "artists"
  const Artist = mongoose.model('artists', artistSchema)


  // Only close the connection when your app is terminating
  mongoose.connection.db.close(function (err) {
    if(err) throw err;
  });

});

module.exports = db
