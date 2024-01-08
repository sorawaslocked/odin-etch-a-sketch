const MAIN_BOARD_WIDTH = 600;
const board = document.querySelector('#mainBoard');
const brushColorPicker = document.querySelector('#brushColor');
const backgroundColorPicker = document.querySelector('#backgroundColor');
const changeGridSizeBtn = document.querySelector('#changeGridSizeBtn');
const changeGridSizeLabel = document.querySelector('#changeGridSizeLabel');
const clearBoardBtn = document.querySelector('#clearBoardBtn');

// Initializing grid
let brushColor = brushColorPicker.value;
let backgroundColor = backgroundColorPicker.value;
let gridSize = 16;
let squareArray = createSquareArray(gridSize);
initBoard(squareArray);

addOptionsEventListeners();

function addOptionsEventListeners() {
  // Change brush color when color picker is changed
  brushColorPicker.addEventListener('input', () => {
    brushColor = brushColorPicker.value;
  });
  // Replace old backgorund with new when color picker is changed
  backgroundColorPicker.addEventListener('input', () => {
    backgroundColor = backgroundColorPicker.value;
    replaceBoard();
  });
  // Clear the board without changing grid size
  clearBoardBtn.addEventListener('click', () => {
    clearBoard();
    squareArray = createSquareArray(gridSize);
    initBoard(squareArray);
  });
  // Change grid size and replace old board with new
  changeGridSizeBtn.addEventListener('input', () => {
    gridSize = changeGridSizeBtn.value;
    changeGridSizeLabel.textContent = "Grid Size " + gridSize + " x " + gridSize;
  });
  changeGridSizeBtn.addEventListener('change', () => {
    replaceBoard();
  });
}

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

function replaceBoard() {
  clearBoard();
  squareArray = createSquareArray(gridSize);
  initBoard(squareArray);
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
      square.style.backgroundColor = backgroundColor;
      squareRow.appendChild(square);
    }
    squareArray.push(squareRow);
  }

  return squareArray;
}

function handleMouseInput(squareArray) {
  document.body.onmousedown = () => {
    addSquareHovering(squareArray, brushColor);
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

function addSquareHovering(squareArray, brushColor) {
  squareArray.forEach((squareRow) => {
    let squares = squareRow.querySelectorAll('div');
    squares.forEach((square) => {
      square.onmouseenter = () => {
        square.style.backgroundColor = brushColor;
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