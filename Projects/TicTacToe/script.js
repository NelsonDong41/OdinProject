const body = document.querySelector("body");

const GameBoard = (() => {
  const array = [
    [0, 0, 0],
    [1, null, 1],
    [0, 0, 0],
  ];
  return { array };
})();

const playerFactory = (name) => {
  return { name };
};

const Game = (() => {})();

function render() {
  let boardImage = document.createElement("section");
  boardImage.className = "container";
  for (let i = 0; i < GameBoard.array.length; i++) {
    for (let j = 0; j < GameBoard.array[i].length; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.setAttribute("id", `${i}, ${j}`);

      if (!(GameBoard.array[i][j] == null)) {
        cell.textContent += `${GameBoard.array[i][j] ? "O" : "X"}`;
      }
      cell.textContent += `${j}, ${i}`;
      boardImage.appendChild(cell);
    }
  }
  body.appendChild(boardImage);
}

render();
