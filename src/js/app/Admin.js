import ajax from './ajax';

let Admin = (function(){
  let Admin = {};

  Admin._delete = function(url, id){
    ajax.delete(url, id)
  };

  Admin.delete = {
    log(id){
      this._delete('logs', id);
    }
  };

  return Admin;
})();