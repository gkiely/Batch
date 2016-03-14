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
    Batch._sendOld = function(options){


      ajax.post('logs', data)
      .then(function(data){
        if(data.name === "error"){
          console.error(data);
        }
        else{
          console.log(data);
        }
      })
      .fail(function(err){
        console.error(err);
      })
    };

    Batch._send = function(options){
      let user = store.get('Batch');
      ajax.post('logs', {id: user.id, msg: this.state.inputVal, type: 'error', url: window.location.href})
      .then(data => {
        console.log('worked', data);
      })
      .catch(err => {
        console.log(err);
      });
    };


    /*==================================
    =            Public API            =
    ==================================*/
    Batch.user = {};
    Batch.error = function(err){
      

      // Seperate out ajax request so we jsut pass the msg, user.id and type
      this._send({
        type: 'error',
        msg
      });


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
   // Batch.error(e);
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
    // Batch.error(arguments[0], 'cerror');
};

XMLHttpRequest.prototype.reallySend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(body) {
  this.addEventListener('load', function(d, a){
    if (this.status >= 200 && this.status < 400){
      // @todo: track this ajax request
      Batch.log('Batch: ajax request received', this.responseText);
    }
  });
  this.reallySend(body);
};

XMLHttpRequest.prototype.reallyOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(type, url) {
  Batch.log('Batch: ajax started:', type + ',', 'url:', url);
  this.reallyOpen(type, url);
};







// ===============
// Init
// ===============
let user = store.get('Batch');
if(user && user.id){
  ajax.post('user', {id: user.id})
  .then(function(data){
    if(user.id === data.id){
      Batch.user = data;
      //== Found user, no need to update user.id
      console.log('Existing user');
    }
    else if(data.id){
      Batch.user = data;
      //== Did not find/match in DB, updating
      store.set('Batch', {id: data.id});
      console.log('Added new user/new id');
    }
    else{
      console.warn('No id returned from server');
    }
  })
  .catch(function(err){
    console.error(err);
  });
}
else{
  ajax.post('user')
  .then(function(data){
    if(data.id){
      store.set('Batch', {id: data.id});
      console.log('Added new user');
    }
    else{
      console.warn('No id returned from server for new user');
    }
  })
  .catch(function(err){
    console.error(err);
  })
}


/**
 * Testing
 */
if(gup('clean')){
  store.remove('Batch');
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
