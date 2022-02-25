function fillArchetypeDropdown(parsedArchetypeData, selectionCallback){
  var dropdown = document.getElementById('archetype-dropdown');
  var archetypesMap = new Map();
  parsedArchetypeData.forEach((archetype) => {
    archetypesMap.set(archetype.name, archetype);
    if(!archetype.player) return;
    var newOption = document.createElement('option');
    newOption.value = archetype.name;
    newOption.text = archetype.display_name;
    dropdown.appendChild(newOption);
  });
  window.archetypes = archetypesMap;
  dropdown.addEventListener("change", function(event){
    var selection = event.target.value;
    var selectedArchetype = window.archetypes.get(selection);
    selectionCallback(selectedArchetype)
  });
}

export {fillArchetypeDropdown};
