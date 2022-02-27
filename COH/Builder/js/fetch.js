function getData(folder, file){
  return fetch(`data/${folder}/${file}.json`, {method:'get'})
  .then(response => response.json())
}

export {getData};
