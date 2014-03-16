var express = require('express');
var mysql = require('mysql');
var app = express();
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.get('/api/marks/releases/:release_id', function(req, res){
  connection.query('SELECT * FROM feedthedevs.marks_cache WHERE release_id=?',req.params.release_id, function(err, rows){
    var result = {};
    if(rows[0]){
      result = rows[0];
    }else{
      result = {release_id: req.params.release_id, pizza: 0, tomato: 0}
      connection.query('INSERT INTO feedthedevs.marks_cache SET ?', result);
    }

    res.send('marks', result);
  });
});

app.post('/api/marks/releases', function(req, res){
  console.log(req.body);
  var query = connection.query('UPDATE feedthedevs.marks_cache SET ? WHERE release_id=' + req.body.release_id, req.body, function(err, result) {
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


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

//app.listen(3000);
module.exports = app;