const _ = require('lodash');
const Songkick = require('songkick-api');
const Spotify = require('./m_spotifyApi');
const { SONGKICK_FM_APIKEY } = require('./api_keys');

const client = new Songkick(SONGKICK_FM_APIKEY)

// When specifying min_date or max_date, you need to use both parameters.
// Use the same value for both to get events for a single day.
// This search returns only upcoming events.
exports.getShows = (data) => {
  sendArtistNamesToSpotify = shows => {
      let artists = []
      shows.forEach(show => artists.push(...show.performance))
      artists = _.uniq(artists.map(artist => {
        return {
          name: artist.artist.displayName,
          id: artist.artist.id
        }
      }))
      artists.forEach(artist => Spotify.searchArtists(artist.name, artist.id))
    }
    // Search based on a songkick metro area id
    // austin 'geo:30.2669444,-97.7431'
    // `geo:${coords.lat},${coords.long}`
  let today = new Date()
  today = today.toISOString().slice(0, 10)
  console.log(`geo:${data.lat},${data.long}`, data.dateA || today, data.dateB || today);
  return client.searchEvents({
    "location": `geo:${data.lat},${data.long}`,
    "min_date": data.dateA || today,
    "max_date": data.dateB || today
  }).then((shows) => {
    if (shows) {
      sendArtistNamesToSpotify(shows)
      let concerts = shows.slice();
      concerts.forEach(show => {
        if (show.venue.lat === null) show.venue.lat = show.location.lat;
        if (show.venue.lng === null) show.venue.lng = show.location.lng;
      });
      if (concerts.length < 10) {
        return client.searchEvents({
          "location": `geo:${data.lat},${data.long}`
        }).then(Shows => {
          sendArtistNamesToSpotify(Shows)
          let concerts = Shows.slice();
          concerts.forEach(Show => {
            if (Show.venue.lat === null) Show.venue.lat = Show.location.lat;
            if (Show.venue.lng === null) Show.venue.lng = Show.location.lng;
          });
          return concerts;
        })
      } else {
        return concerts
      }
    } else return 'No concerts found for the given dates / location';
  })
}

exports.getArtists = (query) => {
  return client.searchArtists(query)
    .then(data => data)
    .catch(err => console.error(err));
}

exports.getVenue = (venueId) => {
  return client.getVenue(venueId)
    .then(data => data)
    .catch(err => console.error(err));
}

exports.getArtistCalendar = (artistID) => {
  return client.getArtistCalendar(artistID)
    .then(data => data)
    .catch(err => console.error(err));
}

exports.getVenueCalendar = (venueID) => {
  return client.getVenueCalendar(venueID)
    .then(data => data)
    .catch(err => console.error(err));
}

exports.getMetroAreaCalendar = (metroID) => {
  return client.getMetroAreaCalendar(metroID)
    .then(data => data)
    .catch(err => console.error(err));
}

exports.getEventSetlist = (eventID) => {
  return client.getEventSetlist(eventID)
    .then(data => data)
    .catch(err => console.error(err));
}

exports.getSimilarArtists = (artistID) => {
  return client.getSimilarArtists(eventID)
    .then(data => data)
    .catch(err => console.error(err));
}
