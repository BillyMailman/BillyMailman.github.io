function getData(folder, file){
  return fetch(`https://cod.uberguy.net/homecoming/${folder}/${file}.json`, {method:'get'})
  .then(response => response.json())
}

export {getData};
