import { useState, useEffect } from 'react';

const styles = {
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    zIndex: 100
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    padding: '32px',
    background: 'linear-gradient(160deg, #0a0c12 0%, #111520 50%, #0d0f1a 100%)',
    border: '2px solid rgba(180,150,80,0.3)',
    borderRadius: '8px',
    textAlign: 'center',
    fontFamily: 'Georgia, "Times New Roman", serif',
    color: '#d4c5a9',
    maxWidth: '400px'
  },
  rune: {
    fontSize: '48px',
    fontWeight: 'bold'
  },
  winRune: {
    color: '#f0c040'
  },
  loseRune: {
    color: '#ff6b5b'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    letterSpacing: '2px',
    color: '#e8d5a3'
  },
  titleLose: {
    color: '#ff6b5b'
  },
  stars: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    fontSize: '36px'
  },
  starEarned: {
    color: '#f0c040',
    textShadow: '0 0 8px rgba(240,192,64,0.5)',
    animation: 'starBounce 0.6s ease-in-out'
  },
  starUnearned: {
    color: '#2a2010',
    opacity: 0.3
  },
  tag: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  tagGood: {
    background: 'rgba(100,180,100,0.2)',
    color: '#a8d8a8',
    border: '1px solid rgba(100,180,100,0.5)'
  },
  tagBad: {
    background: 'rgba(180,60,40,0.2)',
    color: '#ff9999',
    border: '1px solid rgba(180,60,40,0.5)'
  },
  stat: {
    fontSize: '14px',
    color: '#d4c5a9'
  },
  buttons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    width: '100%'
  },
  button: {
    padding: '10px 20px',
    background: 'rgba(180,150,80,0.2)',
    border: '1px solid rgba(180,150,80,0.5)',
    color: '#d4c5a9',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '4px',
    fontFamily: 'Georgia, "Times New Roman", serif',
    transition: 'all 0.2s ease',
    flex: 1
  },
  buttonPrimary: {
    background: 'rgba(180,150,80,0.3)',
    borderColor: 'rgba(180,150,80,0.8)',
    color: '#f0c040'
  }
};

export function Overlay({
  gameState,
  stars,
  undoUsed,
  visitedCount,
  totalTiles,
  timeElapsed,
  timeLimit,
  onNext,
  onRetry,
  hasNext
}) {
  const [displayedStars, setDisplayedStars] = useState(0);

  useEffect(() => {
    if (gameState !== 'won') {
      setDisplayedStars(0);
    }
  }, [gameState]);

  // Animate stars one by one
  useEffect(() => {
    if (gameState === 'won' && stars > displayedStars) {
      const timer = setTimeout(() => {
        setDisplayedStars(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [gameState, stars, displayedStars]);

  if (gameState === 'playing' || gameState === 'idle') {
    return null;
  }

  if (gameState === 'won') {
    return (
      <div style={styles.overlay}>
        <div style={styles.content}>
          <div style={{ ...styles.rune, ...styles.winRune }}>✦</div>
          <div style={styles.title}>Seal Broken!</div>

          <div style={styles.stars}>
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                style={
                  i < displayedStars
                    ? styles.starEarned
                    : styles.starUnearned
                }
              >
                ★
              </span>
            ))}
          </div>

          <div>
            {!undoUsed ? (
              <div style={{ ...styles.tag, ...styles.tagGood }}>✓ No Undo</div>
            ) : (
              <div style={{ ...styles.tag, ...styles.tagBad }}>✕ Undo Used</div>
            )}
          </div>

          <div style={styles.buttons}>
            {hasNext && (
              <button
                style={{ ...styles.button, ...styles.buttonPrimary }}
                onClick={onNext}
              >
                Next Dungeon →
              </button>
            )}
            <button style={styles.button} onClick={onRetry}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'lost') {
    return (
      <div style={styles.overlay}>
        <div style={styles.content}>
          <div style={{ ...styles.rune, ...styles.loseRune }}>✖</div>
          <div style={{ ...styles.title, ...styles.titleLose }}>Trapped!</div>

          <div style={styles.stat}>
            {visitedCount}/{totalTiles} tiles visited
          </div>

          <button style={styles.button} onClick={onRetry}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'timeout') {
    return (
      <div style={styles.overlay}>
        <div style={styles.content}>
          <div style={{ ...styles.rune, ...styles.loseRune }}>⧗</div>
          <div style={{ ...styles.title, ...styles.titleLose }}>Time Runs Out!</div>

          <div style={styles.stat}>
            {visitedCount}/{totalTiles} tiles visited
          </div>

          <button style={styles.button} onClick={onRetry}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}
