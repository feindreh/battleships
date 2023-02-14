function dragShip(length, direction) {
  const ship = document.createElement('div');
  for (let i = 0; i < length; i++) {
    const block = document.createElement('div');
    block.className = 'shipplaced';
    ship.append(block);
  }
  ship.className = 'dragQueen';
  ship.style.display = 'flex';
  if (direction === 'up') { ship.style['flex-direction'] = 'column'; }
  return ship;
}

export default dragShip;
