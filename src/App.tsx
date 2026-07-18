import React, { useState, useEffect } from "react";

// --- Types & Interfaces ---
interface Entity {
  id: string;
  name: string;
  type: string;
  hp: number;
  maxHp: number;
  attack: number;
  critRate: number;
  critDamage: number;
  isEnemy: boolean;
}

interface LogMessage {
  id: string;
  text: string;
  type: "info" | "damage" | "crit" | "heal" | "system";
}

// --- Helper Utilities for Randomization ---
const generateRandomStats = (isEnemy: boolean, wave: number = 1): Entity => {
  const id = Math.random().toString(36).substr(2, 9);

  if (!isEnemy) {
    // Player Characters
    const classes = ["Warrior", "Mage", "Rogue", "Cleric"];
    const name = classes[Math.floor(Math.random() * classes.length)];
    const maxHp = Math.floor(Math.random() * 1500) + 2000; // 2000-3500
    return {
      id,
      name: `${name} #${Math.floor(Math.random() * 900) + 100}`,
      type: name,
      maxHp,
      hp: maxHp,
      attack: Math.floor(Math.random() * 150) + 200, // 200-350
      critRate: Math.floor(Math.random() * 30) + 40, // 40% - 70%
      critDamage: Math.floor(Math.random() * 100) + 120, // 120% - 220%
      isEnemy: false,
    };
  } else {
    // Enemy Waves
    const enemyTypes = ["Goblin", "Orc", "Skeleton", "Slime", "Dragon"];
    const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    const hpMultiplier = 1 + (wave - 1) * 0.5; // Enemies scale per wave
    const maxHp = Math.floor((Math.random() * 1000 + 1500) * hpMultiplier);

    return {
      id,
      name: `${type} (Wave ${wave})`,
      type,
      maxHp,
      hp: maxHp,
      attack: Math.floor((Math.random() * 100 + 150) * hpMultiplier),
      critRate: Math.floor(Math.random() * 20) + 15, // 15% - 35%
      critDamage: 150,
      isEnemy: true,
    };
  }
};

