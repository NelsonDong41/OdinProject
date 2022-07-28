import { projectList, moon as moonIcon, sun as sunIcon} from "./data";
import { currentProject } from "./sidebar";
import { format } from "date-fns";
import "./header.css";

const header = document.createElement("section");
header.setAttribute("id", "header");

const selectedProject = document.createElement("h1");
selectedProject.className = "title";

const date = document.createElement("p");
date.className = "time";

let now = format(new Date(), "MMMM do, y");
date.textContent = now;

function component() {
  toggleTheme();
  header.appendChild(selectedProject);
  updateTitle();
  header.appendChild(date);
  createToggleButton();
  return header;
}


setInterval(() => {
  now = format(new Date(), "MMMM do, y");
  date.textContent = now;
}, 60000);

function updateTitle() {
  selectedProject.textContent = currentProject.textContent;
}

function createToggleButton() {
  const button = document.createElement('span');
  button.innerHTML = moonIcon;
  button.classList.add('darkOrLight');
  button.addEventListener('click', () => {
    toggleTheme();
    flipIcon(button);
  });
  header.appendChild(button);
};

function toggleTheme() {
  const root = document.documentElement;
  const newTheme = root.className === "dark" ? "light" : "dark";
  root.className = newTheme;
}

function flipIcon(button) {
  const root = document.documentElement;
  root.className === "dark" ? button.innerHTML = moonIcon : button.innerHTML = sunIcon;;
}

export { component, updateTitle };
