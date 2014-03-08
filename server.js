var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});

app.use(express.static(__dirname + '/public'));

app.get('/marks', function(req, res){
  connection.query('SELECT * FROM feedthedevs.marks', function(err, rows){
    res.send('marks', {marks : rows});
  });
});

app.all('/*', function(req, res) {
  res.sendfile('index.html', { root: __dirname+'/public' });
});


//app.listen(3000);

module.exports = app;