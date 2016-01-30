function gup(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  if(match){
      var result = decodeURIComponent(match[1].replace(/\+/g, ' ')).toLowerCase();
      return result === "true" || result === "false" ? /^true$/i.test(result) : result;
  }
}

export default gup;