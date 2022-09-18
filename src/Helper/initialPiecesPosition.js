const iniitialPiecesPosition = (color) => {
  return {
    [color === "black" ? "black" : "white"]: {
      pawn1: { row: 2, col: "a" },
      pawn2: { row: 2, col: "b" },
      pawn3: { row: 2, col: "c" },
      pawn4: { row: 2, col: "d" },
      pawn5: { row: 2, col: "e" },
      pawn6: { row: 2, col: "f" },
      pawn7: { row: 2, col: "g" },
      pawn8: { row: 2, col: "h" },
      rook1: { row: 1, col: "a" },
      rook2: { row: 1, col: "h" },
      knight1: { row: 1, col: "b" },
      knight2: { row: 1, col: "g" },
      bishop1: { row: 1, col: "c" },
      bishop2: { row: 1, col: "f" },
      queen: { row: 1, col: "d" },
      king: { row: 1, col: "e" },
    },
    [color === "black" ? "white" : "black"]: {
      pawn1: { row: 7, col: "a" },
      pawn2: { row: 7, col: "b" },
      pawn3: { row: 7, col: "c" },
      pawn4: { row: 7, col: "d" },
      pawn5: { row: 7, col: "e" },
      pawn6: { row: 7, col: "f" },
      pawn7: { row: 7, col: "g" },
      pawn8: { row: 7, col: "h" },
      rook1: { row: 8, col: "a" },
      rook2: { row: 8, col: "h" },
      knight1: { row: 8, col: "b" },
      knight2: { row: 8, col: "g" },
      bishop1: { row: 8, col: "c" },
      bishop2: { row: 8, col: "f" },
      queen: { row: 8, col: "d" },
      king: { row: 8, col: "e" },
    },
  };
};

export default iniitialPiecesPosition;
