import shipfactory from './factory/ships.js';
import Gamelogic from './Gamelogic.js';
import Player from './factory/player.js';
import computerAi from './Ai.js';
import { showBoard } from './dom.js';

const ships = shipfactory();

const Player1 = Player('Player');
const Player2 = Player('Computer');
const AI = computerAi(Gamelogic, Player1);
Player2.human = false;

Gamelogic.player1 = Player1;
Gamelogic.player2 = Player2;
Gamelogic.AI = AI;
Gamelogic.ships = ships;

// Phase 1 Place

function placeBattleship(player) {
  showBoard(player, plCarrier);
}

placeBattleship(Player1);

function plCarrier(square, player) {
  player.playerBoard.placeShip(ships.carrier(), [square.x, square.y], 'right');
  showBoard(player, (square, player) => { plBattle(square, player); });
}

function plBattle(square, player) {
  player.playerBoard.placeShip(ships.battleship(), [square.x, square.y], 'right');
  showBoard(player, (square, player) => { plSub(square, player); });
}

function plSub(square, player) {
  player.playerBoard.placeShip(ships.submarine(), [square.x, square.y], 'right');
  showBoard(player, (square, player) => { pldestroyer(square, player); });
}

function pldestroyer(square, player) {
  player.playerBoard.placeShip(ships.destroyer(), [square.x, square.y], 'right');
  showBoard(player, (square, player) => { plpatrol(square, player); });
}

function plpatrol(square, player) {
  player.playerBoard.placeShip(ships.patrolBoat(), [square.x, square.y], 'right');
  showBoard(player, (square) => { console.log(square); });
}
