'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const cuurrent0El = document.getElementById('current--0');
const cuurrent1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores, currentScore, activePlayer, playing;

window.onload = function () {
  const rulesDiv = document.querySelector('.rules-container');
  const closeButton = document.querySelector('.close-button');
  const overlay = document.querySelector('.overlay');

  // Show rules and blur background on load
  rulesDiv.style.display = 'flex';
  overlay.style.display = 'block';

  // Close the rules when clicking the close button
  closeButton.addEventListener('click', () => {
    rulesDiv.style.display = 'none';
    overlay.style.display = 'none';
  });

  // Close the rules when clicking outside the rules box
  overlay.addEventListener('click', event => {
    if (!rulesDiv.contains(event.target)) {
      rulesDiv.style.display = 'none';
      overlay.style.display = 'none';
    }
  });
};

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  cuurrent0El.textContent = 0;
  cuurrent1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing === true) {
    // 1. generating a random dice roll

    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. display dice

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check for rolled 1

    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //  Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
