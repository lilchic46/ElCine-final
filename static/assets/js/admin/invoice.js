var urlServer = window.location.protocol + "//" + window.location.host;

// $(function(){
//   oOverviewTable = $('#invoiceTable').DataTable({
//     "bPaginate": true,
//     "bJQueryUI": true, // ThemeRoller-stöd
//     "bLengthChange": false,
//     "bFilter": false,
//     "bSort": false,
//     "bInfo": true,
//     "bAutoWidth": true,
//     "bProcessing": true,
//     "iDisplayLength": 10,
//   });
// })

$(document).ready(function(){
  $.ajax({
    url: urlServer + '/api/invoice/',
    data: 'json',
    success: function(response){
      console.log(response.data)
      if(response.status=="success"){        
        var trHTML = '<tbody>';
        $.each(response.data, function (i, item) {
            trHTML += '<tr><td class="text-center">25 Aug 2021</td>' +
              '<td class="text-center">'+item.project__title+'</td>' +
              '<td class="text-center">'+item.description+'</td>' +
              '<td class="text-center">'+item.pledge+'</td>' + 
              '<td class="text-center">' + 
              item.goal +
              '</td></tr>';
        });
        trHTML += '</tbody>'
        $('#invoiceTable').append(trHTML);
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