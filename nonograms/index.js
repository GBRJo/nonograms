// Игровые поля
const matrixes = [
  [
    [1, 2, 2, 2, 0],
    [1, 3, 0, 3, 0],
    [0, 3, 3, 3, 2],
    [2, 1, 3, 1, 0],
    [2, 1, 1, 1, 1],
  ],
  [
    [4, 5, 0, 5, 5],
    [7, 5, 6, 5, 5],
    [7, 5, 5, 5, 5],
    [0, 0, 5, 0, 5],
    [0, 0, 5, 0, 0],
  ],
  [
    [11, 11, 0, 0, 9],
    [10, 10, 9, 9, 11],
    [10, 10, 9, 11, 9],
    [8, 10, 11, 9, 11],
    [11, 11, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0],
    [12, 12, 0, 13, 13],
    [12, 12, 0, 13, 13],
    [12, 0, 0, 0, 0],
    [0, 0, 0, 14, 14],
  ],
  [
    [16, 17, 17, 17, 15],
    [16, 15, 15, 15, 17],
    [16, 15, 15, 16, 15],
    [17, 15, 16, 16, 15],
    [15, 0, 0, 0, 16],
  ],
];

var currentLevel = 0;
var matrix = matrixes[currentLevel];
var hintNum;

let intervalId;
let currentTime = 0;
let gamePlaying = false;
let firstClick = false;

let timeTop = [];

let templateNames = {
  0: "duck",
  1: "car",
  2: "s-man",
  3: "SUP",
  4: "rrr",
};

// Создаем элементы DOM
var bodyElement1 = document.createElement("div");
bodyElement1.className = "body__element body__element1";
document.body.appendChild(bodyElement1);

var bodyElement2 = document.createElement("div");
bodyElement2.className = "body__element body__element2";
document.body.appendChild(bodyElement2);

var nonogramContainer = document.createElement("div");
nonogramContainer.className = "nonogram__container";
nonogramContainer.id = "nonogram__container";
bodyElement1.appendChild(nonogramContainer);

var nonogramContainerFinish = document.createElement("div");
nonogramContainerFinish.className = "nonogram__container--finish";
bodyElement1.appendChild(nonogramContainerFinish);

for (var i = 0; i < 20; i++) {
  var nonogramHintCell = document.createElement("div");
  nonogramHintCell.className = "nonogram__Hint--" + i;
  nonogramContainer.appendChild(nonogramHintCell);

  if (i < 10) {
    var hintNum = document.createElement("p");
    hintNum.className = "hint__number--" + i;
    nonogramHintCell.appendChild(hintNum);

    var hintNum2 = document.createElement("p");
    hintNum2.className = "hint__number2--" + i;
    nonogramHintCell.appendChild(hintNum2);
  }
}

var nonogramHintCell20 = document.createElement("div");
nonogramHintCell20.className = "nonogram__Hint--" + 20;
nonogramContainer.appendChild(nonogramHintCell20);

for (var i = 0; i < 25; i++) {
  var nonogramCell = document.createElement("div");
  nonogramCell.className = "nonogram__cell nonogram__cell--" + i;
  nonogramCell.id = i;
  nonogramHintCell20.appendChild(nonogramCell);

  nonogramCell.addEventListener("click", function (event) {
    if (event.button === 0) {
      var cellIndex = this.id;
      if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] !== 0) {
        addColorsToMatrix(this);
        toggleBox(this);
      } else {
        this.innerHTML = "<span>No</span>";
        audioNo.play();
        setTimeout(() => {
          this.innerHTML = "";
        }, 500);
      }
    }
  });

  nonogramCell.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    var cellIndex = this.id;
    if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] === 0) {
      toggleCross(this);
    } else {
      this.innerHTML = "<span>No</span>";
      audioNo.play();
      setTimeout(() => {
        this.innerHTML = "";
      }, 500);
    }
  });
}

var menuContainer = document.createElement("div");
menuContainer.className = "menu__container";
bodyElement2.appendChild(menuContainer);

var timeContainer = document.createElement("div");
timeContainer.className = "time__container";
menuContainer.appendChild(timeContainer);

var timeContent = document.createElement("div");
timeContent.className = "time__content";
timeContainer.appendChild(timeContent);

var time = document.createElement("h1");
time.className = "time";
time.innerHTML = "00 : 00";
timeContent.appendChild(time);

var timeSign = document.createElement("div");
timeSign.className = "play-button play";
timeContent.appendChild(timeSign);

var timeTopContent = document.createElement("div");
timeTopContent.className = "timeTop__Content";
timeContainer.appendChild(timeTopContent);

