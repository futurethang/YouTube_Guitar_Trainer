

// $("#submit").on("submit", function (e) {
//   alert("submitted");
//   e.preventDefault();

//   var level = $("#skill_level").val();
//   var type = $("#lesson_format").val();
//   debugger;
//   var length;
//   var genre;
//   var keywords;

// })

$(function(){

  alert("js loaded");

  $(".toggle-sidebar").on("click", function () {
    $("#sidebar").toggleClass("collapsed");
    $("#content").toggleClass("col-md-12 col-md-9");  
  })
  
  $( "#new_search" ).submit(function( event ) {
    alert( "Handler for .submit() called." );
    event.preventDefault();
    var level = $("#skill_level").val();
    var type = $("#lesson_format").val();
    var length = $("#lesson_length").val();
    var genre = $("#genre").val();
    var keywords = $("#keyword").val();
    debugger;
  });
    
  
  });