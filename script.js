`use strict`;
let score0El = document.getElementById("score--0");
let score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// POCETNE POSTAVKE IGRE
diceEl.classList.add("hidden");
score0El.textContent = 0;
score1El.textContent = 0;

let currentScore;
let activePlayer;
let playing;
let scores;

//NEW GAME BUTTON
const newGame = function () {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];
  diceEl.classList.add("hidden");
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

newGame();

//SWITCHING PLAYER FUNCTION
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//ROLL DICE BUTTON
btnRoll.addEventListener("click", function () {
  if (playing) {
    diceEl.classList.remove("hidden");
    const random = Math.trunc(Math.random() * 6 + 1);
    diceEl.src = `dice-${random}.png`;

    if (random !== 1) {
      currentScore += random;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//HOLD BUTTON
btnHold.addEventListener("click", function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 20) {
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
  }
  switchPlayer();
});

btnNew.addEventListener("click", newGame);
