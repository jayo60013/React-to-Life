import React, { useEffect, useState } from "react";
import Board from './board';
import Slider from "./slider";
import Brushes from "./brushes";
import '../styles/game.css';

const CELL_SIZE = 10;
const WIDTH = 600;
const HEIGHT = 500;

const ROWS = HEIGHT / CELL_SIZE;
const COLS = WIDTH / CELL_SIZE;

const DEFAULT_FPS = 15;

const GAME_OF_LIFE = [
  // When DEAD (state 0)
  {
    "transistions": {
      // If 5 DEAD and 3 ALIVE then ALIVE
      "53": 1,
    },
    // else dead
    "default": 0,
    "colour": "#fff",
  },
  // When ALIVE (state 1)
  {
    "transistions": {
      // if 6 DEAD and 2 ALIVE
      "62": 1,
      // or if 5 DEAD and 3 ALIVE
      "53": 1,
      // then alive
    },
    // else dead
    "default": 0,
    "colour": "#000",
  },
];
const SEEDS = [
  {
    "transistions": {
      "62": 1,
    },
    "default": 0,
    "colour": "#fff",
  },
  {
    "transistions": {},
    "default": 0,
    "colour": "#000",
  },
];

const countNbors = (board, states, x, y) => {
  const nbors = Array(states).fill(0);

  for (let dy = -1; dy < 2; dy++) {
    for (let dx = -1; dx < 2; dx++) {
      if (dy === 0 && dx === 0) {
        continue;
      }

      const ny = y + dy;
      const nx = x + dx;

      if (ny < 0 || ny >= ROWS || nx < 0 || nx >= COLS) {
        continue;
      }

      nbors[board[ny][nx]]++;
    }
  }
  return nbors.join('');
}


const makeBoard = (rows, cols) => {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
};

const brushOptions = [
  { value: 1, label: 'Alive' },
  { value: 0, label: 'Dead' },
]

const Game = () => {
  const [board, setBoard] = useState(makeBoard(ROWS, COLS));
  const [next, setNext] = useState(makeBoard(ROWS, COLS));
  const [fps, setFPS] = useState(DEFAULT_FPS);
  const [isPlaying, setPlaying] = useState(false);
  const [selectedBrush, setBrush] = useState(1);

  const updateBrush = (event) => {
    setBrush(parseInt(event.target.value));
  };

  const playBoard = () => {
    if (isPlaying) {
      stepBoard(SEEDS);
    }
  }


  const stepBoard = (automaton) => {
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const freq = countNbors(board, automaton.length, x, y);
        const lookup = automaton[board[y][x]];

        const nextState = lookup.transistions[freq];
        if (nextState !== undefined) {
          next[y][x] = parseInt(nextState);
        } else {
          next[y][x] = lookup.default;
        }
      }
    }
    setBoard(next);
    setNext(makeBoard(ROWS, COLS));
  };

  const onCellClick = (i, j) => {
    if (isPlaying) {
      return;
    }

    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      newBoard[i][j] = selectedBrush;
      return newBoard;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(playBoard, fps * 10);
    return () => clearInterval(intervalId);
  });

  return (
    <>
      <div className="title">
        <h1>Cellular Automata</h1>
      </div>
      <div className="body">
        <div className="gameBoard">
          <Board board={board} onCellClick={onCellClick} cellSize={CELL_SIZE} />
        </div>
        <div className="controlPanel">
          <Brushes
            options={brushOptions}
            selectedBrush={selectedBrush}
            onChange={updateBrush}
          />

          <button className="playpause_btn" onClick={() => setPlaying(!isPlaying)}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button className="step_btn" onClick={stepBoard}>Step</button>
          <button
            className="clear_btn"
            onClick={
              () => setBoard(makeBoard(ROWS, COLS))
            }>Clear</button>
          <div className="sliderContainer">
            <Slider
              min={0}
              max={30}
              defaultValue={DEFAULT_FPS}
              onChange={setFPS}
            />
            <p className="fpsValue">{fps}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
