import { Character } from './character.js';
import { loadArchetypes } from './archetype.js';
import {fillArchetypeDropdown} from './ui.js';

var character = new Character();

loadArchetypes(data => fillArchetypeDropdown(data, console.log));
