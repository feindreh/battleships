import gameBoard from '../js/factory/gameboard';

test('is a 7x7 grid', () => {
  const Board = gameBoard();

  expect(Board.board.length).toBe(8);

  Board.board.forEach((row) => (
    expect(row.length).toBe(8)
  ));
});
