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
    url: '/api/my_list',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    },
    data: 'json',
    success: function (response) {
      if (response.status == 0) {
        var HTML = '';

        HTML += '<div class="ribbon-landscape">' +
          '<h1>' + response.data.group + '</h1>' +
          '<div class="main-carousel" >';
        for (let i1 = 0; i1 < response.data.items.length; i1++) {
          HTML += response.data.items[i1];
        }
        HTML += '</div></div>'
  
        HTML += '<script>$(".main-carousel").flickity({' +
          '"groupCells": true,' +
          '"imagesLoaded": true,' +
          '"percentPosition": false' +
          '});</script>'
        $('#myList').html(HTML);
      }
    }
  })

  $("#btnWatch").click(function(){
    window.location = window.location.protocol + "//" + window.location.host +"/browse/movie-watch.html";
  })

  $("#btnMylist").click(function(){
    window.location = window.location.protocol + "//" + window.location.host +"/browse/mylist.html";
  })

});