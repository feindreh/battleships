import shipfactory from './factory/ships.js';
import { showBoard } from './dom.js';

function placeRandom(player) {
  player.playerBoard.placeShip(shipfactory().carrier(), [0, 0], 'right');
  player.playerBoard.placeShip(shipfactory().battleship(), [0, 2], 'right');
  player.playerBoard.placeShip(shipfactory().destroyer(), [0, 4], 'right');
  player.playerBoard.placeShip(shipfactory().submarine(), [0, 6], 'right');
  player.playerBoard.placeShip(shipfactory().patrolBoat(), [0, 8], 'right');
}
function plCarrier(square, player) {
  player.playerBoard.placeShip(shipfactory().carrier(), [square.x, square.y], 'right');
  lastChange = 'carrier';
  lastCallback = plCarrier;
  showBoard(player, (square, player) => { plBattle(square, player); });
}

function plBattle(square, player) {
  player.playerBoard.placeShip(shipfactory().battleship(), [square.x, square.y], 'right');
  lastChange = 'battleship';
  lastCallback = plBattle;
  showBoard(player, (square, player) => { plSub(square, player); });
}

function plSub(square, player) {
  player.playerBoard.placeShip(shipfactory().submarine(), [square.x, square.y], 'right');
  lastChange = 'submarine';
  lastCallback = plSub;
  showBoard(player, (square, player) => { pldestroyer(square, player); });
}

function pldestroyer(square, player) {
  player.playerBoard.placeShip(shipfactory().destroyer(), [square.x, square.y], 'right');
  lastChange = 'destroyer';
  lastCallback = pldestroyer;
  showBoard(player, (square, player) => { plpatrol(square, player); });
}

function plpatrol(square, player) {
  player.playerBoard.placeShip(shipfactory().patrolBoat(), [square.x, square.y], 'right');
  lastChange = 'patrol boat';
  lastCallback = plpatrol;
  showBoard(player, (square) => { console.log(square); });
}

function placeBattleship(player) {
  if (player.human === false) {
    placeRandom(player);
  } else {
    showBoard(player, plCarrier);
  }
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

let lastChange = 'nothing';
let lastCallback = plCarrier;

function undoButton(player) {
  document.querySelector('#undo').addEventListener('click', () => {
    player.playerBoard.removeShip(lastChange);
    if (lastChange === 'nothing') { console.log('cant undo nothing'); } else {
      lastChange = getlastChangeminus(lastChange);
      lastCallback = getlastCallback(lastChange);
    }
    showBoard(player, lastCallback);
  });
}

export default placeBattleship;
export { undoButton };
