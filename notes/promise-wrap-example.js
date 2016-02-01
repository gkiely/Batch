//== Classic problem of function that doesn't support promises
var publicIp = function(fn){
  setTimeout(fn, 1000);
};


let test = new Promise(function(res, rej){
  setTimeout(function(){
    res('sup');
  }, 0);
});



//=== Option 1: Promise wrapper
let getIpPromise = function(){
  return new Promise(function(resolve, reject){
    publicIp(function(err, ip){
      ip ? resolve(ip) : reject(err);
    })
  });
});

getIpPromise
.then(function(){
  console.batchLog('127.0.0.1');
})
.then(function(){
  return test;
})
.then(function(){
  console.batchLog('hia');
});