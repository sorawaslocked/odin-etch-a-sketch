const MAIN_BOARD_WIDTH = 600;
const board = document.querySelector('#mainBoard');
const brushColorPicker = document.querySelector('#brushColor');
const backgroundColorPicker = document.querySelector('#backgroundColor');
const rainbowCheckbox = document.querySelector('#rainbow');
const gridLineCheckbox = document.querySelector('#gridLines');
const eraserCheckbox = document.querySelector('#eraser');
const changeGridSizeBtn = document.querySelector('#changeGridSizeBtn');
const changeGridSizeLabel = document.querySelector('#changeGridSizeLabel');
const clearBoardBtn = document.querySelector('#clearBoardBtn');

// Initializing grid
let brushColor = brushColorPicker.value;
let backgroundColor = backgroundColorPicker.value;
let border = 'none';
changeGridSizeBtn.value = 16;
let gridSize = 16;
let squareArray = createSquareArray(gridSize);
initBoard(squareArray);

addOptionsEventListeners();

function addOptionsEventListeners() {

  // Change brush color when color picker is changed
  brushColorPicker.addEventListener('input', () => {
    brushColor = brushColorPicker.value;
    handleNormalMouseInput(squareArray);
    rainbowCheckbox.checked = false;
    eraserCheckbox.checked = false;
  });

  // Replace old backgorund with new when color picker is changed
  backgroundColorPicker.addEventListener('change', () => {
    backgroundColor = backgroundColorPicker.value;
    replaceBoard();
  });

  // Toggle for rainbow brush mode
  rainbowCheckbox.addEventListener('change', () => {
    if (!rainbowCheckbox.checked)
      handleNormalMouseInput(squareArray);
    else
      handleRainbowMouseInput(squareArray);
  });

  // Toggle grid lines
  gridLineCheckbox.addEventListener('change', () => {
    if (!gridLineCheckbox.checked)
      toggleGridLines(squareArray, false);
    else
      toggleGridLines(squareArray, true);
  });

  // Toggle eraser
  eraserCheckbox.addEventListener('change', () => {
    if (!eraserCheckbox.checked)
      handleNormalMouseInput(squareArray);
    else
      handleEraserMouseInput(squareArray);
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
  handleNormalMouseInput(squareArray);
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
      square.style.border = border;
      square.style.backgroundColor = backgroundColor;
      squareRow.appendChild(square);
    }
    squareArray.push(squareRow);
  }

  return squareArray;
}

function handleNormalMouseInput(squareArray) {
  document.body.onmousedown = () => {
    addNormalSquareHovering(squareArray);
  }
  document.body.onmouseup = () => {
    removeSquareHovering(squareArray);
  }
  addNormalSquareClicking(squareArray);
}

function addNormalSquareClicking(squareArray) {
  squareArray.forEach((squareRow) => {
    let squares = squareRow.querySelectorAll('div');
    squares.forEach((square) => {
      square.onclick = () => {
        square.style.backgroundColor = brushColor;
      }
    });
  });
}

function addNormalSquareHovering(squareArray) {
  squareArray.forEach((squareRow) => {
    let squares = squareRow.querySelectorAll('div');
    squares.forEach((square) => {
      square.onmouseenter = () => {
        square.style.backgroundColor = brushColor;
      }
    });
  });
}

function handleRainbowMouseInput(squareArray) {
  document.body.onmousedown = () => {
    addRainbowSquareHovering(squareArray);
  }
  document.body.onmouseup = () => {
    removeSquareHovering(squareArray);
  }
  addRainbowSquareClicking(squareArray);
}

function addRainbowSquareClicking(squareArray) {
  squareArray.forEach((squareRow) => {
    let squares = squareRow.querySelectorAll('div');
    squares.forEach((square) => {
      square.onclick = () => {
        let randomColor = `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
        square.style.backgroundColor = randomColor;
      }
    });
  });
}

function addRainbowSquareHovering(squareArray) {
  squareArray.forEach((squareRow) => {
    let squares = squareRow.querySelectorAll('div');
    squares.forEach((square) => {
      square.onmouseenter = () => {
        let randomColor = `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
        square.style.backgroundColor = randomColor;
      }
    });
  });
}

function handleEraserMouseInput(squareArray) {
  document.body.onmousedown = () => {
    addEraserSquareHovering(squareArray);
  }
  document.body.onmouseup = () => {
    removeSquareHovering(squareArray);
  }
  addEraserSquareClicking(squareArray);
}

function addEraserSquareClicking(squareArray) {
  squareArray.forEach((squareRow) => {
    let squares = squareRow.querySelectorAll('div');
    squares.forEach((square) => {
      square.onclick = () => {
        square.style.backgroundColor = backgroundColor;
      }
    });
  });
}

function addEraserSquareHovering(squareArray) {
  squareArray.forEach((squareRow) => {
    let squares = squareRow.querySelectorAll('div');
    squares.forEach((square) => {
      square.onmouseenter = () => {
        square.style.backgroundColor = backgroundColor;
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

// Turns grid lines on when "on" parameter is true
function toggleGridLines(squareArray, on) {
  if (on) {
    border = '1px solid black';
    squareArray.forEach((squareRow) => {
      let squares = squareRow.querySelectorAll('div');
      squares.forEach((square) => {
        square.style.border = border;
      });
    });
  }
  else {
    border = 'none';
    squareArray.forEach((squareRow) => {
      let squares = squareRow.querySelectorAll('div');
      squares.forEach((square) => {
        square.style.border = border;
      });
    });
  }
}

function fillMainBoard(squareArray) {
  squareArray.forEach((squareRow) => {
    board.appendChild(squareRow);
  });
}

// generates a random integer between 0 and max, not including max
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}