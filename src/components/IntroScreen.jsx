const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '32px',
    background: 'linear-gradient(160deg, #0a0c12 0%, #111520 50%, #0d0f1a 100%)',
    fontFamily: 'Georgia, "Times New Roman", serif',
    color: '#d4c5a9'
  },
  runeLine: {
    fontSize: '24px',
    letterSpacing: '12px',
    color: '#c09a40',
    marginBottom: '32px'
  },
  knightContainer: {
    position: 'relative',
    width: '120px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '32px'
  },
  knightCircle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    border: '2px solid rgba(192,154,64,0.4)',
    borderRadius: '50%',
    boxShadow: '0 0 20px rgba(192,154,64,0.2)'
  },
  knight: {
    fontSize: '80px',
    color: '#f0c040',
    filter: 'drop-shadow(0 0 8px #f0c040)',
    position: 'relative',
    zIndex: 1
  },
  title: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#e8d5a3',
    letterSpacing: '4px',
    marginBottom: '8px',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    color: '#c09a40',
    marginBottom: '24px'
  },
  rule: {
    width: '200px',
    height: '1px',
    background: 'linear-gradient(to right, transparent, #8a6c2a, transparent)',
    margin: '24px 0'
  },
  description: {
    fontSize: '14px',
    lineHeight: '1.8',
    color: '#d4c5a9',
    maxWidth: '500px',
    textAlign: 'center',
    marginBottom: '32px'
  },
  badges: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '32px'
  },
  badge: {
    padding: '8px 16px',
    background: 'rgba(120,100,60,0.1)',
    border: '1px solid rgba(180,150,80,0.3)',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#8a6c2a'
  },
  button: {
    padding: '12px 32px',
    background: 'rgba(192,154,64,0.2)',
    border: '2px solid rgba(192,154,64,0.6)',
    color: '#f0c040',
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    borderRadius: '4px',
    fontFamily: 'Georgia, "Times New Roman", serif',
    transition: 'all 0.3s ease',
    textShadow: '0 0 4px rgba(240,192,64,0.3)'
  }
};

export function IntroScreen({ onEnter }) {
  const handleMouseEnter = (e) => {
    e.target.style.background = 'rgba(192,154,64,0.4)';
    e.target.style.boxShadow = '0 0 16px rgba(240,192,64,0.2)';
  };

  const handleMouseLeave = (e) => {
    e.target.style.background = 'rgba(192,154,64,0.2)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={styles.container}>
      <div style={styles.runeLine}>✦ ✧ ✦</div>

      <div style={styles.knightContainer}>
        <div style={styles.knightCircle}></div>
        <div style={styles.knight}>♞</div>
      </div>

      <h1 style={styles.title}>Knight's Watch</h1>
      <div style={styles.subtitle}>The Cursed Tiles</div>

      <div style={styles.rule}></div>

      <p style={styles.description}>
        Navigate the cursed tiles of the dungeon with nothing but your wits and
        the knight's sacred L-shaped movement. Each tile bears a curse — visit
        it once, and it crumbles beneath your hooves. Find the path through the
        darkness.
      </p>

      <div style={styles.badges}>
        <div style={styles.badge}>L-Shape Movement</div>
        <div style={styles.badge}>No Revisits</div>
        <div style={styles.badge}>Solve or Fall</div>
      </div>

      <button
        style={styles.button}
        onClick={onEnter}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Enter the Dungeon
      </button>
    </div>
  );
}
