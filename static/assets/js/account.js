function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

$(document).ready(function(){
 
  $.ajax({
    url: '/api/account',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    },
    data: 'json',
    success: function (response) {
      console.log(response)
      if (response.status == 0) {
        $("#username").val(response.data.username);
        $("#email").val(response.data.email);
        $("#password").val(response.data.password) 
      }
    }
  })

});