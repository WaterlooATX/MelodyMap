//require database up here

var Songkick = require('songkick-api');
var client = new Songkick('J4PGT8rVCHdtcfcG') //API KEY

var store = [];

exports.getTonightLocalInfo = () => {
	//return databse get info
	client.searchEvents({
		location: 'ip: 192.168.1.196', //my ip adress
		min_date: '2016-07-30',
		max_date: '2016-07-31'
	}).then(function(data){
		console.log("here's data from the model: ", data)
		return data;
	})
}