import { motion } from 'framer-motion';

export function Tile({
  cell,
  isKnight,
  isValid,
  isWarn,
  isCrumbling,
  isJumping,
  hintMode,
  onClick,
  isTrail,
  isRune,
  runeIndex,
  cipherFailed,
  isFogHidden,
  isCursed,
  trailAge,
  warnsdorffScore,
  runeSymbol,
}) {
  let baseStyle = {
    aspectRatio: '1',
    background: 'var(--tile-bg)',
    border: '1px solid var(--tile-border)',
    cursor: 'default',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#d4c5a9',
    transition: 'all 0.2s ease',
    overflow: 'hidden',
  };

  // Fog hidden (void tile) — override everything
  if (isFogHidden) {
    return (
      <motion.div
        style={{
          ...baseStyle,
          background: '#080608',
          border: '1px solid rgba(40, 20, 50, 0.4)',
          boxShadow: 'inset 0 0 6px rgba(60, 20, 80, 0.3)',
          cursor: 'default',
          pointerEvents: 'none',
        }}
      />
    );
  }

  // Crumbled state
  if (isCrumbling) {
    baseStyle = {
      ...baseStyle,
      opacity: 0.2,
      transform: 'scale(0.8)',
    };
  }

  // Jumping animation
  if (isJumping) {
    baseStyle = {
      ...baseStyle,
      animation: 'knightJump 0.3s ease-out',
    };
  }

  // Valid tile
  if (isValid && !isFogHidden) {
    baseStyle = {
      ...baseStyle,
      background: 'var(--tile-valid-bg)',
      border: '1px solid var(--tile-valid-bd)',
      cursor: 'pointer',
      animation: 'pulse 1.8s ease-in-out infinite',
    };
  }

  // Warning tile (overrides valid)
  if (isWarn && !isFogHidden) {
    baseStyle = {
      ...baseStyle,
      background: 'var(--tile-valid-bg)',
      border: '1px solid rgba(180, 60, 40, 0.5)',
      cursor: 'pointer',
      animation: 'none',
    };
  }

  // Knight (overrides all)
  if (isKnight) {
    baseStyle = {
      ...baseStyle,
      background: '#2a2010',
      border: '1px solid var(--accent)',
      boxShadow: '0 0 16px color-mix(in srgb, var(--accent) 40%, transparent)',
    };
  }

  // Cursed tile (not visited, not fog, not knight)
  if (isCursed && !cell.visited && !isFogHidden && !isKnight) {
    baseStyle = {
      ...baseStyle,
      background: '#1a0510',
      border: '1px solid rgba(160, 30, 80, 0.6)',
      cursor: 'default',
    };
  }

  // Rune tile (not visited, not fog, not cursed, not knight)
  if (isRune && !cell.visited && !isFogHidden && !isKnight && !isCursed) {
    baseStyle = {
      ...baseStyle,
      background: '#180408',
      border: '1px solid rgba(180, 40, 60, 0.5)',
      boxShadow: '0 0 8px rgba(180, 40, 60, 0.2)',
      cursor: 'default',
    };
  }

  // Content rendering
  let hintContent = '';
  if (isKnight) {
    hintContent = '♞';
  } else if (isValid && hintMode === 'full') {
    hintContent = warnsdorffScore > 0 ? String(warnsdorffScore) : '';
  } else if (isValid && hintMode === 'warn') {
    hintContent = '◎';
  } else if (isWarn && hintMode === 'warn') {
    hintContent = '⚠';
  }

  const knightFilter = isKnight ? 'drop-shadow(0 0 6px #f0c040)' : 'none';

  return (
    <motion.div
      style={{
        ...baseStyle,
        filter: knightFilter,
      }}
      whileTap={isValid ? { scale: 0.92 } : {}}
      transition={{ duration: 0.12 }}
      onClick={onClick}
      role="button"
      tabIndex={isValid ? 0 : -1}
      aria-label="Tile"
    >
      {/* Trail glow overlay */}
      {isTrail && trailAge !== null && !isKnight && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            boxShadow:
              trailAge === 0
                ? 'inset 0 0 12px var(--accent)'
                : trailAge === 1
                ? 'inset 0 0 8px var(--accent)'
                : trailAge === 2
                ? 'inset 0 0 5px var(--accent)'
                : 'inset 0 0 2px var(--accent)',
            opacity: [0.55, 0.38, 0.22, 0.1][trailAge] || 0.1,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Cursed tile symbol */}
      {isCursed && !cell.visited && !isFogHidden && !isKnight && (
        <span
          style={{
            fontSize: '14px',
            color: '#b03060',
            animation: 'runeFloat 2.5s ease-in-out infinite',
          }}
        >
          Ψ
        </span>
      )}

      {/* Rune symbol */}
      {isRune && !cell.visited && !isFogHidden && !isKnight && !isCursed && (
        <span
          style={{
            fontSize: '16px',
            color: 'rgba(200, 60, 80, 0.75)',
            animation: 'runeFloat 3s ease-in-out infinite',
            fontFamily: 'Georgia, serif',
          }}
        >
          {runeSymbol}
        </span>
      )}

      {/* Hint content */}
      {hintContent && !isCursed && !isRune && (
        <span style={{ fontSize: isKnight ? '28px' : '14px' }}>{hintContent}</span>
      )}
    </motion.div>
  );
}
