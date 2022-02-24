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
  dataArray.forEach((item, i) => {
    var parsed = {};
    parsed.player = !item.is_villain;
    parsed.icon = item.icon;
    parsed.display_name = item.display_name;
    copyAttributes(item, parsed);
  });
}

function copyAttributes(source, target){
  var list = Object.entries(source.attrib_base[0]);
  list.forEach((v, k) => {
    console.log(v);
    console.log(k);
  });

}

export {loadArchetypes};
