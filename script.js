var boxes = document.querySelectorAll(".button");
var msg = document.querySelector(".msg");
var reset_btn = document.querySelector("#reset");
var newgame_btn = document.querySelector("#newgame");
var count = 0;

turn_O = true;
winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function resetGame() {
  count = 0;
  turn_O = true;
  enableBoxes();
  msg.classList.remove("show");
  newgame_btn.classList.add("hide");
}

function checkWinner() {
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
}

function disableBoxes() {
  for (box of boxes) {
    box.disabled = true;
  }
}

function enableBoxes() {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

function showWinner(winner) {
  msg.innerText = `Congratulations, the winner is ${winner}`;
  msg.classList.add("show");
  newgame_btn.classList.remove("hide");
  disableBoxes();
}

function gameDraw() {
  msg.innerText = "Game Draw!";
  msg.classList.add("show");
  newgame_btn.classList.remove("hide");
  disableBoxes();
}

boxes.forEach(function (box) {
  box.addEventListener("click", function () {
    if (turn_O) {
      // Player O's turn
      box.innerText = "O";
      turn_O = false;
    } else {
      // Player X's turn
      box.innerText = "X";
      turn_O = true;
    }
    box.disabled = true;
    count++;
    if (checkWinner()) {
      // If there is a winner, no need to check for draw
      return;
    }
    if (count === 9) {
      gameDraw();
    }
  });
});

reset_btn.addEventListener("click", resetGame);
newgame_btn.addEventListener("click", resetGame);
