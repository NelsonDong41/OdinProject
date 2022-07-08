console.log("Hello World");
const container = document.querySelector("body");
const rock = document.createElement("button");
rock.setAttribute("id", "rock");
rock.textContent = "Rock";
rock.style.borderRadius = "5px";
const paper = document.createElement("button");
paper.setAttribute("id", "paper");
paper.textContent = "Paper";

const scissor = document.createElement("button");
scissor.setAttribute("id", "scissor");
scissor.textContent = "Scissor";

container.appendChild(rock);
container.appendChild(paper);
container.appendChild(scissor);

let count = 0;
const countdiv = document.createElement("div");
countdiv.textContent = count;

const playerdiv = document.createElement("div");
const computerdiv = document.createElement("div");
const responsediv = document.createElement("div");

container.appendChild(playerdiv);
container.appendChild(computerdiv);
container.appendChild(responsediv);
container.appendChild(countdiv);

const options = document.querySelectorAll("button");
options.forEach((option) => {
  option.style.cssText = "background :green; border-radius : 5px";
  option.addEventListener("click", function (e) {
    playRound(e.target.id, computerPlay());
  });
});

function computerPlay() {
  let value = Math.floor(Math.random() * 3);
  let choice;
  if (value === 0) {
    choice = "rock";
  } else if (value === 1) {
    choice = "paper";
  } else if (value === 2) {
    choice = "scissor";
  }
  return choice;
}

/**
 *
 * @param {string} playerSelection
 * @param {string} computerPlay
 */

function playRound(playerSelection, computerPlay) {
  let playerChoice = `You chose : ${playerSelection}`;
  let computerChoice = `Computer chose : ${computerPlay}`;
  let response = "";
  if (
    (playerSelection.toLowerCase().match("rock") &&
      computerPlay.match("scissor")) ||
    (playerSelection.toLowerCase().match("paper") &&
      computerPlay.match("rock")) ||
    (playerSelection.toLowerCase().match("scissor") &&
      computerPlay.match("paper"))
  ) {
    response += "You Win";
    count++;
  } else if (playerSelection.toLowerCase().match(computerPlay)) {
    response += "Tie";
  } else {
    response += "You lose";
  }
  playerdiv.textContent = playerChoice;
  computerdiv.textContent = computerChoice;
  responsediv.textContent = response;
  countdiv.textContent = count;
}
