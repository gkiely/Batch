import $ from 'jquery';

function ajax(api, type, data){
  return $.ajax({
      type: type || 'GET',
      url: '//localhost:8001/api/' + api,
      data: data || "",
      success: function(res, text, jqXHR) {
          // console.log(res);
      },
      error: function (res, text, errorThrown) {
        // console.log(errorThrown);
        console.log('Request failed');
        console.log(res);
      }
  });
}

export default ajax;