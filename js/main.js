import Gamelogic from './Gamelogic.js';
import Player from './factory/player.js';
import computerAi from './Ai.js';

const Player1 = Player('Player');
const Player2 = Player('Computer');
const AI = computerAi(Gamelogic, Player1);
Player2.human = false;

Gamelogic.player1 = Player1;
Gamelogic.player2 = Player2;
Gamelogic.AI = AI;

// Phase 1 Place

document.querySelector('#start').addEventListener('click', () => {
  Gamelogic.phaseTwo();
});

Gamelogic.bindUnDo(Gamelogic.player1);

Gamelogic.phaseOne();
