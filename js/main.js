import shipfactory from './factory/ships.js';
import Player from './factory/player.js';

const ships = shipfactory();

const Gamelogic = {
  Playerturn: true,
  makeTurn() {
    updateGameboard();
    this.changePlayer();
    if (this.Playerturn === false) { AI.attack(); }
  },
  changePlayer() {
    if (this.Playerturn) { this.Playerturn = false; } else { this.Playerturn = true; }
  },

};

const makeSquare = (square) => {
  const div = document.createElement('div');

  div.className = 'square';
  if (square.hit === true) {
    if (square.ship === null) { div.className = 'noshiphit'; } else { div.className = 'shiphit'; }
  }

  div.addEventListener('click', () => {
    if (square.hit === false) {
      square.getHit();
      Gamelogic.makeTurn();
    }
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

const Player1 = Player('Player');
const Player2 = Player('Computer');

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

const getRandomFreeField = (enemy) => {
  let count = 0;
  let x = Math.floor(Math.random() * 8);
  let y = Math.floor(Math.random() * 8);
  while (enemy.playerBoard.board[x][y].hit === true) {
    if (x === 9 && y === 9) { x = 0; y = 0; } else if (x === 9) { x = 0; y += 1; } else { x += 1; }
    count++;
    if (count >= 100) { throw 'no field left to hit'; }
  }
  return [x, y];
};

const computerAi = (Enemy) => ({
  Enemy,
  attack() {
    this.Enemy.getAttacked(getRandomFreeField(this.Enemy));
    Gamelogic.makeTurn();
  },

});

const AI = computerAi(Player1);

function updateGameboard() {
  const container = document.querySelector('#container');
  while (container.firstChild) {
    container.firstChild.remove();
  }
  const board1 = makePlayerBoard(Player1);
  const board2 = makePlayerBoard(Player2);
  container.append(board1, board2);
}

updateGameboard();
