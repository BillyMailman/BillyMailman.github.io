import { getData } from './fetch.js';

class Power {
  get accuracy(){
    return this._accuracy;
  }
  get display_name(){
    return this._display_name;
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
  power._display_name = powerJson.display_name;
  power._auto_issue = powerJson._auto_issue;
  power._attack_types = powerJson.attack_types;
  power._requires = powerJson.requires;
  power._effect_area = powerJson.effect_area;
  power._max_targets_hit = powerJson.max_targets_hit;
  power._radius = powerJson.radius;
  power._arc = powerJson.arc;
  power._range = powerJson.range;
  power._range_secondary = powerJson.range_secondary;
  power._activation_time = powerJson.activation_time;
  power._recharge_time = powerJson.recharge_time;
  power._endurance_cost = powerJson.endurance_cost;
  power._target_type = powerJson.target_type;
  power._targets_affected = powerJson.targets_affected;
  power._targets_autohit = powerJson.targets_autohit;
  power._proc_allowed = powerJson.proc_allowed;
  power._boosts_allowed = powerJson.boosts_allowed;
  power._allowed_boostset_cats = powerJson.allowed_boostset_cats;
  power._exclusion_groups = powerJson.exclusion_groups;
  power._modes_required = powerJson.modes_required;
  power._modes_disallowed = powerJson.modes_disallowed;
  power._ignore_strength = powerJson.ignore_strength;
  power._procs_only_on_main_target = powerJson.procs_only_on_main_target;
  power._max_boosts = powerJson.max_boosts;
  power._attrib_cache = powerJson.attrib_cache;
  power._powerset = powerJson.powerset;
  power._available_level = powerJson.available_level;
  power.effects = [];
  powerJson.effects.forEach((effectJson) => {
    power.effects.push(createEffects(effectJson, false));
  });
  powerJson.activation_effects.forEach((effectJson) => {
    power.effects.push(createEffects(effectJson, true));
  });
  return power;
}

function createEffects(effectJson, isActivation){
  var effects = [];
  //TODO: Class?
  //TODO: Child effects
  var baseEffect = {};
  baseEffect.chance = effectJson.chance;
  baseEffect.tags = effectJson.tags;
  baseEffect.isActivationEffect = isActivation;
  effectJson.templates.forEach((templateJson) => {
    var effect = {...baseEffect};
    effect.attribs = templateJson.attribs;
    effect.type = templateJson.type;
    effect.aspect = templateJson.aspect;
    effect.target = templateJson.target;
    effect.scale = templateJson.scale;
    effect.table = templateJson.table;
    effect.magnitude = templateJson.magnitude;
    effect.stack = templateJson.stack;
    effect.stack_limit = templateJson.stack_limit;
    effect.flags = templateJson.flags;
    effects.push(effect);
  });

  return effects;
}


export {loadPower};
