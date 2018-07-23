$(document).ready(function(){
    var rowIdxArray = [];
    var tOrder = $('#tOrder').DataTable({
        "ajax": {
            "url": "/count/orders",
            "dataSrc": ""
        },
        "columns": [
            {
                "data": "orderid",
                "searchable": true
            },
            {
                "data": "clientname",
                "searchable": true
            },
            {
                "data": "orderstatus",
                "searchable": true
            }
        ],
        "order": [[ 0, "asc" ]],
        "paging": true,
        "pagingType": "simple_numbers"
    });

    // Index all rows and store current row subset indices into an array for row-specific requests:
    $('#tOrder').on('draw.dt', function() {
        rowIdxArray = [];
        tOrder.rows( {filter: 'applied' } ).every( function( rowIdx, tableLoop, rowLoop ) {
            $(this).attr('index', rowIdx);
            rowIdxArray.push(rowIdx);
        });
    });

    $('#addOrderModal').on('hidden.bs.modal', function() {
        ResetModal();
    });

    var ResetModal = function() {
        $('#clientname').val('');
    };

    // Handle add item button click from modal:
    $('#btnAdd').click(function(event) {
        $('#modalResults').html("<p>Client Name: " + $('#clientname').val() + ".</p>" );
        AddItem();
        $('#addOrderModal').modal('hide');
    });

    var AddRow = function (data) {
        tOrder.row.add( {
            "orderid": data.orderid,
            "clientname": data.clientname,
            "orderstatus": "Submitted"
        } ).draw();
    }

    // Handle adding item to DB and table:
    var AddItem = function() {
        var data =  {
            item  : $('#clientName').val()
        }
            
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/api/v1/orders/add",
            data: JSON.stringify(data),
            datatype: 'json',
            success: function(ret) {
                AddRow(data);
            },
            error: function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        })
    };

    // Handle deletion of row:
    $('#tOrder').on('click', '.delete', function(){
        var pg = tOrder.page.info();
        var index = rowIdxArray[$(this).closest('tr').index()];
        var pgLength = tOrder.page.len();
        var orderID = tOrder.cell( pg.page*pgLength + index, 0 ).data();

        // Send delete request:
        $.ajax({
            type: "DELETE",
            contentType: "application/json",
            url: "/api/v1/orders/delete/" + orderID,
            success: function(ret) {
                console.log("Deleted " + orderID);
                
                // Remove row + redraw table:
                tOrder.row($(this).parents('tr')).remove().draw();
            },
            error: function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        })
    });
})