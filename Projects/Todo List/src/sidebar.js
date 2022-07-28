import { Project } from "./classes";
import { importantList, projectList, plus as plusIcon } from "./data";
import { updateTitle as updateHeaderTitle } from "./header";
import "./sidebar.css";

const sidebar = document.createElement("section");
sidebar.setAttribute("id", "sidebar");

const title = document.createElement("div");
title.classList.add("title");
const titleName = document.createElement("h1");
titleName.textContent = "Projects";
title.appendChild(titleName);

const importants = document.createElement("div");
importants.classList.add("importants");

const importantContainer = document.createElement("div");
importantContainer.classList.add("container", "important");

const container = document.createElement("div");
container.classList.add("container");

const addButton = document.createElement("span");
addButton.classList.add("addButton");
addButton.addEventListener("click", () => addNewProject());
addButton.innerHTML = plusIcon;

let currentProject;

function component() {
  sidebar.appendChild(title);
  sidebar.appendChild(lineFactory());
  createImportants();
  sidebar.appendChild(lineFactory());
  updateProjects();
  sidebar.appendChild(container);
  sidebar.appendChild(addButton);
  return sidebar;
}

function projectDivFactory(name) {
  const div = document.createElement("div");
  div.classList.add("project");
  div.textContent = name;
  return div;
}

function lineFactory() {
  const div = document.createElement("span");
  div.classList.add("line");
  return div;
}

function createImportants() {
  importantList.forEach((important) => {
    const current = projectDivFactory(important.title);
    current.classList.add(important.title.replace(' ', '').toLowerCase());
    activeProjectListener(current);
    importantContainer.appendChild(current);
  });

  sidebar.appendChild(importantContainer);

  currentProject = importantContainer.querySelector('.alltasks');
  console.log(currentProject);
  currentProject.classList.add('active');
}

/**
 *
 * @param {HTMLElement} container
 */
function updateProjects() {
  projectList.forEach((project) => {
    if (
      ![...container.childNodes]
        .filter((child) => child.classList.contains("project"))
        .map((child) => child.textContent)
        .includes(project.title)
    ) {
      addProjectToContainer(project);
    }
  });
}

function addProjectToContainer(project) {
  const current = projectDivFactory(project.title);
  activeProjectListener(current);
  container.appendChild(current);
}

function activeProjectListener(div) {
  div.addEventListener("click", (e) => {
    removeActives();
    e.target.classList.add("active");
    currentProject = e.target;
    updateHeaderTitle();
  });
}

function removeActives() {
  const projectDivs = document.querySelectorAll(".project");
  projectDivs.forEach((div) => div.classList.remove("active"));
}

function addNewProject() {
  const newProject = new Project(
    prompt("Add a New Project\n Project Name:"),
    []
  );
  projectList.push(newProject);
  updateProjects();
}

export { component, currentProject };
