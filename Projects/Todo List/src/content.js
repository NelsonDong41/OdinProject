import { currentProject } from "./sidebar";
import { plus, projectList, importantList } from "./data";
import { Item as Task } from "./classes";

const content = document.createElement("section");
content.setAttribute("id", "content");

function component() {
  determineContent();
  return content;
}

function determineContent() {
  init["init" + currentProject.classList[1]]();
}

function createAdd() {
  const add = document.createElement("div");
  add.classList.add("add");
  const addIcon = document.createElement("span");
  addIcon.innerHTML = plus;
  add.appendChild(addIcon);
  const addText = document.createElement("p");
  addText.textContent = "Add A Task...";
  add.appendChild(addText);
  add.addEventListener('click', () => {
    addTaskToProjects();
    displayTasks();
  });
  return add;
}

function addTaskToProjects() {
    const task = new Task(
        prompt("Task Name"),
        prompt("Task Description"),
        new Date(prompt('Month Due'), prompt('Day Due'), prompt('Year due'), prompt('Hour Due'), prompt('Minute Due')),
        prompt('Priority'),
        false);
    importantList.forEach(important => important.addToList(task));
}

const init = {
  initalltasks: () => initAllTasks(),
  initpriority: () => initPriority(),
  inittimebased: () => initTimeBased(),
  initactive: () => initOther(),
};

function initAllTasks() {
  content.appendChild(createAdd());
  displayTasks();
}

function displayTasks() {
    const container = document.createElement("div");
    importantList[0].listOfItems.forEach(task => {
        container.textContent += task.title;
    })
    content.appendChild(container);
}

export { component, determineContent };
