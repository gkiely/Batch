import $ from 'jquery';
import gup from './gup';
import ajax from './ajax';
import store from 'store';

/**
 * Batch
 */

//== Logs all Batch.log|warn|error to console instead of sending to server
let debug = gup('debug');


let Batch = (function(win, doc, body){

    let Batch = {};

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

          // console.log(str);
        }
        else{
          return "no stacktrace found";
        }
    }

    Batch._track = function(){
      if(debug){
      }
    };

    /**
     * Sends error string to server
     * @param  {string} str
     * @return {void}
     */
    Batch._send = function(args, type, parse){
      ajax.post('logs', type)
      .then(function(data){
        Batch.log('yoooo', data);
      });
    };


    /*==================================
    =            Public API            =
    ==================================*/
    Batch.error = function(str){
      // this._send(str, 'error');
    };

    Batch.warn = function(str){
      // this._send(str, 'warn');
    };

    Batch.log = function(str){
      var arr = Array.prototype.slice.call(arguments);
      if(debug){
         log.apply(console, arr);
      }
      else{

      }
      // log('hi');
      // this._send(str, 'log');
    };

    return Batch;
})(window, document, document.body);




/**
 * Native hooks
 */

 window.addEventListener('error', function(e){
   Batch.error(e);
 });

let log = console.log;
let warn = console.warn;
let error = console.error;

console.log = function(){
    var arr = Array.prototype.slice.call(arguments);
    log.apply(this, arr);
    if(!debug){
      Batch.log(JSON.stringify(arr), 'clog');
    }
};
console.warn = function(){
    warn.apply(this, Array.prototype.slice.call(arguments));
    Batch.warn(arguments[0], 'cwarn');
};

console.error = function(){
    error.apply(this, Array.prototype.slice.call(arguments));
    Batch.error(arguments[0], 'cerror');
};

XMLHttpRequest.prototype.reallySend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(body) {
  this.addEventListener('load', function(d, a){
    if (this.status >= 200 && this.status < 400){
      // @todo: track this ajax request
      Batch.log('BatchJS: ajax request received', this.responseText);
    }
  });
  this.reallySend(body);
};

XMLHttpRequest.prototype.reallyOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(type, url) {
  Batch.log('BatchJS: ajax started:', type + ',', 'url:', url);
  this.reallyOpen(type, url);
};







// ===============
// Init
// ===============
var user = store.get('BatchJS');
if(user && user.id){
  ajax.post('user', {id: user.id})
  .then(function(data){
    if(user.id === data.id){
      // Existing user

    }
    else if(data.id){
      store.set('user', {id: data.id})
    }
    else{
      console.warn('no id returned from server');
    }
  })
  .fail(function(err){
    console.error(err);
  });
}
else{
  ajax.post('user')
  .then(function(data){
    if(data.id){
      store.set('BatchJS', {id: data.id});
    }
    else{
      console.warn('no id returned from server');
    }
  })
  .fail(function(err){
    console.error(err);
  })
}


/**
 * Testing
 */
if(gup('clean')){
  store.remove('BatchJS');
}

if(gup('test')){
  function init(){
    Batch.error('asdf');
    Batch.warn('yolo');
    Batch.log('logmeup');
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
