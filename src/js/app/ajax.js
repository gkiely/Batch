import $ from 'jquery';

function ajax(api, data){
  return $.ajax({
      type: 'POST',
      url: '//localhost:8001/api/' + api,
      data: data,
      dataType: 'json',
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