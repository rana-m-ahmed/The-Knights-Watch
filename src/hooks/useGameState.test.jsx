import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameState } from './useGameState.js';
import { LEVELS } from '../data/levelData.js';

function createLevel(overrides = {}) {
  return {
    id: 901,
    name: 'Test Level',
    tier: 'Tier I',
    tierName: 'Test',
    size: 5,
    chasmCount: 0,
    cursedCount: 0,
    fogOfWar: false,
    runeSequence: [],
    timeLimit: null,
    startPos: [0, 0],
    seed: 1901,
    hintMode: 'full',
    firstOfTier: false,
    ...overrides,
  };
}

function toKey([r, c]) {
  return `${r},${c}`;
}

describe('useGameState undo behavior', () => {
  it('enables and restores undo flow across all configured levels', () => {
    for (const level of LEVELS) {
      const { result, unmount } = renderHook(() => useGameState(level, vi.fn()));

      expect(result.current.canUndo).toBe(false);
      const firstMove = result.current.validMoves[0];
      expect(firstMove, `Expected at least one valid move on level ${level.id}`).toBeTruthy();

      act(() => {
        result.current.handleMove(firstMove[0], firstMove[1]);
      });

      expect(result.current.canUndo, `Undo should enable after move on level ${level.id}`).toBe(true);

      act(() => {
        result.current.handleUndo();
      });

      expect(result.current.canUndo, `Undo should disable after reverting on level ${level.id}`).toBe(false);
      expect(result.current.knightPos, `Knight should return to start on level ${level.id}`).toEqual(level.startPos);
      expect(result.current.moveCount, `Move count should reset on level ${level.id}`).toBe(0);

      unmount();
    }
  });

  it('enables undo after first move and disables at initial state', () => {
    const level = createLevel();
    const { result } = renderHook(() => useGameState(level, vi.fn()));

    expect(result.current.canUndo).toBe(false);
    expect(result.current.history.length).toBe(1);

    const firstMove = result.current.validMoves[0];
    expect(firstMove).toBeTruthy();

    act(() => {
      result.current.handleMove(firstMove[0], firstMove[1]);
    });

    expect(result.current.canUndo).toBe(true);
    expect(result.current.history.length).toBe(2);

    act(() => {
      result.current.handleUndo();
    });

    expect(result.current.canUndo).toBe(false);
    expect(result.current.history.length).toBe(1);
    expect(result.current.knightPos).toEqual(level.startPos);
    expect(result.current.moveCount).toBe(0);
  });

  it('restores core board state after undo', () => {
    const level = createLevel({ id: 902, seed: 1902 });
    const { result } = renderHook(() => useGameState(level, vi.fn()));

    const startPos = result.current.knightPos;
    const firstMove = result.current.validMoves[0];

    act(() => {
      result.current.handleMove(firstMove[0], firstMove[1]);
    });

    const movedPos = result.current.knightPos;
    expect(movedPos).toEqual(firstMove);
    expect(result.current.moveCount).toBe(1);
    expect(result.current.visitedCount).toBe(2);

    act(() => {
      result.current.handleUndo();
    });

    expect(result.current.knightPos).toEqual(startPos);
    expect(result.current.moveCount).toBe(0);
    expect(result.current.visitedCount).toBe(1);
    expect(result.current.validMoves.map(toKey)).toContain(toKey(firstMove));
  });

  it('supports repeated undo across multiple moves', () => {
    const level = createLevel({ id: 903, seed: 1903 });
    const { result } = renderHook(() => useGameState(level, vi.fn()));

    const firstMove = result.current.validMoves[0];
    act(() => {
      result.current.handleMove(firstMove[0], firstMove[1]);
    });

    const secondMove = result.current.validMoves[0];
    act(() => {
      result.current.handleMove(secondMove[0], secondMove[1]);
    });

    expect(result.current.history.length).toBe(3);
    expect(result.current.moveCount).toBe(2);

    act(() => {
      result.current.handleUndo();
    });

    expect(result.current.history.length).toBe(2);
    expect(result.current.moveCount).toBe(1);

    act(() => {
      result.current.handleUndo();
    });

    expect(result.current.history.length).toBe(1);
    expect(result.current.moveCount).toBe(0);
    expect(result.current.canUndo).toBe(false);
  });

  it('restores fog visibility when undoing on fog levels', () => {
    const level = createLevel({ id: 904, seed: 1904, fogOfWar: true, timeLimit: 60 });
    const { result } = renderHook(() => useGameState(level, vi.fn()));

    const initialVisible = result.current.visibleCells;
    expect(initialVisible.size).toBeGreaterThan(1);

    const firstMove = result.current.validMoves[0];
    act(() => {
      result.current.handleMove(firstMove[0], firstMove[1]);
    });

    const movedVisible = result.current.visibleCells;
    const sameSet = movedVisible.size === initialVisible.size
      && [...movedVisible].every(key => initialVisible.has(key));
    expect(sameSet).toBe(false);

    act(() => {
      result.current.handleUndo();
    });

    expect(result.current.visibleCells.size).toBe(initialVisible.size);
    for (const key of initialVisible) {
      expect(result.current.visibleCells.has(key)).toBe(true);
    }
  });

  it('restores cipher progress and flags when undoing on cipher levels', () => {
    const level = createLevel({
      id: 905,
      seed: 1905,
      size: 5,
      timeLimit: 60,
      runeSequence: [
        { pos: [2, 1], symbol: 'A' },
        { pos: [4, 2], symbol: 'B' },
      ],
    });

    const { result } = renderHook(() => useGameState(level, vi.fn()));

    const firstRuneMove = [2, 1];
    const secondRuneMove = [4, 2];

    expect(result.current.validMoves.map(toKey)).toContain(toKey(firstRuneMove));

    act(() => {
      result.current.handleMove(firstRuneMove[0], firstRuneMove[1]);
    });

    expect(result.current.runeProgress).toEqual(['A']);
    expect(result.current.cipherSolved).toBe(false);

    expect(result.current.validMoves.map(toKey)).toContain(toKey(secondRuneMove));
    act(() => {
      result.current.handleMove(secondRuneMove[0], secondRuneMove[1]);
    });

    expect(result.current.runeProgress).toEqual(['A', 'B']);
    expect(result.current.cipherSolved).toBe(true);

    act(() => {
      result.current.handleUndo();
    });

    expect(result.current.runeProgress).toEqual(['A']);
    expect(result.current.cipherSolved).toBe(false);
    expect(result.current.cipherFailed).toBe(false);
  });
});
