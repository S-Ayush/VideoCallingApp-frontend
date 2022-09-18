const getPawn = (row, col, coverdPositions) => {
  let possibleMoves = [];
  if (!coverdPositions[row + 1 + col]) {
    possibleMoves.push({ row: row + 1, col });
    if (row === 2) {
      possibleMoves.push({ row: row + 2, col });
    }
  }
  if (coverdPositions[row + 1 + String.fromCharCode(col.charCodeAt() + 1)]) {
    possibleMoves.push({
      row: row + 1,
      col: String.fromCharCode(col.charCodeAt() + 1),
    });
  }
  if (coverdPositions[row + 1 + String.fromCharCode(col.charCodeAt() - 1)]) {
    possibleMoves.push({
      row: row + 1,
      col: String.fromCharCode(col.charCodeAt() - 1),
    });
  }
  return possibleMoves;
};

const getRook = (row, col, coverdPositions) => {
  let possibleMoves = [];
  for (let i = row + 1; i <= 8; i++) {
    possibleMoves.push({ row: i, col });
    if (coverdPositions[i + col]) {
      break;
    }
  }
  for (let i = col.charCodeAt() + 1; i <= 104; i++) {
    possibleMoves.push({ row, col: String.fromCharCode(i) });
    if (coverdPositions[row + String.fromCharCode(i)]) {
      break;
    }
  }
  for (let i = row - 1; i >= 1; i--) {
    possibleMoves.push({ row: i, col });
    if (coverdPositions[i + col]) {
      break;
    }
  }
  for (let i = col.charCodeAt() - 1; i >= 97; i--) {
    possibleMoves.push({ row, col: String.fromCharCode(i) });
    if (coverdPositions[row + String.fromCharCode(i)]) {
      break;
    }
  }
  return possibleMoves;
};

const getKnight = (row, col) => {
  let possibleMoves = [];
  possibleMoves.push({
    row: row + 2,
    col: String.fromCharCode(col.charCodeAt() + 1),
  });
  possibleMoves.push({
    row: row - 2,
    col: String.fromCharCode(col.charCodeAt() + 1),
  });
  possibleMoves.push({
    row: row + 2,
    col: String.fromCharCode(col.charCodeAt() - 1),
  });
  possibleMoves.push({
    row: row - 2,
    col: String.fromCharCode(col.charCodeAt() - 1),
  });
  possibleMoves.push({
    row: row + 1,
    col: String.fromCharCode(col.charCodeAt() + 2),
  });
  possibleMoves.push({
    row: row + 1,
    col: String.fromCharCode(col.charCodeAt() - 2),
  });
  possibleMoves.push({
    row: row - 1,
    col: String.fromCharCode(col.charCodeAt() + 2),
  });
  possibleMoves.push({
    row: row - 1,
    col: String.fromCharCode(col.charCodeAt() - 2),
  });
  return possibleMoves;
};

const getBishop = (row, col, coverdPositions) => {
  let possibleMoves = [];
  for (let i = row + 1, j = col.charCodeAt() + 1; i <= 8, j <= 104; i++, j++) {
    possibleMoves.push({ row: i, col: String.fromCharCode(j) });
    if (coverdPositions[i + String.fromCharCode(j)]) {
      break;
    }
  }
  for (let i = row + 1, j = col.charCodeAt() - 1; i <= 8, j >= 97; i++, j--) {
    possibleMoves.push({ row: i, col: String.fromCharCode(j) });
    if (coverdPositions[i + String.fromCharCode(j)]) {
      break;
    }
  }
  for (let i = row - 1, j = col.charCodeAt() + 1; i >= 1, j <= 104; i--, j++) {
    possibleMoves.push({ row: i, col: String.fromCharCode(j) });
    if (coverdPositions[i + String.fromCharCode(j)]) {
      break;
    }
  }
  for (let i = row - 1, j = col.charCodeAt() - 1; i >= 1, j >= 97; i--, j--) {
    possibleMoves.push({ row: i, col: String.fromCharCode(j) });
    if (coverdPositions[i + String.fromCharCode(j)]) {
      break;
    }
  }
  return possibleMoves;
};

