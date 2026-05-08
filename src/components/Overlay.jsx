import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  hasNext,
  cipherSolved,
}) {
  const [displayedStars, setDisplayedStars] = useState(0);

  useEffect(() => {
    if (gameState !== 'won') {
      setDisplayedStars(0);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'won' && stars > displayedStars) {
      const timer = setTimeout(() => {
        setDisplayedStars(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [gameState, stars, displayedStars]);

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    padding: '32px',
    background: 'linear-gradient(160deg, #0a0c12 0%, #111520 50%, #0d0f1a 100%)',
    border: '2px solid color-mix(in srgb, var(--accent) 40%, transparent)',
    borderRadius: '8px',
    textAlign: 'center',
    fontFamily: 'Georgia, "Times New Roman", serif',
    color: '#d4c5a9',
    maxWidth: '400px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    background: 'rgba(180, 150, 80, 0.2)',
    border: '1px solid rgba(180, 150, 80, 0.5)',
    color: '#d4c5a9',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '4px',
    fontFamily: 'Georgia, "Times New Roman", serif',
    transition: 'all 0.2s ease',
    flex: 1,
  };

  return (
    <AnimatePresence>
      {gameState === 'won' && (
        <motion.div
          key="overlay-won"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={overlayStyle}
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={contentStyle}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#f0c040',
                textShadow: '0 0 12px rgba(240, 192, 64, 0.5)',
              }}
            >
              ✦
            </motion.div>

            <div style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '2px', color: '#e8d5a3' }}>
              Castle Conquered
            </div>

            {/* Cipher cracked badge */}
            {cipherSolved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  background: 'rgba(140, 240, 160, 0.12)',
                  border: '1px solid rgba(140, 240, 160, 0.5)',
                  color: 'rgba(140, 240, 160, 0.9)',
                  fontSize: '11px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                ✦ CIPHER CRACKED ✦
              </motion.div>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', fontSize: '36px' }}>
              {[...Array(3)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={i < displayedStars ? { scale: 1, rotate: 0 } : { scale: 0.5, opacity: 0.3 }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                  style={{
                    color: i < displayedStars ? '#f0c040' : '#2a2010',
                    textShadow: i < displayedStars ? '0 0 8px rgba(240,192,64,0.5)' : 'none',
                  }}
                >
                  ★
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              {!undoUsed ? (
                <div
                  style={{
                    display: 'inline-block',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    background: 'rgba(100, 180, 100, 0.2)',
                    color: '#a8d8a8',
                    border: '1px solid rgba(100, 180, 100, 0.5)',
                  }}
                >
                  ✓ No Undo
                </div>
              ) : (
                <div
                  style={{
                    display: 'inline-block',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    background: 'rgba(180, 60, 40, 0.2)',
                    color: '#ff9999',
                    border: '1px solid rgba(180, 60, 40, 0.5)',
                  }}
                >
                  ✕ Undo Used
                </div>
              )}
            </motion.div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', width: '100%' }}>
              {hasNext && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    ...buttonStyle,
                    background: 'rgba(180, 150, 80, 0.3)',
                    borderColor: 'rgba(180, 150, 80, 0.8)',
                    color: '#f0c040',
                  }}
                  onClick={onNext}
                >
                  Next Dungeon →
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={buttonStyle}
                onClick={onRetry}
              >
                Retry
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {gameState === 'lost' && (
        <motion.div
          key="overlay-lost"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={overlayStyle}
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={contentStyle}
          >
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#ff6b5b',
                textShadow: '0 0 12px rgba(255, 107, 91, 0.4)',
              }}
            >
              ✖
            </motion.div>

            <div style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '2px', color: '#ff6b5b' }}>
              Trapped!
            </div>

            <div style={{ fontSize: '14px', color: '#d4c5a9' }}>
              {visitedCount}/{totalTiles} tiles visited
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={buttonStyle}
              onClick={onRetry}
            >
              Try Again
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {gameState === 'timeout' && (
        <motion.div
          key="overlay-timeout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={overlayStyle}
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={contentStyle}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#e74c3c',
                textShadow: '0 0 12px rgba(231, 76, 60, 0.5)',
              }}
            >
              ⧗
            </motion.div>

            <div style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '2px', color: '#e74c3c' }}>
              Time Runs Out!
            </div>

            <div style={{ fontSize: '14px', color: '#d4c5a9' }}>
              The dungeon swallows you whole.
            </div>

            <div style={{ fontSize: '14px', color: '#d4c5a9' }}>
              {visitedCount}/{totalTiles} tiles visited
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={buttonStyle}
              onClick={onRetry}
            >
              Try Again
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
