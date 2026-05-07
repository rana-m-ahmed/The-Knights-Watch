/**
 * Calculate star rating for level completion
 * @param {Object} stats - { undoUsed, timeRatio, moveCount, totalTiles, timerEnabled }
 * @returns {number} Star count (1, 2, or 3)
 */
export function getStars(stats) {
  const { undoUsed, timeRatio, moveCount, totalTiles, timerEnabled } = stats;

  let stars = 1; // Always get star 1 for completing the level

  // Star 2: no undo used
  if (!undoUsed) {
    stars++;
  }

  // Star 3: beat time or move efficiency
  if (timerEnabled) {
    if (timeRatio < 0.6) {
      stars++;
    }
  } else {
    if (moveCount <= totalTiles + 3) {
      stars++;
    }
  }

  return stars;
}

/**
 * Calculate total stars across all completed levels
 * @param {Array<number>} levelStars - array of star counts (0..3) for each level
 * @returns {number} Total stars
 */
export function getTotalStars(levelStars) {
  return levelStars.reduce((sum, stars) => sum + stars, 0);
}
