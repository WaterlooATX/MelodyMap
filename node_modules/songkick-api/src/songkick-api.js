'use strict';
var Q = require('q'),
    querystring = require('querystring'),
    request = require('request'),
    util = require('util');

var baseUrl = 'http://api.songkick.com/api/3.0';

function makeRequest(url, resultType) {
    var deferred = Q.defer();
    request.get(url, function(error, response, body) {
        body = JSON.parse(body);
        if (body.resultsPage.status === 'error') {
            deferred.reject(body.resultsPage.error);
        }
        deferred.resolve(body.resultsPage.results[resultType]);
    });
    return deferred.promise;
}

function filterParams(params, allowedParams) {
    for (var paramName in params) {
        if (allowedParams.indexOf(paramName) === -1) {
            delete params[paramName];
        }
    }
    return params;
}

var Songkick = function(apiKey, opts) {
    opts = opts || {};
    this.apiKey = apiKey;
    this.returnType = '.json';
    if (opts.returnXML) {
        this.returnType = '.xml';
    }
};

Songkick.prototype.buildUrl = function(endPoint, params, allowedParams) {
    var queryString = querystring.stringify(filterParams(params, allowedParams));
    return baseUrl + endPoint + this.returnType + '?' + queryString + '&apikey=' + this.apiKey;
};

/*
    Returns a list of events based on search params
    @params:
        Required: @artist_name OR @location
            @artist_name: name of an artist to search for
            @location: can take one of the following forms:
                - sk:<id>: Localise based on a Songkick metro area ID
                - geo:<lat>,<lng>: Localise based on latitude / longitude. Use decimal degrees positive = north and east.
                - ip:<ip>: Localise based on an IP address. Return all results if address is not present in our database.
                - clientip: Localise based on IP address of client. Useful for purely client side implementations.
                - (nothing): Return all results.
        Optional: (@min_date AND @max_date), @page, @per_page
            @min_date: earliest date of events to return (date format: YYYY-MM-DD)
            @max_date: latest date of events to return (date format: YYYY-MM-DD)
            @page: offset for paginated results (first page = 1)
            @per_page: number of results for paginated results (max 50)
*/
Songkick.prototype.searchEvents = function(params) {
    if (!(params.location || params.artist_name)) {
        throw '{location} OR {artist_name} must be include in the parameters you pass in';
    }
    if ((params.min_date || params.max_date) && !(params.min_date && params.max_date)) {
        throw 'If pass in {min_date} OR {max_data} as parameters, you must include both';
    }
    var endPoint = '/events';
    var allowedParams = ['artist_name', 'location', 'min_date', 'max_date', 'page', 'per_page'];
    var url = this.buildUrl(endPoint, params, allowedParams);
    return makeRequest(url, 'event');
};

/*
    Returns an event given an eventId
    @eventId: the id of an event you want details for
*/
Songkick.prototype.getEvent = function(eventId) {
    var endPoint = util.format('/events/%s', eventId);
    var url = this.buildUrl(endPoint, {});
    return makeRequest(url, 'event');
};

/*
    Returns an event's setlist
    @eventId: the id of an event you want its setlist for
*/
Songkick.prototype.getEventSetlist = function(eventId) {
    var endPoint = util.format('/events/%s/setlists', eventId);
    var url = this.buildUrl(endPoint, {});
    return makeRequest(url, 'setlist');
};

/*
    Returns a tracking for an event a user has tracked
    @username: the username of the user you want to get a tracking of an event for
    @eventId: the id of the event you want to get a user's tracking for
*/
Songkick.prototype.getEventTracking = function(username, eventId) {
    var endPoint = util.format('/users/%s/trackings/event:%s', username, eventId);
    var url = this.buildUrl(endPoint, {});
    return makeRequest(url, 'tracking');
};

/*
    Returns a list of artists based on search params
    @params:
        Required: @query
            @query: full text search based on artist's name
        Optional: @page, @per_page
            @page: offset for paginated results (first page = 1)
            @per_page: number of results for paginated results (max 50)
*/
Songkick.prototype.searchArtists = function(params) {
    if (!params.query) {
        throw '{query} must be include in the parameters you pass in';
    }
    var endPoint = '/search/artists';
    var allowedParams = ['query', 'page', 'per_page'];
    var url = this.buildUrl(endPoint, params, allowedParams);
    return makeRequest(url, 'artist');
};

/*
    Returns a list of artists similar to a given artist
    @artistId: the id of an artist you want to find similar artists for
*/
Songkick.prototype.getSimilarArtists = function(artistId) {
    var endPoint = util.format('/artists/%s/similar_artists', artistId);
    var url = this.buildUrl(endPoint, {});
    return makeRequest(url, 'artist');
};

