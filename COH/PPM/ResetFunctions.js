function resetUnselectedOptions(){
  var selectedCategoryIndex = $('#category-select').val();
  var selectedCategory = powerCategoryList[selectedCategoryIndex];
  if(selectedCategoryIndex === null || selectedCategory.url === null){
    //No category. Reset everything.
    resetPowersetDropdown();
    resetPowerDropdown();
    resetEnhancementSelections();
    resetPowerInfo();
    return;
  }
  //Category selected. Check for powerset.
  var selectedPowersetIndex = $('#powerset-select').val();
  var selectedPowerset = powersetList[selectedPowersetIndex];
  if(selectedPowersetIndex === null || selectedPowerset.url === null){
    resetPowerDropdown();
    resetEnhancementSelections();
    resetPowerInfo();
    return;
  }
  //Powerset selected is valid. Check for a power.
  var selectedPowerIndex = $('#power-select').val();
  var selectedPower = powersList[selectedPowerIndex];
  if(selectedPowerIndex === null || selectedPower.url === null){
    resetEnhancementSelections();
    resetPowerInfo();
    return;
  }
}

function resetPowersetDropdown(){
  $('#powerset-select').empty();
  $('#powerset-select').prop('disabled', true);
  $('#powerset-icon').attr('src','');
}
function resetPowerDropdown(){
  $('#power-select').empty();
  $('#power-select').prop('disabled', true);
}
function resetEnhancementSelections(){
$('.proc input').prop('checked', false);
  $('.proc input').prop('disabled', true);
}
function resetPowerInfo(){
  $('#power-icon').attr('src','');
}
