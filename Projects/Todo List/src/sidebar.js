import { projectList, defaultProject } from "./data";
/**
 *
 * @param {HTMLElement} sidebar
 */

function component() {
  const sidebar = document.createElement("section");
  sidebar.setAttribute("id", "sidebar");
  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = "Projects";
  sidebar.appendChild(title);

  const container = document.createElement("div");
  container.classList.add("container");
  addAllProjectsToContainer(container);

  const addButton = document.createElement("i");
  addButton.addEventListener("click", () => addNewProject());
  container.appendChild(addButton);
  sidebar.appendChild(container);
  return sidebar;
}

/**
 *
 * @param {HTMLElement} container
 */
function addAllProjectsToContainer(container) {
  projectList.forEach((project) => {
    addProjectToSidebar(project, container);
  });
}

function addProjectToSidebar(project, container) {
  const current = document.createElement("div");
  current.classList.add("project");
  current.textContent += project.title;
  current.addEventListener("click", (e) => {
    console.log(e.target);
  });
  container.appendChild(current);
}

function addNewProject() {
  console.log("Adding new Project");
}

export { component };
