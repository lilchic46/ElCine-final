var urlServer = window.location.protocol + "//" + window.location.host;

$(document).ready(function(){
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  $.ajax({
    url: urlServer + '/api/reward/?id=' +id,
    data: 'json',
    success: function(response){
      console.log(response.data)
      if(response.status=="success"){
        var trHTML = '<tbody>';
        $.each(response.data.rewards, function (i, item) {
            trHTML += '<tr><td> ' + item.name + '</td>' +
                    '<td class="text-center">'+item.price+'</td>' + 
                    '<td class="text-center">'+item.total_stock+'</td>' + 
                    '<td class="text-center">'+item.remaining_stock+'</td>' +
                    '<td class="text-center">'+item.minimum_stock+'</td>' +
                    '<td class="text-center">'+item.top_up+'</td>' +
                    '<td class="text-center">'+item.maximum_sale+'</td>' +
                    '<td class="d-none d-sm-table-cell text-center">' + 
                      '<a href="/app/reward-form.html?id='+item.id+'" class="icon"><i class="fe fe-edit"></i> Edit</a>'
                    '</td></tr>'
                  });
        trHTML += '</tbody>'
        $('#rewardTable').append(trHTML);
        $('#projectTitle').append("<a target='_blank' href='" + response.data.url + "'>"+ response.data.project +"</a><span class='pro-tag'> Pro</span>")
      } else {
        $(document).Toasts('create', {
          class: 'bg-warning',
          title: 'Error',
          body: 'Error' + response.message
        })
      }
    }
  })

});