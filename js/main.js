import Player from './factory/player.js';

const Player1 = Player('Player1');

const container = document.querySelector('#container');

const makeSquare = (square) => {
  const div = document.createElement('div');
  div.className = 'square';
  div.addEventListener('click', () => {
    console.log(square);
  });
  return div;
};

const makeRow = () => {
  const row = document.createElement('div');
  row.className = 'row';
  return row;
};

for (let y = 7; y >= 0; y--) {
  const row = makeRow();
  for (let x = 0; x <= 7; x++) {
    row.append(makeSquare(Player1.playerBoard.board[x][y]));
  }
  container.append(row);
}
