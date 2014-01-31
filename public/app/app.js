/* Ractive application */

define(function(require) {
  var Ractive = require('Ractive');
  require('ractive-decorators-slip');
  var reqwest = require('reqwest');

  var page = new Ractive({
    el: document.body,
    template: require('rv!template'),
    data: {
      favorites: []
    },
  });

  page.on('search', function(event, name) {
    getStops(name).then(function(stations) {
      page.set('stations', stations);
    });
    event.original.preventDefault();
  });

  page.on('add', function(event, stop) {
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
});
