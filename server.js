var express = require('express');
var mysql = require('mysql');
var app = express();
var request = require('request');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});



app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());


app.get('/api/marks/releases/:release_id', function(req, res){
  connection.query('SELECT * FROM feedthedevs.marks_cache WHERE release_id=?',req.params.release_id, function(err, rows){
    console.log(err);
    res.send('marks', rows[0]);
  });
});

app.post('/api/marks', function(req, res){
  console.log(req.body);
  var mark  = {user_id: 1, release_id: 547, feed: 'pizza'};
  var query = connection.query('INSERT INTO feedthedevs.marks SET ?', mark, function(err, result) {
    if(err){
      res.send('error', {error : err});
    }else{
      res.send('result', {result : result});
    }

  });
});

app.post('/api/marks/:id', function(req, res){
  var mark  = {user_id: 1, release_id: 547, feed: 'pizza'};
  var query = connection.query('UPDATE feedthedevs.marks SET ? WHERE id = 9', mark, function(err, result) {
    if(err){
      res.send('error', {error : err});
    }else{
      res.send('result', {result : result});
    }
  });
});

//static content
app.all('/*', function(req, res) {
  res.sendfile('index.html', { root: __dirname+'/public' });
});


app.listen(3000);

module.exports = app;