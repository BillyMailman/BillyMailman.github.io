function resetEverything(){
    resetPowersetDropdown();
}
function resetPowersetDropdown(){
  $('#powerset-select').empty();
  $('#powerset-select').prop('disabled', true);
  $('#powerset-icon').attr('src','');
  resetPowerDropdown();
}
function resetPowerDropdown(){
  $('#power-select').empty();
  $('#power-select').prop('disabled', true);
  resetPowerInfo();
}
function resetPowerInfo(){
  $('#power-icon').attr('src','');
  resetEnhancementSelections();
}
function resetEnhancementSelections(){
$('.proc input').prop('checked', false);
  $('.proc input').prop('disabled', true);
}
