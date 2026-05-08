import { buildGrid } from '../engine/levelGenerator.js';
import { getValidMoves, countTiles } from '../engine/knightLogic.js';
import { LEVELS } from '../data/levelData.js';

export function runWarnsdorff(grid, startPos, size) {
  const workingGrid = grid.map(row => row.map(cell => ({ ...cell })));
  const totalTiles = countTiles(workingGrid);
  const path = [startPos];
  let currentPos = startPos;
  let visitedCount = 1;

  const markVisited = ([r, c]) => {
    workingGrid[r][c].visited = true;
  };

  markVisited(startPos);

  while (visitedCount < totalTiles) {
    const moves = getValidMoves(workingGrid, currentPos, size);
    if (moves.length === 0) {
      break;
    }

    const rankedMoves = moves
      .map(move => ({
        move,
        onward: (() => {
          const simulatedGrid = workingGrid.map(row => row.map(cell => ({ ...cell })));
          simulatedGrid[move[0]][move[1]].visited = true;
          return getValidMoves(simulatedGrid, move, size).length;
        })(),
      }))
      .sort((a, b) => {
        if (a.onward !== b.onward) return a.onward - b.onward;
        const aTie = a.move[0] + a.move[1];
        const bTie = b.move[0] + b.move[1];
        if (aTie !== bTie) return aTie - bTie;
        if (a.move[0] !== b.move[0]) return a.move[0] - b.move[0];
        return a.move[1] - b.move[1];
      });

    const nextPos = rankedMoves[0].move;
    markVisited(nextPos);
    currentPos = nextPos;
    path.push(nextPos);
    visitedCount += 1;
  }

  return {
    solved: visitedCount === totalTiles,
    visitedCount,
    totalTiles,
    path,
  };
}

export function validateAll() {
  LEVELS.forEach(level => {
    const grid = buildGrid(level);
    const total = countTiles(grid);
    const result = runWarnsdorff(grid, level.startPos ?? [0, 0], level.size);
    const cells = grid.flat();
    const chasms = cells.filter(cell => cell.isChasm).length;
    const cursed = cells.filter(cell => cell.isCursed).length;

    console.log(
      `Level ${level.id} - ${level.name} (${level.tier}) | Grid: ${level.size}×${level.size} | Total tiles: ${total} | Chasms: ${chasms} | Cursed: ${cursed} | Solvable: ${result.solved} | Coverage: ${((result.visitedCount / result.totalTiles) * 100).toFixed(1)}%`,
    );

    if (level.tier === 'Tier IV' && Array.isArray(level.runeSequence)) {
      level.runeSequence.forEach(entry => {
        const [r, c] = entry.pos;
        console.log(
          grid[r] && grid[r][c] && grid[r][c].isChasm
            ? `RUNE ${entry.symbol} AT [${r},${c}] IS ON A CHASM — FIX NEEDED`
            : `RUNE ${entry.symbol} AT [${r},${c}] OK`,
        );
      });
    }
  });
}