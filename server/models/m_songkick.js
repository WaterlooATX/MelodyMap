//require database up here

var Songkick = require('songkick-api');
var client = new Songkick('J4PGT8rVCHdtcfcG') //API KEY

var store = [];

exports.getTonightLocalInfo = (coords) => {
	// Search based on a songkick metro area id
	// austin 'geo:30.2669444,-97.7431'
	// `geo:${coords.lat},${coords.long}`
	return client.searchEvents({
         "location": `geo:${coords.lat},${coords.long}`
     }).then((data) => data)
}
