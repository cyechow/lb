function handleInquirySubmit(event) {
        var name = document.getElementById("name").value
        var email = document.getElementById("email").value
        var subject = document.getElementById("subject").value

        $.ajax({
                url: "http://localhost:3201/sendInquiry",
                method: "GET",
                contentType: "application/json;",
                processData: "false",
                data: {
                    "name": name,
                    "email": email,
                    "subject": subject
                }
            }).done(function (response) {
                $('#statuses').html('<p>Inquiry sent! Check your inbox for a confirmation email.</p>')
                document.getElementById('inquiryform').reset()
            }).fail(function( jqXHR, textStatus ){
                $('#statuses').html("<p>Failed to send your inquiry ):</p>")
            });

        event.preventDefault();
}