$(document).ready(function(){
    var rowIdxArray = [];
    var tStock = $('#tStock').DataTable({
        "ajax": {
            "url": "/count/stock",
            "dataSrc": ""
        },
        "columns": [
            {
                "data": "item",
                "searchable": true
            },
            {
                "data": "count",
                "searchable": true
            },
            {
                "render": function (data, type, full, meta)
                {
                    return '<button class="btn btn-danger delete" role="button"><i class="fa fa-trash-o fa-lg" id="btnDelete"</i></button>';
                }
            }
        ],
        "order": [[ 1, "desc" ]],
        "paging": true,
        "pagingType": "simple_numbers"
    });

    // Index all rows and store current row subset indices into an array for row-specific requests:
    $('#tStock').on('draw.dt', function() {
        rowIdxArray = [];
        tStock.rows( {filter: 'applied' } ).every( function( rowIdx, tableLoop, rowLoop ) {
            $(this).attr('index', rowIdx);
            rowIdxArray.push(rowIdx);
        });
    });

    $('#addStockModal').on('hidden.bs.modal', function() {
        ResetModal();
    });

    var ResetModal = function() {
        $('#itemName').val('');
        $('#itemCount').val('');
    };

    // Handle add item button click from modal:
    $('#btnAdd').click(function(event) {
        $('#modalResults').html("<p>Item: " + $('#itemName').val() + ". Count: " + $('#itemCount').val() +"</p>" );
        AddItem();
        $('#addStockModal').modal('hide');
    });

    var AddRow = function (data) {
        tStock.row.add( {
            "item": data.item,
            "count": data.count
        } ).draw();
    }

    // Handle adding item to DB and table:
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
                AddRow(data);
            },
            error: function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        })
    };

    // Handle deletion of row:
    $('#tStock').on('click', '.delete', function(){
        var pg = tStock.page.info();
        var index = rowIdxArray[$(this).closest('tr').index()];
        var pgLength = tStock.page.len();
        var itemName = tStock.cell( pg.page*pgLength + index, 0 ).data();

        // Send delete request:
        $.ajax({
            type: "DELETE",
            contentType: "application/json",
            url: "/api/v1/stock/delete/" + itemName,
            success: function(ret) {
                console.log("Deleted " + itemName);
                
                // Remove row + redraw table:
                tStock.row($(this).parents('tr')).remove().draw();
            },
            error: function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        })
    });
})