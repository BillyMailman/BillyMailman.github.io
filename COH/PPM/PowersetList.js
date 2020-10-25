var powerCategoryList = [];
var powersetList = [];
var powersList = [];
$(document).ready(function(){
  refreshCategoryList();
});
//Fired on initial load. Triggers the first dropdown to be populated.
function refreshCategoryList(){
  resetUnselectedOptions();
  $('#category-select').empty();
  //Get the full powers list. This URL is hard-coded, but meh.
  $.getJSON('https://coh.tips/powers/v2/',function(data){
    //Stash the data so we can refer back to it in the other functions
    powerCategoryList = data.power_categories;
    //Sort for display.
    powerCategoryList.sort(function(first, second){
      var firstIsAT = first.hasOwnProperty('archetype');
      var secondIsAT = second.hasOwnProperty('archetype');
      if(!firstIsAT && !secondIsAT)
      {
        return first.name < second.name ? -1 : 1;
      }
      if(!firstIsAT && secondIsAT){
        return -1;
      }
      if(firstIsAT && !secondIsAT){
        return 1;
      }
      var firstName = first.archetype.name + first.archetype.primary_or_secondary;
      var secondName = second.archetype.name + second.archetype.primary_or_secondary;
      return firstName < secondName ? -1 : 1;
    });
    //Pre-pend on the null option.
    powerCategoryList.unshift({'name':'---', 'display_name':'---', 'url':null});
    //Now, put the categories into the first dropdown.
    powerCategoryList.forEach((category, i) => {
      var name;
      if(category.hasOwnProperty('archetype')){
        name = category.archetype.name + ' ' + category.display_name;
      }else{
        name = category.name
      }
      var newOption = $('<option></option>');
      newOption.val(i).text(name);
      $('#category-select').append(newOption);
    });
    $('#category-select').prop('disabled', false);
  });
}
//This one fires when a selection is made on the first dropdown, and populates or blanks out the second.
function refreshPowersetList(){
  resetUnselectedOptions();
  var selected = $('#category-select').val();
  var category = powerCategoryList[selected];
  if(category.url === null){
    return;
  }
  //If the category has an AT icon, display it, because pretty pictures
  if(category.hasOwnProperty('archetype')){
    $('#powerset-icon').attr('src', category.archetype.icon);
  }
  //Get the list of powersets, and put them in the dropdown.
  $.getJSON(category.url, function(data){
    powersetList = data.power_sets;
    //The list does seem to always come back well-sorted, so no sorting here.
    //Pre-pend the dummy entry.
    powersetList.unshift({'name':'---', 'display_name':'---', 'url':null})
    powersetList.forEach((powerset, i) => {
      var url = powerset.url;
      var name = powerset.display_name;
      var newOption = $('<option></option>');
      newOption.val(i).html(name);
      $('#powerset-select').append(newOption);
    });
    $('#powerset-select').prop('disabled', false);
  });
}
//This is for the second dropdown being chosen, and loads up the last dropdown's options.
function refreshPowerList(){
  resetUnselectedOptions();
  var selected = $('#powerset-select').val();
  var powerset = powersetList[selected];
  if(powerset.url === null){
    return;
  }
  $.getJSON(powerset.url, function(data){
    powersList = data.powers;
    //Again, list seems to be well-sorted, so we don't sort here.
    //Do need to pre-pend a dummy.
    powersList.unshift({'name':'---', 'display_name':'---', 'url':null})
    powersList.forEach((power, i) => {
      var name = power.display_name;
      var newOption = $('<option></option>');
      newOption.val(i).html(name);
      $('#power-select').append(newOption);
    });
    $('#power-select').prop('disabled', false);
  });
}
//And this is for when they select the actual power.
function loadPower(){
  resetUnselectedOptions();
  resetEnhancementSelections();
  resetPowerInfo();
  var selected = $('#power-select').val();
  var power = powersList[selected];
  if(power.url === null)
  {
    //This is the dummy entry at the top. Stop here.
    return;
  }
  $('#power-icon').attr('src',power.icon);
  var castTime = power.activate.cast_time;
  var animationTime = power.activate.animation_time;
  var rechargeTime = power.activate.recharge_time;
  var type = power.power_type;
  var allowedSets = power.enhancement_set_categories_allowed;
  allowedSets.forEach((set, i) => {
    set = set.replace(" ", "_");
    var selector = '#procs-' + set + ">input";
    $(selector).prop('disabled', false);
  });
  $('#cast-time-input').val(castTime);
  $('#animation-time-input').val(animationTime);
  $('#recharge-time-input').val(rechargeTime);
}