var timeTopContentHeader = document.createElement("h3");
timeTopContentHeader.className = "timeTop__Content--header";
timeTopContentHeader.innerHTML = "Time top:";
timeTopContent.appendChild(timeTopContentHeader);

var timesText = document.createElement("div");
timesText.className = "times__text";
timeTopContent.appendChild(timesText);

for (let i = 1; i <= 5; i++) {
  var timeText = document.createElement("h4");
  timeText.innerHTML = [i] + "<span class='dynamic-part'> - - - </span>";
  timeText.className = "time__text--" + i;
  timesText.appendChild(timeText);
}

var endGame = document.createElement("div");
endGame.className = "game__end";
menuContainer.appendChild(endGame);

var gameEndHeader = document.createElement("h2");
gameEndHeader.textContent = "You solved a nonogram!";
endGame.appendChild(gameEndHeader);

var endButton = document.createElement("button");
endButton.className = "button__end";
endButton.innerHTML = "Next game";
endGame.appendChild(endButton);

var gameFields = document.createElement("div");
gameFields.className = "game__fields";
menuContainer.appendChild(gameFields);

var gameFieldsHeader = document.createElement("h2");
gameFieldsHeader.textContent = "Difficulty and templates";
gameFields.appendChild(gameFieldsHeader);

var gameFieldsSize = document.createElement("h4");
gameFieldsSize.className = "field__size";
gameFieldsSize.textContent = "5 X 5";
gameFields.appendChild(gameFieldsSize);

var fields = document.createElement("div");
fields.className = "fields";
gameFields.appendChild(fields);

var fieldArray = [
  "./assets/field__1.svg",
  "./assets/field__2.svg",
  "./assets/field__3.svg",
  "./assets/field__4.svg",
  "./assets/field__5.svg",
];

for (var i = 0; i < 5; i++) {
  var field = document.createElement("img");
  field.className = "fields__change--" + i;
  field.src = fieldArray[i];
  field.addEventListener(
    "click",
    (function (index) {
      return function () {
        chooseMatrix(index);
      };
    })(i)
  );
  fields.appendChild(field);
}

var resetButton = document.createElement("button");
resetButton.className = "button__reset";
resetButton.innerHTML = '<img src="./assets/restart.svg" />';
fields.appendChild(resetButton);

var shaffleButton = document.createElement("button");
shaffleButton.className = "button__shaffle";
shaffleButton.innerHTML = '<img src="./assets/shaffl.svg" />';
fields.appendChild(shaffleButton);

var fieldInfo = document.createElement("div");
fieldInfo.className = "field__info";
gameFields.appendChild(fieldInfo);

var fieldInfoContent = document.createElement("div");
fieldInfoContent.className = "field__info--content";
fieldInfoContent.textContent =
  "Here you can choose a template or game difficulty. You can select a random template or load the last unfinished game.";
fieldInfo.appendChild(fieldInfoContent);

var fieldInfoHeader = document.createElement("div");
fieldInfoHeader.className = "field__info--header";
fieldInfoHeader.textContent = "--how to play?";
fieldInfo.appendChild(fieldInfoHeader);

var audioFolder = document.createElement("div");
document.body.appendChild(audioFolder);

var audioClick = document.createElement("audio");
audioClick.src = "./assets/718371__binauralcow__click2.mp3";
audioFolder.appendChild(audioClick);

var audioClickOff = document.createElement("audio");
audioClickOff.src =
  "./assets/669918__el_boss__the-best-bubble-pop-sound-for-game-and-ui.wav";
audioFolder.appendChild(audioClickOff);

var audioNo = document.createElement("audio");
audioNo.src = "./assets/220198__gameaudio__click-with-two-parts.wav";
audioFolder.appendChild(audioNo);

var audioCross = document.createElement("audio");
audioCross.src = "./assets/220204__gameaudio__ping-sound-ricochet.wav";
audioFolder.appendChild(audioCross);

var audioWin = document.createElement("audio");
audioWin.src = "./assets/619838__eponn__achievement-happy-beeps-jingle.wav";
audioFolder.appendChild(audioWin);

// Закрашиваем боксы
function toggleCross(nonogramCell) {
  if (!nonogramCell.classList.contains("left")) {
    nonogramCell.classList.toggle("right");
    audioCross.play();
  }
}

function toggleBox(nonogramCell) {
  if (!nonogramCell.classList.contains("right")) {
    nonogramCell.classList.toggle("left");
    var audio = nonogramCell.classList.contains("left")
      ? audioClick
      : audioClickOff;
    audio.play();
    checkGameEnd(matrix);
  }
}

