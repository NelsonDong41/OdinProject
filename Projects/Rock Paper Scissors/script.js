console.log("Hello World");

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
  console.log("Computer chose : " + choice);
  return choice;
}

/**
 *
 * @param {string} playerSelection
 * @param {string} computerPlay
 */

function playRound(playerSelection, computerPlay) {
  let response = "";
  response += "You chose : " + playerSelection.toLowerCase() + "\n";
  if (
    (playerSelection.toLowerCase().match("rock") &&
      computerPlay.match("scissor")) ||
    (playerSelection.toLowerCase().match("paper") &&
      computerPlay.match("rock")) ||
    (playerSelection.toLowerCase().match("scissor") &&
      computerPlay.match("paper"))
  ) {
    response += "You Win";
  } else if (playerSelection.toLowerCase().match(computerPlay)) {
    response += "Tie";
  } else {
    response += "You lose";
  }
  return response;
}

function game() {
  let count = 0;

  for (let i = 0; i < 5; i++) {
    const playerSelection = prompt("Choose one of { rock, paper, scissor }");
    const computerSelection = computerPlay();
    const roundResult = playRound(playerSelection, computerSelection);
    if (roundResult.match("You Win")) {
      count++;
    }
    console.log(roundResult);
  }

  console.log("Number of Wins: " + count);
}

game();
