var express = require('express');
var request = require('request');
var pg = require('pg');
var app = express();

if(process.env.NODE_ENV && process.env.NODE_ENV === 'production'){
  var dbConnectParams = {
    host: 'ec2-23-23-81-171.compute-1.amazonaws.com',
    port: 5432,
    user: 'gfdjmxldrvrqje',
    password: 'GsbiS8_p-GOFuFUbbrwSWwB5bd',
    database: 'da4gu7uk0qu1eh'
    //,ssl: true
  };
}else{
  var dbConnectParams = 'postgres://feedthedevs:ftdftd@localhost/feedthedevs';
}

var dbclient = new pg.Client(dbConnectParams);
dbclient.connect();

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
  var token = req.headers['access_token'];

  if(!token){
    res.send('Not authorized');
  }


  var sql = 'SELECT release_id, feed, count(*) as number FROM marks WHERE release_id = $1 GROUP BY release_id, feed',
      releaseId = parseInt(req.params.release_id, 10);

  dbclient.query(sql,[releaseId], function(err, queryResult){

    if(err){
      console.log(err);
    }
    var rows = queryResult.rows;
    var result = {release_id: releaseId, pizza: 0, tomato: 0, userVote: null};

    if(rows[0]){
      result[rows[0].feed] = parseInt(rows[0].number, 10);
    }
    if(rows[1]){
      result[rows[1].feed] = parseInt(rows[1].number, 10);
    }

    getUser(token, function(userInfo){
      if(!userInfo.id){
        res.send(userInfo);
        return;
      }
      var userId = userInfo.id,
          sql = 'SELECT feed FROM marks WHERE release_id = $1 and user_id = $2';
      dbclient.query(sql,[releaseId, userId], function(err, queryResult){
        if(queryResult.rows[0]){
          result.userVote = queryResult.rows[0].feed;
        }
        res.send(result);
      });

    });



  });
});

app.post('/api/marks/releases', function(req, res){

  var token = req.headers['access_token'];

  if(!token){
    res.send('Not authorized');
  }

  getUser(token, function(userInfo){
    if(!userInfo.id){
      res.send(userInfo);
      return;
    }
    var userId = userInfo.id,
        sql = 'select feed from marks where release_id = $1 AND user_id=$2',
        releaseId = req.body.release_id,
        feed = req.body.feed,
        data = [releaseId, userId, feed];



    dbclient.query(sql, [releaseId, userId], function(err, queryResult) {
      if(err){
        console.log(err);
      }
      var rows = queryResult.rows;

      if(rows[0]){
        if(rows[0].feed !== feed){
          var sql = 'UPDATE marks SET user_id = $2, feed = $3 WHERE release_id=$1';
          dbclient.query(sql, data, function(err, queryResult) {
            if(err){
              console.log(err);
            }
            res.send('result', {result : queryResult});
          });
        }else{
          res.send('error', {error:'you have only one ' + feed + ' for the feature' });
        }
      }else{
        var sql = 'INSERT INTO marks(release_id, user_id, feed) VALUES($1,$2,$3)';
        dbclient.query(sql, data, function(err, queryResult) {
          if(err){
            console.log(err);
          }
          res.send(queryResult);
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

module.exports = app;