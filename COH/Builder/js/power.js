import { getData } from './fetch.js';

class Power {

}

function loadPower(power_fullname, callback){
  getData('powers', power_fullname)
  .then(parsePowerData)
  .then(callback);
}

function parsePowerData(powerJson){
  var power = new Power();
  
}


export {loadPower};
