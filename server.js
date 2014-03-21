var express = require('express');
var request = require('request');
var mysql = require('mysql');
var app = express();
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});

var clientId = 'd2374b99ef25d506e0be';
var clientSecret = '679bce3d161582ff4d4853f0c4b512544e9674e2';

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());


//gitHub OAuth token request
app.get('/api/github/gettoken/:code', function(req, res){
  request.post({
    uri: 'https://github.com/login/oauth/access_token',
    form: {
      client_id: clientId,
      client_secret: clientSecret,
      code : req.params.code
    },
    json:true
  }, function(err, httpResponse, body){
    if (err) {
      return console.error('request failed:', err);
    }
    res.send(body);
  });
});

//gitHub user info request
app.get('/api/github/user', function(req, res){

  var token = req.headers['access_token'];

  if(!token){
    res.send('Not authorized');
  }

  getUser(token, function(userInfo){
    res.send(userInfo);
  });

});

function getUser(token, callback){
  request.get({
    uri: 'https://api.github.com/user?access_token=' + token,
    headers: {
      'User-Agent': 'request'
    },
    json:true
  }, function(err, httpResponse, body){
    if (err) {
      return console.error('request failed:', err);
    }
    callback(body);
  });
}

app.get('/api/marks/releases/:release_id', function(req, res){
  var sql = 'SELECT release_id, feed, count(*) as number FROM feedthedevs.marks WHERE release_id = ? GROUP BY release_id, feed ORDER BY release_id, feed';
  connection.query(sql,req.params.release_id, function(err, rows){
    if(err){
      console.log(err);
    }
    var result = {release_id: req.params.release_id, pizza: 0, tomato: 0};

    if(rows[0]){
      result[rows[0].feed] = rows[0].number;
    }
    if(rows[1]){
      result[rows[1].feed] = rows[1].number;
    }

    res.send('marks', result);
  });
});

app.post('/api/marks/releases', function(req, res){

  var token = req.headers['access_token'];

  if(!token){
    res.send('Not authorized');
  }

  getUser(token, function(userInfo){
    var userId = userInfo.id,
        sql = 'select feed from feedthedevs.marks where release_id = ? AND user_id=' + userId,
        releaseId = req.body.release_id,
        feed = req.body.feed,
        data = {
          release_id : releaseId,
          user_id: userId,
          feed : feed
        }

    connection.query(sql, releaseId, function(err, rows) {
      if(err){
        console.log(err);
      }

      if(rows[0]){
        if(rows[0].feed !== feed){
          var sql = 'UPDATE feedthedevs.marks SET ? WHERE release_id=' + releaseId ;
          connection.query(sql, data, function(err, result) {
            if(err){
              console.log(err);
            }
            res.send('result', {result : result});
          });
        }
      }else{
        var sql = 'INSERT INTO feedthedevs.marks SET ?';
        connection.query(sql, data, function(err, result) {
          if(err){
            console.log(err);
          }
          res.send('result', {result : result});
        });
      }
    });
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