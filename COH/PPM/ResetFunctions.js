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
  $('#do-calc-button').prop('disabled', true);
  resetEnhancementSelections();
}
function resetEnhancementSelections(){
$('#proc-container input').prop('checked', false);
  $('#proc-container input').prop('disabled', true);
}
