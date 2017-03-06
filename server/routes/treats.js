var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
  database: 'tastytreats', // name of  database
  host: 'localhost', // where my database
  port: 5432, // port number for database
  max: 10, //  connections
  idleTimeoutMillis: 10000 // 10 seconds
};

var pool = new pg.Pool(config);


// GET /treats returns a list of potential treats (e.g. cupcakes, goldfish, etc) and their image URLs.

router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM "treats";', function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('error making get database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});

// POST /treats expects a treat type, description, and the path/url for the image.
// Take a look at the /server/public/assets folder for which images we have to work with.

router.post('/', function(req, res){
  var addNewTreat = req.body;
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      res.sendStatus(500);
    } else {
      client.query('INSERT INTO treats (name, description, pic) VALUES ($1, $2, $3);',
        [addNewTreat.name, addNewTreat.description, addNewTreat.pic],
        function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('error making post database query: ', errorMakingQuery);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
      }
  });
});



module.exports = router;
