const startGame = document.querySelector(".start-game-btn");
const entrySection = document.querySelector(".entry-section");
const modeSection = document.querySelector(".mode-section");
const singlePlayer = document.querySelector(".single-player");
const doublePlayer = document.querySelector(".double-player");
const nameInputs = document.querySelector(".name-inputs");
const gameSection = document.querySelector(".game-section");
const closeBtn = document.querySelector(".close-btn");

let player1Name = "";
let player2Name = "";
let player1Mark = "";
let player2Mark = "";

closeBtn.addEventListener("click", () => {
  popup_container.style.display = "none";
});

startGame.addEventListener("click", () => {
  entrySection.style.display = "none";
  modeSection.style.display = "flex";
});

singlePlayer.addEventListener("click", () => {
  nameInputs.innerHTML = `
      <input type="text" placeholder="Enter Player Name" />
      <button class="start-match-btn">Start Match</button
      `;
  const startMatch = document.querySelector(".start-match-btn");
  startMatch.addEventListener("click", () => {
    const nameInput = document.querySelector(".name-inputs input");
    player1Name = nameInput.value.trim() || "Player";
    player2Name = "Computer";

    player1Mark = player1Name.charAt(0).toUpperCase();
    player2Mark = "C";

    modeSection.style.display = "none";
    gameSection.style.display = "flex";
  });
});

doublePlayer.addEventListener("click", () => {
  nameInputs.innerHTML = `
      <input type="text" placeholder="Enter Player1 Name" />
      <input type="text" placeholder="Enter Player2 Name" />
      <button class="start-match-btn">Start Match</button>
      `;

  const startMatch = document.querySelector(".start-match-btn");
  startMatch.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".name-inputs input");
    player1Name = inputs[0].value.trim() || "Player 1";
    player2Name = inputs[1].value.trim() || "Player 2";

    player1Mark = player1Name.charAt(0).toUpperCase();
    player2Mark = player2Name.charAt(0).toUpperCase();

    modeSection.style.display = "none";
    gameSection.style.display = "flex";
  });
});

const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
let newGame = document.querySelector(".new-game-btn");
let playAgain = document.querySelector(".play-again-btn");
let popup_container = document.querySelector(".popup-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  popup_container.style.display = "none";
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    box.innerText = turnO ? player1Mark : player2Mark;
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      console.log("draw");
      gameDraw();
      return;
    }
    turnO = !turnO;
  });
});

const gameDraw = () => {
  msg.innerHTML = `
    <div class = "winner-msg">
      <p class = "gold-text">Game Draw!</p>
    </div>
    `;
  popup_container.style.display = "flex";
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winner) => {
  const winnerName = winner === player1Mark ? player1Name : player2Name;
  const displayName = winnerName.charAt(0).toUpperCase() + winnerName.slice(1);
  msg.innerHTML = `
  <div class = "winner-msg">
      <p class = "gold-text">Congratulations,</p>
      <p class = "winner-name">${displayName} is the Winner!</p>
    </div>
    `;
  console.log("Winner is " + winner);
  popup_container.style.display = "flex";
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

newGame.addEventListener("click", () => {
  popup_container.style.display = "none";
  modeSection.style.display = "flex";
  gameSection.style.display = "none";
  nameInputs.innerHTML = "";
  enableBoxes();

  player1Name = "";
  player2Name = "";
  player1Mark = "";
  player2Mark = "";

  turnO = true;
  count = 0;
});

playAgain.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
