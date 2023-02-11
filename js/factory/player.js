import makeBoard from './gameboard.js';

const Player = (name) => ({
  name,
  playerBoard: makeBoard(),
  getAttacked(coords) {
    this.playerBoard.receiveAttack(coords);
  },
  attack(target, coord) {
    target.getAttacked(coord);
  },

});

export default Player;
