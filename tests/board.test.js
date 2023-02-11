import gameBoard from '../js/factory/gameboard';

test('is a 10x10 grid', () => {
  const Board = gameBoard();

  expect(Board.board.length).toBe(10);

  Board.board.forEach((row) => (
    expect(row.length).toBe(10)
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

test('hit unhit square', () => {
  const Board = gameBoard();

  Board.receiveAttack([3, 4]);

  Board.board.forEach((row) => {
    row.forEach((square) => {
      if (square.x === 3 && square.y === 4) {
        expect(square.hit).toBe(true);
      } else {
        expect(square.hit).toBe(false);
      }
    });
  });
});

test('ship is alive', () => {
  const Board = gameBoard();
  const mock = {
    sunk: false,
  };
  Board.board[0][0].ship = mock;

  expect(Board.allSunk()).toBe(false);
});

test('ship still alive', () => {
  const Board = gameBoard();
  const mock = {
    sunk: true,
  };
  Board.board[0][0].ship = mock;
  expect(Board.allSunk()).toBe(true);
});
