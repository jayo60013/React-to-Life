import React from "react";
import '../styles/cell.css';

const Cell = ({ state, onMouseDown, cellSize }) => {
  return (
    <div
      className={`cell state-${state}`}
      style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
      onMouseDown={onMouseDown}>
    </div>
  );
};

export default Cell;
