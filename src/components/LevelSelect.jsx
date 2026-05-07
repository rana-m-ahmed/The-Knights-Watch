import { useState } from 'react';
import { DEV_MODE, LEVELS } from '../data/levelData.js';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '32px',
    background: 'linear-gradient(160deg, #0a0c12 0%, #111520 50%, #0d0f1a 100%)',
    minHeight: '100vh',
    fontFamily: 'Georgia, "Times New Roman", serif',
    color: '#d4c5a9'
  },
  header: {
    textAlign: 'center',
    marginBottom: '16px'
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#e8d5a3',
    letterSpacing: '2px',
    marginBottom: '8px'
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '24px'
  },
  tab: {
    padding: '10px 20px',
    background: 'rgba(120,100,60,0.1)',
    border: '1px solid rgba(180,150,80,0.2)',
    color: '#8a6c2a',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: 'Georgia, "Times New Roman", serif'
  },
  tabActive: {
    background: 'rgba(192,154,64,0.3)',
    borderColor: 'rgba(192,154,64,0.8)',
    color: '#f0c040'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    maxWidth: '600px',
    margin: '0 auto'
  },
  card: {
    padding: '16px',
    background: 'rgba(30,26,20,0.5)',
    border: '1px solid rgba(180,150,80,0.2)',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  cardHover: {
    borderColor: 'rgba(180,150,80,0.6)',
    background: 'rgba(42,32,16,0.8)',
    boxShadow: '0 0 16px rgba(240,192,64,0.1)'
  },
  cardLocked: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  cardNumber: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#8a6c2a',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  cardName: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#e8d5a3'
  },
  stars: {
    display: 'flex',
    justifyContent: 'center',
    gap: '4px',
    fontSize: '16px'
  },
  star: {
    color: '#f0c040'
  },
  starEmpty: {
    color: '#2a2010',
    opacity: 0.3
  },
  lockIcon: {
    fontSize: '20px',
    textAlign: 'center',
    color: '#ff6b5b'
  }
};

export function LevelSelect({ levelStars, onSelectLevel }) {
  const [activeTier, setActiveTier] = useState('Tier I');
  const [hoveredCard, setHoveredCard] = useState(null);

  const tiers = ['Tier I', 'Tier II', 'Tier III', 'Tier IV'];
  const tierLevels = LEVELS.filter(level => level.tier === activeTier);

  const isLevelLocked = (levelIndex) => {
    if (DEV_MODE) return false;
    if (levelIndex === 0) return false; // Level 1 always unlocked
    const prevLevel = LEVELS[levelIndex - 1];
    return levelStars[levelIndex - 1] === 0;
  };

  const handleSelectLevel = (level) => {
    const levelIndex = LEVELS.findIndex(l => l.id === level.id);
    if (!isLevelLocked(levelIndex)) {
      onSelectLevel(levelIndex);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>Level Select</div>
      </div>

      <div style={styles.tabs}>
        {tiers.map(tier => (
          <button
            key={tier}
            style={{
              ...styles.tab,
              ...(activeTier === tier ? styles.tabActive : {})
            }}
            onClick={() => setActiveTier(tier)}
          >
            {tier}
          </button>
        ))}
      </div>

      <div style={styles.grid}>
        {tierLevels.map((level) => {
          const levelIndex = LEVELS.findIndex(l => l.id === level.id);
          const locked = isLevelLocked(levelIndex);
          const stars = levelStars[levelIndex] || 0;

          return (
            <div
              key={level.id}
              style={{
                ...styles.card,
                ...(hoveredCard === level.id && !locked ? styles.cardHover : {}),
                ...(locked ? styles.cardLocked : {})
              }}
              onClick={() => handleSelectLevel(level)}
              onMouseEnter={() => !locked && setHoveredCard(level.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.cardNumber}>Level {level.id}</div>
              <div style={styles.cardName}>{level.name}</div>

              {locked ? (
                <div style={styles.lockIcon}>⚔</div>
              ) : (
                <div style={styles.stars}>
                  {[...Array(3)].map((_, i) => (
                    <span
                      key={i}
                      style={i < stars ? styles.star : styles.starEmpty}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
