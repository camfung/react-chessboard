import { BoardPosition, Piece, Square } from "./src/chessboard/types";
import { COLUMNS } from "./src/chessboard/consts";


const CUSTOM_START_FEN = "qrqnqbbqbkqbqnqr/apbpcpdpepfpgphp/08/08/08/08/aPbPcPdPePfPgPhP/qRqNqBbQbKqBqNqR"

const parseFen = (fen: string): BoardPosition => {
  console.log(fen)
  fen = fen.replace(/ .+$/, "");
  const rows = fen.split("/");
  const position: BoardPosition = {};
  let currentRow = 8;
  for (let i = 0; i < 8; i++) {
    const row = rows[i].split("");
    let colIdx = 0;

    // loop through each pair of characters in the FEN section
    for (let j = 0; j < row.length/2; j++) {
      let currentPiece: string = row[j] + row[j+1];
      // number / empty squares
      if (currentPiece.search(/[1-8]/) !== -1) {
        const numEmptySquares = parseInt(currentPiece, 10);
        colIdx = colIdx + numEmptySquares;
      } else {
        // piece
        const square = COLUMNS[colIdx] + currentRow;
        position[square as Square] = currentPiece as Piece;
        colIdx = colIdx + 1;
      }
    }
    currentRow = currentRow - 1;
  }
  return position;
} 

const position : BoardPosition = parseFen(CUSTOM_START_FEN)
console.log("🚀 ~ file: parseFen.ts:36 ~ position:", position)
