import React, { useEffect, useState } from "react";
import piecesNames from "../../Helper/piecesNames";
import "./ChessBoard.scss";

function ChessBoard() {
  const column = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const rows = [8, 7, 6, 5, 4, 3, 2, 1];
  const [pickedPiece, setPickedPiece] = useState(null);
  const [cellPositions, setCellPositions] = useState({});
  const [PiecesPositions, setPiecesPosition] = useState({
    black: {
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
    white: {
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
  });
  const [deadStack, setDeadStack] = useState({
    white: [],
    black: [],
  });
  const [turn, setTurn] = useState("white");

  useEffect(() => {
    let _cellPositions = {};
    Object.keys(PiecesPositions).forEach((color) => {
      Object.entries(PiecesPositions[color]).forEach((pieceEntry) => {
        _cellPositions = {
          ..._cellPositions,
          [pieceEntry[1].row + pieceEntry[1].col]: {
            color,
            piece: pieceEntry[0],
            img: piecesNames[color][pieceEntry[0]],
          },
        };
      });
    });
    setCellPositions({ ..._cellPositions });
  }, [PiecesPositions]);

  const handelCellClick = (color = null, piece = null, row, col) => {
    if (!pickedPiece && color && piece && turn === color) {
      setPickedPiece({ color, piece, row, col });
    } else if (pickedPiece && color && piece) {
      if (pickedPiece.color === color) {
        setPickedPiece({ color, piece, row, col });
      } else {
        const { [piece]: removedPiece, ...remainingPieces } =
          PiecesPositions[color];
        setPiecesPosition({
          ...PiecesPositions,
          [pickedPiece.color]: {
            ...PiecesPositions[pickedPiece.color],
            [pickedPiece.piece]: { row, col },
          },
          [color]: {
            ...remainingPieces,
          },
        });
        setPickedPiece(null);
        setDeadStack({
          ...deadStack,
          [color]: [...deadStack[color], cellPositions[row + col]],
        });
        setTurn(turn === "white" ? "black" : "white");
      }
    } else if (pickedPiece && !color && !piece) {
      setPiecesPosition({
        ...PiecesPositions,
        [pickedPiece.color]: {
          ...PiecesPositions[pickedPiece.color],
          [pickedPiece.piece]: { row, col },
        },
      });
      setPickedPiece(null);
      setTurn(turn === "white" ? "black" : "white");
    }
  };

  return (
    <div className="chessArea">
      <div className="WhiteDeadStack">
        {deadStack.white.map((piece) => (
          <div className="deadPeace">
            <img src={piece.img} />
          </div>
        ))}
      </div>
      <div className="Board">
        {rows.map((row, rowIndex) => (
          <>
            {column.map((col, colIndex) => (
              <div
                className={`cell ${
                  (rowIndex + colIndex) % 2 === 0 ? "white" : "black"
                }`}
                id={col + row}
                style={{
                  boxShadow:
                    pickedPiece?.row === row &&
                    pickedPiece?.col === col &&
                    "inset 0px 0px 20px 20px #0080009c",
                }}
                onClick={() =>
                  handelCellClick(
                    cellPositions[row + col]?.color,
                    cellPositions[row + col]?.piece,
                    row,
                    col
                  )
                }
              >
                {cellPositions[row + col] && (
                  <img src={cellPositions[row + col].img} />
                )}
              </div>
            ))}
          </>
        ))}
      </div>
      <div className="blackDeadStack">
        {deadStack.black.map((piece) => (
          <div className="deadPeace">
            <img src={piece.img} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChessBoard;
