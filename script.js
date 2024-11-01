const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
const sudokuGrid = document.getElementById('sudoku-grid');

// Initialize the grid and create input cells
function initializeGrid() {
  sudokuGrid.innerHTML = '';
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 1;
      input.oninput = (e) => handleInput(e, row, col);
      cell.appendChild(input);
      sudokuGrid.appendChild(cell);
    }
  }
}

// Handle input for each cell
function handleInput(e, row, col) {
  const value = parseInt(e.target.value);
  if (isNaN(value) || value < 1 || value > 9) {
    e.target.value = '';
    grid[row][col] = 0;
  } else {
    grid[row][col] = value;
  }
}

// Reset the grid to start fresh
function resetGrid() {
  initializeGrid();
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      grid[row][col] = 0;
    }
  }
}

// Check if placing a number in a cell is valid
function isValid(row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
  }

  const boxRowStart = Math.floor(row / 3) * 3;
  const boxColStart = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[boxRowStart + i][boxColStart + j] === num) return false;
    }
  }
  return true;
}

// Sudoku solver using backtracking
function solve() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(row, col, num)) {
            grid[row][col] = num;
            if (solve()) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Populate the UI with solved grid
function updateGrid() {
  const cells = sudokuGrid.querySelectorAll('input');
  let index = 0;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      cells[index].value = grid[row][col] || '';
      index++;
    }
  }
}

// Trigger the solver and display the solution
function solveSudoku() {
  if (solve()) updateGrid();
  else alert('No solution exists!');
}

initializeGrid();
