/**
 * Module dependencies.
 */

var http      = require('http');
var path      = require('path');
var express   = require('express');
var app       = express();
var router    = express.Router();
var port      = process.env.PORT || 8000;



/**
 * Launch server
 * @desc: Configure our HTTP server to respond with Hello World to all requests.
 */
app.use(router);


router.get('/', function(req, res){
  res.send('Hello world');
});


app.listen(8000);
console.log('Server started, listening on localhost:8000');







// Default server start code
// var server = http.createServer(function (request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.end("Hello World\n");
// });