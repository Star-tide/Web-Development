/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
let WIDTH = parseInt(document.querySelector('#width').value);
let HEIGHT = parseInt(document.querySelector('#height').value);
let currPlayer = 1; // active player: 1 or 2
let board = [];
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

// makeBoard dynamically creates the required array set to make a functional HTML board.
// You can pass in any width and height which will allow you to make any sized board

const startGame = document.querySelector('#submit');
startGame.addEventListener('click', function (e) {
  e.preventDefault();
  const htmlBoard = document.querySelector('#board');
  while (htmlBoard.firstChild) {
    htmlBoard.removeChild(htmlBoard.firstChild);
}
  WIDTH = parseInt(document.querySelector('#width').value);
  HEIGHT = parseInt(document.querySelector('#height').value);
  document.querySelector("#title").innerText = 'Player 1 GO!'
  board = [];
  currPlayer = 1;
  makeHtmlBoard();
})

const makeBoard = () => {
  /* This original code wouldnt work, and im not sure why, 
  going to review with live */
  // let thickness = [];
  // let width = WIDTH;
  // let height = HEIGHT;
  // while (width > 0){
  //   thickness.push();
  //   width--;
  // }
  // while (height > 0) {
  //   board.push(thickness);
  //   height--;
  // }
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  //get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board');
  // run the makeBoard function with user generated size
  makeBoard();
  // This creates the clickable game tiles that will handle generating game peices
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // loops through each cell for the width of the board
  for (let x = 0; x < WIDTH; x++) {
   const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // loops through the creation of each cell for the height of the board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
  htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  /* Needed solution for this. Was unable to really understand how to go about
  saving memory using board[][] until I used console.log to figure out
  what was going on. */
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;

}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  /* at first I chose to modify the html tile itself and adjust its border radius
  using CSS which still 'placed' the chips but got rid of the squares and
  only showed the chips. After reviewing the solution, appending a chip
  to the tile worked better and looks cleaner */
  const chip = document.createElement('div');
  chip.classList.add('piece', `p${currPlayer}`)
  const tile = document.getElementById(`${y}-${x}`);
  tile.append(chip);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  /* Got my program working, but couldnt figure out why y always ended up being 6
  whenever I placed a peice. Causing the placed chips to be awkward
  after looking at the solution, I found out that the memory of the game
  was really just an array containing the player #s for each tile. This
  did not make sense until after hours of frustration. I do understand it now */
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin() === true) {
    /* After reviewing the solution I decided that testing and changing
    current player should go here instead of outside the if statement.
    Makes more sense to me personally */
    return endGame(`Player ${currPlayer} won!`);
  } else {
    currPlayer = currPlayer != 1 ? 1 : 2;
    document.querySelector("#title").innerText = `Player ${currPlayer} GO!`
  }

  // check for tie
  /* had no idea how to do this, also had to use the solution */
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      /* four let statements set the standard parameters for _win conditions */
      // takes the y,x points and checks tiles horizontally
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // takes y,x and looks at the tiles to the left and right
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // takes y,x and checks tiles diagonally to the right
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // takes y,x and checks tiles diagonally to the left
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // returns true if ANY parameter is returned true
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}
