function search() {
    // clear results
    $('#results').html('');

    // q parameter
    q = $('#input').val();

    // insert parameters and get data
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            // put your API key here
            key: ''
        },
        function(data) {
            console.log(data);

            $.each(data.items, function(i, item) {
                // get output
                var output = getOutput(item);

                // display results
                $('#results').append(output);
            });
        }
    )
}

function getOutput(item) {
    var title = item.snippet.title;
    var thumb = item.snippet.thumbnails.high.url;
    var videoId = item.id.videoId;

    // format output
    var output = '<h3>Title: ' + title + '</h3>' 
                + '<img src="' + thumb + '"><br>' 
                + '<p>URL: <a href="https://www.youtube.com/embed/' + videoId + '">https://www.youtube.com/embed/' + videoId + '</a></p><br>';
    
    return output;
}