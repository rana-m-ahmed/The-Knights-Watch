<div align="center">

✦ &nbsp; ✧ &nbsp; ✦

<pre align="center">
    ♞
   /|\
    | 
   / \
</pre>

# ♞ Knight's Odyssey
*The Cursed Tiles — A Knight's Tour Puzzle Game*

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![License MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![DAA Project](https://img.shields.io/badge/Course-DAA-8A2BE2?style=for-the-badge)](https://bahria.edu.pk)

<a href="https://knights-odyssey-vercel.app">
  <img src="https://img.shields.io/badge/▶%20PLAY%20NOW-Enter%20the%20Dungeon-c09a40?style=for-the-badge&logoColor=white" />
</a>

<hr style="border: 1px solid #c09a40; width: 60%;" />

</div>

## 📖 About the Game

Knight's Odyssey is an interactive puzzle game built around the classical Knight's Tour problem—one of the oldest unsolved puzzles in mathematics and computer science. Your mission: maneuver a legendary chess knight across a crumbling stone board, landing on every tile exactly once using the knight's iconic L-shaped move (two squares in one direction, then one square perpendicular). As you traverse, tiles crumble away behind you, forcing perfect planning and flawless execution. This deceptively simple premise masks a profound challenge: the number of possible tours on an 8×8 board exceeds 33 million. Without strategy, you're just guessing. With Warnsdorff's Heuristic, you're unstoppable.

The game transforms the Knight's Tour from abstract theory into visceral gameplay. Each tier escalates the challenge with dark-fantasy mechanics: cursed tiles that drain your time, fog-of-war that shrouds the board, and a hidden rune cipher that rewards algorithmic thinking. The crumbling stone aesthetic, the haunting UI elements, and the dynamic timer all drive home the pressure. Yet beneath the gothic veneer lies elegant algorithmic design—Warnsdorff's Heuristic is not just a backend optimization, it is the core of how you win.

Knight's Odyssey is a semester project for Design and Analysis of Algorithms at Bahria University Islamabad, demonstrating that computer science theory becomes most powerful when made tangible, interactive, and beautiful. This is not a game *about* algorithms—it is a game *powered by* them, where understanding the heuristic transforms your play.

---

## ✨ Features

<div align="center">

| Feature | Description |
|---------|-------------|
| ♞ Knight's Tour Engine | Pure L-shaped movement on a dynamically crumbling grid; tiles vanish as you progress, forcing forward momentum |
| 🏆 16 Progressive Levels | Four distinct tiers spanning tutorial to expert difficulty, each with unique mechanics and escalating challenges |
| ⏱️ Dynamic Timer System | Shrinking countdown per tier with visual pulse acceleration at 90%; time pressure scales with skill progression |
| 🌫️ Fog of War | Tier III mechanic that hides all tiles beyond knight-move range, forcing deduction from limited visibility |
| Ψ Cursed Tiles | Tier II hazards that steal 8 seconds when landed upon; strategic avoidance becomes part of path planning |
| Ω Rune Cipher System | Tier IV's signature mechanic: hidden Greek letters in secret order unlocked only by visiting runes in Warnsdorff sequence |
| 🎯 Warnsdorff Hints | Numeric scores on tiles reveal escape routes remaining; follow low numbers first (the optimal greedy strategy) |
| ⭐ 3-Star Rating System | Earn stars for completion, flawless play (no undo), and speed; unlock prestige challenges via full-star progression |
| 💾 Persistent Progress | localStorage saves all star ratings, unlocked levels, and high scores—resume your odyssey across sessions |
| 🎨 Tier Themes | Four visually distinct color palettes and tile designs, one per tier; golden courtyard → crimson keep → violet catacombs → obsidian abyss |
| 🕯️ Atmospheric UI | Torch-flame corner decorators, floating dust particles, ambient glow effects, and cinematic screen transitions |
| 📱 Fully Responsive | Optimized for desktop, tablet, and mobile; touch-friendly tile selection with no performance degradation |

</div>

---

## 🖼️ UI Showcase

<p><sub><i>Screenshots from the live deployment. Replace paths in <code>/docs/screenshots/</code> with actual in-game captures.</i></sub></p>

<div align="center">

<table>
  <tr>
    <td align="center">
      <img src="docs/screenshots/intro.png" width="380" alt="Intro Screen" /><br/>
      <sub><b>⚔️ Intro Screen</b></sub>
    </td>
    <td align="center">
      <img src="docs/screenshots/tier1.png" width="380" alt="Tier I Gameplay" /><br/>
      <sub><b>♞ Tier I — The Courtyard</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="docs/screenshots/tier2.png" width="380" alt="Tier II Cursed Tiles" /><br/>
      <sub><b>Ψ Tier II — The Keep (Cursed)</b></sub>
    </td>
    <td align="center">
      <img src="docs/screenshots/tier3.png" width="380" alt="Tier III Fog of War" /><br/>
      <sub><b>◉ Tier III — The Catacombs (Fog)</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" colspan="2">
      <img src="docs/screenshots/tier4.png" width="500" alt="Tier IV Rune Cipher" /><br/>
      <sub><b>Ω Tier IV — The Abyss (Cipher)</b></sub>
    </td>
  </tr>
</table>

</div>

<p><sub>💡 <i>To add screenshots: place .png files in <code>/docs/screenshots/</code> and update the src paths above.</i></sub></p>

---

## 🎮 How to Play

Master the knight's L-shaped move and adapt to escalating tier mechanics:

<details>
<summary><b>⚔️ Core Rules</b></summary>

1. **The L-Shaped Move** — A knight moves exactly two squares in one direction (up/down/left/right) and one square perpendicular. Plan your path carefully.

2. **Crumbling Tiles** — Every tile you land upon crumbles and becomes impassable. You cannot step on it again. This creates a one-way forward momentum.

3. **Win Condition** — Visit every tile on the board exactly once using only legal knight moves. When the last tile crumbles, you've won.

4. **Lose Condition** — If you reach a position where no legal knight move is available to unvisited tiles, the game ends. You've painted yourself into a corner.

5. **Undo Penalty** — You may undo moves, but each undo costs you one star (and time on timed levels). Use wisely—pure solutions earn ★★★.

6. **Star System** — See [⭐ Star Rating System](#-star-rating-system) below for full details on earning 1–3 stars per level.

</details>

<details>
<summary><b>🟡 Tier I — The Courtyard (Levels 1–4)</b></summary>

Welcome, knight. Your training begins in the sun-dappled courtyard. Here, all mechanics are revealed without pressure.

- **No Timer** — Take as long as you need. This is about learning the L-shape.
- **Warnsdorff Hints Enabled** — Every tile displays a number: your remaining escape routes from that square. Lower numbers mean fewer onward moves. Visit low-number tiles first—this is the essence of Warnsdorff's Heuristic.
- **Smaller Boards** — Start with 6×6, progress to 7×7. Manageable complexity.
- **Goal** — Understand the L-shaped movement and internalize the greedy strategy: always move to the square with the fewest onward moves.

*Strategy Tip: After landing on a tile, glance at its neighbors. Pick the one with the lowest hint number. This simple rule solves nearly every puzzle.*

</details>

<details>
<summary><b>🔵 Tier II — The Keep (Levels 5–8)</b></summary>

The courtyard fades behind you. The Keep's entrance looms, wreathed in sickly fog. Time is now your enemy.

- **Countdown Timer** — 120 seconds per level. Watch the clock. At 90% elapsed, the numbers pulse red: you are running out of time.
- **Cursed Tiles (Ψ)** — Random tiles on the board are cursed. When you land on one, 8 seconds are stolen from your timer. Plan routes to avoid them when possible.
- **Reduced Hints** — Warnsdorff numbers are hidden. You see only tile state (safe, cursed, visited). Read the board by memory and intuition.
- **8×8 Boards** — Full-size classical chessboards. Difficulty spikes sharply.
- **Goal** — Survive the timer while dodging cursed hexes. Speed and caution must balance.

*Strategy Tip: Mentally map out cursed tiles at level start. Route around them when possible. If unavoidable, trigger their penalty at low-risk moments—never when time is critical.*

</details>

<details>
<summary><b>🟣 Tier III — The Catacombs (Levels 9–12)</b></summary>

Descend. The keep's upper walls collapse. Darkness swallows you. You can no longer see the entire board.

- **Fog of War (◉)** — Only tiles within a knight's move of your current position are visible. The rest of the board is shrouded in shadow.
- **Visited Tiles Remain Visible** — Crumbled tiles stay visible, acting as waypoints in the fog. Use them to navigate blind passages.
- **Tighter Timer** — 90 seconds. No hints whatsoever. Pure deduction and memory.
- **Chasm Density** — 15–20% of the board is impassable chasms. Route around permanent obstacles while navigating fog.
- **Goal** — Mental mapping and foresight. See only the local, but think globally.

*Strategy Tip: As you move, mentally construct a map of visited tiles. Remember which directions lead to unvisited territory. Explore from corners inward—you'll have fewer blind dead ends.*

</details>

<details>
<summary><b>🔴 Tier IV — The Abyss (Levels 13–16)</b></summary>

The nightmare peaks. The Abyss awaits—a labyrinth sealed by an ancient rune cipher. Only those who understand the algorithm can break free.

- **Rune Cipher (Ω)** — Six tiles on the board bear hidden Greek letters (Α, Β, Γ, Δ, Ε, Ζ). Below the board, a Cipher Panel tracks your rune visits. The *order* matters.
- **Optimal Visit Order** — To unlock a +15-second time bonus, visit runes in their *Warnsdorff optimal order*—the greedy sequence that minimizes backtracking. Miss the order, and the bonus is forfeit.
- **Fewest Hints** — The Cipher Panel is your only guide. No numbers on tiles. No fog, but high density of chasms (25–30%).
- **Tightest Timer** — 75 seconds. One mistake echoes for the entire level.
- **Goal** — Combine perfect path execution with algorithmic insight. Beat the tour *and* crack the cipher.

*Strategy Tip: Before moving, compute which rune sequence requires the least backtracking. Warnsdorff's Heuristic is your compass. The algorithm that the game tested you on in Tier I is now invisible but essential.*

</details>

---

## 🗺️ Level Map

All 16 levels across four tiers and three landmark zones:

| # | Level Name | Tier | Grid | Chasms | Timer | Mechanic |
|---|---|---|---|---|---|---|
| 1 | The Courtyard Gate | 🟡 I | 6×6 | 0 | — | Hints ★ |
| 2 | The Royal Path | 🟡 I | 6×6 | 1 | — | Hints ★ |
| 3 | The Stone Garden | 🟡 I | 7×7 | 2 | — | Hints ★ |
| 4 | The Outer Bastion | 🟡 I | 7×7 | 3 | — | Hints ★ |
| 5 | The Keep Entrance | 🔵 II | 8×8 | 4 | 120s | Cursed Ψ |
| 6 | The Crimson Halls | 🔵 II | 8×8 | 5 | 115s | Cursed Ψ |
| 7 | The Hexed Treasury | 🔵 II | 8×8 | 6 | 110s | Cursed Ψ |
| 8 | The Throne Room Sealed | 🔵 II | 8×8 | 7 | 105s | Cursed Ψ |
| 9 | The Catacombs Gate | 🟣 III | 8×8 | 10 | 90s | Fog ◉ |
| 10 | The Bone Passages | 🟣 III | 8×8 | 12 | 85s | Fog ◉ |
| 11 | The Forgotten Vault | 🟣 III | 8×8 | 14 | 80s | Fog ◉ |
| 12 | The Deep Sanctum | 🟣 III | 8×8 | 16 | 75s | Fog ◉ |
| 13 | The Abyss Entrance | 🔴 IV | 8×8 | 20 | 75s | Cipher Ω |
| 14 | The Rune Chamber | 🔴 IV | 8×8 | 22 | 70s | Cipher Ω |
| 15 | The Sealed Prophecy | 🔴 IV | 8×8 | 24 | 65s | Cipher Ω |
| 16 | The Infinite Spiral | 🔴 IV | 8×8 | 26 | 60s | Cipher Ω |

---

## 🧠 The Algorithm Behind the Game

Knight's Odyssey is powered by deep algorithmic thinking. Every mechanic teaches a lesson from Design and Analysis of Algorithms.

### The Knight's Tour Problem

The Knight's Tour is a chess puzzle dating to ancient times, formalized in the 18th century: given an n×n board, find a sequence of knight moves that visits every square exactly once. For small boards (n ≤ 6), brute-force solutions exist. For larger boards, the problem becomes NP-hard in its general form (finding *all* tours is exponential). Yet remarkably, for a standard 8×8 chessboard, a solution almost always exists—the challenge is finding it efficiently.

This is the heart of the Knight's Odyssey: transforming an ancient mathematical curiosity into an interactive puzzle where strategy and intuition guide you to victory.

### Warnsdorff's Heuristic

In 1823, H. C. von Warnsdorff discovered a greedy heuristic that revolutionized Knight's Tour solving: **always move to the square with the fewest onward moves**. This deceptively simple rule achieves near-miraculous results—it solves the Knight's Tour in O(n²) time on average, with a success rate exceeding 99% on standard boards, eliminating the need for backtracking entirely.

In Knight's Odyssey, Warnsdorff's Heuristic is made tangible. In **Tier I**, the hint numbers on each tile *are* the Warnsdorff scores. Players who learn to follow the hints master the optimal greedy strategy without even realizing it. In **Tier IV**, the Rune Cipher rewards only those who visit runes in Warnsdorff-optimal order—a +15-second time bonus is the game's way of saying: "You understood the algorithm."

The beauty of Warnsdorff's Heuristic lies in its accessibility: no complex computation, just counting your options and choosing conservatively. Yet when applied at scale across a full board, it generates optimal (or near-optimal) paths that would take exhaustive search forever to discover.

### Backtracking (The Alternative)

While Warnsdorff solves most tours greedily, the classical alternative is **depth-first search (DFS) with backtracking**: explore moves recursively, and if you hit a dead end, backtrack and try the next branch. This exhaustive search is guaranteed to find a solution if one exists, but it incurs exponential time complexity in the worst case: O(8^n²) for an n×n board.

Backtracking is *not* used during gameplay (too slow), but it powers Knight's Odyssey's **level generator and solvability validator**. Before any level is presented to the player, the engine confirms that a valid tour exists using backtracking. This ensures no impossible puzzles slip through.

| Property | Warnsdorff | Backtracking |
|---|---|---|
| **Time Complexity** | O(n²) practical average | O(8^{n²}) worst case |
| **Completeness** | ~99% on standard boards | 100% guaranteed |
| **Used in Game** | Hint system, Tier IV cipher scoring | Solvability validator (offline) |
| **Strategy** | Greedy minimization | Exhaustive DFS with pruning |
| **Learning Value** | Intuitive, pattern-based | Shows why heuristics matter |

### Level Generation & Seeded Determinism

Every level in Knight's Odyssey is generated procedurally using a **seeded PRNG (mulberry32 algorithm)**. The seed determines:

1. **Chasm placement** — Random stones scatter across the board, creating permanent obstacles.
2. **Warnsdorff validation** — The board is tested for solvability using backtracking.
3. **Retry mechanism** — If a board is unsolvable, regenerate with a new seed until a valid layout emerges.

This design ensures that each level is *deterministic*—the same seed always produces the same board—while the procedural generation creates natural variation within constraints. Players can share level seeds, speedrun leaders can prove reproducibility, and the game engine scales gracefully from 6×6 tutorial boards to 8×8 expert labyrinths.

---

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript_ES2023-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-FF0055?style=flat-square&logo=framer&logoColor=white)
![CSS3 Variables](https://img.shields.io/badge/CSS3_Variables-1572B6?style=flat-square&logo=css3&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

**Architecture Overview:**

Knight's Odyssey is built with modern React 18 and Vite for blazing-fast development and production bundles. The engine is pure JavaScript with no external dependencies for game logic—knightLogic.js, levelGenerator.js, solver.js, and scoring.js are self-contained modules. UI state flows through custom hooks (useGameState.js for orchestration, useTimer.js for countdown logic), enabling clean component separation.

Styling relies entirely on **CSS-in-JS via inline style objects**—no CSS-in-JS framework, no external CSS preprocessor. This keeps the bundle minimal and the theming system (CSS variables for tier-specific palettes) flexible. Framer Motion powers all screen transitions, tile animations, and atmospheric effects, providing 60fps performance even on mobile devices.

Persistence is handled by browser localStorage, ensuring stars and progress survive page reloads. The entire game state is serializable, making save/load trivial. Deployment is automated via Vercel, with zero-config support for Vite builds.

---

## 📁 Project Structure

```
knights-odyssey/
├── public/
│   └── [Static assets]
├── src/
│   ├── engine/
│   │   ├── knightLogic.js         # Knight move generation, collision detection
│   │   ├── levelGenerator.js       # Seeded board builder, chasm scatter, solvability
│   │   ├── solver.js              # Warnsdorff validation, backtracking
│   │   └── scoring.js             # Star calculation, bonus logic, persister
│   ├── data/
│   │   └── levelData.js           # 16 level configs (grid size, timer, mechanic)
│   ├── hooks/
│   │   ├── useGameState.js        # Master state: board, knight position, visited set
│   │   ├── useGameState.test.jsx  # Unit tests for game state transitions
│   │   └── useTimer.js            # Countdown timer hook with 90% pulse alert
│   ├── components/
│   │   ├── IntroScreen.jsx        # Cinematic splash screen + start button
│   │   ├── LevelSelect.jsx        # Tier browser grid with star displays
│   │   ├── Board.jsx              # Grid renderer, tile layout, tier theming
│   │   ├── Tile.jsx               # Single tile component (unvisited/visited/cursed)
│   │   ├── HUD.jsx                # Heads-up display (timer, move counter, mechanic badge)
│   │   ├── Overlay.jsx            # Win/lose/timeout modal overlays
│   │   ├── CipherPanel.jsx        # Tier IV rune tracker UI
│   │   ├── TierTutorialBanner.jsx # Context-aware help banner (first level of each tier)
│   │   ├── TorchCorners.jsx       # SVG decorative torch flame animations
│   │   └── ParticleBackground.jsx # Floating dust particle effect layer
│   ├── utils/
│   │   └── validateLevels.js      # Offline solvability tester (for level design)
│   ├── App.jsx                    # Screen router + state orchestration
│   ├── main.jsx                   # React 18 root mount
│   └── index.css                  # Global CSS resets, @keyframes, variables
├── docs/
│   └── screenshots/               # [Place in-game screenshots here]
├── index.html
├── vite.config.js
├── package.json
├── eslint.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **Git** for cloning the repository

### Installation

**1. Clone the repository:**

```bash
git clone https://github.com/YOUR_USERNAME/knights-odyssey.git
cd knights-odyssey
```

**2. Install dependencies:**

```bash
npm install
```

**3. Start the development server:**

```bash
npm run dev
```

The game will open at http://localhost:5173 in your browser. Hot module reload is enabled—edit files and see changes instantly.

### Production Build

**Build for production:**

```bash
npm run build
```

**Preview the production build locally:**

```bash
npm run preview
```

Vite will optimize bundle size, tree-shake unused code, and generate minified assets in `dist/`.

### Deployment on Vercel

1. Push your repository to GitHub (or GitLab/Bitbucket).
2. Visit [vercel.com](https://vercel.com), sign in, and click "New Project."
3. Import your repository. Vercel auto-detects the Vite configuration.
4. Click "Deploy." Your game is live.

Vercel automatically rebuilds and redeploys on every push to main. Preview deployments are created for pull requests.

---

## ⭐ Star Rating System

Earn up to three stars per level, plus a special cipher bonus on Tier IV:

<div align="center">

| Rating | Condition |
|---|---|
| ★☆☆ | **Completion** — Visit all tiles, finish the puzzle (any number of undos) |
| ★★☆ | **Flawless Play** — Complete without using Undo (perfect path on first try) |
| ★★★ | **Speed Mastery** — Finish before 60% of timer expires (timed levels); within n+3 moves (untimed Tier I) |
| ✦ **Cipher Bonus** | **Tier IV Only** — Visit all runes in Warnsdorff-optimal order for +15 second time credit |

</div>

**Progression:** Unlock new levels by earning stars on previous levels. Accumulate stars to unlock prestige challenges and alternative play modes (coming in future updates).

---

## 🎓 Academic Context

Knight's Odyssey is a semester capstone project for the **Design and Analysis of Algorithms** course at **Bahria University Islamabad**, School of Engineering and Applied Sciences. It bridges classical algorithmic theory with interactive game design, demonstrating that computer science concepts are most powerful when made tangible, playable, and beautiful.

The project explores fundamental principles of graph traversal, greedy heuristics, and combinatorial optimization. The Knight's Tour problem is NP-hard in its general form—no polynomial-time algorithm is known for *all* configurations—yet Warnsdorff's Heuristic solves it greedily and nearly perfectly. Knight's Odyssey externalizes this tradeoff: players experience the tension between optimal greedy choices and the looming possibility of dead ends. Those who understand why Warnsdorff's strategy works play better. Players who play better internalize the algorithm. The game becomes a medium for understanding.

Every mechanic serves a pedagogical purpose. Tier I teaches the heuristic through explicit hints. Tier II introduces time pressure—the real-world cost of poor algorithm choices. Tier III adds imperfect information (fog of war), forcing mental modeling and lookahead. Tier IV rewards those who reverse-engineer the optimal strategy hidden beneath gameplay. In essence, Knight's Odyssey *is* the algorithm made interactive.

---

## 👤 Author

<div align="center">

**Rana Muhammad Ahmed**

BS Computer Science — Bahria University Islamabad  
ICPC Team: The Pull Pirates | BU GlobalX Student Ambassador

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github)](https://github.com/YOUR_USERNAME)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/YOUR_PROFILE)

</div>

### Credits

- **H. C. von Warnsdorff** (1823) — Original heuristic algorithm
- **React & Vite Teams** — Modern JavaScript framework and build tooling
- **Framer Motion** — Elegant animation library for React
- **shields.io** — README badge generation
- **Bahria University Islamabad** — Academic home and mentorship

---

<div align="center">

<hr style="border: 1px solid #c09a40; margin: 2rem auto; width: 60%;" />

<p>
  <sub>
    Built with ♞ and 🧠 at Bahria University Islamabad<br/>
    Design and Analysis of Algorithms — 2025<br/><br/>
    <i>"Every stone you land upon crumbles into the abyss.<br/>
    Tread on each tile exactly once to break the seal."</i>
  </sub>
</p>

✦ &nbsp; ✧ &nbsp; ✦

</div>
