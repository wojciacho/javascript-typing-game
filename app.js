const singleWord = document.querySelector(".word"),
  settingButton = document.querySelector(".settings-button"),
  settings = document.querySelector(".settings"),
  settingsForm = document.querySelector("#setting"),
  difficultySetting = document.querySelector("#difficulty"),
  text = document.querySelector("#text"),
  score = document.querySelector("#score"),
  timeLeft = document.querySelector("#time"),
  endGame = document.querySelector(".end-game-container");

const words = [];
let word;
let points = 0;
let time = 10;

let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "easy";

difficultySetting.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "easy";

text.focus();

const randomWord = async () => {
  const wordsResponse = await fetch(
    "https://random-word-api.herokuapp.com/word"
  );
  const wordsData = await wordsResponse.json();
  words.push(wordsData);

  return wordsData;
};

const addWord = async () => {
  word = await randomWord();

  singleWord.innerHTML = word[0];
};

const updatePoints = () => {
  points++;
  score.innerHTML = points;
};

const gameEnded = () => {
  endGame.innerHTML = `<h1>Time ran out!</h1>
    <p>Your final score: ${points}</p>
    <button onclick="location.reload()">Restart Game</button>
    `;
  endGame.style.display = "flex";
};

const updateTime = () => {
  time--;
  timeLeft.innerHTML = time + "s";
  if (time === 0) {
    clearInterval(timer);
    gameEnded();
  }
};

const timer = setInterval(updateTime, 1000);

text.addEventListener("input", (e) => {
  const target = e.target.value;
  if (target === word[0]) {
    randomWord();
    addWord();
    updatePoints();
    e.target.value = "";

    if (difficulty === "easy") {
      time += 8;
    } else if (difficulty === "medium") {
      time += 6;
    } else {
      time += 4;
    }
    updateTime();
  }
});

addWord();

settingButton.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
  document.location.reload();
});
