import { plus, projectList, importantList } from "./data";
import { Item as Task } from "./classes";
import "./content.css";
import { isPast, toDate } from "date-fns";

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
  createLabels(projectName);
  const container = document.createElement("div");
  container.classList.add("taskContainer");
  const currentProject = importantList
    .concat(projectList)
    .find((element) => element.title == projectName);

  switch (projectName) {
    case "Priority":
      currentProject.listOfItems.forEach((task) => {
        const current = taskDivFactory(
          task.complete,
          task.title,
          task.description,
          task.priority,
          task.getDateString()
        );
        const priorities = container.querySelectorAll(".priority");
        const containsPriority = [...priorities].find(
          (priority) =>
            priority.getAttribute("id") ==
            current.querySelector(".priority").textContent
        );

        if (!containsPriority) {
          const priorityIcon = document.createElement("span");
          priorityIcon.textContent =
            current.querySelector(".priority").textContent;
          const priority = document.createElement("div");
          priority.classList.add("priority", "data");
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
      break;
    case "Time Based":
      const past = document.createElement("div");
      past.classList.add("past", "data");
      const today = document.createElement("div");
      today.classList.add("today", "data");
      const thisWeek = document.createElement("div");
      thisWeek.classList.add("this", "data");
      const nextWeek = document.createElement("div");
      nextWeek.classList.add("next", "data");
      const future = document.createElement("div");
      future.classList.add("future", "data");

      currentProject.listOfItems.forEach((task) => {
        let current = taskDivFactory(
          task.complete,
          task.title,
          task.description,
          task.priority,
          task.getDateString()
        );
        const now = new Date();
        if (isPast(toDate(task.dueDate))) {
          if (!container.querySelector(".past")) {
            const pastIcon = document.createElement("span");
            pastIcon.textContent = "Past Due";
            container.appendChild(pastIcon);
          }
          current = taskDivFactory(
            task.complete,
            task.title,
            task.description,
            task.priority,
            task.getTimeLeft()
          );
          past.appendChild(current);
          container.appendChild(past);
        } else if (toDate(task.dueDate).toDateString() === now.toDateString()) {
          if (!container.querySelector(".today")) {
            const todayIcon = document.createElement("span");
            todayIcon.textContent = "Today";
            container.appendChild(todayIcon);
          }
          current = taskDivFactory(
            task.complete,
            task.title,
            task.description,
            task.priority,
            task.getTimeDue()
          );
          today.appendChild(current);
          container.appendChild(today);
        } else if (
          toDate(task.dueDate) <=
          Date.now() + 1000 * 60 * 60 * 24 * 7
        ) {
          if (!container.querySelector(".this")) {
            const thisWeekIcon = document.createElement("span");
            thisWeekIcon.textContent = "This Week";
            container.appendChild(thisWeekIcon);
          }
          thisWeek.appendChild(current);
          container.appendChild(thisWeek);
        } else if (
          toDate(task.dueDate) <=
          Date.now() + 1000 * 60 * 60 * 24 * 14
        ) {
          if (!container.querySelector(".next")) {
            const nextWeekIcon = document.createElement("span");

            nextWeekIcon.textContent = "Next Week";
            container.appendChild(nextWeekIcon);
          }
          nextWeek.appendChild(current);
          container.appendChild(nextWeek);
        } else {
          if (!container.querySelector(".future")) {
            const futureIcon = document.createElement("span");
            futureIcon.textContent = "Future";
            container.appendChild(futureIcon);
          }
          future.appendChild(current);
          container.appendChild(future);
        }
      });
      content.appendChild(container);
      break;
    default:
      const all = document.createElement("div");
      all.classList.add("all", "data");
      currentProject.listOfItems.forEach((task) => {
        const current = taskDivFactory(
          task.complete,
          task.title,
          task.description,
          task.priority,
          task.getDateString()
        );
        all.appendChild(current);
      });
      if(!importantList[0].listOfItems.length == 0){
        content.appendChild(container);
      }
      container.appendChild(all);
  }
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

function createLabels(projectName) {
  const current = document.createElement("div");
  current.classList.add("labels");
  const placeHolder = document.createElement("div");
  const complete = document.createElement("div");
  complete.textContent = "Done";
  const title = document.createElement("div");
  title.textContent = "Title";
  const description = document.createElement("div");
  description.textContent = "Description";
  const priority = document.createElement("div");
  priority.textContent = "Priority";
  const dueDate = document.createElement("div");
  dueDate.textContent = "due";

  if (projectName !== "Priority" && projectName !== "Time Based") {
    current.append(complete, title, description, priority, dueDate);
    current.style.gridTemplateColumns = "1fr 1fr 10fr 1fr 5fr";
  } else {
    current.append(
      placeHolder,
      complete,
      title,
      description,
      priority,
      dueDate
    );
    current.style.gridTemplateColumns = "1fr 0.5fr 0.5fr 5fr 0.5fr 2.5fr";
  }
  content.appendChild(current);
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
