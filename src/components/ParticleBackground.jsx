import { useMemo } from 'react';

export function ParticleBackground() {
  const motes = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: 2 + ((i * 7 + 3) % 3),
      top: 10 + ((i * 31 + 7) % 80),
      left: 5 + ((i * 53 + 11) % 90),
      dur: 6 + ((i * 17 + 5) % 8),
      del: (i * 23 + 3) % 8,
    }));
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {motes.map(mote => (
        <div
          key={mote.id}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            width: mote.size + 'px',
            height: mote.size + 'px',
            background: 'rgba(255, 255, 255, 0.18)',
            top: mote.top + '%',
            left: mote.left + '%',
            animation: `floatDust ${mote.dur}s linear ${mote.del}s infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  );
}
