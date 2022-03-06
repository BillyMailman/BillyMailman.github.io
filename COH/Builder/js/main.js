import { Character } from './character.js';
import { loadArchetypes } from './archetype.js';
import { fillArchetypeDropdown, setActiveCharacter } from './ui.js';
import {Effect} from './effect.js';
import {loadPower} from './power.js';

var character = new Character();

loadArchetypes(data => fillArchetypeDropdown(data, at => character.archetype = at));
setActiveCharacter(character);


//Collected hacks for manual debugging while developing.
window.Effect = Effect;
window.Character = Character;
window.loadPower = loadPower;
