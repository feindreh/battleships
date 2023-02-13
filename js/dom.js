const makeSquare = (square, logik) => {
  const div = document.createElement('div');

  div.className = 'square';
  if (square.hit === true) {
    if (square.ship === null) {
      div.className = 'noshiphit';
    } else if (square.ship.sunk) {
      div.className = 'shipsunk';
    } else { div.className = 'shiphit'; }
  }

  div.addEventListener('click', () => {
    if (square.hit === false) {
      square.getHit();
      logik.makeTurn();
    }
  });
  return div;
};

const makePlace = (square, player, cb) => {
  const div = document.createElement('div');

  div.className = 'square';
  if (square.ship !== null) {
    div.className = 'shipplaced';
  }

  div.addEventListener('click', () => {
    console.log(square);
    cb(player, square.x, square.y);
  });
  return div;
};

const makeRow = () => {
  const row = document.createElement('div');
  row.className = 'row';
  return row;
};

const makePlayerBoard = (player, logik) => {
  const container = document.createElement('div');
  container.id = `${player.name}`;
  container.className = 'gameBoard';

  for (let y = 9; y >= 0; y--) {
    const row = makeRow();
    for (let x = 0; x <= 9; x++) {
      row.append(makeSquare(player.playerBoard.board[x][y], logik));
    }
    container.append(row);
  }

  return container;
};

export function makeShowBoard(player, cb) {
  const container = document.createElement('div');
  container.id = 'showboard';
  container.className = 'gameBoard';

  for (let y = 9; y >= 0; y--) {
    const row = makeRow();
    for (let x = 0; x <= 9; x++) {
      row.append(makePlace(player.playerBoard.board[x][y], player, cb));
    }
    container.append(row);
  }

  return container;
}

export function updateGameboard(player1, player2, logik) {
  const container = document.querySelector('#container');
  while (container.firstChild) {
    container.firstChild.remove();
  }
  const board1 = makePlayerBoard(player1, logik);
  const board2 = makePlayerBoard(player2, logik);
  container.append(board2, board1);
}
