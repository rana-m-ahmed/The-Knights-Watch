import { useState, useCallback, useEffect } from 'react';
import { buildGrid } from '../engine/levelGenerator.js';
import { getValidMoves, countTiles } from '../engine/knightLogic.js';
import { useTimer } from './useTimer.js';

function cloneGrid(sourceGrid) {
  return sourceGrid.map(row => row.map(cell => ({ ...cell })));
}

function cloneTrail(sourceTrail) {
  return sourceTrail.map(entry => ({
    pos: [...entry.pos],
    age: entry.age,
  }));
}

export function useGameState(levelConfig, onGameStateChange = () => {}) {
  const [grid, setGrid] = useState([]);
  const [knightPos, setKnightPos] = useState(levelConfig?.startPos || [0, 0]);
  const [validMoves, setValidMoves] = useState([]);
  const [visitedCount, setVisitedCount] = useState(1);
  const [totalTiles, setTotalTiles] = useState(0);
  const [gameState, setGameState] = useState('idle');
  const [warningTiles, setWarningTiles] = useState([]);
  const [crumbling, setCrumbling] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const [undoUsed, setUndoUsed] = useState(false);
  const [history, setHistory] = useState([]);
  const [jumpAnim, setJumpAnim] = useState(null);
  const [cursedHit, setCursedHit] = useState(null);
  const [visibleCells, setVisibleCells] = useState(new Set());
  const [trail, setTrail] = useState([]);
  const [runeProgress, setRuneProgress] = useState([]);
  const [cipherSolved, setCipherSolved] = useState(false);
  const [cipherFailed, setCipherFailed] = useState(false);
  const [safeRuneSequence, setSafeRuneSequence] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(levelConfig);

  const { timeElapsed, timeRemaining, timeRatio, penalizeTime } = useTimer({
    timeLimit: levelConfig?.timeLimit || null,
    active: gameState === 'playing',
    resetKey: levelConfig?.id,
    onExpire: () => setGameState('timeout')
  });

  const initLevel = useCallback((config) => {
    const newGrid = buildGrid(config);
    const total = countTiles(newGrid);
    const [sr, sc] = config.startPos || [0, 0];
    const initialMoves = getValidMoves(newGrid, [sr, sc], config.size);
    const initialVisibleCells = new Set();

    const safe = (config.runeSequence || []).filter(entry => {
      const [r, c] = entry.pos;
      return r >= 0 && r < config.size &&
             c >= 0 && c < config.size &&
             !newGrid[r][c].isChasm;
    });

    if (config.fogOfWar) {
      initialVisibleCells.add(`${sr},${sc}`);
      [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]].forEach(([dr, dc]) => {
        const nr = sr + dr;
        const nc = sc + dc;
        if (nr >= 0 && nr < config.size && nc >= 0 && nc < config.size) {
          initialVisibleCells.add(`${nr},${nc}`);
        }
      });
    }

    setGrid(newGrid);
    setKnightPos([sr, sc]);
    setValidMoves(initialMoves);
    setVisitedCount(1);
    setTotalTiles(total);
    setGameState('playing');
    setWarningTiles([]);
    setCrumbling([]);
    setMoveCount(0);
    setUndoUsed(false);
    setCursedHit(null);
    setTrail([]);
    setRuneProgress([]);
    setCipherSolved(false);
    setCipherFailed(false);
    setSafeRuneSequence(safe);
    setCurrentLevel(config);
    setHistory([{
      grid: cloneGrid(newGrid),
      pos: [sr, sc],
      visitedCount: 1,
      moveCount: 0,
      visibleCells: new Set(initialVisibleCells),
      trail: [],
      runeProgress: [],
      cipherSolved: false,
      cipherFailed: false,
    }]);
    setVisibleCells(initialVisibleCells);
  }, []);

  const updateWarningTiles = useCallback((currentGrid, currentPos, currentVisitedCount = visitedCount) => {
    if (!currentLevel || !currentGrid || currentGrid.length === 0) return;

    const moves = getValidMoves(currentGrid, currentPos, currentLevel.size);
    const warnings = [];

    for (const [mr, mc] of moves) {
      const testGrid = currentGrid.map(row => row.map(cell => ({ ...cell })));
      testGrid[mr][mc].visited = true;
      const nextMoves = getValidMoves(testGrid, [mr, mc], currentLevel.size);

      if (nextMoves.length === 0 && currentVisitedCount + 1 < totalTiles) {
        warnings.push([mr, mc]);
      }
    }

    setWarningTiles(warnings);
  }, [currentLevel, visitedCount, totalTiles]);

  const handleMove = useCallback((r, c) => {
    if (gameState !== 'playing' || !currentLevel) return;

    const isValid = validMoves.some(([mr, mc]) => mr === r && mc === c);
    if (!isValid) return;

    const newGrid = cloneGrid(grid);
    const [pr, pc] = knightPos;
    newGrid[r][c].visited = true;

    let nextRuneProgress = runeProgress;
    let nextCipherSolved = cipherSolved;
    let nextCipherFailed = cipherFailed;

    if (newGrid[r][c].isCursed && currentLevel.timeLimit) {
      penalizeTime(8);
      setCursedHit({ r, c, id: Date.now() });
      setTimeout(() => setCursedHit(null), 1000);
    }

    const runeEntry = safeRuneSequence.find(
      entry => entry.pos[0] === r && entry.pos[1] === c
    );
    if (runeEntry) {
      const expected = safeRuneSequence[runeProgress.length];
      if (expected && runeEntry.symbol === expected.symbol) {
        nextRuneProgress = [...runeProgress, runeEntry.symbol];
        if (nextRuneProgress.length === safeRuneSequence.length) {
          nextCipherSolved = true;
          penalizeTime(-15);
        }
      } else {
        nextCipherFailed = true;
      }
    }

    setCrumbling([[pr, pc]]);
    setTimeout(() => setCrumbling([]), 500);
    setJumpAnim([r, c]);
    setTimeout(() => setJumpAnim(null), 300);

    const nextTrail = [
      { pos: [r, c], age: 0 },
      ...trail
        .map(t => ({ ...t, age: t.age + 1 }))
        .filter(t => t.age < 4),
    ];

    const nextVisibleCells = new Set();
    if (currentLevel.fogOfWar) {
      for (let rr = 0; rr < newGrid.length; rr++) {
        for (let cc = 0; cc < newGrid[rr].length; cc++) {
          if (newGrid[rr][cc].visited) {
            nextVisibleCells.add(`${rr},${cc}`);
          }
        }
      }
      nextVisibleCells.add(`${r},${c}`);
      [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]].forEach(([dr, dc]) => {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < currentLevel.size && nc >= 0 && nc < currentLevel.size) {
          nextVisibleCells.add(`${nr},${nc}`);
        }
      });
    }

    const newVisitedCount = visitedCount + 1;
    const newMoveCount = moveCount + 1;

    setGrid(newGrid);
    setKnightPos([r, c]);
    setVisitedCount(newVisitedCount);
    setMoveCount(newMoveCount);
    setTrail(nextTrail);
    setRuneProgress(nextRuneProgress);
    setCipherSolved(nextCipherSolved);
    setCipherFailed(nextCipherFailed);
    setVisibleCells(nextVisibleCells);

    const newMoves = getValidMoves(newGrid, [r, c], currentLevel.size);
    setValidMoves(newMoves);
    updateWarningTiles(newGrid, [r, c], newVisitedCount);

    setHistory(prev => [...prev, {
      grid: cloneGrid(newGrid),
      pos: [r, c],
      visitedCount: newVisitedCount,
      moveCount: newMoveCount,
      visibleCells: new Set(nextVisibleCells),
      trail: cloneTrail(nextTrail),
      runeProgress: [...nextRuneProgress],
      cipherSolved: nextCipherSolved,
      cipherFailed: nextCipherFailed,
    }]);

    if (newVisitedCount === totalTiles) {
      setTimeout(() => {
        setGameState('won');
        onGameStateChange('won', {
          undoUsed,
          timeRatio,
          moveCount: newMoveCount,
          totalTiles,
          timerEnabled: currentLevel.timeLimit !== null,
        });
      }, 400);
    } else if (newMoves.length === 0) {
      setTimeout(() => {
        setGameState('lost');
        onGameStateChange('lost');
      }, 400);
    }
  }, [gameState, currentLevel, validMoves, grid, knightPos, visitedCount, totalTiles, moveCount, safeRuneSequence, runeProgress, cipherSolved, cipherFailed, trail, penalizeTime, updateWarningTiles, onGameStateChange, undoUsed, timeRatio]);

  const handleUndo = useCallback(() => {
    if (history.length <= 1 || !currentLevel) return;

    setUndoUsed(true);
    const newHistory = history.slice(0, -1);
    const prev = newHistory[newHistory.length - 1];

    setHistory(newHistory);
    setGrid(cloneGrid(prev.grid));
    setKnightPos(prev.pos);
    setVisitedCount(prev.visitedCount);
    setMoveCount(prev.moveCount ?? Math.max(0, prev.visitedCount - 1));
    setGameState('playing');
    setTrail(cloneTrail(prev.trail || []));
    setRuneProgress([...(prev.runeProgress || [])]);
    setCipherSolved(Boolean(prev.cipherSolved));
    setCipherFailed(Boolean(prev.cipherFailed));
    setVisibleCells(new Set(prev.visibleCells || []));
    setCrumbling([]);
    setJumpAnim(null);
    setCursedHit(null);

    const newMoves = getValidMoves(prev.grid, prev.pos, currentLevel.size);
    setValidMoves(newMoves);
    updateWarningTiles(prev.grid, prev.pos, prev.visitedCount);
  }, [history, currentLevel, updateWarningTiles]);

  const canUndo = gameState === 'playing' && history.length > 1;

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
    canUndo,
    cursedHit,
    visibleCells,
    trail,
    runeProgress,
    cipherSolved,
    cipherFailed,
    safeRuneSequence,
    timeElapsed,
    timeRemaining,
    timeRatio,
    initLevel,
    handleMove,
    handleUndo
  };
}
