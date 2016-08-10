var mongoose = require('mongoose');

// Create a Artist schema
const artistSchema = new mongoose.Schema({
  spotifyURL: String,
  id: Number,
  songKickName: String,
  spotifyName: String,
  artistImages: Array,
  img: String,
  popularity: Number,
  followers: Number,
  relatedArtists: Array,
  albums: Array,
  topTracks: Array,
  summaryBio: String,
  fullBio: String,
  updated_at: { type: Date, default: Date.now }
});


module.exports.artistSchema = artistSchema;
