import { Character } from './character.js';
import { loadArchetypes } from './archetype.js';
import { fillArchetypeDropdown, setActiveCharacter } from './ui.js';
import {Effect} from './effect.js';

var character = new Character();
window.effect = Effect;

loadArchetypes(data => fillArchetypeDropdown(data, at => character.archetype = at));
setActiveCharacter(character);
