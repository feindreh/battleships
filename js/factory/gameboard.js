const square = () => ({
  // has information
  // if it was hit or not
  // if it has a ship on it and what ship it has on it
  hit: false,
  ship: null,
});

const makeBoard = () => {
  const newBoard = [];
  for (let x = 0; x <= 7; x++) {
    const row = [];
    for (let y = 0; y <= 7; y++) {
      row.push(square());
    }
    newBoard.push(row);
  }
  return newBoard;
};

const gameBoard = () => ({
  board: makeBoard(),
});

export default gameBoard;