// Заполняем слоты подсказками
function fillHint(firstHints, secondHints) {
  for (var i = 0; i < 10; i++) {
    var hintNum = document.querySelector(".hint__number--" + i);
    var hintNum2 = document.querySelector(".hint__number2--" + i);
    if (i < firstHints.length) {
      hintNum2.innerHTML = firstHints[i] === 0 ? "" : firstHints[i];
    }

    if (i < secondHints.length) {
      hintNum.innerHTML = secondHints[i] === 0 ? "" : secondHints[i];
    }
  }
}

// Отображаем подсказки
function showHint() {
  let firstHints = [];
  let secondHints = [];

  var column = matrix.length;
  var row = matrix[0].length;

  for (var j = 0; j < row; j++) {
    let firstHint = 0;
    let secondHint = 0;
    let firstHintPassed = false;

    for (var i = 0; i < column; i++) {
      if (matrix[i][j] !== 0) {
        if (matrix[i + 1] && matrix[i + 1][j] !== 0) {
          if (firstHintPassed) {
            secondHint++;
          } else {
            firstHint++;
          }
        } else {
          if (firstHintPassed) {
            secondHint++;
            firstHintPassed = true;
          } else {
            firstHint++;
            firstHintPassed = true;
          }
        }
      }
    }

    firstHints.push(firstHint);
    secondHints.push(secondHint);
  }

  for (var i = 0; i < column; i++) {
    let firstHint = 0;
    let secondHint = 0;
    let firstHintPassed = false;

    for (var j = 0; j < row; j++) {
      if (matrix[i][j] !== 0) {
        if (matrix[i][j + 1] !== 0) {
          if (firstHintPassed) {
            secondHint++;
          } else {
            firstHint++;
          }
        } else {
          if (firstHintPassed) {
            secondHint++;
            firstHintPassed = true;
          } else {
            firstHint++;
            firstHintPassed = true;
          }
        }
      }
    }
    firstHints.push(firstHint);
    secondHints.push(secondHint);
  }
  fillHint(firstHints, secondHints);
}

showHint();

// Вводим дополнительные цвета
function addColorsToMatrix(cell) {
  var cellIndex = cell.id;
  if (cell.classList.contains("left")) {
    cell.style.background = "none";
  } else {
    if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] === 1) {
      cell.style.background = "url(./assets/box__1--green.svg)";
    } else if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] === 2) {
      cell.style.background = "url(./assets/box__2--blue.svg)";
    } else if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] === 3) {
      cell.style.background = "url(./assets/box__3--brown.svg)";
    } else if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] === 4) {
      cell.style.background = "url(./assets/box__4--greenblue.svg)";
    } else if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] === 5) {
      cell.style.background = "url(./assets/box__5--yeulow.svg)";
    } else if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] === 6) {
      cell.style.background = "url(./assets/box__6--red.svg)";
    } else if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] === 7) {
      cell.style.background = "url(./assets/box__7--black.svg)";
    } else if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] === 8) {
      cell.style.background = "url(./assets/box__8--red.svg)";
    } else if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] === 9) {
      cell.style.background = "url(./assets/box__9--green.svg)";
    } else if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] === 10) {
      cell.style.background = "url(./assets/box__10--brown.svg)";
    } else if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] === 11) {
      cell.style.background = "url(./assets/box__11--green.svg)";
    } else if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] === 12) {
      cell.style.background = "url(./assets/box__12--red.svg)";
    } else if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] === 13) {
      cell.style.background = "url(./assets/box__13--brown.svg)";
    } else if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] === 14) {
      cell.style.background = "url(./assets/box__14--yelow.svg)";
    } else if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] === 15) {
      cell.style.background = "url(./assets/box__15--navy.svg)";
    } else if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] === 16) {
      cell.style.background = "url(./assets/box__16--red.svg)";
    } else if (matrix[Math.floor(cellIndex / 5)][cellIndex % 5] === 17) {
      cell.style.background = "url(./assets/box__17--blue.svg)";
    }
  }
}

// Добавляем финалы для каждого шаблона
function addFinals(currentLevel) {
  var finalArray = [
    "./assets/final__1.gif",
    "./assets/final__2.gif",
    "./assets/final__3.gif",
    "./assets/final__4.svg",
    "./assets/final__5.gif",
  ];
  var nonogramContainerFinish = document.querySelector(
    ".nonogram__container--finish"
  );
  let final = finalArray[currentLevel];
  nonogramContainerFinish.style.backgroundImage = "url(" + final + ")";
}

