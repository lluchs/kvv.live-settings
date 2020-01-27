
var https = require('https');
var express = require('express');
var morgan = require('morgan');
var serveStatic = require('serve-static');

var API_KEY = '377d840e54b59adbe53608ba1aad70e8';

var app = express();

app.use(morgan('tiny'));
app.use(serveStatic('public'));

app.get('/api/stops/:search', function(req, res) {
  var query = encodeURIComponent(req.params.search);
  https.get(apiUrl('https://live.kvv.de/webapp/stops/byname/' + query), function(apiResponse) {
	res.status(apiResponse.statusCode);
	res.set('Content-Type', apiResponse.headers['content-type']);
	apiResponse.pipe(res);
  }).on('error', function() {
	res.send(500, 'Could not connect to the server.');
  });
});

app.listen(4732);

/* Adds the API key to an URL. */
function apiUrl(url) {
  return url + '?key=' + API_KEY;
}
