const square = (x, y) => ({
  // has information
  // if it was hit or not
  // if it has a ship on it and what ship it has on it
  x,
  y,
  hit: false,
  ship: null,
});

const makeBoard = () => {
  const newBoard = [];
  for (let x = 0; x <= 7; x++) {
    const row = [];
    for (let y = 0; y <= 7; y++) {
      row.push(square(x, y));
    }
    newBoard.push(row);
  }
  return newBoard;
};

const gameBoard = () => ({
  board: makeBoard(),
  placeShip(ship, start, direction) {
    // direction => up or right
    let x = start[0];
    let y = start[1];

    for (let i = 0; i < ship.length; i++) {
      this.board[x][y].ship = ship;
      if (direction === 'up') { y++; }
      if (direction === 'right') { x++; }
    }
  },
});

export default gameBoard;
