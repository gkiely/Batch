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



/**
 * Launch server
 * @desc: Configure our HTTP server to respond with Hello World to all requests.
 */
app.use(router);
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// CORS
//http://enable-cors.org/server_expressjs.html
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // console.log(req.method);
  next();
});


//cors and preflight filtering 
// app.all('*', function(req, res, next){
//   //preflight needs to return exact request-header 
//   res.set('Access-Control-Allow-Headers', req.headers['access-control-request-headers']); 
//   if ('OPTIONS' == req.method){
//     return res.send(204);
//     next(); 
//   }
// });


router.get('/', function(req, res){
  res.send('hello world');
});

app.post('/', function(req, res){
  // console.log(req);
  console.log('POST recieved');
  console.log(req.body);

  res.json({sup: 'buddy'});
});



app.listen(port);
console.log('Server started, listening on localhost:' + port);







// Default server start code
// var server = http.createServer(function (request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.end("Hello World\n");
// });