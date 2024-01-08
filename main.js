const MAIN_BOARD_WIDTH = 480;
const board = document.querySelector('#mainBoard');

// MAIN CODE
let squareArray = createSquareArray(16);
fillMainBoard(16, squareArray);

function createSquareArray(gridWidth) {
  let squareArray = []
  
  for (let i = 0; i < gridWidth * gridWidth; i++) {
    const square = document.createElement('div');
    square.style.cssText = `width: ${MAIN_BOARD_WIDTH / gridWidth}px; height: ${MAIN_BOARD_WIDTH / gridWidth}px`;
    square.style.boxSizing = 'border-box';
    square.style.border = '1px solid black';
    squareArray.push(square);
  }

  return squareArray;
}

function fillMainBoard(gridWidth, squareArray) {
  for (let i = 0; i < gridWidth * gridWidth; i++)
    board.appendChild(squareArray[i]);
} 
