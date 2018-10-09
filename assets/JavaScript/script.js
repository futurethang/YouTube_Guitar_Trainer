$(function () {

  var videoList;
  var currentVideoMeta = {};
  var currentVideoId;

  var randomSelect = function (length) {
    return Math.floor((Math.random() * length) + 1)
  }

  var newVideo = function () { } // A FUNCTION TO SELECT A NEW VIDEO FROM THE CURRENT QUERY, AS OPPOSED TO NEW SEARCH

  var loadVideo = function (videoList) {
    var selection = randomSelect(videoList.length);
    console.log(selection);
    currentVideoMeta = videoList[selection];
    currentVideoId = videoList[selection].id.videoId;
    var embedUrl = "http://www.youtube.com/embed/" + currentVideoId + "?autoplay=1&cc_load_policy=1"
    var title = currentVideoMeta.snippet.title;
    var channel = currentVideoMeta.snippet.channelTitle;
    var channelLink = "https://www.youtube.com/channel/" + currentVideoMeta.snippet.channelId;
    $("#feature_video").attr("src", embedUrl);
    $("#videoTitle").empty().text(title);
    $("#videoChannel").empty().text(channel);
    $("#videoChannel").attr("href", channelLink);
  }

  $(".toggle-sidebar").on("click", function () {
    $("#sidebar").toggleClass("collapsed");
    $("#content").toggleClass("col-md-12 col-md-9");
  })

  $("#new_search").submit(function (event) {
    event.preventDefault();
    $("#feature_video").attr("src", "");
    $("#videoChannel").attr("href", "");
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
        loadVideo(videoList);
      }
    });
  });

  $("#newVideo").on("click", function () {
    loadVideo(videoList);
  })





}); //// END OF DOCUMENT READY