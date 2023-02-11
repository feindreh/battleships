import gameBoard from '../js/factory/gameboard';

test('is a 8x8 grid', () => {
  const Board = gameBoard();

  expect(Board.board.length).toBe(8);

  Board.board.forEach((row) => (
    expect(row.length).toBe(8)
  ));
});

test('place Ship length 3 right', () => {
  const Board = gameBoard();
  const mock = {
    length: 3,
  };
  Board.placeShip(mock, [0, 0], 'right');

  Board.board.forEach((row) => {
    row.forEach((square) => {
      if ((square.x === 0 || square.x === 1 || square.x === 2) && square.y === 0) {
        expect(square.ship).toBe(mock);
      } else {
        expect(square.ship).toBe(null);
      }
    });
  });
});

test('place Ship length 3 up', () => {
  const Board = gameBoard();
  const mock = {
    length: 3,
  };
  Board.placeShip(mock, [3, 3], 'up');

  Board.board.forEach((row) => {
    row.forEach((square) => {
      if ((square.y === 3 || square.y === 4 || square.y === 5) && square.x === 3) {
        expect(square.ship).toBe(mock);
      } else {
        expect(square.ship).toBe(null);
      }
    });
  });
});
