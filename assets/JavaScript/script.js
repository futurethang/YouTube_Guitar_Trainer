$(".toggle-sidebar").on("click", function () {
  $("#sidebar").toggleClass("collapsed");
  $("#content").toggleClass("col-md-12 col-md-9");  
})
