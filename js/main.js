import Player from './factory/player.js';
import shipfactory from './factory/ships.js';

const Player1 = Player('Player1');

const container = document.querySelector('#container');

const makeSquare = (square) => {
  const div = document.createElement('div');
  div.className = 'square';
  div.addEventListener('click', () => {
    if (square.hit) {
      console.log('square already hit');
    } else {
      square.getHit();
      if (square.ship === null) {
        div.style.backgroundColor = 'grey';
      } else {
        div.style.backgroundColor = 'red';
      }
    }
  });
  return div;
};

const makeRow = () => {
  const row = document.createElement('div');
  row.className = 'row';
  return row;
};

for (let y = 9; y >= 0; y--) {
  const row = makeRow();
  for (let x = 0; x <= 9; x++) {
    row.append(makeSquare(Player1.playerBoard.board[x][y]));
  }
  container.append(row);
}

const ships = shipfactory();

Player1.playerBoard.placeShip(ships.battleship(), [0, 0], 'right');
Player1.playerBoard.placeShip(ships.carrier(), [0, 2], 'right');
Player1.playerBoard.placeShip(ships.destroyer(), [0, 4], 'right');
Player1.playerBoard.placeShip(ships.patrolBoat(), [0, 6], 'right');
Player1.playerBoard.placeShip(ships.submarine(), [0, 8], 'right');
