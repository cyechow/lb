$.ajax({
    url: "http://localhost:3201/getClientList",
    method: "GET",
    contentType: "application/json;",
    processData: "false"
}).done(function (response) {
    data = JSON.parse(response);
    // populate table
    $('tClients').bootstrapTable({data: parseData(data)});
    
}).fail(function( jqXHR, textStatus ){
    console.log('Failed to get table data:')
    $('#loadingDiv').hide();
    $('#failedDiv').show();
    $('#stat').html("<p>Failed to get your run results from the DB</p>")
});