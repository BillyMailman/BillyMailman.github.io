function fillArchetypeDropdown(parsedArchetypeData, selectionCallback){
  var dropdown = document.getElementById('archetype-dropdown');
  parsedArchetypeData.forEach((archetype) => {
    if(!archetype.player) return;
    var newOption = document.createElement('option');
    newOption.value = archetype.name;
    newOption.text = archetype.display_name;
    dropdown.appendChild(newOption);
  });
  dropdown.addEventListener("change", function(event){
    var selection = event.target.value;
    var selectedArchetype = selection;
    selectionCallback(selectedArchetype)
  });
}

export {fillArchetypeDropdown};
