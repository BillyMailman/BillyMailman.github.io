function loadArchetypes(callback){
  fetch('https://cod.uberguy.net/homecoming/archetypes/index.json', {method:'get'})
  .then(response => response.json())
  .then(parseArchetypesList)
  .then(fetchArchetypeData)
  .then(parseArchetypeData)
  .then(callback);
}

function parseArchetypesList(json){
  var result = [];
  json.player_archetypes.forEach((item, i) => {
    result.push(item);
  });
  json.npc_archetypes.forEach((item, i) => {
    result.push(item);
  });
  return result;
}

function fetchArchetypeData(archetypeArray){
  var fetches = [];
  archetypeArray.forEach((item, i) => {
    if(item != 'blaster'){
      fetches.push(fetch(`https://cod.uberguy.net/homecoming/archetypes/${item}.json`, {method:'get'}).then(response => response.json()))
    }
  });
  return Promise.all(fetches);
}

function parseArchetypeData(dataArray){
  var results = [];
  dataArray.forEach((item, i) => {
    var parsed = {};
    parsed.player = !item.is_villain;
    parsed.icon = item.icon;
    parsed.display_name = item.display_name;
    copyAttributes(item, parsed);
    results.push(parsed);
  });
  return results;
}

function copyAttributes(source, target){
  target.attributes = {};
  window.testsource = source;
  window.testtarget = target;
  var list = Object.entries(source.attrib_base[0]);
  list.forEach((k) => {
    var attribute_name = k[0];
    if (attribute_name !== 'damage_type' && attribute_name !== 'defense_type' && attribute_name != 'elusivity')
    {
      var newAttribute = {};
      newAttribute.base = source.attrib_base[0][attribute_name];
      newAttribute.max = source.attrib_max[attribute_name][49];
      newAttribute.maxmax = source.attrib_max_max[attribute_name][49];
      newAttribute.min = source.attrib_min[0][attribute_name];
      newAttribute.resmin = source.attrib_resistance_min[0][attribute_name];
      newAttribute.resmax = source.attrib_resistance_max[attribute_name][49];
      newAttribute.strmin = source.attrib_strength_min[0][attribute_name];
      newAttribute.strmax = source.attrib_strength_max[attribute_name][49];
      target.attributes[attribute_name] = newAttribute;
    }
  });
  var damage_type_list = Object.entries(source.attrib_base[0].damage_type);
  damage_type_list.forEach((k) => {
    var type = k[0];
    var newAttribute = {};
    newAttribute.base = source.attrib_base[0]['damage_type'][type];
    newAttribute.max = source.attrib_max['damage_type'][type][49];
    newAttribute.maxmax = source.attrib_max_max['damage_type'][type][49];
    newAttribute.min = source.attrib_min[0]['damage_type'][type];
    newAttribute.resmin = source.attrib_resistance_min[0]['damage_type'][type];
    newAttribute.resmax = source.attrib_resistance_max['damage_type'][type][49];
    newAttribute.strmin = source.attrib_strength_min[0]['damage_type'][type];
    newAttribute.strmax = source.attrib_strength_max['damage_type'][type][49];
    target.attributes[`${type}_dmg`] = newAttribute;
  });
  //TODO: damage_type, defense_type, elusivity

}

export {loadArchetypes};
