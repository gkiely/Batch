// import Batch from './batch';

//-- Defaults
var api = '//localhost:8002/api/';


/**
 * Patches the fetch api to return json
 */
let fetchJson = function(url, options){
  url = api + url;
  return fetch(url, options)
  .then(checkStatus)
};

/**
 * Add server error detection to fetch api
 */
let checkStatus = function(res){
  if (res.status >= 200 && res.status < 300) {
    return res.json();
  }
  else{
    return res.json()
    .then(function(data){
      throw new Error(data.message);
    });
  }
};



let ajax = {
  delete: function(url, id){
    let options = {
      method: 'delete'
    };
    return fetchJson(url + '/' + id, options)
  },
  get: function(url){
    return fetchJson(url);
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