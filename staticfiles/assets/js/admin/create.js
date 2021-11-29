var urlServer = window.location.protocol + "//" + window.location.host;
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
 
  $("#createProject").click(function(){
    var formData = {
      url: $("#url").val(),
      username: $("#username").val(),
      password: $("#password").val(),
      service: $("#service").val() == 'on' ? true : false,
      notify: $("#notify").val() == 'on' ? true : false,
      frequency: $("#frequency").val()
    }
    $.ajax({
      type: "POST",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
      },
      url: urlServer + "/api/project/",
      data: formData,
      dataType: "json",
      encode: true
    }).done(function(response){
      if(response.status=="success"){
        $(document).Toasts('create', {
          class: 'bg-success',
          title: 'Create project',
          body: 'Create project successful'
        })
      }else {
        $(document).Toasts('create', {
          class: 'bg-warning',
          title: 'Error',
          body: 'Error when create new project: ' + response.message
        })
      }
    })
  })

});