export default function GameApp() {
  // --- Game State ---
  const [wave, setWave] = useState<number>(1);
  const [heroes, setHeroes] = useState<Entity[]>([]);
  const [enemies, setEnemies] = useState<Entity[]>([]);
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);
  const [gameState, setGameState] = useState<
    "start" | "playing" | "gameover" | "victory"
  >("start");

  // Initialize Heroes once game starts
  const startNewGame = () => {
    const initialHeroes = Array.from({ length: 4 }, () =>
      generateRandomStats(false),
    );
    const initialEnemies = Array.from(
      { length: Math.floor(Math.random() * 3) + 2 },
      () => generateRandomStats(true, 1),
    ); // 2 to 4 enemies

    setHeroes(initialHeroes);
    setEnemies(initialEnemies);
    setWave(1);
    setSelectedHeroId(initialHeroes[0].id);
    setLogs([
      {
        id: "init",
        text: "⚔️ A new adventure begins! Select a hero to strike.",
        type: "system",
      },
    ]);
    setGameState("playing");
  };

  // Next Wave Setup
  const advanceWave = () => {
    const nextWave = wave + 1;
    setWave(nextWave);
    const newEnemies = Array.from(
      { length: Math.floor(Math.random() * 3) + 2 },
      () => generateRandomStats(true, nextWave),
    );
    setEnemies(newEnemies);

    // Partially heal surviving heroes
    setHeroes((prev) =>
      prev.map((h) =>
        h.hp > 0
          ? { ...h, hp: Math.min(h.maxHp, h.hp + Math.floor(h.maxHp * 0.3)) }
          : h,
      ),
    );
    addLog(
      `Wave ${nextWave} approaches! Living heroes healed for 30% Max HP.`,
      "system",
    );
  };

  // Add event string to combat text panel
  const addLog = (text: string, type: LogMessage["type"]) => {
    setLogs((prev) =>
      [{ id: Math.random().toString(), text, type }, ...prev].slice(0, 50),
    );
  };

  // --- Core Combat Mechanic ---
  const handleAttack = (targetId: string) => {
    if (!selectedHeroId || gameState !== "playing") return;

    const attacker = heroes.find((h) => h.id === selectedHeroId);
    const target = enemies.find((e) => e.id === targetId);

    if (!attacker || !target || attacker.hp <= 0) return;

    // Calculate Critical Hit using your system!
    const isCrit = Math.random() * 100 <= attacker.critRate;
    const baseDamage = attacker.attack;
    const finalDamage = isCrit
      ? Math.floor(baseDamage * (1 + attacker.critDamage / 100))
      : Math.floor(baseDamage);

    // Update Enemy Health
    let enemyDefeated = false;
    const updatedEnemies = enemies.map((e) => {
      if (e.id === targetId) {
        const nextHp = Math.max(0, e.hp - finalDamage);
        if (nextHp === 0) enemyDefeated = true;
        return { ...e, hp: nextHp };
      }
      return e;
    });

    addLog(
      `${attacker.name} hit ${target.name} for ${finalDamage} damage! ${isCrit ? "💥 CRITICAL!" : ""}`,
      isCrit ? "crit" : "damage",
    );

    setEnemies(updatedEnemies);

    // Check if wave is wiped out instantly
    const allEnemiesDead = updatedEnemies.every((e) => e.hp <= 0);
    if (allEnemiesDead) {
      advanceWave();
      // Auto-select first living hero for next round
      const firstLiving = heroes.find((h) => h.hp > 0);
      if (firstLiving) setSelectedHeroId(firstLiving.id);
      return;
    }

    // Trigger Enemy Counter-Attack Immediately
    // (Simulating a simple phase-turn cycle where enemies retaliate on your click)
    setTimeout(() => {
      triggerEnemyTurns(updatedEnemies);
    }, 600);
  };

  const triggerEnemyTurns = (currentEnemies: Entity[]) => {
    // Filter only alive enemies
    const aliveEnemies = currentEnemies.filter((e) => e.hp > 0);
    if (aliveEnemies.length === 0) return;

    setHeroes((prevHeroes) => {
      let updatedHeroes = [...prevHeroes];

      aliveEnemies.forEach((enemy) => {
        // Find a random living hero target
        const livingHeroes = updatedHeroes.filter((h) => h.hp > 0);
        if (livingHeroes.length === 0) return;

        const targetHero =
          livingHeroes[Math.floor(Math.random() * livingHeroes.length)];

        const isCrit = Math.random() * 100 <= enemy.critRate;
        const finalDamage = isCrit
          ? Math.floor(enemy.attack * (1 + enemy.critDamage / 100))
          : Math.floor(enemy.attack);

        updatedHeroes = updatedHeroes.map((h) => {
          if (h.id === targetHero.id) {
            return { ...h, hp: Math.max(0, h.hp - finalDamage) };
          }
          return h;
        });

        addLog(
          `👹 ${enemy.name} counters ${targetHero.name} for ${finalDamage} damage!`,
          "damage",
        );
      });

      // Check for Game Over condition
      if (updatedHeroes.every((h) => h.hp <= 0)) {
        setGameState("gameover");
      }

      return updatedHeroes;
    });

    // Cycle selection focus to the next living hero so user doesn't stay locked on a dead one
    setHeroes((latest) => {
      const currentSelected = latest.find((h) => h.id === selectedHeroId);
      if (!currentSelected || currentSelected.hp <= 0) {
        const nextLiving = latest.find((h) => h.hp > 0);
        if (nextLiving) setSelectedHeroId(nextLiving.id);
      }
      return latest;
    });
  };

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <h1>⚔️ Endless Text RPG Realm ⚔️</h1>
        {gameState === "playing" && <h2>Current Wave: {wave}</h2>}
      </header>

      {/* --- START SCREEN --- */}
      {gameState === "start" && (
        <div style={styles.menuBox}>
          <p>
            Assemble a party of 4 randomized adventurers and see how many waves
            of monstrous variants you can survive.
          </p>
          <button style={styles.actionButton} onClick={startNewGame}>
            Enter the Dungeon
          </button>
        </div>
      )}

      {/* --- GAME OVER SCREEN --- */}
      {gameState === "gameover" && (
        <div style={styles.menuBox}>
          <h2 style={{ color: "#ff4d4d" }}>PARTY WIPED OUT</h2>
          <p>Your team fell on Wave {wave}.</p>
          <button style={styles.actionButton} onClick={startNewGame}>
            Try Again
          </button>
        </div>
      )}

      {/* --- ACTIVE GAMEPLAY VIEW --- */}
      {gameState === "playing" && (
        <div style={styles.gameGrid}>
          {/* Left Column: Heroes Panel */}
          <div style={styles.panel}>
            <h3>Your Adventurers</h3>
            {heroes.map((hero) => {
              const isSelected = selectedHeroId === hero.id;
              const isDead = hero.hp <= 0;
              const hpPercent = (hero.hp / hero.maxHp) * 100;

              return (
                <div
                  key={hero.id}
                  style={{
                    ...styles.card,
                    borderColor: isSelected ? "#ffd700" : "#444",
                    backgroundColor: isSelected ? "#1c1f26" : "#111",
                    opacity: isDead ? 0.4 : 1,
                    cursor: isDead ? "not-allowed" : "pointer",
                  }}
                  onClick={() => !isDead && setSelectedHeroId(hero.id)}
                >
                  <div style={styles.cardHeader}>
                    <strong>{hero.name}</strong>
                    <span style={styles.typeTag}>{hero.type}</span>
                  </div>

                  {/* Health Bar Component */}
                  <div style={styles.hpBarContainer}>
                    <div
                      style={{
                        ...styles.hpBarFill,
                        width: `${hpPercent}%`,
                        backgroundColor: "#4caf50",
                      }}
                    />
                    <span style={styles.hpText}>
                      {hero.hp} / {hero.maxHp} HP
                    </span>
                  </div>

                  <div style={styles.statsRow}>
                    <span>⚔️ ATK: {hero.attack}</span>
                    <span>🎯 CRT: {hero.critRate}%</span>
                    <span>💥 CDMG: {hero.critDamage}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Enemy Wave Panel */}
          <div style={styles.panel}>
            <h3>Enemy Threat Target</h3>
            <p style={{ fontSize: "0.85rem", color: "#888" }}>
              Select a hero on the left, then click an enemy card below to
              strike them.
            </p>

            {enemies.map((enemy) => {
              const isDead = enemy.hp <= 0;
              const hpPercent = (enemy.hp / enemy.maxHp) * 100;

              return (
                <button
                  key={enemy.id}
                  disabled={isDead}
                  style={{
                    ...styles.card,
                    ...styles.enemyCardButton,
                    opacity: isDead ? 0.2 : 1,
                  }}
                  onClick={() => handleAttack(enemy.id)}
                >
                  <div style={styles.cardHeader}>
                    <strong style={{ color: "#ff4d4d" }}>
                      👹 {enemy.name}
                    </strong>
                  </div>

                  <div style={styles.hpBarContainer}>
                    <div
                      style={{
                        ...styles.hpBarFill,
                        width: `${hpPercent}%`,
                        backgroundColor: "#e53935",
                      }}
                    />
                    <span style={styles.hpText}>
                      {enemy.hp} / {enemy.maxHp} HP
                    </span>
                  </div>

                  <div style={styles.statsRow}>
                    <span>⚔️ ATK: {enemy.attack}</span>
                    <span>🎯 CRT: {enemy.critRate}%</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Row: Massive Narrative/Combat Text Logs Panel */}
          <div style={{ ...styles.panel, gridColumn: "1 / -1" }}>
            <h3>Battle Narrative Chronicles</h3>
            <div style={styles.logBox}>
              {logs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    ...styles.logLine,
                    color:
                      log.type === "crit"
                        ? "#ffd700"
                        : log.type === "damage"
                          ? "#ff9800"
                          : log.type === "system"
                            ? "#00bcd4"
                            : "#e0e0e0",
                  }}
                >
                  {log.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Visual Backgrounds & Theme Styling object ---
const styles: Record<string, React.CSSProperties> = {
  appContainer: {
    backgroundColor: "#0a0a0c",
    color: "#e0e0e0",
    minHeight: "100vh",
    fontFamily: '"Courier New", Courier, monospace', // RPG text feeling
    padding: "20px",
  },
  header: {
    textAlign: "center",
    borderBottom: "2px solid #333",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  menuBox: {
    maxWidth: "500px",
    margin: "100px auto",
    padding: "30px",
    backgroundColor: "#111",
    border: "3px double #ffd700",
    textAlign: "center",
    borderRadius: "4px",
  },
  gameGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  panel: {
    backgroundColor: "#14161d",
    border: "1px solid #2d3139",
    borderRadius: "6px",
    padding: "15px",
  },
  card: {
    display: "block",
    width: "100%",
    textAlign: "left",
    backgroundColor: "#111",
    border: "2px solid #444",
    borderRadius: "4px",
    padding: "12px",
    marginBottom: "12px",
    boxSizing: "border-box",
    transition: "all 0.2s ease",
  },
  enemyCardButton: {
    cursor: "pointer",
    color: "inherit",
    fontFamily: "inherit",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  typeTag: {
    fontSize: "0.8rem",
    backgroundColor: "#2a2f3a",
    padding: "2px 6px",
    borderRadius: "3px",
    color: "#aaa",
  },
  hpBarContainer: {
    position: "relative",
    height: "20px",
    backgroundColor: "#222",
    borderRadius: "3px",
    overflow: "hidden",
    marginBottom: "8px",
  },
  hpBarFill: {
    height: "100%",
    transition: "width 0.3s ease-in-out",
  },
  hpText: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    textAlign: "center",
    fontSize: "0.8rem",
    lineHeight: "20px",
    fontWeight: "bold",
    textShadow: "1px 1px 2px #000",
  },
  statsRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.8rem",
    color: "#b0b3b8",
  },
  logBox: {
    backgroundColor: "#07080a",
    border: "1px solid #1a1d24",
    height: "180px",
    overflowY: "auto",
    padding: "10px",
    borderRadius: "4px",
  },
  logLine: {
    marginBottom: "6px",
    fontSize: "0.9rem",
    borderBottom: "1px solid #111",
    paddingBottom: "4px",
  },
  actionButton: {
    backgroundColor: "#3a1a1a",
    color: "#ffd700",
    border: "2px solid #ffd700",
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "inherit",
    marginTop: "15px",
    fontWeight: "bold",
  },
};
