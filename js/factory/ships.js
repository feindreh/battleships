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

const shipfactory = () => ({
  carrier() {
    const destro = ship();
    destro.name = 'carrier';
    destro.length = 5;
    return destro;
  },
  battleship() {
    const destro = ship();
    destro.name = 'battleship';
    destro.length = 4;
    return destro;
  },
  submarine() {
    const destro = ship();
    destro.name = 'submarine';
    destro.length = 3;
    return destro;
  },
  destroyer() {
    const destro = ship();
    destro.name = 'destroyer';
    destro.length = 3;
    return destro;
  },
  patrolBoat() {
    const destro = ship();
    destro.name = 'patrol boat';
    destro.length = 2;
    return destro;
  },
});

export default shipfactory;
