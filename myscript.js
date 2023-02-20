const gameGridWrapper = document.querySelector("#game-grid");
//main grid of 21 rows x 10 columns grid will be generated inside game-grid
for (let i = 0; i < 210; i++) {
  const gGrid = document.createElement("div");
  if (i >= 200) {
    gGrid.classList.add("occupied");
  } else {
    gGrid.classList.add("game-cell");
  }
  gameGridWrapper.append(gGrid);
}

//mini grid of 4 rows x 4 columns for first-next will be generated inside first-next

let firstNext = document.querySelector(".first-next");
for (let i = 0; i < 16; i++) {
  const mGrid = document.createElement("div");
  firstNext.append(mGrid);
}
//mini grid of 4 rows x 4 columns for first-next will be generated inside second-next
let secondNext = document.querySelector(".second-next");
for (let i = 0; i < 16; i++) {
  const mGrid = document.createElement("div");
  secondNext.append(mGrid);
}

//elements on game-interface page
let gameGrids = Array.from(document.querySelectorAll("#game-grid div")); //it will create a array containing all div
let firstNextGrids = Array.from(document.querySelectorAll(".first-next div")); //it will create nodelist containing all div
let secondNextGrids = Array.from(document.querySelectorAll(".second-next div"));

// const pushResumeBtn = document.querySelector("#push-resume-button");
// const startBtn = document.querySelector("start-button");
// const rotateBtn = document.querySelector("#rotate-button");
// const leftBtn = document.querySelector("#left-button");
// const rightBtn = document.querySelector("#right-button");
// const downBtn = document.querySelector("#down-button");

//other variables
const gameGridColumns = 10;
const nextGridColumns = 4;

const tetroColors = [
  "#F94A29",
  "#D61355",
  "#6F1AB6",
  "#183A1D",
  "#060047",
  "#537FE7",
  "#03C988",
  "#F0A04B",
  "#EA8FEA",
];

//
//The Tetrominoes
const lTetromino = [
  [0, 1, gameGridColumns, gameGridColumns * 2],
  [0, 1, 2, gameGridColumns + 2],
  [1, gameGridColumns + 1, gameGridColumns * 2 + 1, gameGridColumns * 2],
  [0, gameGridColumns, gameGridColumns + 1, gameGridColumns + 2],
];

//---new

const lMirrorTetromino = [
  [0, 1, gameGridColumns + 1, gameGridColumns * 2 + 1],
  [2, gameGridColumns + 2, gameGridColumns + 1, gameGridColumns],
  [gameGridColumns * 2 + 1, gameGridColumns * 2, gameGridColumns, 0],
  [gameGridColumns, 0, 1, 2],
];

const zTetromino = [
  [0, gameGridColumns, gameGridColumns + 1, gameGridColumns * 2 + 1],
  [
    gameGridColumns + 1,
    gameGridColumns + 2,
    gameGridColumns * 2,
    gameGridColumns * 2 + 1,
  ],
  [0, gameGridColumns, gameGridColumns + 1, gameGridColumns * 2 + 1],
  [
    gameGridColumns + 1,
    gameGridColumns + 2,
    gameGridColumns * 2,
    gameGridColumns * 2 + 1,
  ],
];

const zMirrorTetromino = [
  [1, gameGridColumns + 1, gameGridColumns, gameGridColumns * 2],
  [0, 1, gameGridColumns + 1, gameGridColumns + 2],
  [1, gameGridColumns + 1, gameGridColumns, gameGridColumns * 2],
  [0, 1, gameGridColumns + 1, gameGridColumns + 2],
];

const tTetromino = [
  [0, 1, 2, gameGridColumns + 1],
  [1, gameGridColumns, gameGridColumns + 1, gameGridColumns * 2 + 1],
  [1, gameGridColumns, gameGridColumns + 1, gameGridColumns + 2],
  [0, gameGridColumns, gameGridColumns + 1, gameGridColumns * 2],
];

const oTetromino = [
  [0, 1, gameGridColumns, gameGridColumns + 1],
  [0, 1, gameGridColumns, gameGridColumns + 1],
  [0, 1, gameGridColumns, gameGridColumns + 1],
  [0, 1, gameGridColumns, gameGridColumns + 1],
];

const iTetromino = [
  [0, gameGridColumns, gameGridColumns * 2, gameGridColumns * 3],
  [0, 1, 2, 3],
  [0, gameGridColumns, gameGridColumns * 2, gameGridColumns * 3],
  [0, 1, 2, 3],
];

