const MAIN_BOARD_WIDTH = 600;
const board = document.querySelector('#mainBoard');
const changeGridSizeBtn = document.querySelector('#changeGridSizeBtn');

// Initializing grid
let gridSize = 16;
let squareArray = createSquareArray(gridSize);
let color = 'black';
initBoard(squareArray);

changeGridSizeBtn.addEventListener('click', () => {
  gridSize = prompt("Enter grid size: ");
  clearBoard();
  squareArray = createSquareArray(gridSize);
  initBoard(squareArray);
});

function initBoard(squareArray) {
  handleMouseInput(squareArray);
  disableDrag(squareArray);
  fillMainBoard(squareArray);
}

function clearBoard() {
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
}

// Array is created from rows of squares
function createSquareArray(gridWidth) {
  let squareArray = []
  
  for (let i = 0; i < gridWidth; i++) {
    let squareRow = document.createElement('div')
    for (let j = 0; j < gridWidth; j++) {
      const square = document.createElement('div');
      square.style.width = `${MAIN_BOARD_WIDTH / gridWidth}px`;
      square.style.height = `${MAIN_BOARD_WIDTH / gridWidth}px`;
      square.style.boxSizing = 'border-box';
      square.style.border = '1px solid black';
      squareRow.appendChild(square);
    }
    squareArray.push(squareRow);
  }

  return squareArray;
}

function handleMouseInput(squareArray) {
  document.body.onmousedown = () => {
    addSquareHovering(squareArray, color);
  }
  document.body.onmouseup = () => {
    removeSquareHovering(squareArray);
  }
}

function disableDrag(squareArray) {
  squareArray.forEach((squareRow) => {
    let squares = squareRow.querySelectorAll('div');
    squares.forEach((square) => {
      square.addEventListener('dragstart', event => {
        event.preventDefault();
      });
      square.addEventListener('drop', event => {
        event.preventDefault();
      });
    });
  });
}

function addSquareHovering(squareArray, color) {
  squareArray.forEach((squareRow) => {
    let squares = squareRow.querySelectorAll('div');
    squares.forEach((square) => {
      square.onmouseenter = () => {
        square.style.backgroundColor = color;
      }
    });
  });
}

function removeSquareHovering(squareArray) {
  squareArray.forEach((squareRow) => {
    let squares = squareRow.querySelectorAll('div');
    squares.forEach((square) => {
      square.onmouseenter = null;
    });
  });
}

function fillMainBoard(squareArray) {
  squareArray.forEach((squareRow) => {
    board.appendChild(squareRow);
  });
}