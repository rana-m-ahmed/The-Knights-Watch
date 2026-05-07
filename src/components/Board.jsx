import { Tile } from './Tile.jsx';
import { getValidMoves, getWarnsdorffScore } from '../engine/knightLogic.js';

const styles = {
  board: {
    display: 'grid',
    gap: '2px',
    padding: '16px',
    background: '#0a0c12',
    borderRadius: '4px',
    boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
    aspectRatio: '1',
    maxWidth: '600px',
    margin: '0 auto'
  },
  boardNormal: {
    boxShadow: '0 0 0 2px rgba(180,150,80,0.3), inset 0 0 30px rgba(0,0,0,0.5)'
  },
  boardWarning: {
    boxShadow: '0 0 0 3px rgba(180,60,40,0.6), 0 0 20px rgba(180,60,40,0.2), inset 0 0 30px rgba(0,0,0,0.5)',
    animation: 'timerWarn 1s ease-in-out infinite'
  },
  boardShake: {
    animation: 'boardShake 0.3s ease-in-out'
  }
};

export function Board({
  grid,
  size,
  knightPos,
  validMoves,
  warningTiles,
  crumbling,
  jumpAnim,
  hintMode,
  timeRatio,
  onMove
}) {
  const gridTemplateColumns = `repeat(${size}, 1fr)`;
  const isWarning = timeRatio > 0.8;
  const isShaking = timeRatio > 0.9;

  let boardStyle = {
    ...styles.board,
    gridTemplateColumns,
    '--time-ratio': timeRatio
  };

  if (isWarning) {
    boardStyle = { ...boardStyle, ...styles.boardWarning };
  } else {
    boardStyle = { ...boardStyle, ...styles.boardNormal };
  }

  if (isShaking) {
    boardStyle = { ...boardStyle, ...styles.boardShake };
  }

  // Create a map of valid and warning tiles for quick lookup
  const validMap = new Set(validMoves.map(m => `${m[0]},${m[1]}`));
  const warnMap = new Set(warningTiles.map(m => `${m[0]},${m[1]}`));

  return (
    <div style={boardStyle}>
      {grid.map((row, r) =>
        row.map((cell, c) => {
          const key = `${r},${c}`;
          const isKnight = knightPos[0] === r && knightPos[1] === c;
          const isValid = validMap.has(key);
          const isWarn = warnMap.has(key);
          const isCrumbling = crumbling && crumbling[0] === r && crumbling[1] === c;
          const isJumping = jumpAnim && jumpAnim[0] === r && jumpAnim[1] === c;

          // Add Warnsdorff score to cell for hint rendering
          const cellWithScore = {
            ...cell,
            warnsdorffScore: isValid ? getWarnsdorffScore(grid, [r, c], size) : 0
          };

          return (
            <Tile
              key={key}
              cell={cellWithScore}
              isKnight={isKnight}
              isValid={isValid}
              isWarn={isWarn}
              isCrumbling={isCrumbling}
              isJumping={isJumping}
              hintMode={hintMode}
              onClick={() => onMove(r, c)}
            />
          );
        })
      )}
    </div>
  );
}
