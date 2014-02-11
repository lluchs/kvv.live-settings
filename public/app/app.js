/* Ractive application */

define(function(require) {
  var Ractive = require('Ractive');
  require('ractive-decorators-slip');
  require('ractive-events-tap');
  var reqwest = require('reqwest');

  var page = new Ractive({
    el: document.body,
    template: require('rv!template'),
    data: {
      favorites: decodeFavorites(location.hash),
      isFavorite: function(stop) {
        return this.get('favorites').some(function(fav) {
          return fav.id === stop.id;
        });
      },
    },
  });

  page.on('done', function() {
    // Send the user back to the Pebble app.
    var favorites = this.get('favorites');
    location.href = 'pebblejs://close#' + encodeURIComponent(JSON.stringify({favorites: favorites}));
  });

  page.on('search', function(event, name) {
    getStops(name).then(function(stops) {
      page.set('stops', stops);
    });
    event.original.preventDefault();
  });

  page.on('reset', function(event) {
    this.set('searchterm', '');
    this.set('stops', null);
    event.original.preventDefault();
  });

  page.on('add', function(event, stop, duplicate) {
    if (!duplicate)
      page.get('favorites').push(stop);
  });

  function getStops(name) {
    return reqwest({
      url: '/api/stops/' + encodeURIComponent(name),
      type: 'json'
    })
    .then(function(response) {
      return response.stops;
    });
  }

  function decodeFavorites(hash) {
    var favorites;
    try {
      favorites = JSON.parse(decodeURIComponent(hash.slice(1))).favorites;
    } catch (e) {
      favorites = [];
    }
    return favorites;
  }
});
