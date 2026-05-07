import { motion, AnimatePresence } from 'framer-motion';

export function CipherPanel({
  safeRuneSequence,
  runeProgress,
  cipherSolved,
  cipherFailed,
}) {
  if (!safeRuneSequence || safeRuneSequence.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: '24px',
        padding: '16px 24px',
        background: 'linear-gradient(160deg, rgba(12, 8, 20, 0.6) 0%, rgba(20, 10, 30, 0.4) 100%)',
        borderRadius: '8px',
        border: '1px solid rgba(180, 40, 60, 0.2)',
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: '12px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: 'rgba(200, 60, 80, 0.8)',
          marginBottom: '12px',
          textAlign: 'center',
        }}
      >
        ✦ Rune Cipher ✦
      </div>

      {/* Rune slots */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '12px',
        }}
      >
        {safeRuneSequence.map((rune, idx) => {
          const isVisited = idx < runeProgress.length;
          const isCorrect = isVisited && runeProgress[idx] === rune.symbol;
          const isFailed = isVisited && !isCorrect;

          return (
            <motion.div
              key={idx}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: '700',
                fontFamily: 'Georgia, serif',
                background: isCorrect
                  ? 'rgba(140, 180, 240, 0.12)'
                  : isFailed
                  ? 'rgba(180, 60, 60, 0.12)'
                  : 'rgba(100, 100, 140, 0.06)',
                border: isCorrect
                  ? '1px solid rgba(180, 220, 255, 0.5)'
                  : isFailed
                  ? '1px solid rgba(180, 60, 60, 0.6)'
                  : '1px solid rgba(100, 100, 140, 0.2)',
                boxShadow: isCorrect
                  ? '0 0 12px rgba(180, 220, 255, 0.3)'
                  : isFailed
                  ? '0 0 8px rgba(180, 60, 60, 0.2)'
                  : 'none',
                color: isCorrect
                  ? '#8df0a6'
                  : isFailed
                  ? '#ff6b5b'
                  : 'rgba(200, 200, 200, 0.3)',
              }}
            >
              {isVisited ? (isCorrect ? '●' : '✗') : '○'}
            </motion.div>
          );
        })}
      </div>

      {/* Status line */}
      <div
        style={{
          textAlign: 'center',
          fontSize: '11px',
          fontWeight: '600',
          color: cipherSolved
            ? 'rgba(140, 240, 160, 0.8)'
            : cipherFailed
            ? 'rgba(255, 107, 91, 0.8)'
            : 'rgba(200, 200, 200, 0.4)',
          letterSpacing: '1px',
          minHeight: '16px',
        }}
      >
        <AnimatePresence>
          {cipherSolved && (
            <motion.div
              key="solved"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              ✦ SEAL CRACKED — +15s ✦
            </motion.div>
          )}
          {cipherFailed && (
            <motion.div
              key="failed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              ✖ SEQUENCE BROKEN
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
