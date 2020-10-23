function refreshCategoryList(){
  $('#category-select').empty();
  $.getJSON('https://coh.tips/powers/v2/',function(data){
    data.power_categories.forEach((category, i) => {
      //TODO: Categorize better?
      var url = category.url;
      var name = category.name;
      var newOption = $('<option></option>');
      newOption.val(url).html(name);
      $('#category-select').append(newOption);
    });
    $('#category-select').prop('disabled', false);
  });
}
$(document).ready(function(){
  refreshCategoryList();
});
function refreshPowersetList(){
  $('#powerset-select').empty();
  var selected = $('#category-select').val();
  $.getJSON(selected, function(data){
    data.power_sets.forEach((powerset, i) => {
      var url = powerset.url;
      var name = powerset.name;
      var newOption = $('<option></option>');
      newOption.val(url).html(name);
      $('#powerset-select').append(newOption);
    });
    $('#powerset-select').prop('disabled', false);
  });
}
var powersList = [];
function refreshPowerList(){
  $('#power-select').empty();
  var selected = $('#powerset-select').val();
  $.getJSON(selected, function(data){
    powersList = data.powers;
    powersList.forEach((power, i) => {
      var name = power.name;
      var newOption = $('<option></option>');
      newOption.val(i).html(name);
      $('#power-select').append(newOption);
    });
    $('#power-select').prop('disabled', false);
  });
}
function loadPower(){
  var selected = $('#power-select').val();
  var power = powersList[selected];
  var castTime = power.activate.cast_time;
  var animationTime = power.activate.animation_time;
  var rechargeTime = power.activate.recharge_time;
  $('#cast-time-input').val(castTime);
  $('#animation-time-input').val(animationTime);
  $('#recharge-time-input').val(rechargeTime);
}
