frames = ['About','Classic','TicTacWar','TakeOver'];
current = 'About';

/* flags */
let isClassic = false;
let isTicTacWar = false;
let gameActive = true;
let currentGame = -1;
frames.forEach(e => {
  if(e!=current){
  document.getElementById(e).classList.add('hidden');
  }
});

/* Variables Declaration*/
let classicGameState = ["", "", "", "", "", "", "", "", ""];
let ticTacWarState = []
for (let index = 0; index < 9; index++) {
  ticTacWarState.push(["", "", "", "", "", "", "", "", ""])
}
let BigBoardState = ["", "", "", "", "", "", "", "", ""];

/* Function Declaration*/
const About = (event) => {
  document.getElementById(current).classList.add('hidden');
  current = 'About';
  document.getElementById(current).classList.remove('hidden');
}
const Classic = (event) => {
  document.getElementById(current).classList.add('hidden');
  current = 'Classic';
  document.getElementById(current).classList.remove('hidden');
  const board = document.getElementById("board");
  const cells = [...document.querySelectorAll('.cell')].filter(element => 
    !element.classList.contains('small'));
  const resetButton = document.querySelectorAll(".Reset")[0];
  const message = document.getElementById("message");
  let currentPlayer = "X";
  gameActive = true;
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute("data-index");

    if (classicGameState[cellIndex] !== "" || !gameActive) return;
    classicGameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    checkResult();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function checkResult() {
    for (const condition of winningConditions) {
      const [a, b, c] = condition;

      if (classicGameState[a] && classicGameState[a] === classicGameState[b] && classicGameState[a] === classicGameState[c]) {
        message.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
      }
    }

    if (!classicGameState.includes("")) {
      message.textContent = "It's a draw!";
      gameActive = false;
    }
  }

  function resetGame() {
    currentPlayer = "X";
    gameActive = true;
    classicGameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove("taken");
    });
    message.textContent = "";
  }

  if(isClassic){
    resetGame();
    return;
  }
  else{
    isClassic = true;
    for (let index = 0; index < cells.length; index++) {
      if(!cells[index].matches(".small"))cells[index].addEventListener("click",handleCellClick);
      
    }
    resetButton.addEventListener("click", resetGame);
  }
}
const TicTacWar = (event) => {
  document.getElementById(current).classList.add('hidden');
  current = 'TicTacWar';
  document.getElementById(current).classList.remove('hidden');
  let currentPlayer = "X";
  gameActive = true;
  let resetButton = document.querySelectorAll(".Reset")[1];
  cells = document.querySelectorAll(".small.cell");
  message = document.querySelector(".message2");
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute("data-index");
    const game = cell.parentElement;
    const gameIndex = game.getAttribute("board-index");

    if (ticTacWarState[gameIndex][cellIndex] !== "" || !gameActive || (gameIndex!=currentGame && currentGame!=-1)) return;
    ticTacWarState[gameIndex][cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");
    currentGame = gameIndex;
    checkResult();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentGame = cellIndex;
    if(!ticTacWarState[currentGame].includes("")){
      currentGame = -1;
      for (let i = 0; i < cells.length; i++) {
        if(!cells[i].textContent){
          cells[i].classList.remove("taken");
        }
      }
      return;
    }
    for (let i = 0; i < 9; i++) {
      if(i!=currentGame){
        for (let j = 0; j < 9; j++) {
          cells[(i)*9 + j].classList.add("taken");
        }
      }
      else{
        for (let j = 0; j < 9; j++) {
          cells[i*(9)+j].classList.remove("taken");
        }
      }
      
    }
  }
  function checkResult() {
    for (const condition of winningConditions) {
      const [a, b, c] = condition;

      if (ticTacWarState[currentGame][a] && ticTacWarState[currentGame][a] === ticTacWarState[currentGame][b] && ticTacWarState[currentGame][a] === ticTacWarState[currentGame][c]) {
        message.textContent = `Player ${currentPlayer} wins a match!`;
        for(let i = 0;i<9;i++){
          cells[currentGame*9 + i].textContent = currentPlayer;
          cells[currentGame*9 + i].classList.add("taken");
          ticTacWarState[currentGame][i] = currentPlayer;
          BigBoardState[currentGame] = currentPlayer;
        
        }
      }
    }

    if (!ticTacWarState[currentGame].includes("") && !BigBoardState[currentGame]) {
      message.textContent = "A match is drawn";
      BigBoardState[currentGame]="+";
    }
    for (const condition of winningConditions) {
      const [a, b, c] = condition;

      if (BigBoardState[a] && BigBoardState[a] === BigBoardState[b] &&BigBoardState[a] === BigBoardState[c]) {
        message.textContent = `Player ${currentPlayer} wins!`;
        message.classList.add("finalMessage");
        gameActive = false;
        return;
      }
      
    }
    if (!BigBoardState.includes("")) {
      message.textContent = "It's a draw!";
      message.classList.add("finalMessage");
      for(let i = 0;i<9;i++){
        cells[currentGame*9 + i] = "";
        cells[currentGame*9 + i].textContent = "";
      }
      gameActive = false;
    }
  }
  function resetGame() {
    currentPlayer = "X";
    gameActive = true;
    ticTacWarState = []
    for (let index = 0; index < 9; index++) {
      ticTacWarState.push(["","","","","","","","",""]);
    }
    BigBoardState = ["","","","","","","","",""];
    currentGame = -1;
    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove("taken");
    });
    message.textContent = "";
  }
  if(isTicTacWar){
    resetGame();
    return;
  }
  else{
    isTicTacWar = true;
    cells.forEach(cell => cell.addEventListener("click",handleCellClick));
    resetButton.addEventListener("click", resetGame);
  }
}
const TakeOver = (event) => {
  document.getElementById(current).classList.add('hidden');
  current = 'TakeOver';
  document.getElementById(current).classList.remove('hidden');
}
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("classic").addEventListener("click",Classic);
  document.getElementById("about").addEventListener('click', About);
  document.getElementById("tictacwar").addEventListener('click',TicTacWar);
  document.getElementById("takeover").addEventListener('click',TakeOver);
});

