$(function () {

  var randomSelect = function (length) {
    return Math.floor((Math.random() * length) + 1)
  }

  $(".toggle-sidebar").on("click", function () {
    $("#sidebar").toggleClass("collapsed");
    $("#content").toggleClass("col-md-12 col-md-9");
  })

  $("#new_search").submit(function (event) {
    event.preventDefault();
    var level = $("#skill_level").val();
    var type = $("#lesson_format").val();
    var length = $("#lesson_length").val();
    var genre = $("#genre").val();
    var keywords = $("#keyword").val();


    // BUILD A QUERY STRING
    var searchString = level + "+" + genre + "+" + "guitar" + "+" + type + "+" + keywords; // IS LENGTH A SPECIAL STRING?
    var apiKey = "AIzaSyDZ0DP1vMYabAwTtRsbTfRAqnswG0jTh_M";
    var queryString = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=relevance&q=" + searchString + "&topicId=%2Fm%2F04rlf&type=video&videoCaption=any&key=" + apiKey;

    // API CALL TO YOUTUBE HERE

    

    $.ajax({
      type: "get",
      url: queryString,
      success: function (response) {
        console.log(response);
        var videoList = response.items;
        console.log(videoList);
        var selection = randomSelect(videoList.length);
        debugger;
      }
    });
  });


});