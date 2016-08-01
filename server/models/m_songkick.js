//require database up here

var Songkick = require('songkick-api');
var client = new Songkick('J4PGT8rVCHdtcfcG') //API KEY

var store = [];

// When specifying min_date or max_date, you need to use both parameters.
// Use the same value for both to get events for a single day.
// This search returns only upcoming events.
exports.getTonightLocalInfo = (coords) => {
	// Search based on a songkick metro area id
	// austin 'geo:30.2669444,-97.7431'
	// `geo:${coords.lat},${coords.long}`
	return client.searchEvents({"location": `geo:${coords.lat},${coords.long}`}).then((data) => data)
}
