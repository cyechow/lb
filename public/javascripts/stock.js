$(document).ready(function(){
    var tStock = $('#tStock').DataTable();
    var counter = 1;
 
    var AddRow = function (item, count) {
        t.row.add( [
            item,
            count,
            counter +'.5'
        ] ).draw( false );
 
        counter++;
    }

    $('#tStock').DataTable({
        "order": [[ 0, "asc" ]],
        "columns": [
            {
                "data": "Item Name",
                "searchable": true
            },
            {
                "data": "Count",
                "searchable": true
            },
            {
                "render": function (data, type, full, meta)
                {
                    return '<i class="fa fa-trash-o fa-lg" id="btnDelete"</i>';
                }
            }
        ]
    });

    $('#addStockModal').on('hidden.bs.modal', function() {
      ResetModal();
    });

    $('#btnAdd').click(function(event) {
      $('#modalResults').html("<p>Item: " + $('#itemName').val() + ". Count: " + $('#itemCount').val() +"</p>" );
      AddItem();
      $('#addStockModal').modal('hide');
    });

    $('#addStockModal').on('click', '.delete', function(){
      $(this).parents('tr').remove();
    });

    var ResetModal = function() {
      $('#itemName').val('');
      $('#itemCount').val('');
    };

    var AddRow = function (item, count) {
      var table = document.getElementById("tStock");
      var newRow = table.insertRow(table.rows.length);
      newRow.id = item;
      var itemCell = row.insertCell(0);
      itemCell.innerHTML = '<td>' + item + '</td>';
      var countCell = row.insertCell(1);
      countCell.innerHTML = '<td>' + count + '</td>';
      var rmCell = row.insertCell(2);
      rmCell.innerHTML = '<td><button class="btn btn-md btn-danger" type="button">Delete</button></td>';
    };

    var AddItem = function() {
      var data =  {
        item  : $('#itemName').val(),
        count : $('#itemCount').val()
      }
      
      $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/v1/stock/add",
        data: JSON.stringify(data),
        datatype: 'json',
        success: function(ret) {
          //AddRow(data.item, data.count);
          //$('#modalResults').html("<p>Post Successfully! <br>--->" + JSON.stringify(ret)+ "</p>"); 
          setTimeout(function() { location.reload(); }, 0020);
        },
        error: function(e) {
          alert("Error!")
          console.log("ERROR: ", e);
        }
      })
    };
})