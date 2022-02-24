function fillArchetypeDropdown(parsedArchetypeData){
  var dropdown = document.getElementById('archetype-dropdown');
  parsedArchetypeData.forEach((archetype) => {
    if(!archetype.player) return;
    var newOption = document.createElement('option');
    newOption.value = archetype.name;
    newOption.text = archetype.display_name;
    dropdown.appendChild(newOption);
  });

}

export {fillArchetypeDropdown};
