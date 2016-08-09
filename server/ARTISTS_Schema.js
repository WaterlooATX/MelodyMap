var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Create a Artist schema
const artistSchema = new Schema({
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
});


module.exports.artistSchema = artistSchema;
