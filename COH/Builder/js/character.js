class Character {
  constructor(){
    this._archetype = null;
  }
  set archetype(at){
    if(this.canChangeArchetype()){
      this._archetype = at;
      this._effects = new Map();
    }
  }
  get archetype(){
    return this._archetype;
  }
  canChangeArchetype(){
    //TODO: Real logic.
    //No changing after powers chosen!
    return true;
  }

  getAttribute(attribute_name, aspect){
    if(this._archetype === null){
      return null;
    }
    if(aspect === "base" || aspect === "maxmax" || aspect === "min" || aspect === "resmin" || aspect === "resmax" || aspect === "strmin" || aspect === "strmax"){
      return this._archetype.attributes[attribute_name][aspect];
    }
    if(aspect === "cur"){
      var totalWithBuffs = this.getAttribute(attribute_name, 'base') + this.getTotalBuffs(attribute_name, 'cur');
      var max = this.getAttribute(attribute_name, 'max');
      var min = this.getAttribute(attribute_name, 'min');
      return Math.max(Math.min(totalWithBuffs, max), min);
    }
    if(aspect === "max"){
      var maxWithBuffs = this._archetype.attributes[attribute_name]['max'] + this.getTotalBuffs(attribute_name, 'max');
      var maxmax = this.getAttribute(attribute_name, 'maxmax');
      return Math.min(maxWithBuffs, maxmax);
    }
    if(aspect === "res"){
      var buffValue = this.getTotalBuffs(attribute_name, 'res');
      var resmax = this.getAttribute(attribute_name, 'resmax');
      var resmin = this.getAttribute(attribute_name, 'resmin');
      return Math.max(Math.min(buffValue, resmax), resmin);
    }
    if(aspect === "str"){
      var buffValue = this.getTotalBuffs(attribute_name, 'str');
      var strmax = this.getAttribute(attribute_name, 'strmax');
      var strmin = this.getAttribute(attribute_name, 'strmin');
      return Math.max(Math.min(buffValue, strmax), strmin);
    }
  }

  addEffect(newEffect){
    var source = newEffect.source;
    var index = newEffect.index;
    var key = `${source}-${index}`;
    this._effects.set(key, newEffect);
  }

  removeEffect(effect){
    var key = `${effect.source}-${effect.index}`;
    this._effects.delete(key);
  }

  //type is 'cur', 'buff', 'res', or 'str'.
  getTotalBuffs(attribute_name, type){
    var total = 0;
    for(var [key, effect] of this._effects){
      if(effect.attribute === attribute_name && effect.aspect === type){
        total += effect.value
      }
    }
    return total;
  }
}

export { Character };
