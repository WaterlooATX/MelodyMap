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

  // To use our schema definition, we need to convert our blogSchema into a Model we can work with
  var kittySchema = mongoose.Schema({
    name: String
  });

  // Instances of Models are documents.
  var Kitten = mongoose.model('Kitten', kittySchema);
  var silence = new Kitten({
    name: 'Silence'
  });
  silence.save(function(err, fluffy) {
    if (err) return console.error(err);

  });
});



// // clears database
// db.deleteEverything = function () {
//   return Promise.all([db.collection("articles").remove({})])
// };
