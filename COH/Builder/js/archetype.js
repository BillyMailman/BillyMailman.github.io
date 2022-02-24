function loadArchetypes(callback){
  fetch('https://cod.uberguy.net/homecoming/archetypes/index.json', {method:'get'})
  .then(response => response.json())
  .then(json => parseArchetypesList(json, callback));
}

function parseArchetypesList(json, callback){
  callback(json);
}

export {loadArchetypes};
