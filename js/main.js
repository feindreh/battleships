import shipfactory from './factory/ships.js';
import Gamelogic from './Gamelogic.js';
import Player from './factory/player.js';
import computerAi from './Ai.js';
import { makeShowBoard } from './dom.js';

const ships = shipfactory();

const Player1 = Player('Player');
const Player2 = Player('Computer');
const AI = computerAi(Gamelogic, Player1);
Player2.human = false;

Gamelogic.player1 = Player1;
Gamelogic.player2 = Player2;
Gamelogic.AI = AI;
Gamelogic.ships = ships;

function placeRandomShips(player) {
  player.playerBoard.placeShip(ships.battleship(), [2, 0], 'right');
  player.playerBoard.placeShip(ships.carrier(), [2, 2], 'right');
  player.playerBoard.placeShip(ships.destroyer(), [2, 4], 'right');
  player.playerBoard.placeShip(ships.patrolBoat(), [0, 6], 'right');
  player.playerBoard.placeShip(ships.submarine(), [0, 8], 'right');
}

function placeShips(player) {
  if (player.human === false) { placeRandomShips(player); } else {
    place(player);
  }
  // click => show new ship placed

  // confirm => return value (Promise ??)
}

function refresh(player) {
  const container = document.querySelector('#container');
  while (container.firstChild) {
    container.firstChild.remove();
  }
  container.append(makeShowBoard(player, cb));
}

function cb(player, x, y) {
  player.playerBoard.placeShip(ships.battleship(), [x, y], 'right');
  refresh(player);
}

function place(player) {
  const container = document.querySelector('#container');
  container.append(makeShowBoard(player, cb));
}

placeShips(Player1);
placeShips(Player2);
