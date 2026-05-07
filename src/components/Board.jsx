import { Tile } from './Tile.jsx';
import { ParticleBackground } from './ParticleBackground.jsx';
import { TorchCorners } from './TorchCorners.jsx';
import { getValidMoves, getWarnsdorffScore } from '../engine/knightLogic.js';

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
  onMove,
  trail,
  safeRuneSequence,
  runeProgress,
  cipherFailed,
  visibleCells,
  fogOfWar,
  levelIdx,
}) {
  const tierClass = levelIdx < 4
    ? 'theme-tier-1'
    : levelIdx < 8
    ? 'theme-tier-2'
    : levelIdx < 12
    ? 'theme-tier-3'
    : 'theme-tier-4';

  const gridTemplateColumns = `repeat(${size}, 1fr)`;
  const isWarning = timeRatio > 0.8;
  const isShaking = timeRatio > 0.9;

  let boardStyle = {
    position: 'relative',
    overflow: 'visible',
    display: 'grid',
    gap: '2px',
    padding: '16px',
    background: '#0a0c12',
    borderRadius: '4px',
    gridTemplateColumns,
    aspectRatio: '1',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: isWarning
      ? '0 0 0 3px rgba(180, 60, 40, 0.7), 0 0 24px rgba(180, 60, 40, 0.3)'
      : '0 0 0 2px color-mix(in srgb, var(--board-glow) 60%, transparent)',
    animation: isShaking ? 'boardShake 0.4s ease-in-out infinite' : 'none',
  };

  // Create maps for quick lookup
  const validMap = new Set(validMoves.map(m => `${m[0]},${m[1]}`));
  const warnMap = new Set(warningTiles.map(m => `${m[0]},${m[1]}`));
  const runeMap = new Map((safeRuneSequence || []).map(r => [`${r.pos[0]},${r.pos[1]}`, r.symbol]));
  const trailMap = new Map((trail || []).map(t => [`${t.pos[0]},${t.pos[1]}`, t.age]));
  const visibleSet = visibleCells || new Set();

  return (
    <div style={boardStyle} className={tierClass}>
      <ParticleBackground />
      <TorchCorners />

      {/* Atmosphere overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: 'radial-gradient(ellipse at center, var(--atmosphere) 0%, transparent 70%)',
          animation: 'atmospherePulse 4s ease-in-out infinite',
        }}
      />

      {grid.map((row, r) =>
        row.map((cell, c) => {
          const key = `${r},${c}`;
          const isKnight = knightPos[0] === r && knightPos[1] === c;
          const isValid = validMap.has(key);
          const isWarn = warnMap.has(key);
          const isCrumbling = crumbling && crumbling[0] === r && crumbling[1] === c;
          const isJumping = jumpAnim && jumpAnim[0] === r && jumpAnim[1] === c;
          const isFogHidden = fogOfWar && !visibleSet.has(key);
          const isCursed = cell.isCursed && !cell.visited;
          const isRune = runeMap.has(key) && !cell.visited;
          const runeSymbol = runeMap.get(key);
          const trailAge = trailMap.has(key) ? trailMap.get(key) : null;
          const isTrail = trailAge !== null;
          const warnsdorffScore = isValid ? getWarnsdorffScore(grid, [r, c], size) : 0;

          return (
            <Tile
              key={key}
              cell={cell}
              isKnight={isKnight}
              isValid={isValid}
              isWarn={isWarn}
              isCrumbling={isCrumbling}
              isJumping={isJumping}
              hintMode={hintMode}
              onClick={() => onMove(r, c)}
              isTrail={isTrail}
              isRune={isRune}
              runeIndex={-1}
              cipherFailed={cipherFailed}
              isFogHidden={isFogHidden}
              isCursed={isCursed}
              trailAge={trailAge}
              warnsdorffScore={warnsdorffScore}
              runeSymbol={runeSymbol}
            />
          );
        })
      )}
    </div>
  );
}
