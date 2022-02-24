function loadArchetypes(callback){
  fetch('https://cod.uberguy.net/homecoming/archetypes/index.json', {method:'get'})
  .then(response => response.json())
  .then(parseArchetypesList)
  .then(callback);
}

function parseArchetypesList(json, callback){
  var result = {};
  json.player_archetypes.forEach((item, i) => {
    result[item] = 'player';
  });
  json.npc_archetypes.forEach((item, i) => {
    result[item] = 'npc';
  });
  return result;
}

export {loadArchetypes};
