const gameGrid = document.querySelector("#game-grid");

//main grid of 21 rows x 10 columns grid will be generated inside game-grid
for (let i = 0; i < 210; i++) {
  const gGrid = document.createElement("div");
  if (i >= 200) {
    gGrid.classList.add("occupied");
  } else {
    gGrid.classList.add("game-cell");
  }
  gameGrid.append(gGrid);
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
