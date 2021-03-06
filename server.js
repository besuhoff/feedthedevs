var express = require('express'),
    extend = require('extend'),
    config = require('./config.defaults.js'),
    pg = require('pg'),
    createApi = require('./api');

try {
  extend(config, require('./config'))
} catch(e) {

}

var dbclient = new pg.Client(config.dbConnectParams);
dbclient.connect();

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

createApi(app, config.devMode, {
  dbclient: dbclient,
  clientId: config.clientId,
  clientSecret: config.clientSecret
});

//static content
app.all('/*', function(req, res) {
  res.sendfile('index.html', { root: __dirname+'/public' });
});


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

module.exports = app;
