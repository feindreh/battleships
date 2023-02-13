import gameBoard from './gameboard.js';

const Player = (name) => ({
  name,
  playerBoard: gameBoard(),
  getAttacked(coords) {
    this.playerBoard.receiveAttack(coords);
  },
  attack(target, coord) {
    target.getAttacked(coord);
  },
  human: true,

});

export default Player;
