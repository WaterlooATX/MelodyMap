//require database up here

var Songkick = require('songkick-api');
var client = new Songkick('J4PGT8rVCHdtcfcG') //API KEY

var store = [];

// When specifying min_date or max_date, you need to use both parameters.
// Use the same value for both to get events for a single day.
// This search returns only upcoming events.
exports.getTonightLocalInfo = (coords, dateA, dateB) => {
	// Search based on a songkick metro area id
	// austin 'geo:30.2669444,-97.7431'
	// `geo:${coords.lat},${coords.long}`
	let today = new Date()
	today = today.toISOString().slice(0,10)
	return client.searchEvents(
		{
			"location": `geo:${coords.lat},${coords.long}`,
			"min_date": dateA || today,
      "max_date": dateB || today
		}
	).then((data) => data)
}

exports.getArtists = (query) => {
	return client.searchArtists(query).then(data => data)
}

exports.getVenue = (venueId) => {
  return client.getVenue(venueId).then(data => data)
}

exports.getArtistCalendar = (artistID) => {
  return client.getArtistCalendar(artistID).then(data => data)
}

exports.getVenueCalendar = (venueID) => {
  return client.getVenueCalendar(venueID).then(data => data)
}

exports.getMetroAreaCalendar = (metroID) => {
  return client.getMetroAreaCalendar(metroID).then(data => data)
}

exports.getEventSetlist = (eventID) => {
  return client.getEventSetlist(eventID).then(data => data)
}

exports.getSimilarArtists = (artistID) => {
	return client.getSimilarArtists(eventID).then(data => data)
}
