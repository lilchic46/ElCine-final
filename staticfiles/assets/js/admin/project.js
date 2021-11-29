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

function convertDate(datetime){
  var d = new Date() 

}

$(document).ready(function(){
  $.ajax({
    url: urlServer + '/api/project/',
    data: 'json',
    success: function(response){
      if(response.status=="success"){
        var trHTML = '';
        $.each(response.data, function (i, item) {
            trHTML += '<tr><td class="text-center"><b style="color: #034752; font-weight: bold; font-size: 20px;">' + item.account__platform + '</b></td>' +
              '<td><a target="_blank" href="' + item.url + '">'+ item.title +'</a><span class="pro-tag"> Pro</span></td>' + 
              '<td class="d-none d-sm-table-cell text-center">Yes</td>'  +
              '<td>'+item.created_at+ '</td>' + 
              '<td>'+item.updated_at+'</td>' + 
              '<td class="d-none d-sm-table-cell text-center">'+ 
                '<a href="/app/rewards.html?id='+item.id+'" class="icon"><i class="fe fe-list"></i> Rewards</a> &nbsp;' +
                '<a href="/app/project-update.html?id='+ item.id +'" class="icon"><i class="fe fe-edit"></i> Config</a>' + 
              '</td></tr>';
        });
        $('#projectTable').append(trHTML);
      } else {
        $(document).Toasts('create', {
          class: 'bg-warning',
          title: 'Error',
          body: 'Error' + response.message
        })        
      }
    }
  })

  $("#projectForm").submit(function(event){
    event.preventDefault();
    var formData = {
      url: $("#url").val(),
      username: $("#username").val(),
      password: $("#password").val(),
      active: $("#active").val(),
      notify: $("#notify").val(),
      frequency: $('input[name="pr_frequency"]:checked').val()
    }

    console.log(formData);

    $.ajax({
      type: "POST",
      url: urlServer + "/api/project/",
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      console.log(data);
    });

  });

  $("#addProject").click(function(){
    var formData = {
      url: $("#url").val(),
      username: $("#username").val(),
      password: $("#password").val(),
      active: $("#active").val(),
      notify: $("#notify").val(),
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
    }).done(function(data){
      if(data.status=="success"){
        $(document).Toasts('create', {
          class: 'bg-success',
          title: 'Added new project',
          body: 'Add new project successful'
        })
      }else {
        $(document).Toasts('create', {
          class: 'bg-warning',
          title: 'Error',
          body: 'Error when creating new project'
        })
      }
    })

  })
});