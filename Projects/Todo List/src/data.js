import {Item, Project} from './classes';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const allTasks = new Project('All Tasks', []);
const priority = new Project('Priority', []);
const time = new Project('Time Based', []);

const importantList = [allTasks, priority, time];
const projectList = [];

library.add(faPlus);
library.add(faMoon);
library.add(faSun);

const plus = icon({prefix: 'fas', iconName: 'plus'}).html;
const moon = icon({prefix: 'fas', iconName: 'moon'}).html;
const sun = icon({prefix: 'fas', iconName: 'sun'}).html;

export {projectList, importantList, plus, moon, sun};