$('#toggle').click(function() {
    // Toggling between Show/Hide text on link
    var str = $('#toggle').text();
    if (str.charAt(0) === 'S') {
        $('#toggle').html('Hide' + str.substring(7));
    } else {
        $('#toggle').html('Show me' + str.substring(4));
    }
    
    // Sliding the code up/down
    $('#gridsvg-code').slideToggle('fast', function() {});

    // Stopping the browser from loading the URL
    return false;
});
