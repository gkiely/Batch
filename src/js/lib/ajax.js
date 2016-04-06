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
  .then(res => res.json())

  // Old way that added data to res object
  // .then(res => {
  //   return res.json()
  //   .then(data => {
  //     res.data = data;
  //     return res;
  //   });
  // });
};


/**
 * Add server error detection to fetch api
 */
let checkStatus = function(res){
  if (res.status >= 200 && res.status < 300) {
    return res
  }
  else {
    // var error = new Error(res.statusText)
    // error.res = res
    // throw error;
    return res;
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