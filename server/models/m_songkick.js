//require database up here

var Songkick = require('songkick-api');
var client = new Songkick('J4PGT8rVCHdtcfcG') //API KEY

var store = [];

// When specifying min_date or max_date, you need to use both parameters.
// Use the same value for both to get events for a single day.
// This search returns only upcoming events.
exports.getShows = (data) => {
  // Search based on a songkick metro area id
  // austin 'geo:30.2669444,-97.7431'
  // `geo:${coords.lat},${coords.long}`
  let today = new Date()
  today = today.toISOString().slice(0,10)
  console.log(`geo:${data.lat},${data.long}`, data.dateA || today, data.dateB || today);
  return client.searchEvents(
    {
      "location": `geo:${data.lat},${data.long}`,
      "min_date": data.dateA || today,
      "max_date": data.dateB || today
    }
  ).then((shows) => {
    if (shows) {
      let concerts = shows.slice();
      concerts.forEach(show => {
        if (show.venue.lat === null) show.venue.lat = show.location.lat;
        if (show.venue.lng === null) show.venue.lng = show.location.lng;
      });
      if( concerts.length < 10) {
        return client.searchEvents({"location": `geo:${data.lat},${data.long}`}).then(shows => {
          let concerts = shows.slice();
          concerts.forEach(show => {
            if (show.venue.lat === null) show.venue.lat = show.location.lat;
            if (show.venue.lng === null) show.venue.lng = show.location.lng;
          });
          return concerts;
        })
      } else {
        return concerts
      }
    } else console.log('no concerts found for the given dates / location');
  })
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
