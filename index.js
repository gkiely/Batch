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
    browser: [uaResult.browser.name, uaResult.browser.major],
    os: [uaResult.os.name, uaResult.os.version],
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


function getPublicIp(){
  return new Promise(function(res, rej){
    publicIp.v4(function(err, ip){
      if(ip){
        resolve(ip);
      }
      else{
        reject(err);
      }
    });
  });
}

function checkUserExists(){

}



router.post('/user', function(req, res){
  var userData = getUserData(req);

  // New Promises approach
  getPublicIp()
  .then(function(data){
    userData.ip = data;
  })
  .then(function(){
    // See if this bubbling works first
    return db.query('SELECT * FROM users where ip=');
  })
  .then(function(data){
    // This code is too large
    return new Promise(resolve, reject){
      if(data.length === 0){
        resolve(function(){
          return db.query(`INSERT INTO "users" (ip, browser, screenSizeX, screenSizeY) VALUES ('127.0.0.1', 'chrome', 300, 700)`);
        });
      }
      else{
        reject(function(){
          res.send(data.id);
        });
      }
    }
  })

  // Old method
  var ipCheck = publicIp.v4(function(err, ip){
    userData.ip = ip;
    
    db.query('SELECT * FROM users where ip=')
    .then(function(data){
      if(data.length === 0){
        db.query(`INSERT INTO "users" (ip, browser, screenSizeX, screenSizeY) VALUES ('127.0.0.1', 'chrome', 300, 700)`)  
      }
      else{
        res.send(data.id);
      }
    });
  });
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





