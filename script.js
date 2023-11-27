"strict mode";

let random = Math.trunc(Math.random() * 6) + 1;
let activePlayer = 0;
const score = [0, 0];
let currentScore = 0;
let state = 1;

// elements
const newGameEl = document.querySelector(".newgame");
const rollDiceEl = document.querySelector(".rolldice");
const holdEl = document.querySelector(".hold");
const diceEl = document.querySelector(".dice");

const player0 = document.querySelector(".current-0");
const player1 = document.querySelector(".current-1");
const player1El = document.querySelector(".player1");
const player2El = document.querySelector(".player2");

// Switch function
const switchPlayer = function () {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
};
//winner function
const winner = function () {
  document
    .querySelector(`.win-${activePlayer}`)
    .classList.remove("active-player");
  document.querySelector(`.win-${activePlayer}`).classList.add("winner");
};

// Roll btn
rollDiceEl.addEventListener("click", function () {
  if (state) {
    //basic
    random = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `./dice-${random}.png`;
    diceEl.classList.remove("hidden");

    currentScore = currentScore + random;
    document.querySelector(`.current-${activePlayer}`).textContent =
      currentScore;

    if (random === 1) {
      player1El.classList.toggle("active-player");
      player2El.classList.toggle("active-player");
      currentScore = 0;
      document.querySelector(`.current-${activePlayer}`).textContent = 0;
      switchPlayer();
    }
  }
});

// Hold btn
holdEl.addEventListener("click", function () {
  if (state) {
    score[activePlayer] = score[activePlayer] + currentScore;
    document.querySelector(`.player${activePlayer}-score`).textContent =
      score[activePlayer];

    if (score[activePlayer] > 50) {
      winner();
      state = 0;
      document.querySelector(".newgame").style.backgroundColor = "#2f2f2f";
      document.querySelector(".newgame").style.color = "#a83455";
      document.querySelector(".current-0").textContent = 0;
      document.querySelector(".current-1").textContent = 0;
      return;
    }
    currentScore = 0;
    player1El.classList.toggle("active-player");
    player2El.classList.toggle("active-player");

    document.querySelector(`.current-${activePlayer}`).textContent = 0;
    switchPlayer();
  }
});

newGameEl.addEventListener("click", function () {
  document.querySelector(".newgame").style.backgroundColor = "white";
  document.querySelector(".newgame").style.color = "black";

  player1El.classList.remove("active-player");
  player2El.classList.remove("active-player");
  player1El.classList.remove("winner");
  player2El.classList.remove("winner");
  player1El.classList.add("active-player");
  diceEl.classList.add("hidden");
  currentScore = 0;
  score[0] = 0;
  score[1] = 0;
  state = 1;

  document.querySelector(".player0-score").textContent = 0;
  document.querySelector(".player1-score").textContent = 0;
  document.querySelector(".current-0").textContent = 0;
  document.querySelector(".current-1").textContent = 0;
});
