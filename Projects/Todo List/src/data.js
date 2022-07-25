import {Item, Project} from './classes';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const defaultProject = new Project('Personal', []);
const projectList = [defaultProject, new Project('a', [])];

library.add(faPlus);

const plus = icon({prefix: 'fas', iconName: 'plus'}).html;

export {projectList, defaultProject, plus};