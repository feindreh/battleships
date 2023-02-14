const DragDrop = {
  targetX: undefined,
  targetY: undefined,
  start: undefined,
};

function dragShip(length, direction) {
  const ship = document.createElement('div');

  if (direction === 'right') {
    for (let i = 0; i < length; i++) {
      const block = document.createElement('div');
      block.addEventListener('mousedown', () => {
        console.log(i);
        DragDrop.start = i;
      });
      block.className = 'shipplaced';
      ship.append(block);
    }
  } else {
    for (let i = length - 1; i >= 0; i--) {
      const block = document.createElement('div');
      block.addEventListener('mousedown', () => {
        console.log(i);
        DragDrop.start = i;
      });
      block.className = 'shipplaced';
      ship.append(block);
    }
  }

  ship.className = 'dragQueen';
  ship.style.display = 'flex';
  ship.draggable = 'true';
  ship.style.width = 'fit-content';
  ship.style.cursor = 'move';
  ship.addEventListener('dragstart', () => {
    console.log('hey');
  });
  ship.addEventListener('dragend', () => {
    let x = DragDrop.targetX;
    let y = DragDrop.targetY;

    if (direction === 'up') {
      y -= DragDrop.start;
    } else { x -= DragDrop.start; }

    const board = document.querySelector('.gameBoard');
    let ycount = 9;
    let xcount = 0;
    board.childNodes.forEach((row) => {
      if (ycount === y) {
        row.childNodes.forEach((sq) => {
          if (xcount === x) {
            console.log(x, y);
            sq.click();
          }
          xcount++;
        });
      }
      ycount--;
    });
  });
  if (direction === 'up') { ship.style['flex-direction'] = 'column'; }
  return ship;
}

export { DragDrop };

export default dragShip;
