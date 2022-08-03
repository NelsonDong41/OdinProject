import { plus, projectList, importantList } from "./data";
import { Item as Task } from "./classes";
import "./content.css";

const content = document.createElement("section");
content.setAttribute("id", "content");

function component() {
  displayTasks("All Tasks");
  return content;
}

function clearContent() {
  content.innerHTML = "";
}

function displayTasks(projectName) {
  clearContent();
  createAdd();
  const container = document.createElement("div");
  container.classList.add("taskContainer");
  const currentProject = importantList
    .concat(projectList)
    .find((element) => element.title == projectName);
  currentProject.listOfItems.forEach((task) => {
    const current = taskDivFactory(
      task.complete,
      task.title,
      task.description,
      task.priority,
      task.getTimeLeft()
    );
    const priorities = container.querySelectorAll(".priority");
    const containsPriority = [...priorities].find(
      (priority) =>
        priority.getAttribute("id") ==
        current.querySelector(".priority").textContent
    );

    if (!containsPriority) {
      const priorityIcon = document.createElement("span");
      priorityIcon.textContent = current.querySelector(".priority").textContent;
      const priority = document.createElement("div");
      priority.classList.add("priority");
      priority.setAttribute(
        "id",
        current.querySelector(".priority").textContent
      );
      priority.appendChild(current);
      container.appendChild(priorityIcon);
      container.appendChild(priority);
    } else {
      containsPriority.appendChild(current);
    }
  });
  content.appendChild(container);
}

const taskDivFactory = function (
  completeData,
  titleData,
  descriptionData,
  priorityData,
  dueDateData
) {
  const current = document.createElement("div");
  current.classList.add("task");
  const complete = document.createElement("input");
  complete.classList.add("complete");
  complete.setAttribute("type", "checkbox");
  complete.addEventListener("click", () => {
    current.classList.toggle("checked");
  });

  completeData !== undefined
    ? (complete.textContent = "Yes")
    : (complete.textContent = "No");
  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = titleData;
  const description = document.createElement("div");
  description.classList.add("description");
  description.textContent = descriptionData;
  const priority = document.createElement("div");
  priority.classList.add("priority");
  priority.textContent = priorityData;
  const dueDate = document.createElement("div");
  dueDate.classList.add("dueDate");
  dueDate.textContent = dueDateData;

  current.append(complete, title, description, priority, dueDate);
  return current;
};

function taskInDOM(container, taskName) {
  const taskNames = [...container.querySelectorAll(".task")].map(
    (task) => task.textContent.split(" ")[0]
  );
  return taskNames.includes(taskName);
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
  add.addEventListener("click", () => addTaskListeners());
  content.appendChild(add);
}

function addTaskListeners() {
  clearContent();
  createAdd();
  addTaskToProjects(document.querySelector(".active").textContent);
  sortPriority();
  sortTime();
  displayTasks(document.querySelector(".active").textContent);
}

function addTaskToProjects(projectName) {
  const task = new Task(
    prompt("Task Name"),
    prompt("Task Description"),
    new Date(
      prompt("Year due"),
      prompt("Month Due") - 1,
      prompt("Day Due"),
      prompt("Hour Due"),
      prompt("Minute Due")
    ),
    prompt("Priority"),
    false
  );
  importantList.forEach((important) => important.addToList(task));
  const nonImportant = projectList.find(
    (project) => project.title == projectName
  );
  nonImportant ? nonImportant.addToList(task) : "";
}

function sortPriority() {
  importantList[1].listOfItems.sort((a, b) => b.priority - a.priority);
}

function sortTime() {
  importantList[2].listOfItems.sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );
}
export { component, displayTasks };
