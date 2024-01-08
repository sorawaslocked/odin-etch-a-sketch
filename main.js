const MAIN_BOARD_WIDTH = 640;
const board = document.querySelector('#mainBoard');
const changeGridSizeBtn = document.querySelector('#changeGridSizeBtn');

// Initializing grid
let gridSize = 16;
let squareArray = createSquareArray(gridSize);
handleMouseInput();
disableDrag(squareArray);
fillMainBoard(squareArray);

changeGridSizeBtn.addEventListener('click', () => {
  gridSize = prompt("Enter grid size: ");
});

function createSquareArray(gridWidth) {
  let squareArray = []
  
  for (let i = 0; i < gridWidth * gridWidth; i++) {
    const square = document.createElement('div');
    square.style.width = `${MAIN_BOARD_WIDTH / gridWidth}px`;
    square.style.height = `${MAIN_BOARD_WIDTH / gridWidth}px`;
    square.style.boxSizing = 'border-box';
    square.style.border = '1px solid black';
    squareArray.push(square);
  }

  return squareArray;
}

function handleMouseInput() {
  document.body.onmousedown = () => {
    addSquareHovering(squareArray, 'red');
  }
  document.body.onmouseup = () => {
    removeSquareHovering(squareArray);
  }
}

function disableDrag(squareArray) {
  squareArray.forEach((square) => {
    square.addEventListener('dragstart', event => {
      event.preventDefault();
    });
    square.addEventListener('drop', event => {
      event.preventDefault();
    });
  });
}

function addSquareHovering(squareArray, color) {
  squareArray.forEach((square) => {
    square.onmouseenter = () => {
      square.style.backgroundColor = color;
    }
  });
}

function removeSquareHovering(squareArray) {
  squareArray.forEach((square) => {
    square.onmouseenter = null;
  });
}

function fillMainBoard(squareArray) {
  squareArray.forEach((square) => {
    board.appendChild(square);
  });
}