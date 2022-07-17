const body = document.querySelector("body");
const title = document.createElement("section");
title.className = "title";
title.textContent = "TicTacToe With JavaScript";
body.appendChild(title);
const boardContainer = document.createElement("section");
boardContainer.className = "container";
body.appendChild(boardContainer);
const winscreen = document.createElement("div");
winscreen.className = "winscreen";
const restartButton = document.createElement("button");
restartButton.className = "restart";
restartButton.textContent = "Restart?";
restartButton.addEventListener("click", () => restart());

const GameBoard = (() => {
  const array = [
    [NaN, NaN, NaN],
    [NaN, NaN, NaN],
    [NaN, NaN, NaN],
  ];
  return { array };
})();

const playerFactory = (name) => {
  return { name };
};

const player1 = playerFactory(prompt("Player X Name:", "X"));
const player2 = playerFactory(prompt("Player O Name:", "O"));
const playerTurn = document.createElement("section");
playerTurn.className = "player";
body.appendChild(playerTurn);

const Game = (() => {
  let player = 0;
  playerTurn.textContent = `Player Turn : ${player ? player1.name : player2.name}`
  const getTurn = () => turn;
  const getPlayer = () => player;
  const nextRound = () => {
    player++;
    player = player % 2;
    playerTurn.textContent = `Player Turn : ${player ? player1.name : player2.name}`
    render.renderImage();
  };
  return { getTurn, getPlayer, nextRound };
})();

const render = (() => {
  for (let i = 0; i < GameBoard.array.length; i++) {
    for (let j = 0; j < GameBoard.array[i].length; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.setAttribute("id", `${i}, ${j}`);
      boardContainer.appendChild(cell);
    }
  }

  const renderImage = () => {
    const cells = document.querySelectorAll(".cell");
    for (let cell of cells) {
      const x = cell.id.split(", ")[1];
      const y = cell.id.split(", ")[0];
      if (!isNaN(GameBoard.array[y][x])) {
        cell.textContent = GameBoard.array[y][x] ? "X" : "O";
      }
      else {
        cell.textContent = "";
      }
    }
  };
  body.appendChild(boardContainer);
  return { renderImage };
})();

function checkWin() {
  const arr = GameBoard.array;
  let win = false;
  //check vertical wins
  for (let col = 0; col < 3; col++) {
    if (arr[col][0] == arr[col][1] && arr[col][0] == arr[col][2]) {
      console.log(`vertical ${col}`);
      win = true;
    }
  }

  //check horizontal wins
  for (let row = 0; row < 3; row++) {
    if (arr[0][row] == arr[1][row] && arr[0][row] == arr[2][row]) {
      console.log(`horizontal ${row}`);
      win = true;
    }
  }

  //check diagonals
  if (arr[0][0] == arr[1][1] && arr[0][0] == arr[2][2]) {
    console.log(`(${arr[0][0]} == ${arr[1][1]}) == ${arr[2][2]}`);
    win = true;
  }
  if (arr[0][2] == arr[1][1] && arr[0][2] == arr[2][0]) {
    win = true;
  }
  return win;
}

function checkTie() {
  let arr = GameBoard.array;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (isNaN(arr[j][i])) {
        return false;
      }
    }
  }
  return true;
}

function restart() {
  
  GameBoard.array = [
    [NaN, NaN, NaN],
    [NaN, NaN, NaN],
    [NaN, NaN, NaN],
  ];
  console.log(GameBoard.array);
  render.renderImage();
  body.removeChild(restartButton);
  body.removeChild(winscreen);
}

boardContainer.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const currentCellPos = e.target.id.split(", ");
    const x = currentCellPos[1];
    const y = currentCellPos[0];
    if (isNaN(GameBoard.array[y][x]) && !checkWin() && !checkTie()) {
      GameBoard.array[y][x] = Game.getPlayer();
      Game.nextRound();
      e.target.style.removeProperty("cursor");
      e.target.style.background = "";
    }
    if (checkWin()) {
      winscreen.textContent = `WINNER: ${Game.getPlayer() ? player2.name : player1.name}`;
      body.appendChild(winscreen);
      body.appendChild(restartButton);
      body.removeChild(playerTurn);
    } else if (checkTie()) {
      winscreen.textContent = "TIE!!!!";
      body.appendChild(winscreen);
      body.appendChild(restartButton);
    }
  });

  cell.addEventListener("mouseover", (e) => {
    if (e.target.textContent === "") {
      e.target.style.cursor = "pointer";
      e.target.style.background = "red";
    }
  });

  cell.addEventListener("mouseout", e => {
    e.target.style.background = "";
  })
});
