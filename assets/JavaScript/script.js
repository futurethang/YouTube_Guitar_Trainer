// Initialize Firebase
var config = {
  apiKey: "AIzaSyD-3892e6WguvvFdYO2nFbuKyh_Whc5fTk",
  authDomain: "youttube-guitar-theater.firebaseapp.com",
  databaseURL: "https://youttube-guitar-theater.firebaseio.com",
  projectId: "youttube-guitar-theater",
  storageBucket: "youttube-guitar-theater.appspot.com",
  messagingSenderId: "985777305020"
};
firebase.initializeApp(config);

var auth = firebase.auth();
var database = firebase.database();

// // AUTHENTICATION STATE OBSERVER
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     var displayName = user.displayName;
//     var email = user.email;
//     var emailVerified = user.emailVerified;
//     var photoURL = user.photoURL;
//     var isAnonymous = user.isAnonymous;
//     var uid = user.uid;
//     var providerData = user.providerData;
//     // ...
//   } else {
//     // User is signed out.  
//     // ...
//   }
// });

$(function () {

  var videoList;
  var currentVideoMeta = {};
  var currentVideoId;
  var loginEmail = $("#inputEmail").val();
  var loginPassword = $("#inputPassword").val();
  var userEmail;

  var randomSelect = function (length) {
    return Math.floor((Math.random() * length) + 1)
  }

  var newVideo = function () { } // A FUNCTION TO SELECT A NEW VIDEO FROM THE CURRENT QUERY, AS OPPOSED TO NEW SEARCH

  var loadVideo = function (videoList) {
    var selection = randomSelect(videoList.length);
    console.log(selection);
    currentVideoMeta = videoList[selection];
    currentVideoId = videoList[selection].id.videoId;
    var embedUrl = "https://www.youtube.com/embed/" + currentVideoId + "?autoplay=1&cc_load_policy=1"
    var title = currentVideoMeta.snippet.title;
    var channel = currentVideoMeta.snippet.channelTitle;
    var channelLink = "https://www.youtube.com/channel/" + currentVideoMeta.snippet.channelId;
    $("#feature_video").attr("src", embedUrl);
    $("#videoTitle").empty().text(title);
    $("#videoChannel").empty().text(channel);
    $("#videoChannel").attr("href", channelLink);
  }

  $("#new_search").submit(function (event) {
    event.preventDefault();
    $("#feature_video").attr("src", "");
    $("#videoChannel").attr("href", "");
    var level = $("#skill_level").val();
    var type = $("#lesson_format").val();
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

  // Modal Toggle Click Event
  // $('#loginModal').on('shown.bs.modal', function () {
  //   $('#myInput').trigger('focus')
  // })

  $("#saveVideo").on('click', function (e) { // FUNCTION TO APPEND THE TABLE WITH A NEW VIDEO
    e.preventDefault();
    var videoTitle = $("#videoTitle").text();
    var level = $("#skill_level").val();
    var type = $("#lesson_format").val();
    var genre = $("#genre").val();
    var keywords = $("#keyword").val();

    var newRow = $("<tr>").append(
      $("<td>").html('<a href="https://www.youtube.com/watch?v=' + currentVideoId + '" target="_blank">' + videoTitle + '</a>'),
      $("<td>").text(level),
      $("<td>").text(type),
      $("<td>").text(genre + ', ' + keywords));

    $(".table > tbody").append(newRow);
  })

  function writeUserData(userId, email) {
    firebase.database().ref('users/' + userId).set({
      email: email
    });
  }

  $("#returning_user").on("click", function (e) {
    e.preventDefault();
    const email = $("#inputEmail").val();
    const pass = $("#inputPassword").val();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  })

  $("#new_user").on("click", function (e) {
    e.preventDefault();
    const email = $("#inputEmail").val();
    const pass = $("#inputPassword").val();
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.then(function (user) {
      console.log(user);
      var userId = firebase.auth().currentUser.uid;
      // debugger;
      writeUserData(userId, email);
    })
    promise.catch(e => console.log(e.message));
  })

  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser.email);
      userEmail = firebaseUser.email;
      database.ref().push({
        email: userEmail,
        savedVideos: 0,
      });
      console.log(database.ref());
      // unhide logout button
    } else {
      console.log("not logged in");
      // hide logout button
    }
  });

}); //// END OF DOCUMENT READY