import shipfactory from './factory/ships.js';
import Gamelogic from './Gamelogic.js';
import Player from './factory/player.js';
import computerAi from './Ai.js';

const ships = shipfactory();

const Player1 = Player('Player');
const Player2 = Player('Computer');
const AI = computerAi(Gamelogic, Player1);
Player2.human = false;

Gamelogic.player1 = Player1;
Gamelogic.player2 = Player2;
Gamelogic.AI = AI;
Gamelogic.ships = ships;

Gamelogic.placeShips(Player1);
Gamelogic.placeShips(Player2);

// After Ship placement

// Gamelogic.updateGameboard(Player1, Player2, Gamelogic);
