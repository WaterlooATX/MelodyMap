var mongoose = require('mongoose');

// Create a Artist schema
const artistSchema = new mongoose.Schema({
  lastFM_imgs: Array,
  spotifyURL: String,
  id: String,
  name: String,
  images: Array,
  img: String,
  popularity: Number,
  followers: Number,
  relatedArtists: Array,
  albumsImages: Array,
  topTracks: Array,
  summaryBio: String,
  fullBio: String,
  updated_at: { type: Date, default: Date.now },
  songKickID: Number,
  onTour: String,
  genre: Array
});

// Created a Mongoose schema which maps to a MongoDB collection and defines
// the shape of the documents within that collection.

// exported the Mongoose Artist model
module.exports = mongoose.model("Artist", artistSchema);
