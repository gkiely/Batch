/**
 * Overrides
 */
if(window.console){
  let log = console.log;
  let warn = console.warn;
  let error = console.error;

  console.batchLog = function(){
    log.apply(this, Array.prototype.slice.call(arguments));
  };

  console.log = function(){
    log.apply(this, Array.prototype.slice.call(arguments));
    Batch._track(arguments[0], 'clog');
  };
  console.warn = function(){
    warn.apply(this, Array.prototype.slice.call(arguments));
    Batch._track(arguments[0], 'cwarn');
  };
  console.error = function(){
    error.apply(this, Array.prototype.slice.call(arguments));
    Batch._track(arguments[0], 'cerror');
  };
}


XMLHttpRequest.prototype.reallySend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(body) {
  console.batchLog('BatchJS: ajax request sent');
  this.reallySend(body);
};




/**
 * Batch
 */
let Batch = (function(win, doc, body){
    let Batch = {
      url: "//batchjs",
      debug: true
    };

    Batch.prod || (Batch.prod = Batch.prod || !Batch.debug);
    Batch.debug || (Batch.debug = !Batch.prod);

    /*===================================
    =            Private API            =
    ===================================*/
    Batch._checkArgs = function(args, type){
      if(args.length === 0){
        console.warn(`BatchJS: No arguments were given to Batch.${type}()`);
        return {
          _sendError: function(){}
        }
      }
      return this;
    };

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

    /**
     * Generates error string for Window Error
     * @param  {object} err {type, line}
     * @return {string}     query string
     */
    Batch._generateWindowErrorString = function(e){
      let str = this.url + '?';
      str += 'type=' + e.type;
      str += '&col=' + e.colno;
      str += '&line=' + e.lineno;
      str += "&filename=" + e.filename;
      str += "&target=" + e.currentTarget;
      str += "&details=" + e.error;
      return str;
    }

    /**
     * Sends error string to server
     * @param  {string} str
     * @return {void}
     */
    Batch._sendError = function(args, type, parse){
      let script = document.createElement('script');
      var str = "";
      if(typeof type === "boolean"){
        parse = type;
      }

      if(typeof args === "object"){
        str = JSON.stringify(str);
      }
      else{
        str = args;
      }

      if(parse){
        str = this.url + `?${type}=` + args;
      }

      if(this.prod){
        script.src = str;
        body.appendChild(script);
        body.removeChild(script);        
      }
      else{
        console.batchLog(str);
      }
    };

    Batch._track = function(str, type){
      this._sendError(str, type, true);
    }

    /*==================================
    =            Public API            =
    ==================================*/
    Batch.windowError = function(e){
      let str = this._generateWindowErrorString(e);
      this._sendError(str);
    }

    Batch.error = function(str){
      this
      ._checkArgs(arguments, 'error')
      ._sendError(str, 'error', true);
    };

    Batch.warn = function(str){
      this
      ._checkArgs(arguments, 'warn')
      ._sendError(str, 'warn', true);
    };

    Batch.log = function(str){
      this
      ._checkArgs(arguments, 'log')
      ._sendError(str, 'log', true)
    };

    return Batch;
})(window, document, document.body);




/**
 * Testing
 */
function gup(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  if(match){
      var result = decodeURIComponent(match[1].replace(/\+/g, ' ')).toLowerCase();
      return result === "true" || result === "false" ? /^true$/i.test(result) : result;
  }
}


if(gup('ajax')){
  $.ajax({
      type: 'POST',
      url: '//localhost:8001',
      crossDomain: true,
      data: {"sup":"bro"},
      // contentType: 'application/json',
      dataType: 'json',
      success: function(res, text, jqXHR) {
          console.log('success', res);
      },
      error: function (res, text, errorThrown) {
        console.log(errorThrown);
          console.log('POST failed');
      }
  });
}

if(gup('test')){
  window.addEventListener('error', function(e){
    Batch.windowError(e);
  });


  function init(){
    Batch.error('asdf');
    Batch.warn('yolo');
    Batch.log('logmeup');
    console.log('testlog');
    console.warn('testwarn');
    console.error('testerror');
    var req = new XMLHttpRequest();
    req.open("GET", "any.html", true);
    req.send(null);
  }

  function causeError(){
    testRuntimeError;
  }

  init();
  causeError();

}


