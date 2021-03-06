import "./color.css";
import "./index.css";
import { component as initSidebar } from "./sidebar";
import { component as initHeader } from "./header";
import { component as initContent } from "./content";
const body = document.querySelector("body");

(function init() {
  const sidebar = initSidebar();
  const header = initHeader();
  const content = initContent();

  body.appendChild(sidebar);
  body.appendChild(header);
  body.appendChild(content);
})();

/**
 *
 * @param {Item} item
 * @param {Project} project
 */
function addItemToProject(item, project) {
  project.addToList(item);
}