const uTetromino = [
  [0, gameGridColumns, gameGridColumns + 1, gameGridColumns + 2, 2],
  [0, 1, gameGridColumns, gameGridColumns * 2, gameGridColumns * 2 + 1],
  [0, 1, 2, gameGridColumns, gameGridColumns + 2],
  [0, 1, gameGridColumns + 1, gameGridColumns * 2 + 1, gameGridColumns * 2],
];

const plusTetromino = [
  [
    1,
    gameGridColumns,
    gameGridColumns + 1,
    gameGridColumns + 2,
    gameGridColumns * 2 + 1,
  ],
  [
    1,
    gameGridColumns,
    gameGridColumns + 1,
    gameGridColumns + 2,
    gameGridColumns * 2 + 1,
  ],
  [
    1,
    gameGridColumns,
    gameGridColumns + 1,
    gameGridColumns + 2,
    gameGridColumns * 2 + 1,
  ],
  [
    1,
    gameGridColumns,
    gameGridColumns + 1,
    gameGridColumns + 2,
    gameGridColumns * 2 + 1,
  ],
];

const theTetrominoes = [
  lTetromino,
  lMirrorTetromino,
  zTetromino,
  zMirrorTetromino,
  tTetromino,
  oTetromino,
  iTetromino,
  uTetromino,
];

let curPosition = 4;
let curRotation = 0;
let random = Math.floor(Math.random() * theTetrominoes.length);
let curTetro = theTetrominoes[random][curRotation];

// function to draw and clear tetromino on game-grids
function drawTetro() {
  for (let i = 0; i < curTetro.length; i++) {
    // to create a random tetromino at curTetro position applying class tetro (tetromio)
    gameGrids[curPosition + curTetro[i]].classList.add("tetro");
    // to apply a random backgroud color to each cell of tetro
    gameGrids[curPosition + curTetro[i]].style.backgroundColor =
      tetroColors[random];
  }
}

function clearTetro() {
  for (let i = 0; i < curTetro.length; i++) {
    gameGrids[curPosition + curTetro[i]].classList.remove("tetro");
    gameGrids[curPosition + curTetro[i]].style.backgroundColor = "";
  }
}

//functions assigned to keyboard keys
function control(e) {
  if (e.keyCode === 37 || e.keyCode === 65) {
    moveLeft(); //Arrow Left, letter a
  } else if (e.keyCode === 38 || e.keyCode === 87) {
    rotate(); //Arrow up, letter w
  } else if (e.keyCode === 39 || e.keyCode === 68) {
    moveRight(); //Arrow right, letter d
  } else if (e.keyCode === 40 || e.keyCode === 83) {
    moveDown(); //Arrow down, letter s
  }
}
document.addEventListener("keydown", control);

let firstNextRandom = random;
let secondNextRandom;

random = firstNextRandom;

secondNextRandom = Math.floor(Math.random() * theTetrominoes.length);
firstNextRandom = secondNextRandom;

function freeze() {
  if (
    curTetro.some((index) =>
      gameGrids[curPosition + index + gameGridColumns].classList.contains(
        "occupied"
      )
    )
  ) {
    curTetro.forEach((index) =>
      gameGrids[curPosition + index].classList.add("occupied")
    );
    //start a new tetromino falling

    curPosition = 4;
    random = firstNextRandom;
    curTetro = theTetrominoes[random][curRotation];
    drawTetro();

    clearAllNextTetro();
    firstNextRandom = secondNextRandom;
    drawFirstNextTetro();
    secondNextRandom = Math.floor(Math.random() * theTetrominoes.length);
    drawSecondNextTetro();

    //displayShape();
    countScore();
    gameOver();
  }
}

//Edge and Occupancy testing functions

function isAtLeftEdge() {
  return curTetro.some(
    (index) => (curPosition + index) % gameGridColumns === 0
  );
}
function isAtRightEdge() {
  return curTetro.some(
    (index) => (curPosition + index) % gameGridColumns === gameGridColumns - 1
  );
}

function isSelfOccupied() {
  return curTetro.some((index) =>
    gameGrids[curPosition + index].classList.contains("occupied")
  );
}

function isLeftOccupied() {
  return curTetro.some((index) =>
    gameGrids[curPosition - 1 + index].classList.contains("occupied")
  );
}

function isRightOccupied() {
  return curTetro.some((index) =>
    gameGrids[curPosition + 1 + index].classList.contains("occupied")
  );
}

