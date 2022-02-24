function loadArchetypes(callback){
  fetch('https://cod.uberguy.net/homecoming/archetypes/index.json', {method:'get'}).then(response => parseArchetypes(response, callback));
}

function parseArchetypes(response, callback){
  response.json().then(callback);
}

export {loadArchetypes};
