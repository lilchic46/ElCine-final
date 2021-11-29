
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

$(document).ready(function () {
  $.ajax({
    url: '/api/home',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    },
    data: 'json',
    success: function (response) {
      if (response.status == 0) {
        var HTML = '';
        $.each(response.data, function (i, category) {
          HTML += '<div class="ribbon-landscape">' +
            '<h1>' + category.group + '</h1>' +
            '<div class="main-carousel" >';
          for (let i1 = 0; i1 < category.items.length; i1++) {
            HTML += category.items[i1];
          }
          HTML += '</div></div>'
        })
        HTML += '<script>$(".main-carousel").flickity({' +
          '"groupCells": true,' +
          '"imagesLoaded": true,' +
          '"percentPosition": false' +
          '});</script>'
        $('#movieList').html(HTML);
      }
    }
  })
});