import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './tickTacToe.css';
import componentHierarchy from './images/overview.png';
import statePropsFlow from './images/class.png';
import winnerImage from './images/winner.png';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [showComponentHierarchy, setShowComponentHierarchy] = useState(false);
  const [showStatePropsFlow, setShowStatePropsFlow] = useState(false);
  const [showWinnerImage, setShowWinnerImage] = useState(false);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const moves = history.map((squares, move) => {
    const description = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const winner = calculateWinner(currentSquares);

  return (
    <div className="game">
      <div className="game-board">
        {winner ? (
          <>
            <div 
              className="winner-banner" 
              onMouseEnter={() => setShowWinnerImage(true)} 
              onMouseLeave={() => setShowWinnerImage(false)}
            >
              Winner: {winner}
            </div>
            {showWinnerImage && <img src={winnerImage} alt="Winner Calculation" className="hover-image" />}
          </>
        ) : (
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        )}
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
      <div className="game-lls">
        {/* <h2>Class Diagrams and LLD</h2> */}
        <div 
          className="diagram" 
          onMouseEnter={() => setShowComponentHierarchy(true)} 
          onMouseLeave={() => setShowComponentHierarchy(false)}
        >
          <h3>Component Hierarchy</h3>
          {showComponentHierarchy && <img src={componentHierarchy} alt="Component Hierarchy Diagram" className="hover-image" />}
        </div>
        <div 
          className="diagram" 
          onMouseEnter={() => setShowStatePropsFlow(true)} 
          onMouseLeave={() => setShowStatePropsFlow(false)}
        >
          <h3>State and Props Flow</h3>
          {showStatePropsFlow && <img src={statePropsFlow} alt="State and Props Flow Diagram" className="hover-image" />}
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
