class Character {
  constructor(){
    this._archetype = null;
  }
  set archetype(at){
    if(this.canChangeArchetype()){
      this._archetype = at;
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

  getAttribute(attribute_name, value){
    if(this._archetype === null){
      return null;
    }
    if(value === "base" || value === "maxmax" || value === "resmin" || value === "resmax" || value === "strmin" || value === "strmax"){
      return _archetype.attributes[attribute_name][value];
    }
    if(value === "cur"){
      var totalWithBuffs = getAttribute(attribute_name, 'base') + getTotalBuffs(attribute_name, 'cur');
      var max = getAttribute(attribute_name, 'max');
      var min = getAttribute(attribute_name, 'min');
      return Math.max(Math.min(totalWithBuffs, max), min);
    }
    if(value === "max"){
      var maxWithBuffs = _archetype.attributes[attribute_name]['max'] + getTotalBuffs(attribute_name, 'max');
      var maxmax = getAttribute(attribute_name, 'maxmax');
      return Math.min(maxWithBuffs, maxmax);
    }
    if(value === "res"){
      var buffValue = getTotalBuffs(attribute_name, 'res');
      var resmax = getAttribute(attribute_name, 'resmax');
      var resmin = getAttribute(attribute_name, 'resmin');
      return Math.max(Math.min(buffValue, resmax), resmin);
    }
    if(value === "str"){
      var buffValue = getTotalBuffs(attribute_name, 'str');
      var strmax = getAttribute(attribute_name, 'strmax');
      var strmin = getAttribute(attribute_name, 'strmin');
      return Math.max(Math.min(buffValue, strmax), strmin);
    }
  }

  //type is 'cur', 'buff', 'res', or 'str'.
  getTotalBuffs(attribute_name, type){
    return 0;
  }
}

export { Character };
