import { Project } from "./classes";
import { projectList, defaultProject, plus as plusIcon } from "./data";

const sidebar = document.createElement("section");
sidebar.setAttribute("id", "sidebar");

const title = document.createElement("div");
title.classList.add("title");
title.textContent = "Projects";

const importants = document.createElement("div");
importants.classList.add("importants");

const container = document.createElement("div");
container.classList.add("container");

const addButton = document.createElement("span");
addButton.classList.add("addButton");
addButton.addEventListener("click", () => addNewProject());
addButton.innerHTML = plusIcon;

function component() {
  sidebar.appendChild(title);

  createImportants();
  updateProjects();

  sidebar.appendChild(container);
  sidebar.appendChild(addButton);
  return sidebar;
}

function createImportants() {
  const myDay = document.createElement("div");
  const priority = document.createElement("div");
  const time = document.createElement("div");
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
  const current = document.createElement("div");
  current.classList.add("project");
  current.textContent += project.title;
  current.addEventListener("click", (e) => {
    removeActives();
    e.target.classList.add("active");
  });

  container.appendChild(current);
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

export { component };
