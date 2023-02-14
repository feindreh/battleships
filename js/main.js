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
  if (player.human === false) {
    placeRandom(player);
  } else {
    showBoard(player, plCarrier);
  }
}

function placeRandom(player) {
  player.playerBoard.placeShip(ships.carrier(), [0, 0], 'right');
  player.playerBoard.placeShip(ships.battleship(), [0, 2], 'right');
  player.playerBoard.placeShip(ships.destroyer(), [0, 4], 'right');
  player.playerBoard.placeShip(ships.submarine(), [0, 6], 'right');
  player.playerBoard.placeShip(ships.patrolBoat(), [0, 8], 'right');
}

placeBattleship(Player1);
placeBattleship(Player2);

const undo = document.querySelector('#undo');
const rotate = document.querySelector('#rotate');
const start = document.querySelector('#start');
start.addEventListener('click', () => {
  startGame();
});

// placephase
let lastChange = 'nothing';
const activePlayer = Player1;
let lastCallback = plCarrier;
undo.addEventListener('click', () => {
  activePlayer.playerBoard.removeShip(lastChange);
  if (lastChange === 'nothing') { console.log('cant undo nothing'); } else {
    lastChange = getlastChangeminus(lastChange);
    lastCallback = getlastCallback(lastChange);
  }
  showBoard(activePlayer, lastCallback);
});

function plCarrier(square, player) {
  player.playerBoard.placeShip(ships.carrier(), [square.x, square.y], 'right');
  lastChange = 'carrier';
  lastCallback = plCarrier;
  showBoard(player, (square, player) => { plBattle(square, player); });
}

function plBattle(square, player) {
  player.playerBoard.placeShip(ships.battleship(), [square.x, square.y], 'right');
  lastChange = 'battleship';
  lastCallback = plBattle;
  showBoard(player, (square, player) => { plSub(square, player); });
}

function plSub(square, player) {
  player.playerBoard.placeShip(ships.submarine(), [square.x, square.y], 'right');
  lastChange = 'submarine';
  lastCallback = plSub;
  showBoard(player, (square, player) => { pldestroyer(square, player); });
}

function pldestroyer(square, player) {
  player.playerBoard.placeShip(ships.destroyer(), [square.x, square.y], 'right');
  lastChange = 'destroyer';
  lastCallback = pldestroyer;
  showBoard(player, (square, player) => { plpatrol(square, player); });
}

function plpatrol(square, player) {
  player.playerBoard.placeShip(ships.patrolBoat(), [square.x, square.y], 'right');
  lastChange = 'patrol boat';
  lastCallback = plpatrol;
  showBoard(player, (square) => { console.log(square); });
}

function getlastChangeminus(name) {
  let current;
  switch (name) {
    case 'carrier':
      current = 1;
      break;
    case 'battleship':
      current = 2;
      break;
    case 'submarine':
      current = 3;
      break;
    case 'destroyer':
      current = 4;
      break;
    case 'patrol boat':
      current = 5;
      break;
    default:
      throw 'switch name broken';
  }
  switch (current) {
    case 1:
      return 'nothing';
      break;
    case 2:
      return 'carrier';
      break;
    case 3:
      return 'battleship';
      break;
    case 4:
      return 'submarine';
      break;
    case 5:
      return 'destroyer';
      break;
    default:
      throw 'switch current broken';
  }
}

function getlastCallback(name) {
  let current;
  switch (name) {
    case 'nothing':
      current = 0;
      break;
    case 'carrier':
      current = 1;
      break;
    case 'battleship':
      current = 2;
      break;
    case 'submarine':
      current = 3;
      break;
    case 'destroyer':
      current = 4;
      break;
    case 'patrol boat':
      current = 5;
      break;
    default:
      throw 'switch callback name broken';
  }
  switch (current) {
    case 0:
      return plCarrier;
      break;
    case 1:
      return plBattle;
      break;
    case 2:
      return plSub;
      break;
    case 3:
      return pldestroyer;
      break;
    case 4:
      return plpatrol;
      break;
    default:
      throw 'switch callback current broken';
  }
}

function startGame() {
  undo.style.visibility = 'hidden';
  start.style.visibility = 'hidden';
  rotate.style.visibility = 'hidden';
  Gamelogic.startGame();
}
