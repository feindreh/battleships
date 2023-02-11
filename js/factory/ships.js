const ship = () => ({
  name: undefined,
  length: undefined,
  hits: 0,
  sunk: false,
  hit() {
    this.hits += 1;
  },
  isSunk() {
    if (this.hits === this.length) { this.sunk = true; }
  },
  getAttackted() {
    if (this.sunk) { console.log(this.name, 'already sunk'); return; }
    this.hit();
    this.isSunk();
    if (this.sunk) { console.log(this.name, 'sunk'); }
  },

});

const destroyer = () => {
  const destro = ship();
  destro.name = 'destroyer';
  destro.length = 3;
  return destro;
};

export default destroyer;
