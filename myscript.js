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
let firstNextGrids = document.querySelectorAll(".first-next div"); //it will create nodelist containing all div
let secondNextGrids = document.querySelectorAll(".second-next div");
const scoreInfo = document.querySelector("#score");
const countRows = document.querySelector("#rows-count");
const countLevel = document.querySelector("#level-count");
const highScoreInfo = document.querySelector("#high-score");
// const pushResumeBtn = document.querySelector("#push-resume-button");
// const startBtn = document.querySelector("start-button");
// const rotateBtn = document.querySelector("#rotate-button");
// const leftBtn = document.querySelector("#left-button");
// const rightBtn = document.querySelector("#right-button");
// const downBtn = document.querySelector("#down-button");

//other variables
const gameGridColumns = 10;
const nextGridColumns = 4;
let score = 0;
const tetroColors = [
  "#F94A29",
  "#D61355",
  "#6F1AB6",
  "#183A1D",
  "#060047",
  "#537FE7",
  "#03C988",
];

//
//The Tetrominoes
const lTetromino = [
  [0, 1, gameGridColumns, gameGridColumns * 2],
  [0, 1, 2, gameGridColumns + 2],
  [1, gameGridColumns + 1, gameGridColumns * 2 + 1, gameGridColumns * 2],
  [0, gameGridColumns, gameGridColumns + 1, gameGridColumns + 2],
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
  zTetromino,
  tTetromino,
  oTetromino,
  iTetromino,
  uTetromino,
  plusTetromino,
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
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    random = nextRandom;
    curTetro = theTetrominoes[random][curRotation];
    curPosition = 4;
    drawTetro();
    //displayShape();
    //addScore();
    //gameOver();
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
    console.log(curPosition);
  }
}

//move right function
function moveRight() {
  if (!isSelfOccupied() && !isAtRightEdge() && !isRightOccupied()) {
    clearTetro();
    curPosition += 1;
    drawTetro();
    console.log(curPosition);
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
  if (isBreakingOnRotation()) {
    moveIfBrakingOnRotation();
  }
  if (!isNextRotationOccupied() && !isBreakingOnRotation()) {
    clearTetro();
    curRotation === 3 ? (curRotation = 0) : curRotation++;
    curTetro = theTetrominoes[random][curRotation];
    drawTetro();
  }
}
