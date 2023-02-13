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
};

function resetGame() {
  console.log('game reset');
}

export default Gamelogic;
