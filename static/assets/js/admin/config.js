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
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  $.ajax({
    url: urlServer + '/api/project/' + id +'/',
    data: 'json',
    success: function(response){
      if(response.status=="success"){
        $("#url").val(response.data.url)
        $("#username").val(response.data.username)
        $("#password").val(response.data.password)
        $('#service').prop('checked', response.data.service);
        $("#notify").prop('checked', response.data.notify)

        if(response.data.frequency != 30){
          $("#option_b1").prop('checked', false)
          $("#option_b2").prop('checked', true)
        }

      } else {
        $(document).Toasts('create', {
          class: 'bg-warning',
          title: 'Error',
          body: 'Error' + response.message
        })        
      }
    }
  })

  $("#updateProject").click(function(){
    var formData = {
      url: $("#url").val(),
      username: $("#username").val(),
      password: $("#password").val(),
      service: $("#service").val() == 'on' ? true : false,
      notify: $("#notify").val() == 'on' ? true : false,
      frequency: $("#frequency").val()
    }
    $.ajax({
      type: "PUT",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
      },
      url: urlServer + "/api/project/" + id + '/',
      data: formData,
      dataType: "json",
      encode: true
    }).done(function(data){
      if(data.status=="success"){
        $(document).Toasts('create', {
          class: 'bg-success',
          title: 'Update project',
          body: 'Update project successful'
        })
      }else {
        $(document).Toasts('create', {
          class: 'bg-warning',
          title: 'Error',
          body: 'Error updating project: ' +  data.message
        })
      }
    })
  })

});