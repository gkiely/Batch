//-- Defaults
var api = '//localhost:8002/api/';


/**
 * Fetch wrapper
 */
let fetchJson = function(url, options){
  url = api + url;
  return fetch(url, options)
  .then(checkStatus)
  .catch(handleError)
};

/**
 * Default error handler
 */
let handleError = function(e){
  console.error(e);
};

/**
 * Server error detection
 */
let checkStatus = function(res){
  if (res.status >= 200 && res.status < 300) {
    return res.json();
  }
  else{
    return res.json()
    .then(data => {
      throw new Error(data.message);
    });
  }
};

/**
 * Serialize object for get req
 */
let serialize = function(obj){
  return '?' + Object.keys(obj).map(k => k + '=' + encodeURIComponent(obj[k])).join('&');
}


/**
 * Api
 */
let ajax = {
  delete: function(url, id){
    let options = {
      method: 'delete'
    };
    return fetchJson(url + '/' + id, options)
  },
  get: function(url, data){
    var params = data ? serialize(data) : "";
    return fetchJson(url + params);
  },
  post: function(url, data){
    let options = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    return fetchJson(url, options);
  }
};

export default ajax;