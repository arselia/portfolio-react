import React, { useState, useEffect } from 'react';

// --- SUDOKU LOGIC & RANDOMIZER ---

const isValid = (board, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
    
    const subRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const subCol = 3 * Math.floor(col / 3) + (i % 3);
    if (board[subRow][subCol] === num) return false;
  }
  return true;
};

const fillBoard = (board) => {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        for (let num of nums) {
          if (isValid(board, r, c, num)) {
            board[r][c] = num;
            if (fillBoard(board)) return true; 
            board[r][c] = 0; 
          }
        }
        return false; 
      }
    }
  }
  return true; 
};

// 🎯 CHANGED: Now returns both the puzzle AND the solved board!
const generatePuzzle = (emptyCells) => {
  let board = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillBoard(board);
  const solved = board.map(row => [...row]); // Save the solution
  
  let puzzle = board.map(row => [...row]);
  let removed = 0;
  while (removed < emptyCells) {
    let r = Math.floor(Math.random() * 9);
    let c = Math.floor(Math.random() * 9);
    if (puzzle[r][c] !== 0) {
      puzzle[r][c] = 0;
      removed++;
    }
  }
  return { puzzle, solved }; 
};

// --- REACT COMPONENT ---

const SudokuGame = () => {
  const [board, setBoard] = useState([]);
  const [initialBoard, setInitialBoard] = useState([]);
  const [solvedBoard, setSolvedBoard] = useState([]); // Keeps track of the answer key
  const [isWon, setIsWon] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [selectedCell, setSelectedCell] = useState([null, null]);
  
  // Timer State
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const difficultySettings = { easy: 30, medium: 45, hard: 55 };

  useEffect(() => {
    startNewGame(difficulty);
  }, []);

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (timerActive && !isWon) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, isWon]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startNewGame = (currentDiff = difficulty) => {
    const emptyCells = difficultySettings[currentDiff];
    const { puzzle, solved } = generatePuzzle(emptyCells); 
    setBoard(puzzle.map(row => [...row]));
    setInitialBoard(puzzle.map(row => [...row]));
    setSolvedBoard(solved.map(row => [...row]));
    setIsWon(false);
    setSelectedCell([null, null]);
    setTime(0);
    setTimerActive(true);
  };

  const handleDifficultyChange = (e) => {
    const newDiff = e.target.value;
    setDifficulty(newDiff);
    startNewGame(newDiff);
  };

  const handleInputChange = (r, c, value) => {
    if (isWon) return; // Prevent input if the game is already won!
    if (!/^[1-9]?$/.test(value)) return;

    const newBoard = board.map(row => [...row]);
    newBoard[r][c] = value === '' ? 0 : parseInt(value, 10);
    setBoard(newBoard);
    checkWinCondition(newBoard);
  };

  const checkWinCondition = (currentBoard) => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (currentBoard[r][c] !== solvedBoard[r][c]) return;
      }
    }
    setIsWon(true);
    setTimerActive(false); // Stop the timer!
  };

  // Calculate how many times each correct number appears on the board
  const getNumberCounts = () => {
    const counts = Array(10).fill(0);
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== 0 && board[r][c] === solvedBoard[r][c]) {
          counts[board[r][c]]++;
        }
      }
    }
    return counts;
  };

  const counts = board.length > 0 ? getNumberCounts() : Array(10).fill(0);

  // --- STYLES ---
  const containerStyle = {
    textAlign: 'center',
    padding: '40px 20px',
    color: 'var(--text-primary)'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(9, 40px)',
    gridTemplateRows: 'repeat(9, 40px)',
    gap: '0',
    border: '2px solid var(--text-primary)',
    width: 'fit-content',
    margin: '20px auto',
    backgroundColor: 'var(--card-bg)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
    borderRadius: '4px',
    overflow: 'hidden'
  };

  const getCellStyle = (r, c) => {
    const isInitial = initialBoard[r][c] !== 0;
    const isError = !isInitial && board[r][c] !== 0 && board[r][c] !== solvedBoard[r][c];
    const [selR, selC] = selectedCell;
    
    let bgColor = isInitial ? 'rgba(150, 150, 150, 0.1)' : 'transparent';
    let textColor = isInitial ? 'var(--text-primary)' : '#007AFF'; // Blue for correct input

    if (isError) {
      bgColor = 'rgba(255, 59, 48, 0.15)'; // Red background for errors
      textColor = '#FF3B30'; // Red text
    } else if (selR !== null && selC !== null) {
      const selectedValue = board[selR][selC];
      const isSameRow = r === selR;
      const isSameCol = c === selC;
      const isSameBox = Math.floor(r / 3) === Math.floor(selR / 3) && Math.floor(c / 3) === Math.floor(selC / 3);
      const isSameNumber = selectedValue !== 0 && board[r][c] === selectedValue && !isError;

      if (r === selR && c === selC) {
        bgColor = 'rgba(0, 122, 255, 0.3)'; 
      } else if (isSameNumber) {
        bgColor = 'rgba(0, 122, 255, 0.2)'; 
      } else if (isSameRow || isSameCol || isSameBox) {
        bgColor = 'rgba(0, 122, 255, 0.08)'; 
      }
    }

    return {
      width: '40px',
      height: '40px',
      textAlign: 'center',
      fontSize: '18px',
      border: '1px solid rgba(150, 150, 150, 0.2)',
      outline: 'none',
      backgroundColor: bgColor,
      color: textColor,
      fontWeight: isInitial ? '600' : '500',
      borderRight: c === 2 || c === 5 ? '2px solid var(--text-primary)' : '1px solid rgba(150, 150, 150, 0.2)',
      borderBottom: r === 2 || r === 5 ? '2px solid var(--text-primary)' : '1px solid rgba(150, 150, 150, 0.2)',
      transition: 'background-color 0.15s ease, color 0.15s ease',
      fontFamily: 'inherit',
      cursor: isWon ? 'default' : 'pointer'
    };
  };

  if (board.length === 0) return <div>Loading...</div>;

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '10px', fontWeight: '600' }}>Sudoku</h2>
      
      {/* 🎯 Difficulty and Timer Container */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label htmlFor="difficultySelect" style={{ fontSize: '0.9rem', fontWeight: '500' }}>
            Difficulty:
          </label>
          <select 
            id="difficultySelect"
            value={difficulty}
            onChange={handleDifficultyChange}
            disabled={isWon}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              border: '1px solid rgba(150, 150, 150, 0.3)',
              background: 'var(--card-bg)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              outline: 'none',
              cursor: isWon ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit'
            }}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* ⏱ Timer */}
        <div style={{ fontSize: '1.2rem', fontWeight: '600', color: isWon ? '#34C759' : 'var(--text-primary)' }}>
          ⏱ {formatTime(time)}
        </div>
      </div>

      {isWon && <h3 style={{ color: '#34C759', marginBottom: '15px' }}>🎉 You solved it in {formatTime(time)}! 🎉</h3>}
      
      <div style={gridStyle}>
        {board.map((row, r) => 
          row.map((cell, c) => (
            <input
              key={`${r}-${c}`}
              type="text"
              maxLength="1"
              value={cell === 0 ? '' : cell}
              onChange={(e) => handleInputChange(r, c, e.target.value)}
              onFocus={() => !isWon && setSelectedCell([r, c])}
              readOnly={initialBoard[r][c] !== 0 || isWon} // Locks input if won
              style={getCellStyle(r, c)}
            />
          ))
        )}
      </div>

      {/* 🎯 Number Tracker Palette */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
          const isDone = counts[num] >= 9;
          return (
            <div key={num} style={{
              width: '35px',
              height: '35px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              backgroundColor: isDone ? 'rgba(150, 150, 150, 0.1)' : 'var(--card-bg)',
              color: isDone ? 'rgba(150, 150, 150, 0.4)' : 'var(--text-primary)',
              border: `1px solid ${isDone ? 'transparent' : 'rgba(150, 150, 150, 0.3)'}`,
              fontSize: '1.1rem',
              fontWeight: '600',
              opacity: isDone ? 0.5 : 1,
              transition: 'all 0.2s ease',
              boxShadow: isDone ? 'none' : '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              {num}
            </div>
          );
        })}
      </div>

      <button 
        onClick={() => startNewGame()}
        style={{
          marginTop: '30px',
          padding: '12px 24px',
          fontSize: '0.9rem',
          fontWeight: '600',
          cursor: 'pointer',
          backgroundColor: 'var(--text-primary)',
          color: 'var(--card-bg)',
          border: 'none',
          borderRadius: '20px',
          transition: 'transform 0.2s',
          fontFamily: 'inherit'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        Restart Puzzle
      </button>
    </div>
  );
};

export default SudokuGame;