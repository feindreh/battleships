import shipfactory from './factory/ships.js';
import Gamelogic from './Gamelogic.js';
import Player from './factory/player.js';

const ships = shipfactory();

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
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);
  while (enemy.playerBoard.board[x][y].hit === true) {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    count++;
    if (count >= 20) { break; }
  }
  while (enemy.playerBoard.board[x][y].hit === true) {
    if (x === 9 && y === 9) { x = 0; y = 0; } else if (x === 9) { x = 0; y += 1; } else { x += 1; }
    count++;
    if (count >= 130) { throw 'no field left to hit'; }
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

Gamelogic.player1 = Player1;
Gamelogic.player2 = Player2;
Gamelogic.AI = AI;
Gamelogic.updateGameboard(Player1, Player2, Gamelogic);
