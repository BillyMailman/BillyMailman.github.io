import { createCharacter } from './character.js';
import { loadArchetypes } from './archetype.js';
import {fillArchetypeDropdown} from './ui.js';

loadArchetypes(data => fillArchetypeDropdown(data, console.log));
