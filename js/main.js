import shipfactory from './factory/ships.js';
import Player from './factory/player.js';

const makeSquare = (square) => {
  const div = document.createElement('div');

  div.className = 'square';

  div.addEventListener('click', () => {
    if (square.hit === false) { square.getHit(); }
    if (square.ship === null) { div.className = 'noshiphit'; }
    if (square.ship !== null) { div.className = 'shiphit'; }
  });
  return div;
};

const makeRow = () => {
  const row = document.createElement('div');
  row.className = 'row';
  return row;
};

const makePlayerBoard = (player) => {
  const container = document.createElement('div');
  container.className = 'gameBoard';

  for (let y = 9; y >= 0; y--) {
    const row = makeRow();
    for (let x = 0; x <= 9; x++) {
      row.append(makeSquare(player.playerBoard.board[x][y]));
    }
    container.append(row);
  }

  return container;
};

const ships = shipfactory();

const container = document.querySelector('#container');

const Player1 = Player('Player1');
const Player2 = Player('Player2');

Player1.playerBoard.placeShip(ships.battleship(), [0, 0], 'right');
Player1.playerBoard.placeShip(ships.carrier(), [0, 2], 'right');
Player1.playerBoard.placeShip(ships.destroyer(), [0, 4], 'right');
Player1.playerBoard.placeShip(ships.patrolBoat(), [0, 6], 'right');
Player1.playerBoard.placeShip(ships.submarine(), [0, 8], 'right');

Player2.playerBoard.placeShip(ships.battleship(), [0, 0], 'right');
Player2.playerBoard.placeShip(ships.carrier(), [0, 2], 'right');
Player2.playerBoard.placeShip(ships.destroyer(), [0, 4], 'right');
Player2.playerBoard.placeShip(ships.patrolBoat(), [0, 6], 'right');
Player2.playerBoard.placeShip(ships.submarine(), [0, 8], 'right');

container.append(makePlayerBoard(Player1));
container.append(makePlayerBoard(Player2));
