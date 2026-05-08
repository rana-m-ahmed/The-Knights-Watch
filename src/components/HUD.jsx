import { motion, AnimatePresence } from 'framer-motion';

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
  timeRatio,
  activeMechanic,
  cipherProgress,
  cursedHit,
}) {
  const isTimeWarning = timeLimit && timeRatio > 0.8;
  const timerColor = isTimeWarning ? '#e74c3c' : 'var(--accent)';
  const mechanicLabel = activeMechanic === 'cursed'
    ? '⚠ CURSED TILES'
    : activeMechanic === 'fog'
    ? '◉ FOG OF WAR'
    : activeMechanic === 'cipher'
    ? `Ω CIPHER: ${cipherProgress || '0/0'}`
    : '';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        rowGap: '12px',
        columnGap: '16px',
        padding: 'clamp(10px, 2vw, 16px) clamp(12px, 3vw, 24px)',
        background: 'linear-gradient(160deg, #0a0c12 0%, #111520 50%, #0d0f1a 100%)',
        borderBottom: '1px solid color-mix(in srgb, var(--tile-border) 40%, transparent)',
        fontFamily: 'Georgia, "Times New Roman", serif',
        color: '#d4c5a9',
        position: 'relative',
      }}
    >
      {/* Left: Level info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div
          style={{
            fontSize: 'clamp(9px, 1.8vw, 10px)',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'var(--accent)',
            opacity: 0.8,
          }}
        >
          {level.tierName}
        </div>
        <div
          style={{
            fontSize: 'clamp(15px, 3.2vw, 18px)',
            fontWeight: '600',
            color: '#e8d5a3',
            letterSpacing: '1px',
          }}
        >
          {level.name}
        </div>
      </div>

      {/* Center/Right: Stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px, 2.8vw, 32px)', flexWrap: 'wrap', justifyContent: 'flex-end', marginLeft: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#8a6c2a', opacity: 0.8 }}>
            Tiles
          </div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent)', fontFamily: 'monospace' }}>
            {visitedCount}/{totalTiles}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#8a6c2a', opacity: 0.8 }}>
            Moves
          </div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent)', fontFamily: 'monospace' }}>
            {moveCount}
          </div>
        </div>

        {timeLimit && (
          <div
            style={{
              fontSize: 'clamp(18px, 4vw, 24px)',
              fontWeight: '700',
              color: timerColor,
              fontFamily: 'monospace',
              minWidth: '80px',
              textAlign: 'center',
              animation: isTimeWarning ? 'timerWarn 0.8s ease-in-out infinite' : 'none',
            }}
          >
            {formatTime(timeRemaining)}
          </div>
        )}

        {activeMechanic && activeMechanic !== 'none' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: '6px',
              background: 'rgba(200, 150, 60, 0.08)',
              border: '1px solid rgba(200, 150, 60, 0.2)',
            }}
          >
            <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {mechanicLabel}
            </span>
          </div>
        )}
      </div>

      {/* Cursed Hit Pill */}
      <AnimatePresence>
        {cursedHit && (
          <motion.div
            key={cursedHit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.9 }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '28%',
              transform: 'translateX(-50%) translateY(-50%)',
              pointerEvents: 'none',
              fontSize: '20px',
              fontWeight: '700',
              color: '#e74c3c',
              textShadow: '0 0 8px rgba(231, 76, 60, 0.5)',
              fontFamily: 'monospace',
              animation: 'fadeUp 0.9s ease-out',
            }}
          >
            -8s
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
