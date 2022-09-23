import "./style.css";
import { moon, sun, C, F } from "./icons.js";

const body = document.querySelector("body");

(function init() {
  const search = divFactory("header", "search", "");
  const searchbar = divFactory("input", "searchbar", "");
  searchbar.setAttribute("type", "input");
  searchbar.setAttribute("name", "searchbar");
  listenForEnter(searchbar);
  const error = divFactory("label", "searcherror", "");
  error.setAttribute("name", "searcherror");
  search.append(searchbar, error);
  body.append(search);
  createToggles();
  document.documentElement.className = "dark";
})();

async function weatherJSON(searchContent) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${searchContent}&APPID=dab91c7df52473f11c36741f0e9c6d26`,
    { mode: "cors" }
  );
  if (response.status == "404") {
    document.querySelector(".searcherror").textContent = "Invalid Location";
  } else {
    document.querySelector(".searcherror").textContent = "";
    const responseJSON = await response.json();
    console.log(responseJSON);
    createContent(responseJSON);
  }
}

function divFactory(tag, className, content) {
  const div = document.createElement(tag);
  div.classList.add(className);
  div.textContent = content;
  return div;
}

function listenForEnter(searchbar) {
  let searchContent;
  searchbar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchContent = e.target.value;
      e.target.value = "";
      console.log(searchContent);
      weatherJSON(searchContent);
    }
  });
}

function createToggles() {
  const container = divFactory("div", "container", "");
  const lightToggle = divFactory("div", "light", "");
  const lightIcon = divFactory("i", "icon", "");
  lightIcon.innerHTML = moon;
  toggler(lightIcon, moon, sun);
  lightToggle.addEventListener('click', () => {
    const root = document.documentElement;
    root.className = root.className === "dark" ? "light" : "dark";
  });
  lightToggle.appendChild(lightIcon);

  const unitToggle = divFactory("div", "units", "");
  const unitIcon = divFactory("i", "icon", "");
  unitIcon.innerHTML = F;
  toggler(unitIcon, F, C);
  unitIcon.addEventListener('click', () => {
    const temp = document.querySelector('.temp');
    const max = document.querySelector('.max');
    const min = document.querySelector('.min');
    const feelsLike = document.querySelector('.feelsLike');
    if(unitIcon.classList.contains('on')) {
      temp.textContent = convertToC(temp.textContent);
      max.textContent = convertToC(max.textContent);
      min.textContent = convertToC(min.textContent);
      feelsLike.textContent = convertToC(feelsLike.textContent);
    } else {
      temp.textContent = convertToF(temp.textContent);
      max.textContent = convertToF(max.textContent);
      min.textContent = convertToF(min.textContent);
      feelsLike.textContent = convertToF(feelsLike.textContent);
    }
  });
  unitToggle.appendChild(unitIcon);

  container.append(lightToggle, unitToggle);
  body.appendChild(container);
}

function createContent(responseJSON) {
  const old = body.getElementsByTagName("section")[0];
  old ? old.remove() : "";
  const container = document.createElement("section");
  const icon = document.createElement('img');
  icon.setAttribute('src', `http://openweathermap.org/img/wn/${responseJSON.weather[0].icon}@2x.png`);
  const location = divFactory(
    "div",
    "a",
    responseJSON.name);
  const description = divFactory(
    "div",
    "a",
    responseJSON.weather[0].description
  );
  const tempContainer = divFactory("div", "dataContainer", "");
  const temp = divFactory("div", "temp", convertFromK(responseJSON.main.temp));
  const tempToolTip = divFactory('span', 'b', 'Current Temperature');
  tempContainer.append(temp, tempToolTip);
  const maxContainer = divFactory("div", "dataContainer", "");
  const max = divFactory("div", "max", convertFromK(responseJSON.main.temp_max));
  const maxToolTip = divFactory('span', 'b', 'Max Temperature');
  maxContainer.append(max, maxToolTip);
  const minContainer = divFactory("div", "dataContainer", "");
  const min = divFactory("div", "min", convertFromK(responseJSON.main.temp_min));
  const minToolTip = divFactory('span', 'b', 'Min Temperature');
  minContainer.append(min, minToolTip);
  const feelsLikeContainer = divFactory("div", "dataContainer", "");
  const feelsLike = divFactory(
    "div",
    "feelsLike",
    convertFromK(responseJSON.main.feels_like)
  );
  const feelsLikeToolTip = divFactory('span', 'b', 'Feels Like Temperature');
  feelsLikeContainer.append(feelsLike, feelsLikeToolTip);

  container.append(icon, location, description, tempContainer, maxContainer, minContainer, feelsLikeContainer);
  container.style.transform = "scale(1)";
  body.appendChild(container);
}

function convertFromK(num) {
  return parseFloat((((num - 273.15) * 9) / 5 + 32).toFixed(1));
}

function convertToF(num) {
  return parseFloat((num * 9) / 5 + 32).toFixed(1);
}

function convertToC(num) {
  return parseFloat((5 * (num - 32)) / 9).toFixed(1);
}

function toggler(div, off, on) {
  div.addEventListener("click", () => {
    div.classList.contains("on") ? (div.innerHTML = off) : (div.innerHTML = on);
    div.classList.toggle("on");
  });
}