const getQueen = (row, col, coverdPositions) => {
  let possibleMoves = [];
  for (let i = row + 1; i <= 8; i++) {
    possibleMoves.push({ row: i, col });
    if (coverdPositions[i + col]) {
      break;
    }
  }
  for (let i = col.charCodeAt() + 1; i <= 104; i++) {
    possibleMoves.push({ row, col: String.fromCharCode(i) });
    if (coverdPositions[row + String.fromCharCode(i)]) {
      break;
    }
  }
  for (let i = row - 1; i >= 1; i--) {
    possibleMoves.push({ row: i, col });
    if (coverdPositions[i + col]) {
      break;
    }
  }
  for (let i = col.charCodeAt() - 1; i >= 97; i--) {
    possibleMoves.push({ row, col: String.fromCharCode(i) });
    if (coverdPositions[row + String.fromCharCode(i)]) {
      break;
    }
  }
  for (let i = row + 1, j = col.charCodeAt() + 1; i <= 8, j <= 104; i++, j++) {
    possibleMoves.push({ row: i, col: String.fromCharCode(j) });
    if (coverdPositions[i + String.fromCharCode(j)]) {
      break;
    }
  }
  for (let i = row + 1, j = col.charCodeAt() - 1; i <= 8, j >= 97; i++, j--) {
    possibleMoves.push({ row: i, col: String.fromCharCode(j) });
    if (coverdPositions[i + String.fromCharCode(j)]) {
      break;
    }
  }
  for (let i = row - 1, j = col.charCodeAt() + 1; i >= 1, j <= 104; i--, j++) {
    possibleMoves.push({ row: i, col: String.fromCharCode(j) });
    if (coverdPositions[i + String.fromCharCode(j)]) {
      break;
    }
  }
  for (let i = row - 1, j = col.charCodeAt() - 1; i >= 1, j >= 97; i--, j--) {
    possibleMoves.push({ row: i, col: String.fromCharCode(j) });
    if (coverdPositions[i + String.fromCharCode(j)]) {
      break;
    }
  }
  return possibleMoves;
};

const getKing = (row, col) => {
  let possibleMoves = [];
  possibleMoves.push({ row: row + 1, col });
  possibleMoves.push({ row: row - 1, col });
  possibleMoves.push({
    row: row,
    col: String.fromCharCode(col.charCodeAt() + 1),
  });
  possibleMoves.push({
    row: row,
    col: String.fromCharCode(col.charCodeAt() - 1),
  });
  possibleMoves.push({
    row: row + 1,
    col: String.fromCharCode(col.charCodeAt() + 1),
  });
  possibleMoves.push({
    row: row - 1,
    col: String.fromCharCode(col.charCodeAt() - 1),
  });
  possibleMoves.push({
    row: row - 1,
    col: String.fromCharCode(col.charCodeAt() + 1),
  });
  possibleMoves.push({
    row: row + 1,
    col: String.fromCharCode(col.charCodeAt() - 1),
  });
  return possibleMoves;
};

const getPieceAvailablePositions = (piece, row, col, coverdPositions) => {
  const pickedPiece =
    piece === "king" || piece === "queen"
      ? piece
      : piece.substring(0, piece.length - 1);
  switch (pickedPiece) {
    case "pawn":
      return getPawn(row, col, coverdPositions);
    case "rook": {
      return getRook(row, col, coverdPositions);
    }
    case "knight": {
      return getKnight(row, col);
    }
    case "bishop": {
      return getBishop(row, col, coverdPositions);
    }
    case "queen": {
      return getQueen(row, col, coverdPositions);
    }
    case "king": {
      return getKing(row, col);
    }
    default:
      return null;
  }
};

export default getPieceAvailablePositions;
