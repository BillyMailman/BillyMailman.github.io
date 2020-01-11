$(document).ready(function(){
  $(".panel>header").on("click", function() {
    var header = $(this);
    var content = header.next();
    content.slideToggle(500);
  });
  $(".panel>header").next().slideToggle(0);
  $("#toggleAll").on("click", function(){
    var hiddenPanels = $(".panel>header").parent().children("div:hidden");
    if(hiddenPanels.length !== 0){
      hiddenPanels.slideToggle(500);
    } else{
      $(".panel>header").parent().children("div:visible").slideToggle(500);
    }
  });
});
