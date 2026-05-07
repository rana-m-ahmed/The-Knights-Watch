import { getValidMoves, getWarnsdorffScore } from './knightLogic.js';

/**
 * Deep clone a grid
 * @param {Array<Array<Object>>} grid - grid to clone
 * @returns {Array<Array<Object>>} Cloned grid
 */
function deepCloneGrid(grid) {
  return grid.map(row =>
    row.map(cell => ({ ...cell }))
  );
}

/**
 * Check if a grid configuration is solvable using Warnsdorff's heuristic
 * @param {Array<Array<Object>>} grid - 2D grid
 * @param {Array<number>} startPos - [row, col]
 * @param {number} size - grid dimension
 * @returns {boolean} True if the heuristic solves the puzzle
 */
export function isSolvable(grid, startPos, size) {
  const clonedGrid = deepCloneGrid(grid);
  let pos = startPos;
  let visited = 1;
  let totalTiles = 0;

  // Count total non-chasm tiles
  for (const row of grid) {
    for (const cell of row) {
      if (!cell.isChasm) totalTiles++;
    }
  }

  // Mark start position as visited in cloned grid
  clonedGrid[pos[0]][pos[1]].visited = true;

  // Greedy Warnsdorff's algorithm: always move to the position with fewest onward moves
  while (visited < totalTiles) {
    const moves = getValidMoves(clonedGrid, pos, size);

    if (moves.length === 0) {
      // Dead end before visiting all tiles
      return false;
    }

    // Sort by Warnsdorff score (ascending — prefer tiles with fewer onward moves)
    const scored = moves.map(move => ({
      pos: move,
      score: getWarnsdorffScore(clonedGrid, move, size)
    }));

    scored.sort((a, b) => a.score - b.score);

    // Move to the best candidate (breaking ties by taking first)
    pos = scored[0].pos;
    clonedGrid[pos[0]][pos[1]].visited = true;
    visited++;
  }

  return true;
}
