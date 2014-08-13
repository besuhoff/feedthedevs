var express = require('express'),
    pg = require('pg'),
    createApi = require('./api'),
    devMode = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production',
    dbConnectParams = {};

if (!devMode) {
  dbConnectParams = {
    host: 'ec2-23-23-81-171.compute-1.amazonaws.com',
    port: 5432,
    user: 'gfdjmxldrvrqje',
    password: 'GsbiS8_p-GOFuFUbbrwSWwB5bd',
    database: 'da4gu7uk0qu1eh'
    //,ssl: true
  };
} else {
  dbConnectParams = 'postgres://feedthedevs:ftdftd@localhost/feedthedevs';
}

var dbclient = new pg.Client(dbConnectParams);
dbclient.connect();

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

createApi(app, devMode, {
  dbclient: dbclient,
  clientId: 'd2374b99ef25d506e0be',
  clientSecret: '679bce3d161582ff4d4853f0c4b512544e9674e2'
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