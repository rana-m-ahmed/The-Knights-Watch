import { isSolvable } from './solver.js';

/**
 * Mulberry32 seeded PRNG - ensures deterministic level generation
 * @param {number} seed - seed value
 * @returns {Function} PRNG function that returns 0..1
 */
function mulberry32(seed) {
  return function() {
    seed |= 0;
    seed = seed + 0x6d2b79f5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/**
 * Build a grid for a given level configuration
 * @param {Object} levelConfig - { size, chasmCount, startPos, seed }
 * @returns {Array<Array<Object>>} 2D grid with cells: { isChasm, visited, isStart }
 */
export function buildGrid(levelConfig) {
  const { size, chasmCount, startPos, seed } = levelConfig;
  // Helper: get adjacent cells (8 surrounding cells)
  function getAdjacentCells(r, c) {
    const adjacent = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
          adjacent.push([nr, nc]);
        }
      }
    }
    return adjacent;
  }

  // Mark start position and its adjacent cells as protected
  const protectedCells = new Set();
  protectedCells.add(`${startPos[0]},${startPos[1]}`);
  for (const [ar, ac] of getAdjacentCells(startPos[0], startPos[1])) {
    protectedCells.add(`${ar},${ac}`);
  }

  const maxAttempts = 400;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const rng = mulberry32(seed + attempt);

    const grid = Array(size)
      .fill(null)
      .map(() =>
        Array(size)
          .fill(null)
          .map(() => ({ isChasm: false, visited: false, isStart: false }))
      );

    const availableCells = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!protectedCells.has(`${r},${c}`)) {
          availableCells.push([r, c]);
        }
      }
    }

    if (chasmCount > availableCells.length) {
      break;
    }

    const pool = availableCells.slice();
    let placedChasms = 0;

    while (placedChasms < chasmCount && pool.length > 0) {
      const index = Math.floor(rng() * pool.length);
      const [r, c] = pool.splice(index, 1)[0];
      grid[r][c].isChasm = true;
      placedChasms++;
    }

    grid[startPos[0]][startPos[1]].visited = true;
    grid[startPos[0]][startPos[1]].isStart = true;

    if (placedChasms === chasmCount && isSolvable(grid, startPos, size)) {
      return grid;
    }
  }

  const fallbackGrid = Array(size)
    .fill(null)
    .map(() =>
      Array(size)
        .fill(null)
        .map(() => ({ isChasm: false, visited: false, isStart: false }))
    );
  fallbackGrid[startPos[0]][startPos[1]].visited = true;
  fallbackGrid[startPos[0]][startPos[1]].isStart = true;

  return fallbackGrid;
}
