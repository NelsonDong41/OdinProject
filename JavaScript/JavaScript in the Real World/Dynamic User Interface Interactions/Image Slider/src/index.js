import stock1 from "./stock1.png";
import stock2 from "./stock2.png";
import stock3 from "./stock3.png";
import stock4 from "./stock4.png";
import stock5 from "./stock5.png";
import "./stylesheet.css";

const images = [stock1, stock2, stock3, stock4, stock5];
let count = 0;

const body = document.querySelector("body");
const imageContainer = document.createElement("div");
let prev = document.createElement("img");
let current = document.createElement("img");
let next = document.createElement("img");
imageContainer.append(prev, current, next);
updateDiv();
body.appendChild(imageContainer);

function updateDiv() {
  prev.setAttribute("src", images[count - 1] === undefined ? images[images.length - 1] : images[count - 1]);
  current.setAttribute("src", images[count]);
  next.setAttribute("src", images[count + 1] === undefined ? images[0] : images[count + 1]);
}

// setInterval(() => {
//   console.log(count);
//   count = (count += 1) % (images.length);
//   updateDiv();
// }, 3000);
