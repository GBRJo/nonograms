// Создаем элементы DOM
var bodyElement2 = document.createElement("div");
bodyElement2.className = "body__element body__element2";
document.body.insertBefore(bodyElement2, document.body.firstChild);

var bodyElement1 = document.createElement("div");
bodyElement1.className = "body__element body__element1";
document.body.insertBefore(bodyElement1, document.body.firstChild);

var bodyElement3 = document.createElement("div");
bodyElement3.className = "body__element body__element3";
document.body.insertBefore(bodyElement3, document.body.firstChild);

var nonogramContainer = document.createElement("div");
nonogramContainer.className = "nonogram__container";
nonogramContainer.id = "nonogram__container";
bodyElement1.appendChild(nonogramContainer);

for (var i = 0; i < 81; i++) {
  var nonogramCell = document.createElement("div");
  nonogramCell.className = "nonogram__Cell--" + i;
  nonogramContainer.appendChild(nonogramCell);
}