function isButtomOccupied() {
  return curTetro.some((index) =>
    gameGrids[curPosition + gameGridColumns + index].classList.contains(
      "occupied"
    )
  );
}

//move down function
function moveDown() {
  if (!isSelfOccupied() && !isButtomOccupied()) {
    clearTetro();
    curPosition += gameGridColumns;
    drawTetro();
    freeze();
  }
}

//move left function
function moveLeft() {
  if (!isSelfOccupied() && !isAtLeftEdge() && !isLeftOccupied()) {
    clearTetro();
    curPosition -= 1;
    drawTetro();
  }
}

//move right function
function moveRight() {
  if (!isSelfOccupied() && !isAtRightEdge() && !isRightOccupied()) {
    clearTetro();
    curPosition += 1;
    drawTetro();
  }
}

function isNextRotationOccupied() {
  var nextRotation;
  var nextTetro;
  curRotation === 3 ? (nextRotation = 0) : (nextRotation = curRotation + 1);
  nextTetro = theTetrominoes[random][nextRotation];
  return nextTetro.some((index) =>
    gameGrids[curPosition + index].classList.contains("occupied")
  );
}

function isBreakingOnRotation() {
  var nextRotation;
  var nextTetro;
  curRotation === 3 ? (nextRotation = 0) : (nextRotation = curRotation + 1);
  nextTetro = theTetrominoes[random][nextRotation];

  let newPositions = [];
  let j;
  for (let i = 0; i < nextTetro.length; i++) {
    j = (nextTetro[i] + curPosition) % gameGridColumns;
    newPositions.push(j);
  }
  return Math.max(...newPositions) - Math.min(...newPositions) > 3;
}

function moveIfBrakingOnRotation() {
  //move one step if rotation possible
  if (curPosition % gameGridColumns < 4) {
    moveRight();
    if (isBreakingOnRotation() || isNextRotationOccupied()) {
      //even after movement cannot rotate revert movement
      moveLeft();
    }
  }
  if (curPosition % gameGridColumns > 5) {
    moveLeft();
    if (isBreakingOnRotation() || isNextRotationOccupied()) {
      //even after movement cannot rotate revert movement
      moveRight();
    }
  }
}

function rotate() {
  // console.log(random);
  if (isBreakingOnRotation()) {
    moveIfBrakingOnRotation();
  }
  if (!isNextRotationOccupied() && !isBreakingOnRotation()) {
    //console.log(random);
    clearTetro();
    curRotation === 3 ? (curRotation = 0) : curRotation++;
    // console.log(random);
    curTetro = theTetrominoes[random][curRotation];
    drawTetro();
  }
}

//show up-next tetromino in mini-grid display
const miniGridColumns = 4;
const miniIndex = 0;

const nextTetrominoes = [
  [0, 1, miniGridColumns, miniGridColumns * 2], //lTetromino,
  [0, 1, miniGridColumns + 1, miniGridColumns * 2 + 1], //lMirrorTetromino
  [0, miniGridColumns, miniGridColumns + 1, miniGridColumns * 2 + 1], //zTetromino
  [1, miniGridColumns + 1, miniGridColumns, miniGridColumns * 2], //zMirrorTetromino
  [0, 1, 2, miniGridColumns + 1], //tTetromino
  [0, 1, miniGridColumns, miniGridColumns + 1], //oTetromino
  [0, miniGridColumns, miniGridColumns * 2, miniGridColumns * 3], //iTetromino
  [0, miniGridColumns, miniGridColumns + 1, miniGridColumns + 2, 2], //uTetromino
];

// function to draw and clear tetromino on game-grids

function clearAllNextTetro() {
  for (let i = 0; i < secondNextGrids.length; i++) {
    secondNextGrids[i].style.backgroundColor = "";
  }
  for (let i = 0; i < firstNextGrids.length; i++) {
    firstNextGrids[i].style.backgroundColor = "";
  }
}

function drawFirstNextTetro() {
  for (let i = 0; i < nextTetrominoes[firstNextRandom].length; i++) {
    firstNextGrids[
      miniIndex + nextTetrominoes[firstNextRandom][i]
    ].style.backgroundColor = tetroColors[firstNextRandom];
  }
}

function drawSecondNextTetro() {
  for (let i = 0; i < nextTetrominoes[secondNextRandom].length; i++) {
    // secondNextGrids[miniIndex + nextTetrominoes[secondNextRandom][i]].classList.add("tetro");
    secondNextGrids[
      miniIndex + nextTetrominoes[secondNextRandom][i]
    ].style.backgroundColor = tetroColors[secondNextRandom];
  }
}

