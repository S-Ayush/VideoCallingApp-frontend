import React, { useEffect, useState } from "react";
import getPiecePositions from "../../Helper/getPieceAvailablePositions";
import iniitialPiecesPosition from "../../Helper/initialPiecesPosition";
import piecesNames from "../../Helper/piecesNames";
import "./ChessBoard.scss";

function ChessBoard() {
  const column = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const rows = [8, 7, 6, 5, 4, 3, 2, 1];
  const myColor = "white";
  const [pickedPiece, setPickedPiece] = useState(null);
  const [cellPositions, setCellPositions] = useState({});
  const [PiecesPositions, setPiecesPosition] = useState(
    iniitialPiecesPosition(myColor)
  );
  const [deadStack, setDeadStack] = useState({
    white: [],
    black: [],
  });
  const [turn, setTurn] = useState("white");
  const [possibleMoves, setPossibleMoves] = useState(null);

  const changeTurn = () => {
    setTurn(turn === "white" ? "white" : "black");
  };

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

  const pickPiece = (color, piece, row, col) => {
    setPickedPiece({ color, piece, row, col });
    setPossibleMoves(getPiecePositions(piece, row, col, cellPositions));
  };

  const movePiecetoEmptyCell = (row, col) => {
    if (
      possibleMoves?.some((data) => data.row === row && data.col === col) ||
      !possibleMoves
    ) {
      setPiecesPosition({
        ...PiecesPositions,
        [pickedPiece.color]: {
          ...PiecesPositions[pickedPiece.color],
          [pickedPiece.piece]: { row, col },
        },
      });
      setPickedPiece(null);
      setPossibleMoves(null);
      changeTurn();
    }
  };

  const cutOpponentPiece = (color, piece, row, col) => {
    if (
      possibleMoves?.some((data) => data.row === row && data.col === col) ||
      !possibleMoves
    ) {
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
      setPossibleMoves(null);
      changeTurn();
    }
  };

  const handelCellClick = (color = null, piece = null, row, col) => {
    if (!pickedPiece && color && piece && turn === color) {
      pickPiece(color, piece, row, col);
    } else if (pickedPiece && color && piece) {
      if (pickedPiece.color === color) {
        pickPiece(color, piece, row, col);
      } else {
        cutOpponentPiece(color, piece, row, col);
      }
    } else if (pickedPiece && !color && !piece) {
      movePiecetoEmptyCell(row, col);
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
                } ${
                  possibleMoves?.some(
                    (data) => data.row === row && data.col === col
                  ) &&
                  !cellPositions[row + col] &&
                  "possibleMove"
                }`}
                id={col + row}
                style={{
                  boxShadow:
                    pickedPiece?.row === row && pickedPiece?.col === col
                      ? "inset 0px 0px 20px 20px #0080009c"
                      : cellPositions[row + col] &&
                        possibleMoves?.some(
                          (data) => data.row === row && data.col === col
                        ) &&
                        cellPositions[row + col]?.color !== pickedPiece.color &&
                        "#f73d3d73 0px 0px 20px 20px inset",
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
