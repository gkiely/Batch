"use strict";

/**
 * Modules
 */
var http       = require('http');
var path       = require('path');
var path       = require('path');
var dateTime   = new require('date-time');
var cors       = require('cors');
var bodyParser = require('body-parser');
var express    = require('express');
var mongoose   = require('mongoose');
var pgp        = require('pg-promise')();
var publicIp   = require('public-ip');
var uuid       = require('uuid');


/**
 * Instances
 */
var app       = express();
var router    = express.Router();
var port      = 8001;
var UAParser    = require('user-agent-parser');
var parser      = new UAParser();


// Postgres
var cn = {
  host: 'localhost',
  port: 5432,
  database: 'sample_db',
  user: 'grantkiely',
  password: null
};

var db = pgp(cn);




/**
 * Methods
 */
function getUserData(req){
  var ua = req.headers['user-agent'];
  var uaResult = parser.setUA(ua).getResult();

  return{
    browser: {
      name: uaResult.browser.name,
      version: uaResult.browser.major
    },
    os: {
      name: uaResult.os.name,
      version: uaResult.os.version
    },
    date: dateTime(),
    origin: req.headers.origin
  }
}



/**
 * Server config
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));




/**
 * Routes/api
 */
router.use(function(req, res, next){
  console.log('Request received.');
  next();
});

app.get('/', function(req, res){
  res.json({msg: 'huzzaa'});
});

let publicIpPromise = function(){
  return new Promise(function(resolve, reject){
    publicIp(function(err, ip){
      return ip ? resolve(ip) : reject(err);
    });
  });
};



router.post('/user', function(req, res, next){
  let reqb      = req.body;
  let user      = getUserData(req);

  publicIpPromise()
  .then(function(data){
    user.ip = data;
  })
  .catch(function(err){
    // >> log server error 
  })
  .then(function(data){
    // do a search for user id 
    // if it has the same ip, we have a match

    //UPTO
    // getting user id query to work
    if(reqb.id){
      return db.query('SELECT * FROM users where id=$1', reqb.id);
    }
  })
  .then(function(data){
    if(data){
      // Existing user
      
    }
    else{
      user.id = uuid.v4();
      return db.query(`INSERT INTO "users" (id, ip, browser, screenSizeX, screenSizeY) VALUES ('${user.id}', '${user.ip}', '${user.browser.name}', 300, 700)`);
    }
  })
  .then(function(data){
    res.send({id: user.id});
  })
  .catch(function(err){
    if(err.code === "ECONNREFUSED"){
      err.errorDetails = 'Postgres has not been turned on';
    }
    if(err.message){
      next(err);
    }
  })
});

//-- Create/Insert
router.post('/logs', function(req, res){
  // console.log(req.body);
  // var log = new Log(req.body);
  // db.query(`INSERT INTO "people" (fname,lname,age,company) VALUES ('Stewart','George',42,'Metus Aliquam Erat Industries')`)

  db.query(`INSERT INTO "logs" (msg,website,stacktrace) VALUES ('hi there', 'www.google.com', 'stacked', 4)`)
  .then(function(data){
    res.send(data);
  })
  .catch(function(err){
    res.send(err);
  })
});


//-- Read
router.get('/logs', function(req, res){

  db.query('select * from logs limit 10')
  .then(function(data){
    res.send(data);
  })
  .catch(function(err){
    res.send(err);
  });
});

//-- Read by id
router.get('/logs/:id', function(req, res){
  db.query('select * from people where id=$1', req.params.id)
  .then(function(data){
    res.send(data);
  })
  .catch(function(err){
    res.send(err);
  })
});

//-- Update
router.put('/logs/:id', function(req, res){
  // db.query('update logs set type="warn" where id=', req.params.id)
  // .then(function(data){
  //   res.send(data);
  // })
  // .catch(function(err){
  //   res.send(err);
  // })
});

//-- Delete
router.delete('/logs/:id', function(req, res){
  db.query('delete from people where id=$1', req.params.id)
  .then(function(data){
    res.send(data);
  })
  .catch(function(err){
    res.send(err);
  })
});





app.use('/api', router);
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send(err);
})


// app.post('/api', function(req, res){
  // console.log(req.body);
  // console.log(getUserData(req));
  //-- Payload
  // req.body

  
  // res.json({status: 'saved'});
  // res.end();
// });





/**
 * Launch server
 */
app.listen(port);
console.log('Server started, listening on localhost:' + port);





