import { getData } from './fetch.js';

class Power {
  constructor(){
    this._accuracy = null;
  }
  get accuracy(){
    return this._accuracy;
  }
}

function loadPower(power_fullname, callback){
  getData('powers', power_fullname)
  .then(parsePowerData)
  .then(callback);
}

function parsePowerData(powerJson){
  var power = new Power();
  power._accuracy = powerJson.accuracy;
  return power;
}


export {loadPower};
