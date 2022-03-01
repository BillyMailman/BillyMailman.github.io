class Effect {

  constructor(source, index, /*target,*/ attribute, aspect, value){
    //Source power full ID, and the index of the effect in question.
    this._source = source;
    this._index = index;

    //TODO: Target stuff?
    //this._target = target;

    //What attribute this affects. 'fire', or 'melee_attack', or 'confused'.
    this._attribute = attribute
    //Which value is changed. 'cur', 'max', 'res', or 'str'.
    this._aspect = aspect;
    //And lastly, how strong this buff is.
    this._value = value;
  }
  get source(){
    return this._source;
  }
  get index(){
    return this._index;
  }
  get attribute(){
    return this._attribute;
  }
  get aspect(){
    return this._aspect;
  }
  get value(){
    return this._value;
  }
}
