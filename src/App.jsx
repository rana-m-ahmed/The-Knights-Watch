import { useState, useEffect } from 'react';
import { IntroScreen } from './components/IntroScreen.jsx';
import { LevelSelect } from './components/LevelSelect.jsx';
import { Board } from './components/Board.jsx';
import { HUD } from './components/HUD.jsx';
import { CipherPanel } from './components/CipherPanel.jsx';
import { Overlay } from './components/Overlay.jsx';
import { useGameState } from './hooks/useGameState.js';
import { DEV_MODE, LEVELS } from './data/levelData.js';
import { getStars } from './engine/scoring.js';

function App() {
  const [screen, setScreen] = useState('intro');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [levelStars, setLevelStars] = useState(() => {
    const saved = localStorage.getItem('ko-stars');
    return saved ? JSON.parse(saved) : Array(16).fill(0);
  });

  const currentLevel = LEVELS[currentLevelIndex];
  const game = useGameState(
    screen === 'game' ? currentLevel : null,
    (newGameState) => {
      if (newGameState === 'won') {
        const stars = getStars({
          undoUsed: game.undoUsed,
          timeRatio: game.timeRatio,
          moveCount: game.moveCount,
          totalTiles: game.totalTiles,
          timerEnabled: currentLevel.timeLimit !== null
        });

        const newStars = [...levelStars];
        if (stars > newStars[currentLevelIndex]) {
          newStars[currentLevelIndex] = stars;
          setLevelStars(newStars);
          localStorage.setItem('ko-stars', JSON.stringify(newStars));
        }
      }
    }
  );

  const handleNextLevel = () => {
    if (currentLevelIndex < LEVELS.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
    }
  };

  const handleRetryLevel = () => {
    game.initLevel(currentLevel);
  };

  const handleBackToSelect = () => {
    setScreen('select');
  };

  const handleSelectLevel = (levelIndex) => {
    setCurrentLevelIndex(levelIndex);
    setScreen('game');
  };

  // Derive tier class from level index
  const tierClass = currentLevelIndex < 4
    ? 'theme-tier-1'
    : currentLevelIndex < 8
    ? 'theme-tier-2'
    : currentLevelIndex < 12
    ? 'theme-tier-3'
    : 'theme-tier-4';

  // Derive active mechanic from tier
  const activeMechanic = currentLevelIndex < 4
    ? null
    : currentLevelIndex < 8
    ? 'cursed'
    : currentLevelIndex < 12
    ? 'fog'
    : 'cipher';

  // Derive cipher progress string
  const cipherProgress = game.safeRuneSequence && game.safeRuneSequence.length > 0
    ? `${game.runeProgress.length}/${game.safeRuneSequence.length}`
    : '';

  if (screen === 'intro') {
    return <IntroScreen onEnter={() => setScreen('select')} />;
  }

  if (screen === 'select') {
    return <LevelSelect levelStars={levelStars} onSelectLevel={handleSelectLevel} />;
  }

  if (screen === 'game' && game && game.grid && game.grid.length > 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(160deg, #0a0c12 0%, #111520 50%, #0d0f1a 100%)', color: '#d4c5a9' }}>
        {DEV_MODE && (
          <div style={{ position: 'fixed', top: '12px', right: '12px', zIndex: 999, padding: '8px 10px', background: 'rgba(10,12,18,0.78)', border: '1px solid rgba(240,192,64,0.35)', borderRadius: '4px', color: '#d4c5a9', fontFamily: 'monospace', fontSize: '11px', lineHeight: 1.4, pointerEvents: 'none', whiteSpace: 'pre-line' }}>
            {`Level: ${currentLevelIndex + 1} | Size: ${currentLevel.size}×${currentLevel.size}\nChasms: ${currentLevel.chasmCount} | Timer: ${currentLevel.timeLimit ?? 'none'}s\nHint: ${currentLevel.hintMode} | Seed: ${currentLevel.seed}`}
          </div>
        )}

        <HUD
          level={currentLevel}
          visitedCount={game.visitedCount}
          totalTiles={game.totalTiles}
          moveCount={game.moveCount}
          timeRemaining={game.timeRemaining}
          timeLimit={currentLevel.timeLimit}
          timeRatio={game.timeRatio}
          activeMechanic={activeMechanic}
          cipherProgress={cipherProgress}
          cursedHit={game.cursedHit}
        />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative' }}>
          <div style={{ position: 'relative', maxWidth: '600px', width: '100%', aspectRatio: '1' }}>
            <Board
              grid={game.grid}
              size={currentLevel.size}
              knightPos={game.knightPos}
              validMoves={game.validMoves}
              warningTiles={game.warningTiles}
              crumbling={game.crumbling}
              jumpAnim={game.jumpAnim}
              hintMode={currentLevel.hintMode}
              timeRatio={game.timeRatio}
              onMove={game.handleMove}
              trail={game.trail}
              safeRuneSequence={game.safeRuneSequence}
              runeProgress={game.runeProgress}
              cipherFailed={game.cipherFailed}
              visibleCells={game.visibleCells}
              fogOfWar={currentLevel.fogOfWar}
              levelIdx={currentLevelIndex}
            />

            <Overlay
              gameState={game.gameState}
              stars={levelStars[currentLevelIndex]}
              undoUsed={game.undoUsed}
              visitedCount={game.visitedCount}
              totalTiles={game.totalTiles}
              timeElapsed={game.timeElapsed}
              timeLimit={currentLevel.timeLimit}
              onNext={handleNextLevel}
              onRetry={handleRetryLevel}
              hasNext={currentLevelIndex < LEVELS.length - 1}
              cipherSolved={game.cipherSolved}
            />
          </div>

          {/* CipherPanel (Tier IV only) */}
          {game.safeRuneSequence && game.safeRuneSequence.length > 0 && (
            <CipherPanel
              safeRuneSequence={game.safeRuneSequence}
              runeProgress={game.runeProgress}
              cipherSolved={game.cipherSolved}
              cipherFailed={game.cipherFailed}
            />
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px' }}>
            <button
              style={{
                padding: '10px 24px',
                background: 'rgba(180, 150, 80, 0.2)',
                border: '1px solid rgba(180, 150, 80, 0.5)',
                color: '#f0c040',
                cursor: game.history && game.history.length > 1 ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '4px',
                fontFamily: 'Georgia, "Times New Roman", serif',
                transition: 'all 0.2s ease',
                opacity: game.history && game.history.length > 1 ? 1 : 0.3,
              }}
              onClick={game.handleUndo}
              disabled={!game.history || game.history.length <= 1}
            >
              Undo
            </button>
            <button
              style={{
                padding: '10px 24px',
                background: 'rgba(120, 100, 60, 0.1)',
                border: '1px solid rgba(180, 150, 80, 0.3)',
                color: '#d4c5a9',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '4px',
                fontFamily: 'Georgia, "Times New Roman", serif',
                transition: 'all 0.2s ease',
              }}
              onClick={handleBackToSelect}
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
