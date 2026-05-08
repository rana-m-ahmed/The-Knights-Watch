import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameState } from '../hooks/useGameState.js';
import { LEVELS } from '../data/levelData.js';
import { buildGrid } from '../engine/levelGenerator.js';
import { getValidMoves, getWarnsdorffScore } from '../engine/knightLogic.js';
import { getStars } from '../engine/scoring.js';

function deepCloneGrid(grid) {
  return grid.map(row => row.map(cell => ({ ...cell })));
}

function findPath(grid, startPos, size) {
  const cloned = deepCloneGrid(grid);
  let pos = [startPos[0], startPos[1]];
  cloned[pos[0]][pos[1]].visited = true;

  let visited = 1;
  let totalTiles = 0;
  for (const row of grid) {
    for (const cell of row) {
      if (!cell.isChasm) totalTiles++;
    }
  }

  const path = [];

  while (visited < totalTiles) {
    const moves = getValidMoves(cloned, pos, size);
    if (moves.length === 0) {
      throw new Error('No path found from position ' + pos);
    }

    const scored = moves.map(m => ({ pos: m, score: getWarnsdorffScore(cloned, m, size) }));
    scored.sort((a, b) => a.score - b.score);

    pos = scored[0].pos;
    cloned[pos[0]][pos[1]].visited = true;
    path.push(pos);
    visited++;
  }

  return path;
}

describe('Smoke: solve all levels with 3 stars', () => {
  it('solves every configured level and earns 3 stars', () => {
    vi.useFakeTimers();

    for (const level of LEVELS) {
      const onGameStateChange = vi.fn();
      const { result, unmount } = renderHook(() => useGameState(level, onGameStateChange));

      const grid = buildGrid(level);
      const path = findPath(grid, level.startPos, level.size);

      for (const [r, c] of path) {
        act(() => {
          result.current.handleMove(r, c);
        });
      }

      // Advance timers to allow the hook's win timeout and any intervals to run
      vi.advanceTimersByTime(800);

      // Ensure onGameStateChange was called with 'won' and stats
      const wonCall = onGameStateChange.mock.calls.find(c => c[0] === 'won');
      expect(wonCall, `Level ${level.id} did not report a win`).toBeTruthy();

      const stats = wonCall[1];
      expect(getStars(stats), `Level ${level.id} did not yield 3 stars`).toBe(3);

      unmount();
    }

    vi.useRealTimers();
  });
});