let timerId;
//add functionality to the button
function startGame() {
  if (timerId) {
    alert("Game is already started");
    // clearInterval(timerId);
    // timerId = null;
  } else {
    drawTetro();
    timerId = setInterval(moveDown, 500);
    //nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    clearAllNextTetro();
    firstNextRandom = secondNextRandom;
    drawFirstNextTetro();
    secondNextRandom = Math.floor(Math.random() * theTetrominoes.length);
    drawSecondNextTetro();
  }
}
const scoreInfo = document.querySelector("#score");
const countRows = document.querySelector("#rows-count");
const countLevel = document.querySelector("#level-count");
const highScoreInfo = document.querySelector("#high-score");
let score = 0;
let rowCompleted = 0;
let heighScore = 0;
scoreInfo.innerHTML = score;
countRows.innerHTML = rowCompleted;
highScoreInfo.innerHTML = heighScore;
let levelCnt = 1;
let levelOneMax = 20;
countLevel.innerHTML = levelCnt;

//add score
function countScore() {
  rowCnt = 0;
  for (let i = 0; i < 199; i += gameGridColumns) {
    const rowCells = [
      i,
      i + 1,
      i + 2,
      i + 3,
      i + 4,
      i + 5,
      i + 6,
      i + 7,
      i + 8,
      i + 9,
    ];

    if (
      rowCells.every((index) => gameGrids[index].classList.contains("occupied"))
    ) {
      rowCnt++;
      rowCells.forEach((index) => {
        gameGrids[index].classList.remove("occupied");
        gameGrids[index].classList.remove("tetro");
        gameGrids[index].style.backgroundColor = "";
      });
      const rowRemoved = gameGrids.splice(i, gameGridColumns);
      gameGrids = rowRemoved.concat(gameGrids);
      gameGrids.forEach((cell) => gameGridWrapper.appendChild(cell));
    }
  }
  if (rowCnt > 0) {
    rowCnt === 1
      ? (score += 10)
      : rowCnt === 2
      ? (score += 30)
      : rowCnt === 3
      ? (score += 50)
      : (score += 70);
    scoreInfo.innerHTML = score;
    rowCompleted += rowCnt;
    countRows.innerHTML = rowCompleted;
    if (score > heighScore) {
      highScoreInfo.innerHTML = score;
    }
    if (score > levelOneMax && levelCnt === 1) {
      levelCnt++;
      countLevel.innerHTML = levelCnt;
      onLevelup();
    }
  }
}

//pause/resume game

function pauseResume() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  } else {
    timerId = setInterval(moveDown, 500);
  }
}

//game over
let isGameOver = 0;
function gameOver() {
  if (
    curTetro.some((index) =>
      gameGrids[curPosition + index].classList.contains("occupied")
    )
  ) {
    writeGameOver();
    clearInterval(timerId);
  }
}

function writeGameOver() {
  for (let i = 90; i < 130; i++) {
    gameGrids[i].style.backgroundColor = "#eb455f";
    gameGrids[i].style.color = "white";
    gameGrids[i].style.fontSize = "x-large";
    gameGrids[i].style.fontWeight = "600";
  }
  gameGrids[103].innerHTML = "G";
  gameGrids[104].innerHTML = "A";
  gameGrids[105].innerHTML = "M";
  gameGrids[106].innerHTML = "E";
  gameGrids[113].innerHTML = "O";
  gameGrids[114].innerHTML = "V";
  gameGrids[115].innerHTML = "E";
  gameGrids[116].innerHTML = "R";
}

// function writeGameOver() {
//   for (let i = 90; i < 130; i++) {
//     gameGrids[i].classList.add("game-over-div");
//   }
//   gameGrids[103].innerHTML = "G";
//   gameGrids[104].innerHTML = "A";
//   gameGrids[105].innerHTML = "M";
//   gameGrids[106].innerHTML = "E";
//   gameGrids[113].innerHTML = "O";
//   gameGrids[114].innerHTML = "V";
//   gameGrids[115].innerHTML = "E";
//   gameGrids[116].innerHTML = "R";
// }

function onLevelup() {
  theTetrominoes.push(plusTetromino);
  nextTetrominoes.push([
    1,
    miniGridColumns,
    miniGridColumns + 1,
    miniGridColumns + 2,
    miniGridColumns * 2 + 1,
  ]);
  alert("Congratulation you completed this level !");
}
