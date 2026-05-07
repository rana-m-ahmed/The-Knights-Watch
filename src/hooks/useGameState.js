import { useState, useCallback, useEffect } from 'react';
import { buildGrid } from '../engine/levelGenerator.js';
import { getValidMoves, getWarnsdorffScore, countTiles } from '../engine/knightLogic.js';
import { useTimer } from './useTimer.js';

/**
 * Main game state hook - manages all game logic
 * @param {Object} levelConfig - level configuration
 * @param {Function} onGameStateChange - callback when game state changes
 * @returns {Object} Game state and handlers
 */
export function useGameState(levelConfig, onGameStateChange = () => {}) {
  const [grid, setGrid] = useState([]);
  const [knightPos, setKnightPos] = useState(levelConfig?.startPos || [0, 0]);
  const [validMoves, setValidMoves] = useState([]);
  const [visitedCount, setVisitedCount] = useState(1);
  const [totalTiles, setTotalTiles] = useState(0);
  const [gameState, setGameState] = useState('idle');
  const [warningTiles, setWarningTiles] = useState([]);
  const [crumbling, setCrumbling] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [undoUsed, setUndoUsed] = useState(false);
  const [history, setHistory] = useState([]);
  const [jumpAnim, setJumpAnim] = useState(null);

  // Timer setup
  const { timeElapsed, timeRemaining, timeRatio } = useTimer({
    timeLimit: levelConfig?.timeLimit || null,
    active: gameState === 'playing',
    resetKey: levelConfig?.id,
    onExpire: () => setGameState('timeout')
  });

  // Initialize level
  const initLevel = useCallback((config) => {
    const newGrid = buildGrid(config);
    const total = countTiles(newGrid);
    const startPos = config.startPos || [0, 0];

    setGrid(newGrid);
    setKnightPos(startPos);
    setVisitedCount(1);
    setTotalTiles(total);
    setGameState('playing');
    setWarningTiles([]);
    setCrumbling(null);
    setMoveCount(0);
    setUndoUsed(false);
    setHistory([
      {
        grid: newGrid.map(row => row.map(cell => ({ ...cell }))),
        pos: startPos,
        visitedCount: 1,
        moveCount: 0
      }
    ]);
    setJumpAnim(null);
    // Calculate initial valid moves
    const initialValid = getValidMoves(newGrid, startPos, config.size);
    setValidMoves(initialValid);
  }, []);

  // Calculate warning tiles
  const updateWarningTiles = useCallback((currentGrid, currentPos) => {
    if (!levelConfig || !currentGrid || currentGrid.length === 0) return;
    
    const moves = getValidMoves(currentGrid, currentPos, levelConfig.size);
    const warnings = [];

    for (const move of moves) {
      // Simulate moving to this tile
      const simGrid = currentGrid.map(row => row.map(cell => ({ ...cell })));
      simGrid[move[0]][move[1]].visited = true;

      // Check if this would be a dead end
      const nextMoves = getValidMoves(simGrid, move, levelConfig.size);
      if (nextMoves.length === 0 && visitedCount + 1 < totalTiles) {
        warnings.push(move);
      }
    }

    setWarningTiles(warnings);
  }, [levelConfig, visitedCount, totalTiles]);

  // Handle knight move
  const handleMove = useCallback((r, c) => {
    if (gameState !== 'playing' || !levelConfig) return;

    // Check if it's a valid move
    const isValid = validMoves.some(move => move[0] === r && move[1] === c);
    if (!isValid) return;

    // Clone grid and mark new position as visited
    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
    newGrid[r][c].visited = true;

    // Set crumbling animation on old position
    setCrumbling(knightPos);
    setTimeout(() => setCrumbling(null), 500);

    // Set jump animation
    setJumpAnim([r, c]);
    setTimeout(() => setJumpAnim(null), 300);

    // Update state
    const newVisitedCount = visitedCount + 1;
    const newMoveCount = moveCount + 1;

    setGrid(newGrid);
    setKnightPos([r, c]);
    setVisitedCount(newVisitedCount);
    setMoveCount(newMoveCount);

    // Update valid moves and warnings
    const newValid = getValidMoves(newGrid, [r, c], levelConfig.size);
    setValidMoves(newValid);
    updateWarningTiles(newGrid, [r, c]);

    // Add to history
    setHistory(prev => [...prev, {
      grid: newGrid.map(row => row.map(cell => ({ ...cell }))),
      pos: [r, c],
      visitedCount: newVisitedCount,
      moveCount: newMoveCount
    }]);

    // Check win condition (after animation delay)
    setTimeout(() => {
      if (newVisitedCount === totalTiles) {
        setGameState('won');
        onGameStateChange('won');
      }
    }, 400);

    // Check lose condition (no valid moves left)
    if (newValid.length === 0 && newVisitedCount < totalTiles) {
      setTimeout(() => {
        setGameState('lost');
        onGameStateChange('lost');
      }, 400);
    }
  }, [gameState, validMoves, grid, knightPos, visitedCount, totalTiles, moveCount, levelConfig, updateWarningTiles, onGameStateChange]);

  // Handle undo
  const handleUndo = useCallback(() => {
    if (history.length <= 1 || !levelConfig) return;

    setUndoUsed(true);
    const newHistory = history.slice(0, -1);
    const prevEntry = newHistory[newHistory.length - 1];

    setHistory(newHistory);
    setGrid(prevEntry.grid);
    setKnightPos(prevEntry.pos);
    setVisitedCount(prevEntry.visitedCount);
    setMoveCount(prevEntry.moveCount);
    setGameState('playing');

    const newValid = getValidMoves(prevEntry.grid, prevEntry.pos, levelConfig.size);
    setValidMoves(newValid);
    updateWarningTiles(prevEntry.grid, prevEntry.pos);
  }, [history, levelConfig, updateWarningTiles]);

  // Initialize or reinitialize when level changes
  useEffect(() => {
    if (levelConfig && levelConfig.id !== undefined) {
      initLevel(levelConfig);
    }
  }, [levelConfig?.id, initLevel]);

  return {
    grid,
    knightPos,
    validMoves,
    visitedCount,
    totalTiles,
    gameState,
    warningTiles,
    crumbling,
    jumpAnim,
    moveCount,
    undoUsed,
    history,
    timeElapsed,
    timeRemaining,
    timeRatio,
    initLevel,
    handleMove,
    handleUndo
  };
}
