// Knight movement patterns (L-shaped: 2 squares + 1 square perpendicular)
export const KNIGHT_MOVES = [
  [-2, -1], [-2, 1], [-1, -2], [-1, 2],
  [1, -2],  [1, 2],  [2, -1],  [2, 1]
];

/**
 * Get valid knight moves from current position
 * @param {Array<Array<Object>>} grid - 2D grid of cell objects
 * @param {Array<number>} pos - [row, col]
 * @param {number} size - grid dimension
 * @returns {Array<Array<number>>} Valid move positions
 */
export function getValidMoves(grid, pos, size) {
  const [r, c] = pos;
  const moves = [];
  const rowCount = Array.isArray(grid) ? grid.length : 0;

  for (const [dr, dc] of KNIGHT_MOVES) {
    const nr = r + dr;
    const nc = c + dc;

    // Check bounds
    if (nr < 0 || nr >= rowCount || nc < 0 || nc >= size) continue;

    const row = grid[nr];
    const cell = row && row[nc];
    if (!cell) continue;

    // Check if not chasm and not visited
    if (!cell.isChasm && !cell.visited) {
      moves.push([nr, nc]);
    }
  }

  return moves;
}

/**
 * Warnsdorff's heuristic: count valid onward moves from a position
 * @param {Array<Array<Object>>} grid - 2D grid of cell objects
 * @param {Array<number>} pos - [row, col]
 * @param {number} size - grid dimension
 * @returns {number} Count of valid moves from that position
 */
export function getWarnsdorffScore(grid, pos, size) {
  return getValidMoves(grid, pos, size).length;
}

/**
 * Count total non-chasm tiles in grid
 * @param {Array<Array<Object>>} grid - 2D grid
 * @returns {number} Total tiles
 */
export function countTiles(grid) {
  let count = 0;
  for (const row of grid) {
    for (const cell of row) {
      if (!cell.isChasm) count++;
    }
  }
  return count;
}
