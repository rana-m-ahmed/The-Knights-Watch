export function TierTutorialBanner({ tier, mechanic, dismissed, onDismiss }) {
  if (dismissed) return null;

  const content = tier === 'Tier I'
    ? {
        icon: '♞',
        color: '#c09a40',
        title: 'Learn the L-Shape',
        body: 'Numbers on glowing tiles show how many escape routes that tile has. Visit LOW numbers first — they become dead ends quickly. Avoid the ⚠ warning tiles or you will trap yourself.',
      }
    : tier === 'Tier II'
    ? {
        icon: 'Ψ',
        color: '#b03060',
        title: 'Beware the Cursed Tiles',
        body: 'Crimson Ψ tiles are cursed. Landing on one deducts 8 seconds from your clock. Route around them when you can — but sometimes the tour forces you through. Accept the penalty and keep moving.',
      }
    : tier === 'Tier III'
    ? {
        icon: '◉',
        color: '#4dd9b8',
        title: 'Navigate the Fog',
        body: 'Only tiles one knight-move away are visible. You cannot see chasms or tiles beyond your reach. Move toward the edges early — corners are hardest to reach and easiest to forget. Trust the L-shape.',
      }
    : {
        icon: 'Ω',
        color: '#c0392b',
        title: 'The Rune Cipher',
        body: 'Greek rune tiles glow crimson across the board. Visit them in the correct hidden order to crack the cipher and earn +15 seconds. The secret: always move to the tile with the FEWEST onward options. The runes reward optimal play.',
      };

  return (
    <div
      style={{
        width: 'min(90vw, 420px)',
        padding: '10px 16px',
        background: 'rgba(10,8,5,0.85)',
        border: '1px solid rgba(180,150,80,0.2)',
        borderRadius: 4,
        marginBottom: 8,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 12,
        color: '#d4c5a9',
        fontFamily: 'Georgia, "Times New Roman", serif',
      }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ fontSize: 22, lineHeight: 1, color: content.color }}>{content.icon}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#e8d5a3' }}>{content.title}</div>
          <div style={{ fontSize: 12, lineHeight: 1.5, color: '#cbb99a' }}>{content.body}</div>
          {mechanic && tier === 'Tier I' && (
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(208,170,80,0.65)' }}>
              {mechanic}
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        style={{
          fontSize: 16,
          cursor: 'pointer',
          background: 'transparent',
          border: 'none',
          fontFamily: 'inherit',
          color: '#6a5a3a',
          lineHeight: 1,
          padding: 0,
        }}
        aria-label="Dismiss tutorial banner"
      >
        ×
      </button>
    </div>
  );
}