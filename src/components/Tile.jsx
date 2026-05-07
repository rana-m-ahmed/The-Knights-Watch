const styles = {
  tile: {
    aspectRatio: '1',
    background: '#1e1a14',
    border: '1px solid rgba(120,100,60,0.25)',
    cursor: 'default',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#d4c5a9',
    transition: 'all 0.2s ease',
    overflow: 'hidden'
  },
  visited: {
    background: '#0d0b07',
    border: '1px solid rgba(60,50,30,0.3)'
  },
  valid: {
    background: '#1e1a08',
    border: '1px solid rgba(180,150,60,0.5)',
    cursor: 'pointer',
    animation: 'pulse 2s ease-in-out infinite'
  },
  warn: {
    background: '#1a0a08',
    border: '1px solid rgba(180,60,40,0.5)',
    cursor: 'pointer'
  },
  knight: {
    background: '#2a2010',
    border: '2px solid #c09a40'
  },
  chasm: {
    background: 'transparent',
    border: '1px solid rgba(60,50,30,0.15)',
    color: 'rgba(200,200,150,0.1)',
    cursor: 'default'
  },
  crumbling: {
    opacity: 0.2,
    transform: 'scale(0.8)',
    transition: 'all 0.4s ease'
  },
  jumping: {
    animation: 'knightJump 0.3s ease-out'
  },
  startTile: {
    borderStyle: 'dashed',
    borderColor: 'rgba(100,180,100,0.3)'
  }
};

export function Tile({
  cell,
  isKnight,
  isValid,
  isWarn,
  isCrumbling,
  isJumping,
  hintMode,
  onClick
}) {
  let baseStyle = { ...styles.tile };

  if (cell.isChasm) {
    baseStyle = { ...baseStyle, ...styles.chasm };
  } else {
    if (cell.visited) {
      baseStyle = { ...baseStyle, ...styles.visited };
    }
    if (isValid) {
      baseStyle = { ...baseStyle, ...styles.valid };
    }
    if (isWarn) {
      baseStyle = { ...baseStyle, ...styles.warn };
    }
    if (isKnight) {
      baseStyle = { ...baseStyle, ...styles.knight };
    }
    if (cell.isStart && !isKnight) {
      baseStyle = { ...baseStyle, ...styles.startTile };
    }
  }

  if (isCrumbling) {
    baseStyle = { ...baseStyle, ...styles.crumbling };
  }

  if (isJumping) {
    baseStyle = { ...baseStyle, ...styles.jumping };
  }

  // Get hint content
  let hintContent = '';
  if (isKnight) {
    hintContent = '♞';
  } else if (isValid && hintMode === 'full') {
    const score = cell.warnsdorffScore || 0;
    hintContent = score > 0 ? String(score) : '';
  } else if (isValid && hintMode === 'warn') {
    hintContent = '◎';
  } else if (isWarn && hintMode === 'warn') {
    hintContent = '⚠';
  } else if (cell.isChasm && hintMode !== 'none') {
    hintContent = '◈';
  }

  const knightFilter = isKnight ? 'drop-shadow(0 0 6px #f0c040)' : 'none';

  return (
    <div
      style={{
        ...baseStyle,
        filter: knightFilter
      }}
      onClick={onClick}
      role="button"
      tabIndex={isValid ? 0 : -1}
      aria-label={`Tile at position`}
    >
      {hintContent && <span style={{ fontSize: isKnight ? '28px' : '14px' }}>{hintContent}</span>}
    </div>
  );
}
