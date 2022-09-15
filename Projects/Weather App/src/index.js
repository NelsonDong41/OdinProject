import "./style.css";

const body = document.querySelector("body");

(function init() {
  const search = divFactory("header", "search", "");
  const searchbar = divFactory("input", "searchbar", "");
  searchbar.setAttribute("type", "input", "");
  listenForEnter(searchbar);
  search.appendChild(searchbar);

  body.append(search);
})();

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

async function weatherJSON(searchContent) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${searchContent}&APPID=dab91c7df52473f11c36741f0e9c6d26`,
    { mode: "cors" }
  );
  if (response.status == "404") {
    console.log(response.statusText);
  } else {
    const responseJSON = await response.json();
    console.log(responseJSON);
    createToggles();
    createContent(responseJSON, searchContent);
  }
}

function createToggles() {
  const lightToggle = divFactory('')
}

function createContent() {
  const old = body.getElementsByTagName("section")[0];
  old ? old.remove() : "";
  const container = document.createElement("section");
  const icon = divFactory("div", "a", responseJSON.weather[0].main);
  const location = divFactory(
    "div",
    "a",
    searchContent.charAt(0).toUpperCase() + searchContent.toLowerCase().slice(1)
  );
  const description = divFactory(
    "div",
    "a",
    responseJSON.weather[0].description
  );
  const temp = divFactory("div", "a", convertToF(responseJSON.main.temp));
  const max = divFactory("div", "a", convertToF(responseJSON.main.temp_max));
  const min = divFactory("div", "a", convertToF(responseJSON.main.temp_min));
  const feelsLike = divFactory(
    "div",
    "a",
    convertToF(responseJSON.main.feels_like)
  );

  container.append(icon, location, description, temp, max, min, feelsLike);
  body.appendChild(container);
}

function convertToF(num) {
  return parseFloat((((num - 273.15) * 9) / 5 + 32).toFixed(1));
}
