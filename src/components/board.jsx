import React from "react";
import Cell from './cell';
import '../styles/board.css'

const Board = ({ board, onCellClick, cellSize }) => {
  return (
    <div className="board">
      {board.map((row, i) => (
        <div key={i} className="row">
          {row.map((state, j) => (
            <Cell
              key={j}
              state={state}
              onMouseDown={
                () => onCellClick(i, j)
              }
              cellSize={cellSize} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
