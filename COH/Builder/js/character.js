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
      return this._archetype.attributes[attribute_name][value];
    }
    if(value === "cur"){
      var totalWithBuffs = this.getAttribute(attribute_name, 'base') + this.getTotalBuffs(attribute_name, 'cur');
      var max = this.getAttribute(attribute_name, 'max');
      var min = this.getAttribute(attribute_name, 'min');
      return Math.max(Math.min(totalWithBuffs, max), min);
    }
    if(value === "max"){
      var maxWithBuffs = this._archetype.attributes[attribute_name]['max'] + this.getTotalBuffs(attribute_name, 'max');
      var maxmax = this.getAttribute(attribute_name, 'maxmax');
      return Math.min(maxWithBuffs, maxmax);
    }
    if(value === "res"){
      var buffValue = this.getTotalBuffs(attribute_name, 'res');
      var resmax = this.getAttribute(attribute_name, 'resmax');
      var resmin = this.getAttribute(attribute_name, 'resmin');
      return Math.max(Math.min(buffValue, resmax), resmin);
    }
    if(value === "str"){
      var buffValue = this.getTotalBuffs(attribute_name, 'str');
      var strmax = this.getAttribute(attribute_name, 'strmax');
      var strmin = this.getAttribute(attribute_name, 'strmin');
      return Math.max(Math.min(buffValue, strmax), strmin);
    }
  }

  //type is 'cur', 'buff', 'res', or 'str'.
  getTotalBuffs(attribute_name, type){
    return 0;
  }
}

export { Character };
