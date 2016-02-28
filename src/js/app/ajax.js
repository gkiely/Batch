import $ from 'jquery';
import Batch from './batch';


//-- Defaults
var api = '//localhost:8001/api/';
let defaultOptions = {
  type: 'GET',
  // dataType: 'json',
  success: function(res, text, jqXHR) {
      // console.log(res);
  },
  error: function (res, text, errorThrown) {
    // console.log(errorThrown);
    Batch.log('Request failed');
    Batch.log(res);
  }
};

let ajaxCall = function(url, options){
  options.url = api + url;
  return $.ajax(options);
};

let ajax = {
  get: function(url){
    let options = Object.create(defaultOptions);
    return ajaxCall(url, options);
  },
  post: function(url, data){
    let options = Object.create(defaultOptions);
    options.data = data || "";
    options.type = 'POST';

    return ajaxCall(url, options);
  }
};

export default ajax;