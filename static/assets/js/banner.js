$(document).ready(function(){
  $("#btnWatch").click(function(){
    window.location = window.location.protocol + "//" + window.location.host +"/browse/movie-watch.html";
  }) 

  $("#btnMylist").click(function(){
    let searchParams = new URLSearchParams( window.location.search);
    var formData = {
      id: searchParams.get('id')
    }
    $.ajax({
      type: "POST",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
      },
      url: "/api/add_list",
      data: formData,
      dataType: "json",
      encode: true
    }).done(function(response){
      if(response.status==0){
        //
        $('#btnAddList').empty().append(
          '<div class="btn-add-list">' +
          '<div class="icon">' +
            '<svg xmlns="http://www.w3.org/2000/svg" id="icon-tick" enable-background="new 0 0 24 24"'+
              'height="512" viewBox="0 0 24 24" width="512">'+
              '<path '+
                 'd="m.828 13.336c-.261.304-.388.691-.357 1.091s.215.764.52 1.024l7.403 6.346c.275.235.616.361.974.361.044 0 .089-.002.134-.006.405-.036.77-.229 1.028-.542l12.662-15.411c.254-.31.373-.7.334-1.099-.04-.399-.231-.759-.541-1.014l-2.318-1.904c-.639-.524-1.585-.432-2.111.207l-9.745 11.861-3.916-3.355c-.628-.536-1.576-.465-2.115.163z">'+
              '</path>'+
            '</svg>'+
          '</div>'+
          'My list'+
        '</div>'
        )
      }
    })  
  })

});