/**
 * Module dependencies.
 */

var http        = require('http');
var path        = require('path');
var express     = require('express');
var app         = express();
var router      = express.Router();
var bodyParser  = require('body-parser');
var port        = 8001;
var UAParser    = require('user-agent-parser');
var parser      = new UAParser();
var dateTime    = new require('date-time');


/**
 * Launch server
 * @desc: Configure our HTTP server to respond with Hello World to all requests.
 */
app.use(router);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// CORS
//http://enable-cors.org/server_expressjs.html
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Custom-Header");
  next();
});



router.get('/', function(req, res){
  res.send('hello world');
  res.end();
});


app.post('/', function(req, res){
  var ua = req.headers['user-agent'];
  var uaResult = parser.setUA(ua).getResult();

  console.log('ip:', req.ip);
  console.log('Browser:', uaResult.browser.name, uaResult.browser.major);
  console.log('OS:', uaResult.os.name, uaResult.os.version);
  console.log('Date:', dateTime());

  //-- Website
  console.log('Origin:', req.headers.origin);

  //-- json
  console.log('Request:', req.body);

  res.json({nothin: 'brosef'});
  res.end();
});


app.post('/save', function(){
  
});

app.get('/get', function(){
  
});



app.listen(port);
console.log('Server started, listening on localhost:' + port);







// Default server start code
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});