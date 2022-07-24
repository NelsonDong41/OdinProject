import {Item, Project} from './classes';

const defaultProject = new Project('Personal', []);
const projectList = [defaultProject, new Project('a', [])];

export {projectList, defaultProject};