/*
    Returns upcoming events for an artist
    @artistId: the id of an artist you want to find upcoming events for
    @params:
        Required: N/A
        Optional: @order, @page, @per_page
            @order: The chronological order you want the events returned in
                - can be one of (asc, desc)
                - default is asc
            @page: offset for paginated results (first page = 1)
            @per_page: number of results for paginated results (max 50)
*/
Songkick.prototype.getArtistCalendar = function(artistId, params) {
    var endPoint = util.format('/artists/%s/calendar', artistId);
    var allowedParams = ['order', 'page', 'per_page'];
    var url = this.buildUrl(endPoint, params, allowedParams);
    return makeRequest(url, 'event');
};

/*
    Returns events an artist has performed in in the past
    @artistId: the id of an artist you want to get past events for
    @params:
        Required: N/A
        Optional: @order, @page, @per_page,
            @order: The chronological order you want the events returned in
                - can be one of (asc, desc)
                - default is asc
            @page: offset for paginated results (first page = 1)
            @per_page: number of results for paginated results (max 50)
*/
Songkick.prototype.getArtistPastEvents = function(artistId, params) {
    var endPoint = util.format('/artists/%s/gigography', artistId);
    var allowedParams = ['order', 'page', 'per_page'];
    var url = this.buildUrl(endPoint, params, allowedParams);
    return makeRequest(url, 'event');
};

/*
    Returns a tracking for an artist a user has tracked
    @username: the username of the user you want to get a tracking of an artist for
    @artistId: the id of the artist you want to get a user's tracking for
*/
Songkick.prototype.getArtistTracking = function(username, artistId) {
    var endPoint = util.format('/users/%s/trackings/artist:%s', username, artistId);
    var url = this.buildUrl(endPoint, {});
    return makeRequest(url, 'tracking');
};

/*
    Returns a list of venues based on search params
    @params:
        Required: @query
            @query: full text search based on venue's name
        Optional: @page, @per_page
            @page: offset for paginated results (first page = 1)
            @per_page: number of results for paginated results (max 50)
*/
Songkick.prototype.searchVenues = function(params) {
    if (!params.query) {
        throw '{query} must be include in the parameters you pass in';
    }
    var endPoint = '/search/venues';
    var allowedParams = ['query', 'page', 'per_page'];
    var url = this.buildUrl(endPoint, params, allowedParams);
    return makeRequest(url, 'venue');
};

/*
    Returns a venue given a venueId
    @venueId: the id of a venue you want details for
*/
Songkick.prototype.getVenue = function(venueId) {
    var endPoint = util.format('/venues/%s', venueId);
    var url = this.buildUrl(endPoint, {});
    return makeRequest(url, 'venue');
};

/*
    Returns upcoming events for a venue
    @venueId: the id of a venue you want to get upcoming events for
    @params:
        Required: N/A
        Optional: @page, @per_page
            @page: offset for paginated results (first page = 1)
            @per_page: number of results for paginated results (max 50)
*/
Songkick.prototype.getVenueCalendar = function(venueId, params) {
    var endPoint = util.format('/venues/%s/calendar', venueId);
    var allowedParams = ['page', 'per_page'];
    var url = this.buildUrl(endPoint, params, allowedParams);
    return makeRequest(url, 'event');
};

/*
    Returns a list of locations based on search params
    @params:
        Required: @query OR @location
            @query: full text search based on artist's name
            @location: Search for locations closest to the location type provided.  Location type's can be of the forms:
                - geo:<lat>,<lng>: Localise based on latitude / longitude. Use decimal degrees positive = north and east.
                - ip:<ip>: Localise based on an IP address. Return all results if address is not present in our database.
                - clientip: Localise based on IP address of client. Useful for purely client side implementations.
        Optional: @page, @per_page
            @page: offset for paginated results (first page = 1)
            @per_page: number of results for paginated results (max 50)
*/
Songkick.prototype.searchLocations = function(params) {
    if (!(params.query || params.location)) {
        throw '{query} OR {location} must be include in the parameters you pass in';
    }
    var endPoint = '/search/locations';
    var allowedParams = ['query', 'location', 'page', 'per_page'];
    var url = this.buildUrl(endPoint, params, allowedParams);
    return makeRequest(url, 'location');
};

/*
    Returns upcoming events for a metro area
    @metroAreaId: the id of a metro area you want to get upcoming events for
    @params:
        Required: N/A
        Optional: @page, @per_page
            @page: offset for paginated results (first page = 1)
            @per_page: number of results for paginated results (max 50)
*/
Songkick.prototype.getMetroAreaCalendar = function(metroAreaId, params) {
    var endPoint = util.format('/metro_areas/%s/calendar', metroAreaId);
    var allowedParams = ['page', 'per_page'];
    var url = this.buildUrl(endPoint, params, allowedParams);
    return makeRequest(url, 'event');
};

