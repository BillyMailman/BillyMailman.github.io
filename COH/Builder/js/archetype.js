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
  var list = Object.entries(source.attrib_base[0]);
  list.forEach((k, v) => {
    if (typeof k === 'string' || k instanceof String)
    {
      var newAttribute = {};
      newAttribute.base = source.attrib_base[0][k];
      newAttribute.max = source.attrib_max[k][49];
      newAttribute.maxmax = source.attrib_max_max[k][49];
      newAttribute.min = source.attrib_min[0][k];
      newAttribute.resmin = source.attrib_resistance_min[0][k];
      newAttribute.resmax = source.attrib_resistance_max[k][49];
      newAttribute.strmin = source.attrib_strength_min[0][k];
      newAttribute.strmax = source.attrib_strength_max[k][49];
      attributes[k] = newAttribute;
    }
  });
  //TODO: damage_type, defense_type, elusivity
}

export {loadArchetypes};
