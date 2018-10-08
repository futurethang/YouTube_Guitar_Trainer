$(function () {

  var videoList;
  var currentVideoMeta = {};
  var currentVideoId;

  var randomSelect = function (length) {
    return Math.floor((Math.random() * length) + 1)
  }

  var newVideo = function () { } // A FUNCTION TO SELECT A NEW VIDEO FROM THE CURRENT QUERY, AS OPPOSED TO NEW SEARCH

  $(".toggle-sidebar").on("click", function () {
    $("#sidebar").toggleClass("collapsed");
    $("#content").toggleClass("col-md-12 col-md-9");
  })

  $("#new_search").submit(function (event) {
    event.preventDefault();
    $("#feature_video").attr("src", "");
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
        videoList = response.items;
        console.log(videoList);
        var selection = randomSelect(videoList.length);
        currentVideoMeta = videoList[selection];
        currentVideoId = videoList[selection].id.videoId;
        var embedUrl = "http://www.youtube.com/embed/" + currentVideoId + "?autoplay=1&cc_load_policy=1"
        $("#feature_video").attr("src", embedUrl);
      }
    });
  });





}); //// END OF DOCUMENT READY