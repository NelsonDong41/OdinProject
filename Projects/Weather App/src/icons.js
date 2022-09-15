import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faMoon, faSun, faC, faF } from '@fortawesome/free-solid-svg-icons';

library.add(faMoon);
library.add(faSun);
library.add(faC);
library.add(faF);

const moon = icon({prefix: 'fas', iconName: 'moon'}).html;
const sun = icon({prefix: 'fas', iconName: 'sun'}).html;
const F = icon({prefix: 'fas', iconName: 'f'}).html;
const C = icon({prefix: 'fas', iconName: 'c'}).html;


export {moon, sun, F, C};