import shipfactory from './factory/ships.js';
import Gamelogic from './Gamelogic.js';
import Player from './factory/player.js';
import computerAi from './Ai.js';

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

const AI = computerAi(Gamelogic, Player1);

Gamelogic.player1 = Player1;
Gamelogic.player2 = Player2;
Gamelogic.AI = AI;
Gamelogic.updateGameboard(Player1, Player2, Gamelogic);