/*
    Returns a tracking for a metro area a user has tracked
    @username: the username of the user you want to get a tracking of a metro area for
    @metroAreaId: the id of the metro area you want to get a user's tracking for
*/
Songkick.prototype.getMetroAreaTracking = function(username, metroAreaId) {
    var endPoint = util.format('/users/%s/trackings/metro_area:%s', username, metroAreaId);
    var url = this.buildUrl(endPoint, {});
    return makeRequest(url, 'tracking');
};

/*
    Returns a list of calendar entries with events for a user’s tracked artists in their tracked metro areas.
    @username: the username of a user you want to get upcoming events for
    @params:
        Required: N/A
        Optional: @page, @per_page
            @page: offset for paginated results (first page = 1)
            @per_page: number of results for paginated results (max 50)
*/
Songkick.prototype.getUserCalendar = function(username, params) {
    params.reason = 'tracked_artist';
    var endPoint = util.format('/users/%s/calendar', username);
    var allowedParams = ['tracked_artist', 'page', 'per_page'];
    var url = this.buildUrl(endPoint, params, allowedParams);
    return makeRequest(url, 'calendarEntry');
};

/*
    Returns events a user is planning to attend
    @username: the username of a user you want to get upcoming events for
    @params:
        Required: N/A
        Optional: @attendance, @created_after, @order, @page, @per_page,
            @attendance: the status of a user's event attendance.
                - can be one of: (all, im_going, i_might_go)
                - default is im_going
            @created_after: specify to only return events created after the given date
                - <timestamp> using ISO8601 format, e.g. 2012-02-29T13:37:00Z
            @order: The chronological order you want the events returned in
                - can be one of (asc, desc)
                - default is asc
            @page: offset for paginated results (first page = 1)
            @per_page: number of results for paginated results (max 50)
*/
Songkick.prototype.getUserEvents = function(username, params) {
    var endPoint = util.format('/users/%s/events', username);
    var allowedParams = ['attendance', 'created_after', 'order', 'page', 'per_page'];
    var url = this.buildUrl(endPoint, params, allowedParams);
    return makeRequest(url, 'event');
};

/*
    Returns events a user has attended in the past
    @username: the username of a user you want to get past events for
    @params:
        Required: N/A
        Optional: @order, @page, @per_page,
            @order: The chronological order you want the events returned in
                - can be one of (asc, desc)
                - default is asc
            @page: offset for paginated results (first page = 1)
            @per_page: number of results for paginated results (max 50)
*/
Songkick.prototype.getUserPastEvents = function(username, params) {
    var endPoint = util.format('/users/%s/gigography', username);
    var allowedParams = ['order', 'page', 'per_page'];
    var url = this.buildUrl(endPoint, params, allowedParams);
    return makeRequest(url, 'event');
};

/*
    Returns artists a user is tracking
    @username: the username of a user you want to get tracked artists for
    @params:
        Required: N/A
        Optional: @created_at, @page, @per_page,
            @created_after: specify to only return artists tracked after a given date
                - <timestamp> using ISO8601 format, e.g. 2012-02-29T13:37:00Z
            @page: offset for paginated results (first page = 1)
            @per_page: number of results for paginated results (max 50)
*/
Songkick.prototype.getUserTrackedArtists = function(username, params) {
    var endPoint = util.format('/users/%s/artists/tracked', username);
    var allowedParams = ['created_after', 'page', 'per_page'];
    var url = this.buildUrl(endPoint, params, allowedParams);
    return makeRequest(url, 'artist');
};

/*
    Returns metro areas a user is tracking
    @username: the username of a user you want to get tracked metro areas for
    @params:
        Required: N/A
        Optional: @created_after, @page, @per_page,
            @created_after: specify to only return metro areas tracked after a given date
                - <timestamp> using ISO8601 format, e.g. 2012-02-29T13:37:00Z
            @page: offset for paginated results (first page = 1)
            @per_page: number of results for paginated results (max 50)
*/
Songkick.prototype.getUserTrackedMetroAreas = function(username, params) {
    var endPoint = util.format('/users/%s/metro_areas/tracked', username);
    var allowedParams = ['created_after', 'page', 'per_page'];
    var url = this.buildUrl(endPoint, params, allowedParams);
    return makeRequest(url, 'metroArea');
};

/*
    Returns artists a user used to track, but is not currently tracking
    @username: the username of a user you want to get artists that user used to tracking, but is not currently tracking for
    @params:
        Required: N/A
        Optional: @created_after, @page, @per_page,
            @created_after: specify to only return muted artists from after a given date
                - <timestamp> using ISO8601 format, e.g. 2012-02-29T13:37:00Z
            @page: offset for paginated results (first page = 1)
            @per_page: number of results for paginated results (max 50)
*/
Songkick.prototype.getUserMutedArtists = function(username, params) {
    var endPoint = util.format('/users/%s/artists/muted', username);
    var allowedParams = ['created_after', 'page', 'per_page'];
    var url = this.buildUrl(endPoint, params, allowedParams);
    return makeRequest(url, 'artist');
};

module.exports = Songkick;
