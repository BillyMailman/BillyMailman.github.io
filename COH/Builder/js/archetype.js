function loadArchetypes(callback){
  fetch('https://cod.uberguy.net/homecoming/archetypes/index.json', {method:'get'})
  .then(response => response.json())
  .then(parseArchetypesList)
  .then(fetchArchetypeData)
  .then(callback);
}

function parseArchetypesList(json){
  var result = new Map();
  json.player_archetypes.forEach((item, i) => {
    result.set(item, 'player');
  });
  json.npc_archetypes.forEach((item, i) => {
    result.set(item, 'npc');
  });
  return result;
}

function fetchArchetypeData(archetypeMap){
  archetypeMap.forEach((v, k) => {
    console.log(v);
    console.log(k);
  });
  return 'done';
}

export {loadArchetypes};
