import dragShip from './generateShip.js';

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
export function updateGameboard(player1, player2, logik) {
  const container = document.querySelector('#container');
  while (container.firstChild) {
    container.firstChild.remove();
  }
  const board1 = makePlayerBoard(player1, logik);
  const board2 = makePlayerBoard(player2, logik);
  container.append(board2, board1);
}

const makeShowSquare = (square, callback, player) => {
  const div = document.createElement('div');

  if (square.ship !== null) { div.className = 'shipplaced'; } else {
    div.className = 'square';
  }

  div.addEventListener('click', () => {
    callback(square, player);
  });
  return div;
};
function deleteChildren(target) {
  while (target.firstChild) {
    target.firstChild.remove();
  }
}
export function showBoard(player, callback, length, direction) {
  const container = document.querySelector('#container');
  deleteChildren(container);
  const Board = player.playerBoard.board;
  const wrap = document.createElement('div');
  wrap.className = 'gameBoard';
  for (let y = 9; y >= 0; y--) {
    const row = makeRow();
    for (let x = 0; x < Board.length; x++) {
      row.append(makeShowSquare(Board[x][y], callback, player));
    }
    wrap.append(row);
  }
  container.append(wrap);
  deleteChildren(document.querySelector('#dragwrap'));
  document.querySelector('#dragwrap').append(dragShip(length, direction));
}
