// Игровые поля
var matrix = [
  [1, 0, 0, 0, 0],
  [2, 3, 0, 3, 0],
  [2, 3, 3, 3, 2],
  [2, 3, 3, 3, 0],
  [2, 1, 1, 1, 0],
];

let firstHints = [];
let secondHints = [];

showHint();

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

    if (i < firstHints.length) {
      hintNum2.innerHTML = firstHints[i] === 0 ? "" : firstHints[i];
    }

    if (i < secondHints.length) {
      hintNum.innerHTML = secondHints[i] === 0 ? "" : secondHints[i];
    }
  }
}

var nonogramHintCell20 = document.createElement("div");
nonogramHintCell20.className = "nonogram__Hint--" + 20;
nonogramContainer.appendChild(nonogramHintCell20);

for (var i = 0; i < 25; i++) {
  var nonogramCell = document.createElement("div");
  nonogramCell.className = "nonogram__cell nonogram__cell--" + i;
  nonogramCell.id = "nonogram__cell--" + i;
  nonogramHintCell20.appendChild(nonogramCell);

  nonogramCell.addEventListener("click", function (event) {
    if (event.button === 0) {
      toggleBox(this);
    }
  });

  nonogramCell.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    toggleCross(this);
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

var timesText = document.createElement("h3");
timesText.className = "times__text";
timeTopContent.appendChild(timesText);

for (let i = 1; i <= 5; i++) {
  var timeText = document.createElement("h4");
  timeText.innerHTML = [i] + "  place  - - - 09 : 00";
  timeText.className = "time__text--" + [i];
  timesText.appendChild(timeText);
}

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
  "./assets/shaffle.svg",
  "./assets/saved.svg",
];

for (var i = 0; i < 7; i++) {
  var field = document.createElement("img");
  field.className = "fields__change--" + i;
  field.src = fieldArray[i];
  fields.appendChild(field);
}

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

// Закрашиваем боксы
function toggleCross(nonogramCell) {
  if (!nonogramCell.classList.contains("left")) {
    nonogramCell.classList.toggle("right");
  }
}

function toggleBox(nonogramCell) {
  if (!nonogramCell.classList.contains("right")) {
    nonogramCell.classList.toggle("left");
  }
}

// Отображаем подсказки

function showHint() {
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
}

// Связываем подсказки и закрашиваемые боксы

// Отображаем неактуальные подсказки
