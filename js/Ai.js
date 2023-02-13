const getRandomFreeField = (enemy) => {
  let count = 0;
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);
  while (enemy.playerBoard.board[x][y].hit === true) {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    count++;
    if (count >= 20) { break; }
  }
  while (enemy.playerBoard.board[x][y].hit === true) {
    if (x === 9 && y === 9) { x = 0; y = 0; } else if (x === 9) { x = 0; y += 1; } else { x += 1; }
    count++;
    if (count >= 130) { throw 'no field left to hit'; }
  }
  return [x, y];
};

const computerAi = (Logik, Enemy) => ({
  Enemy,
  attack() {
    this.Enemy.getAttacked(getRandomFreeField(this.Enemy));
    Logik.makeTurn();
  },

});

export default computerAi;
