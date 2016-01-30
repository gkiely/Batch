import $ from 'jquery';
import gup from './gup';
import ajax from './ajax';

/**
 * Batch
 */
let Batch = (function(win, doc, body){
    let Batch = {
      url: "//batchjs",
      debug: true,
      console: true
    };

    Batch.prod || (Batch.prod = Batch.prod || !Batch.debug);
    Batch.debug || (Batch.debug = !Batch.prod);

    /*===================================
    =            Private API            =
    ===================================*/
    Batch._stackTrace = function(e) {
        var err = new Error(e);
        if(err.stack){
          var str = err.stack.replace(/\n/, '')
          // .replace(/.*/, '')
          // .replace(/\n/, '')
          // .replace(/^\s*at\s/gm, '')

          console.log(str);
        }
        else{
          return "no stacktrace found";
        }
    }

    Batch._track = function(){
      console.batchLog(arguments);
    };

    /**
     * Sends error string to server
     * @param  {string} str
     * @return {void}
     */
    Batch._send = function(args, type, parse){
      ajax.post('logs', type)
      .then(function(data){
        console.batchLog('yoooo', data);
      });
    };


    /*==================================
    =            Public API            =
    ==================================*/
    Batch.windowError = function(e){
      // this._send(e, 'error');
    }

    Batch.error = function(str){
      this._send(str, 'error');
    };

    Batch.warn = function(str){
      this._send(str, 'warn');
    };

    Batch.log = function(str){
      this._send(str, 'log')
    };

    return Batch;
})(window, document, document.body);




/**
 * Native hooks
 */

 window.addEventListener('error', function(e){
   Batch.windowError(e);
 });

let log = console.log;
let warn = console.warn;
let error = console.error;

console.batchLog = function(){
  log.apply(this, Array.prototype.slice.call(arguments));
};

console.log = function(){
  var arr = Array.prototype.slice.call(arguments);
  log.apply(this, arr);
  Batch._track(JSON.stringify(arr), 'clog');
};
console.warn = function(){
  warn.apply(this, Array.prototype.slice.call(arguments));
  Batch._track(arguments[0], 'cwarn');
};
console.error = function(){
  error.apply(this, Array.prototype.slice.call(arguments));
  Batch._track(arguments[0], 'cerror');
};

XMLHttpRequest.prototype.reallySend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(body) {
  this.addEventListener('load', function(d, a){
    if (this.status >= 200 && this.status < 400){
      // @todo: track this ajax request
      console.batchLog('BatchJS: ajax request received', this.responseText);
    }
  });
  this.reallySend(body);
};

XMLHttpRequest.prototype.reallyOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(type, url) {
  if(Batch.console){
      console.batchLog('BatchJS: ajax started:', type + ',', 'url:', url);
  }
  this.reallyOpen(type, url);
};


var user = window.localStorage.getItem('BatchJS:user');

setTimeout(function(){
  if(!user){
    ajax.post('users')
    .then(function(data){
      console.batchLog('---', data);
      window.localStorage.setItem('BatchJS:user', data.id);
    })
  }

}, 3000);



/**
 * Testing
 */
if(gup('test')){
  function init(){
    Batch.error('asdf');
    Batch.warn('yolo');
    Batch.log('logmeup');
    console.log('testlog');
    console.warn('testwarn');
    console.error('testerror');
    var req = new XMLHttpRequest();
    req.open("GET", "notfound.html");
    req.send(null);
  }
  function causeError(){
    is_not_defined;
  }
  init();
  causeError();
}

export default Batch;
