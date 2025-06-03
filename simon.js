let gameSeq = [];
let userSeq = [];
let btns = ["blue", "yellow", "plum", "aqua"];
let started = false;
let lvl = 0;

const h3 = document.querySelector("h3");
const body = document.querySelector("body");
const themeToggle = document.getElementById("themeToggle");

// Start game on any key press
document.addEventListener("keypress", () => {
  if (!started) {
    alert("Game is started!!");
    started = true;
    levelUp();
  }
});

// Flash a button briefly (game sequence)
function flashBtn(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 500);
}

// Flash a button briefly for user press
function userFlashBtn(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 400);
}

function levelUp() {
  userSeq = [];
  lvl++;
  h3.innerText = `Level ${lvl}`;

  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  gameSeq.push(randColor);

  // Flash all buttons in sequence, one by one (for better UX)
  playSequence(0);
}

// Play the sequence with delays
function playSequence(index) {
  if (index >= gameSeq.length) return;
  const btn = document.querySelector(`.${gameSeq[index]}`);
  flashBtn(btn);
  setTimeout(() => playSequence(index + 1), 700);
}

// Check user input at index
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h3.innerText = `Game over! Your previous score was ${lvl}. Press any key to start over!`;
    body.style.backgroundColor = "red";
    setTimeout(() => {
      body.style.backgroundColor = started && body.classList.contains("dark") ? "#121212" : "white";
    }, 200);
    reset();
  }
}

function btnPress() {
  if (!started) return; // Ignore clicks if game not started

  const btn = this;
  userFlashBtn(btn);
  const userColor = btn.id;
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

// Attach click listeners to buttons
const allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => btn.addEventListener("click", btnPress));

function reset() {
  started = false;
  lvl = 0;
  gameSeq = [];
  userSeq = [];
}

// Theme toggle button logic
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  // Optional: change button text based on theme
  if (body.classList.contains("dark")) {
    themeToggle.innerText = "Switch to Light Theme";
  } else {
    themeToggle.innerText = "Switch to Dark Theme";
  }
});

// Set initial button text for theme toggle
themeToggle.innerText = "Switch to Dark Theme";
