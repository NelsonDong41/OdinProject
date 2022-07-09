let body = document.querySelector("body");
let container;
let button = document.createElement("button");
button.textContent = "Enter Number of Squares Per Side";
body.appendChild(button);

let size;
button.addEventListener("click", function (e) {
  if (body.contains(container)) {
    body.removeChild(container);
  }

  container = document.createElement("section");
  console.log("click");
  size = Math.min(100, prompt("How many do squares to you want?"));
  console.log(size);
  container.style.cssText = `
  background-color: grey;
  width: 500px;
  height: 500px;
  border: 1px solid white;
  display: grid; 
  gap: 2px;
  grid-template-columns: repeat(${size}, 1fr);
  grid-template-rows: repeat(${size}, 1fr);
  box-shadow: 5px 5px 5px blue`;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let current = document.createElement("div");
      let color = 0.5;
      current.classList.add("cell");
      current.style.cssText = `background-color: black;`;

      current.addEventListener("mouseenter", function (e) {
        current.style.cssText = `background-color: rgba(255, 255, 255, ${(color += 0.1)});`;
      });
      container.appendChild(current);
    }
  }

  body.appendChild(container);
});
