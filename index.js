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


/**
 * Instances
 */
var app    = express();
var router = express.Router();
var port   = 8001;
var Schema = mongoose.Schema;

// UserInfo
var UAParser    = require('user-agent-parser');
var parser      = new UAParser();


/**
 * Methods
 */
function getUserData(req){
  var ua = req.headers['user-agent'];
  var uaResult = parser.setUA(ua).getResult();

  return{
    ip: req.ip,
    browser: [uaResult.browser.name, uaResult.browser.major],
    os: [uaResult.os.name, uaResult.os.version],
    date: dateTime(),
    origin: req.headers.origin
  }
}

function successCallback(res){
  res.json({status: 'success'});
  res.end('success');
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
 * Setup mongoose
 */
mongoose.connect('mongodb://localhost/test');



var errorLogSchema = new Schema({
  name: String,
  msg: String,
  date: {type: Date, default: Date.now}
});



var ErrorLog = mongoose.model('ErrorLog', errorLogSchema);


/**
 * Routes/api
 */
app.post('/api/create', function(req, res){
  // console.log(req.body);
  var elog = new ErrorLog(req.body);

  elog.save(req.body, function(err, doc){
    if(err) throw err;

    console.log('user save successfully');
    console.log(doc);
    successCallback(res);
  });
});


app.post('/api/read', function(req, res){
  elog.find(function(err, doc){
    if(err) throw err;

    successCallback(res);
  });
});

app.post('/api/update', function(req, res){
  elog.find(function(err, doc){
    if(err) throw err;

    successCallback(res);
  });
});


app.post('/api/delete', function(req, res){
  
  ErrorLog.remove({}, function(err, doc){
    if(err) throw err;

    successCallback(res);
  });
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





