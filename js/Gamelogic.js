import { updateGameboard } from './dom.js';

const Gamelogic = {
  Playerturn: true,
  makeTurn() {
    this.updateGameboard(this.player1, this.player2, this);
    this.changePlayer();
    if (this.Playerturn === false) { this.AI.attack(); }
    const winner = this.checkWinner();
    console.log(winner);
    if (winner) { console.log(winner, 'won'); resetGame(); }
  },
  changePlayer() {
    if (this.Playerturn) { this.Playerturn = false; } else { this.Playerturn = true; }
  },
  checkWinner() {
    if (this.player1.playerBoard.allSunk()) { return 'Player2'; }
    if (this.player2.playerBoard.allSunk()) { return 'Player1'; }
    return false;
  },
  updateGameboard,
  player1: undefined,
  player2: undefined,
  AI: undefined,
  ships: undefined,
  placeShips(player) {
    if (player.human === false) { this.placeRandomShips(player); }
    this.place(player);
  },
  placeRandomShips(player) {
    player.playerBoard.placeShip(this.ships.battleship(), [2, 0], 'right');
    player.playerBoard.placeShip(this.ships.carrier(), [2, 2], 'right');
    player.playerBoard.placeShip(this.ships.destroyer(), [2, 4], 'right');
    player.playerBoard.placeShip(this.ships.patrolBoat(), [0, 6], 'right');
    player.playerBoard.placeShip(this.ships.submarine(), [0, 8], 'right');
  },
  place(player) {
    // generate board
  },

};

function resetGame() {
  console.log('game reset');
}

export default Gamelogic;