// Реализуем конец игры
function checkGameEnd(matrix) {
  var gameEnded = true;
  var column = matrix.length;
  var row = matrix[0].length;

  for (var i = 0; i < column; i++) {
    for (var j = 0; j < row; j++) {
      if (matrix[i][j] !== 0) {
        var cellId = i * row + j;
        var nonogramCell = document.getElementById(cellId);
        if (!nonogramCell.classList.contains("left")) {
          gameEnded = false;
          break;
        }
      }
    }

    if (!gameEnded) {
      break;
    }
  }

  if (gameEnded) {
    let templateInfo = {
      time: currentTime,
      template: templateNames[currentLevel],
    };
    timeTop.push(templateInfo);
    timeToTop(timeTop);
    timeSign.style.display = "none";
    pauseTimer();
    setTimeout(() => {
      firstClick = false;
      audioWin.play();
      nonogramContainer.style.display = "none";
      nonogramContainerFinish.style.display = "block";
      addFinals(currentLevel);
      endGame.style.display = "flex";
      timeSign.style.display = "none";
    }, 1000);
  }
}

//Выводим данные в топ лист
function timeToTop(timeTop) {
  timeTop.sort(function (a, b) {
    return a.time - b.time;
  });

  for (let i = 0; i < timeTop.length && i < 5; i++) {
    var timeTextElement = document.querySelector(
      ".time__text--" + (i + 1) + " .dynamic-part"
    );

    if (timeTextElement) {
      timeTextElement.textContent =
        " - " + timeTop[i].template + " (5X5) - " + getTime(timeTop[i].time);
    }
  }
}

// Сброс игры
resetButton.addEventListener("click", reStartGame);

function reStartGame() {
  pauseTimer();
  resetTimer();
  nonogramContainerFinish.style.display = "none";
  nonogramContainer.style.display = "grid";
  endGame.style.display = "none";
  var column = matrix.length;
  var row = matrix[0].length;
  for (var i = 0; i < column; i++) {
    for (var j = 0; j < row; j++) {
      var cellId = i * row + j;
      var nonogramCell = document.getElementById(cellId);
      if (nonogramCell.classList.contains("left")) {
        nonogramCell.classList.remove("left");
        nonogramCell.style.removeProperty("background");
      }
      if (nonogramCell.classList.contains("right")) {
        nonogramCell.classList.remove("right");
        nonogramCell.classList.remove("background");
      }
    }
  }
}

// Запускаем следующую игру
endButton.addEventListener("click", newGame);

function newGame() {
  currentLevel++;
  if (currentLevel < matrixes.length) {
    matrix = matrixes[currentLevel];
  }
  reStartGame();
  showHint();
  timeSign.style.display = "flex";
  nonogramContainer.style.display = "grid";
  nonogramContainerFinish.style.display = "none";
  endGame.style.display = "none";
}

// Запускаем таймер
const playButton = timeSign;

function timerStart() {
  if (!firstClick) {
    firstClick = true;
    timerOnButtonStart();
  }
}

function timerOnButtonStart() {
  if (!gamePlaying) {
    gamePlaying = true;
    playButton.classList.remove("play");
    playButton.classList.add("pause");
    intervalId = setInterval(() => {
      currentTime++;
      time.innerHTML = getTime(currentTime);
    }, 200);
  } else {
    pauseTimer();
  }
}

nonogramHintCell20.addEventListener("mousedown", timerStart);
playButton.addEventListener("click", timerOnButtonStart);

function pauseTimer() {
  firstClick = false;
  clearInterval(intervalId);
  playButton.classList.remove("pause");
  playButton.classList.add("play");
  gamePlaying = false;
}

function resetTimer() {
  gamePlaying = false;
  currentTime = 0;
  time.innerHTML = "00 : 00";
}

function getTime(duration) {
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${formattedMinutes} : ${formattedSeconds}`;
}

//Выбор матрицы вручную
function chooseMatrix(index) {
  currentLevel = index;
  if (currentLevel < matrixes.length) {
    matrix = matrixes[currentLevel];
  }
  reStartGame();
  showHint();
  timeSign.style.display = "flex";
  nonogramContainer.style.display = "grid";
  nonogramContainerFinish.style.display = "none";
  endGame.style.display = "none";
}

//Выбор шаблона случайным образом
shaffleButton.addEventListener("click", shaffleGame);

function shaffleGame() {
  var previousLevel = currentLevel;
  do {
    currentLevel = Math.floor(Math.random() * 5);
  } while (currentLevel === previousLevel);
  if (currentLevel < matrixes.length) {
    matrix = matrixes[currentLevel];
  }
  console.log(currentLevel);
  reStartGame();
  showHint();
  timeSign.style.display = "flex";
  nonogramContainer.style.display = "grid";
  nonogramContainerFinish.style.display = "none";
  endGame.style.display = "none";
}
