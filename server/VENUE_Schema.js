var mongoose = require('mongoose');

// Create a Venue schema
const venueSchema = new mongoose.Schema({
  id: Number,
  ageRestriction: String,
  capacity: String(),
  street: String,
  geo: {lat: Number, long: Number},
  city: String,
  state: String,
  website: String,
  name: String,
  address: String,
  phone: String,
  upcomingShows: Array,
  updated_at: { type: Date, default: Date.now },
  google: Object,
  photo: String,
  rating: String,
  icon: String,
  googleID: String,
  price: String
});

// Created a Mongoose schema which maps to a MongoDB collection and defines
// the shape of the documents within that collection.

// exported the Mongoose Venue model
module.exports = mongoose.model("Venue", venueSchema);
