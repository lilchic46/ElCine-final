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
    url: urlServer + '/api/reward/' + id +'/',
    data: 'json',
    success: function(response){
      if(response.status=="success"){
        $("#minimum_stock").val(response.data.minimum_stock);
        $("#top_up").val(response.data.top_up) 
        $('#enable_topup').prop('checked', response.data.enable_topup);
        $("#enable_limitsale").prop('checked', response.data.enable_limitsale)
        $('#rewardTitle').append(response.data.name)
      } else {
        $(document).Toasts('create', {
          class: 'bg-warning',
          title: 'Error',
          body: 'Error' + response.message
        })        
      }
    }
  })

  $("#updateReward").click(function(){
    var formData = {
      minimum_stock: $("#minimum_stock").val(),
      top_up: $("#top_up").val(),
      enable_topup: $("#enable_topup").val() == 'on' ? true : false,
      enable_limitsale: $("#enable_limitsale").val() == 'on' ? true : false,
    }
    console.log(formData)
    $.ajax({
      type: "PUT",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
      },
      url: urlServer + "/api/reward/" + id + '/',
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