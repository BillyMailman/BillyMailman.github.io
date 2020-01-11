function buildSetTable(data){
  //Each Set
  var tbody = $('#sets-table>tbody');
  data.Sets.forEach(function(set){
    var setRow = $('<tr>');

    var nameTd = $('<td>');
    nameTd.append(set.Name);
    setRow.append(nameTd);

    var availabilityTd = $('<td>');
    availabilityTd.append(set.Availability);
    availabilityTd.addClass('availability-' + set.Availability);
    setRow.append(availabilityTd);

    var locationTd = $('<td>');
    locationTd.addClass('location-' + set.Location);
    var locationText = set.Location;
    if(set.Sublocation !== undefined){
      locationText += '<br/>(' + set.Sublocation + ')';
    }
    locationTd.append(locationText);
    setRow.append(locationTd);

    var styleTd = $('<td>');
    var strippedStyle = set.Style.replace(/\s+/g, '');
    styleTd.addClass('style-' + strippedStyle);
    styleTd.append(set.Style);
    setRow.append(styleTd);

    var weightTd = $('<td>');
    weightTd.append(set.Weight);
    weightTd.addClass('weight-' + set.Weight);
    setRow.append(weightTd);

    var bonuses = [];
    bonuses.push(getBonus(data,set.Bonus2));
    bonuses.push(getBonus(data,set.Bonus3));
    bonuses.push(getBonus(data,set.Bonus4));
    bonuses.push(getBonus(data,set.Bonus5));
    for(var i = 0; i < 4; i++){
      var bonus = bonuses[i];
      var bonusTd = $('<td>');
      bonusTd.addClass('bonus-' + bonus.Name);
      bonusTd.addClass('bonus-color-' + bonus.Type)
      bonusTd.append(bonus.Text);
      setRow.append(bonusTd);
    }

    tbody.append(setRow);
  });

}

function getBonus(data, bonus){
  if(typeof bonus === "string"){
    return data.Bonuses[bonus];
  }
  return bonus;
}

function refilter(){
  var includes = [];
  includes.push(buildArray('availability','include'));
  includes.push(buildArray('style','include'));
  includes.push(buildArray('weight','include'));
  includes.push(buildArray('bonus-color','include'));
  includes.push(buildArray('bonus','include'));
  //Excludes are just one flat list. Use concat instead of push.
  var excludes = [];
  excludes = excludes.concat(buildArray('availability','exclude'));
  excludes = excludes.concat(buildArray('weight','exclude'));
  excludes = excludes.concat(buildArray('style','exclude'));
  excludes = excludes.concat(buildArray('bonus-color','exclude'));
  excludes = excludes.concat(buildArray('bonus','exclude'));
  applyFiltering(includes,excludes);
  return false;
}

function buildArray(tag,inclusion){
  var results = [];
  $('.' + tag + '.' + inclusion).each(function(){
    if($(this).prop('checked')){
      addToArray($(this),results,tag);
    }
  });
  return results;
}

function applyFiltering(includes,excludes){
  //Turn 'em all on.
  $('tbody>tr:hidden').toggle();
  //Turn off unless included.
  var allRows = $('tbody>tr');
  for(var i = 0; i < includes.length; i++){
    var includeList = includes[i];
    if(includeList.length === 0){
      continue;
    }
    var pendingExcludes = $(allRows);
    for(var j = 0; j < includeList.length; j++){
      var include = includeList[j];
      pendingExcludes = pendingExcludes.filter(allRows.not($('tbody>tr>td.' + include).parent()));
    }
    pendingExcludes.filter(':visible').toggle();
  }
  //turn off if excluded.
  for(var i = 0; i < excludes.length; i++){
    var exclude = excludes[i];
    $('tbody>tr>td.' + exclude +':visible').parent().toggle();
  }
}

function addToArray(selector, theArray,tag){
  var id = selector.prop('id');
  var value = id.substring(id.lastIndexOf('-') + 1);
  theArray.push(tag + '-' + value);
}

function prepWork(){
  $.getJSON('Sets/SetData.json').done(buildSetTable);
  var setTable = $('#set-table');
  setTable.floatThead();
  $('.toggle>legend').click(function() {
    $(this).siblings().toggle();
    return false;
  });
  $('.checkall>legend').click(function() {
    var allBoxes = $(this).parent().find('input[type="checkbox"]');
    var onBoxes = $(this).parent().find('input[type="checkbox"]:checked');
    var allOn = (allBoxes.length=== onBoxes.length);
    $(this).parent().find('input[type="checkbox"]').prop('checked',!allOn);
    return false;
  });
  $('.toggle>legend').siblings().toggle();
  $('#applyButton').click(refilter);
  $('#clearButton').click(function(){
    $('input[type="checkbox"]').prop('checked',false);
    refilter();
    return false;
  });
}
