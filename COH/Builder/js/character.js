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
}

export { Character };
