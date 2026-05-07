export function TorchCorners() {
  const TorchFlame = ({ top, right, bottom, left }) => (
    <div
      style={{
        position: 'absolute',
        top,
        right,
        bottom,
        left,
        width: '28px',
        height: '36px',
      }}
    >
      <svg viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg">
        {/* Stem */}
        <rect x="12" y="28" width="4" height="8" rx="1" fill="rgba(100, 80, 40, 0.6)" />
        
        {/* Outer flame */}
        <path
          d="M14 28 Q8 18 12 10 Q14 4 14 0 Q14 4 16 10 Q20 18 14 28Z"
          fill="var(--accent, #c09a40)"
          opacity="0.65"
          style={{ animation: 'torchFlicker 0.9s ease-in-out infinite' }}
        />
        
        {/* Inner flame */}
        <path
          d="M14 26 Q11 20 13 14 Q14 10 14 8 Q14 10 15 14 Q17 20 14 26Z"
          fill="#ffe082"
          opacity="0.9"
          style={{ animation: 'torchFlicker 0.7s ease-in-out infinite 0.15s' }}
        />
      </svg>
    </div>
  );

  return (
    <>
      <TorchFlame top="-14px" left="-18px" />
      <TorchFlame top="-14px" right="-18px" />
      <TorchFlame bottom="-18px" left="-18px" />
      <TorchFlame bottom="-18px" right="-18px" />
    </>
  );
}
