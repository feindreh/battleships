const square = (x, y) => ({
  // has information
  // if it was hit or not
  // if it has a ship on it and what ship it has on it
  x,
  y,
  hit: false,
  ship: null,
  getHit() {
    this.hit = true;
    if (this.ship !== null) {
      this.ship.getAttackted();
    }
  },
});

const makeBoard = () => {
  const newBoard = [];
  for (let x = 0; x <= 9; x++) {
    const row = [];
    for (let y = 0; y <= 9; y++) {
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

    // check for valid squares
    for (let i = 0; i < ship.length; i++) {
      if (x >= 10 || x < 0 || y >= 10 || y < 0) { throw 'Invalid place'; }
      if (this.board[x][y].ship !== null) { throw 'already a ship'; }

      if (direction === 'up') { y++; }
      if (direction === 'right') { x++; }
    }
    // place ship
    x = start[0];
    y = start[1];

    for (let i = 0; i < ship.length; i++) {
      this.board[x][y].ship = ship;
      if (direction === 'up') { y++; }
      if (direction === 'right') { x++; }
    }
  },
  receiveAttack(coordinates) {
    const x = coordinates[0];
    const y = coordinates[1];
    this.board[x][y].getHit();
  },
  allSunk() {
    let sunk = true;
    this.board.forEach((row) => {
      row.forEach((squa) => {
        if (squa.ship !== null) {
          if (squa.ship.sunk === false) { sunk = false; }
        }
      });
    });
    return sunk;
  },
});

export default gameBoard;
