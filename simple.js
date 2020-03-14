$(document).ready(function(){
  $("#openAll").on("click", function(){
    $('details').attr('open',true);
  });
  $("#closeAll").on("click", function(){
    $('details').attr('open',false);
  });
});
