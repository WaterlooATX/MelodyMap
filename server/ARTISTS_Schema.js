var mongoose = require('mongoose');

// Create a Artist schema
const artistSchema = new mongoose.Schema({
  spotifyURL: String,
  id: String,
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

// Created a Mongoose schema which maps to a MongoDB collection and defines
// the shape of the documents within that collection.

// exported the Mongoose Artist model
module.exports = mongoose.model("Artist", artistSchema);
