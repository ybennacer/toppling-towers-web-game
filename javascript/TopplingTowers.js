import {words} from './wordList.js';
let selectedWord = "";
let correctGuesses = [];
let wrongGuesses = 0;
const maxGuesses = 5;
let score = 0;

const wordDisplay = document.getElementById("wordDisplay");
const message = document.getElementById("message");
const topplingTowerImage = document.getElementById("topplingTowerImage");
const keyboardDiv = document.getElementById("keyboard");
const scoreDisplay = document.getElementById("scoreDisplay");

//start game
function startGame() {
  loadSavedScore();
  selectedWord = words[Math.floor(Math.random() * words.length)]; //selects random word
  correctGuesses = Array(selectedWord.length).fill("_"); //resets underscores
  wrongGuesses = 0; //resets wrong guesses to 0
  updateWordDisplay();
  updatetopplingTowerImage();
  generateKeyboard();
  message.textContent = "";
  updateScoreDisplay();
} //clears any win/lose messages


function loadSavedScore() {
  let username = sessionStorage.loggedInUsername;
  if (username) {
    let user = JSON.parse(localStorage.getItem(username));
    if (user && typeof user.score === "number") {
      score = user.score; //load saved score if it exists
    }
  }
}

//update the displayed word
function updateWordDisplay() {
  wordDisplay.innerHTML = ""; //clears word display

  for (let i = 0; i < correctGuesses.length; i++) {
    let box = document.createElement("img"); //goes through the number of correct guesses (letters) to create the box images

    //if the guess is correct, show the green box
    if (correctGuesses[i] !== "_") {
      box.src = `../Images/green-box-${correctGuesses[i]}.png`;
    } else {
      box.src = "../Images/blue-box.png"; //make blue box the default for the hidden letters
    }
    wordDisplay.appendChild(box);
  }
}

//keyboard
function generateKeyboard() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  keyboardDiv.innerHTML = "";

  const lettersPerRow = Math.ceil(alphabet.length / 3); //divide alphabet into 3 rows (rounds up)

  for (let row = 0; row < 3; row++) {
    //loop iterates 3 times, creating 3 rows
    let rowDiv = document.createElement("div"); //new div created for each row

    for (
      let i = row * lettersPerRow;
      i < (row + 1) * lettersPerRow && i < alphabet.length;
      i++
    ) {
      let letter = alphabet[i];
      let button = document.createElement("button");
      button.textContent = letter;
      button.classList.add("letterBtn");
      button.onclick = () => handleGuess(letter); 
      rowDiv.appendChild(button); 
    }
    keyboardDiv.appendChild(rowDiv); 
  }
}

//user guesses
function handleGuess(letter) {
  if (selectedWord.includes(letter)) {
    //checks if the letter is in the selected word
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter) {
        correctGuesses[i] = letter; //if selected letter is correct, update correct guesses
      }
    }
    updateWordDisplay();
    checkWin();
  } else {
    wrongGuesses++;
    score--;
    updateScoreDisplay();
    updatetopplingTowerImage();
    checkLose();
  }
}

//update the toppling tower image based on wrong guesses
function updatetopplingTowerImage() {
  if (wrongGuesses >= maxGuesses) {
    topplingTowerImage.src = "../Images/Topple-frame6.png"; //last toppling tower frame
  } else {
    topplingTowerImage.src = `../Images/Topple-frame${wrongGuesses + 1}.png`; //goes through the frames one-by-one
  }
}

//check if the player won
function checkWin() {
  if (!correctGuesses.includes("_")) {
    showWinModal("You guessed the word!");
    score += 10;
    updateScoreDisplay();
    disableButtons();
  }
}

//check if the player lost
function checkLose() {
  if (wrongGuesses >= maxGuesses) {
    showLoseModal(`You lost! The word was "${selectedWord}".`);
    disableButtons();
  }
}

//disable all letter buttons when the game ends
function disableButtons() {
  const buttons = document.querySelectorAll(".letterBtn");
  buttons.forEach((button) => (button.disabled = true));
}

//update score display
function updateScoreDisplay() {
  scoreDisplay.textContent = "Score: " + score;

  let username = sessionStorage.loggedInUsername;
  if (username) {
    let user = JSON.parse(localStorage.getItem(username));
    if (user) {
      user.score = score; //update the score in the user's account
      localStorage.setItem(username, JSON.stringify(user)); //save it back to localStorage
    }
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadSavedScore();
    updateScoreDisplay();
}
);

if (sessionStorage.loggedInUsername) {
  loadSavedScore();
  updateScoreDisplay();
}


//restart the game
function restartGame() {
  document.getElementById("loseModal").style.display = "none";
  document.getElementById("winModal").style.display = "none";
  startGame();
}

//start the game for the first time
startGame();

//resultmodal elements
const closeBtn = document.querySelector(".close");
const playagainBtn = document.getElementById("playagainBtn")


//show modal with the win/lose message
function showLoseModal(message) {
  const loseModal = document.getElementById("loseModal");
  const loseMessage = document.getElementById("loseResultMessage");

  loseMessage.textContent = message;
  loseModal.style.display = "block";
}

function showWinModal(message) {
  const winModal = document.getElementById("winModal");
  const winMessage = document.getElementById("winResultMessage");

  winMessage.textContent = message;
  winModal.style.display = "block"
}

window.restartGame = restartGame; 
