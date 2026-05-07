const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    background: 'linear-gradient(160deg, #0a0c12 0%, #111520 50%, #0d0f1a 100%)',
    borderBottom: '1px solid rgba(180,150,80,0.2)',
    fontFamily: 'Georgia, "Times New Roman", serif',
    color: '#d4c5a9'
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  tier: {
    fontSize: '10px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#c09a40',
    opacity: 0.8
  },
  levelName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#e8d5a3',
    letterSpacing: '1px'
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px'
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px'
  },
  statLabel: {
    fontSize: '10px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#8a6c2a',
    opacity: 0.8
  },
  statValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#f0c040',
    fontFamily: 'monospace'
  },
  timer: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#f0c040',
    fontFamily: 'monospace',
    minWidth: '80px',
    textAlign: 'center'
  },
  timerWarning: {
    color: '#ff6b5b',
    animation: 'timerTextPulse 0.8s ease-in-out infinite'
  }
};

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function HUD({
  level,
  visitedCount,
  totalTiles,
  moveCount,
  timeRemaining,
  timeLimit,
  timeRatio
}) {
  const isTimeWarning = timeLimit && timeRatio > 0.8;
  const timerStyle = isTimeWarning ? { ...styles.timer, ...styles.timerWarning } : styles.timer;

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <div style={styles.tier}>{level.tier}</div>
        <div style={styles.levelName}>{level.name}</div>
      </div>

      <div style={styles.right}>
        <div style={styles.stat}>
          <div style={styles.statLabel}>Tiles</div>
          <div style={styles.statValue}>{visitedCount}/{totalTiles}</div>
        </div>

        <div style={styles.stat}>
          <div style={styles.statLabel}>Moves</div>
          <div style={styles.statValue}>{moveCount}</div>
        </div>

        {timeLimit && (
          <div style={timerStyle}>
            {formatTime(timeRemaining)}
          </div>
        )}
      </div>
    </div>
  );
}
