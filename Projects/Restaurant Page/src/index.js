import "./indexstyle.css";
import navbar from "./navbar";
import home from "./home";
import menu from "./menu";
import contact from "./contact";

document.querySelector("html").style.height = "100%";
document.querySelector("head").style.height = "100%";
document.querySelector("body").style.height = "100%";
const body = document.querySelector("body");

const container = document.createElement("div");
container.classList.add("container");
container.setAttribute("id", "home");
container.appendChild(navbar());
body.appendChild(container);

container.appendChild(home());

const tabs = [...container.childNodes[0].childNodes].filter((node) =>
  node.classList.contains("tab")
);
listenForTab(...tabs);

function listenForTab(...tabs) {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      clearCurrent(...tabs);
      tab.classList.add("current");
      container.childNodes.forEach((child) => {
        if (!child.classList.contains("navbar")) {
          container.removeChild(child);
        }
      });
      console.log(tab.textContent);
      switch (tab.textContent) {
        case "Home":
          container.appendChild(home());
          container.setAttribute("id", "home");
          document.querySelector("html").style.height = "100%";
          document.querySelector("head").style.height = "100%";
          document.querySelector("body").style.height = "100%";
          break;
        case "Menu":
          container.appendChild(menu());
          container.setAttribute("id", "menu");
          document.querySelector("html").style.height = "auto";
          document.querySelector("head").style.height = "auto";
          document.querySelector("body").style.height = "auto";
          break;
        case "Contact":
          container.appendChild(contact());
          container.setAttribute("id", "contact");
          break;
      }
    });
  });
}

function clearCurrent(...tabs) {
  tabs.forEach((tab) => {
    tab.classList.remove("current");
  });
}
