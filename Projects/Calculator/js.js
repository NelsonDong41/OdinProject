const body = document.querySelector("body");

const container = document.createElement("div");
container.className = "container";

const title = document.createElement("span");
title.className = "title";
title.textContent = "Calculator With JavaScript";

const calc = document.createElement("div");
calc.className = "calculator";

const input = document.createElement("section");
input.className = "input";
const inputText = document.createElement("h1");
inputText.className = "inputText";
input.appendChild(inputText);
calc.appendChild(input);

const clear = document.createElement("section");
clear.className = "clear";

const clearButton = document.createElement("button");
clearButton.classList = "clear";

clear.appendChild(clearButton);
calc.appendChild(clear);

const nums = document.createElement("section");
nums.classList = "nums";
for (let i = 1; i <= 9; i++) {
  const key = document.createElement("button");
  let row = 3 - Math.floor((i - 1) / 3);
  key.textContent = i;
  key.className = i;
  key.style.gridRow = row;
  nums.appendChild(key);
}

calc.appendChild(nums);

const operatorsRight = document.createElement("section");
operatorsRight.classList.add("operators", "right");

const addButton = document.createElement("button");
addButton.textContent = "+";
addButton.className = "+ operation";
operatorsRight.appendChild(addButton);

const subButton = document.createElement("button");
subButton.textContent = "-";
subButton.className = "- operation";
operatorsRight.appendChild(subButton);

const multiButton = document.createElement("button");
multiButton.textContent = "x";
multiButton.className = "x operation";
operatorsRight.appendChild(multiButton);

const submitButton = document.createElement("button");
submitButton.textContent = "=";
submitButton.className = "=";
operatorsRight.appendChild(submitButton);

calc.appendChild(operatorsRight);

const operatorsBottom = document.createElement("section");
operatorsBottom.classList.add("operators", "bottom");

const zero = document.createElement("button");
zero.textContent = "0";
zero.className = "0";
operatorsBottom.appendChild(zero);

const pointButton = document.createElement("button");
pointButton.textContent = ".";
pointButton.className = ".";
operatorsBottom.appendChild(pointButton);

const divideButton = document.createElement("button");
divideButton.textContent = "/";
divideButton.className = "/ operation";
operatorsBottom.appendChild(divideButton);

calc.appendChild(operatorsBottom);

container.appendChild(title);
container.append(calc);
body.appendChild(container);

const buttons = document.querySelectorAll("button");

buttons.forEach((button) =>
  button.addEventListener("click", (e) => handleButtonEvent(e.target))
);
window.addEventListener("keypress", (e) => {
  let buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    if (button.getAttribute("class").includes(e.key)) {
      handleButtonEvent(button);
    }
  });
  
});

function operate(operator, a, b) {
  if (operator == "x") {
    return multiply(a, b);
  } else if (operator == "/") {
    return divide(a, b);
  } else if (operator == "+") {
    return add(a, b);
  } else if (operator == "-") {
    return subtract(a, b);
  }
}

const add = (a, b) => parseFloat(a) + parseFloat(b);

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => {
  if (b == 0) {
    return "Don't divide by zero";
  }
  a / b;
};

function handleButtonEvent(e) {
  if (inputText.textContent.match(/[^x\/+-.0-9]/gm)) {
    inputText.textContent = "";
  }

  const values = inputText.textContent.split(/[x\/+-]/gm);
  const operation = inputText.textContent.match(/[x\/+-]/gm);
  console.log(e);
  console.log(values);
  console.log(operation);
  if (e.className === "clear") {
    inputText.textContent = "";
  } else if (e.className === "=") {
    if (operation == null || values[1] == "") {
      alert("Incomplete expression");
    } else {
      inputText.textContent = operate(operation, values[0], values[1]);
    }
  } else if (e.classList.contains("operation")) {
    if (inputText.textContent.match(/[x\/+-]/gm) !== null) {
      //if the input already has an operation
      inputText.textContent = operate(operation, ...values) + e.className[0];
    } else {
      inputText.textContent += e.classList[0];
    }
  } else if (e.className !== "=" && e.className !== "clear") {
    if (e.className == "." && inputText.textContent.match(/[.]/gm)) {
      alert("Can't have multiple decimal points");
    } else {
      inputText.textContent += e.className;
    }
  }
}
