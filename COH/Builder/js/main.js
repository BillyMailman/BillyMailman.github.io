import { Character } from './character.js';
import { loadArchetypes } from './archetype.js';
import { fillArchetypeDropdown, setActiveCharacter } from './ui.js';

var character = new Character();

loadArchetypes(data => fillArchetypeDropdown(data, at => character.archetype = at));
setActiveCharacter(character);
