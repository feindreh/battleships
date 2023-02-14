import { updateGameboard } from './dom.js';
import placeBattleship, { undoButton } from './placeships.js';

const Gamelogic = {
  Playerturn: true,
  makeTurn() {
    this.updateGameboard(this.player1, this.player2, this);
    this.changePlayer();
    if (this.Playerturn === false) { this.AI.attack(); }
    const winner = this.checkWinner();
    if (winner) { console.log(winner, 'won'); this.phaseThree(); }
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
  phaseOne() {
    document.querySelector('#undo').style.visibility = 'visible';
    document.querySelector('#rotate').style.visibility = 'visible';
    document.querySelector('#start').style.visibility = 'visible';
    placeBattleship(this.player1);
    placeBattleship(this.player2);
  },
  phaseTwo() {
    document.querySelector('#undo').style.visibility = 'hidden';
    document.querySelector('#rotate').style.visibility = 'hidden';
    document.querySelector('#start').style.visibility = 'hidden';
    this.updateGameboard(this.player1, this.player2, this);
  },
  phaseThree() {
    document.querySelector('#blackbox').style.visibility = 'visible';
    document.querySelector('#prompt').style.visibility = 'visible';
  },
  bindUnDo(player) {
    undoButton(player);
  },
};

export default Gamelogic;
