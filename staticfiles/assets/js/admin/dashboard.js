var urlServer = window.location.protocol + "//" + window.location.host;

$(document).ready(function(){
  $("#logout").on('click', function() {
    $.ajax({
      url: '/logout',
      success: function(response){ 
      }
    })
    location.replace('/')
  })
  $.ajax({
    url: urlServer + '/api/dashboard',
    data: 'json',
    success: function(response){
      console.log(response.data)
      if(response.status=="success"){
        $("#project").html(response.data.project)
        $("#reward").html(response.data.reward)
        $("#user").html(response.data.account)
        $("#invoice").html(response.data.invoice)
      } else {
        $(document).Toasts('create', {
          class: 'bg-warning',
          title: 'Error',
          body: 'Error ' + response.message
        })
      }
    }
  })
});