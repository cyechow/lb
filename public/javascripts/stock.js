$(document).ready(function(){

    var tStock = $('#tStock').DataTable({
        "order": [[ 0, "asc" ]],
        "data": results,
        'createdRow': function( row, data, id ) {
            $(row).attr('id', id);
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
        ]
    });

    var AddRow = function (item, count) {
        tStock.row.add( [
            item,
            count
        ] ).draw( false );
    }

    $('#addStockModal').on('hidden.bs.modal', function() {
        ResetModal();
    });

    $('#btnAdd').click(function(event) {
        $('#modalResults').html("<p>Item: " + $('#itemName').val() + ". Count: " + $('#itemCount').val() +"</p>" );
        AddItem();
        $('#addStockModal').modal('hide');
    });

    $('#tStock').on('click', '.delete', function(){
        
        $(this).parents('tr').remove();
    });

    var ResetModal = function() {
        $('#itemName').val('');
        $('#itemCount').val('');
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
                setTimeout(function() { location.reload(); }, 20);
            },
            error: function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        })
    };
})