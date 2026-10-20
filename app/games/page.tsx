"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import { GAMES } from "@/lib/games";

type Gang = { name: string; size: number; game: string };
const KEY = "squadup_gang_v1";

export default function GamesPage() {
  const [name, setName] = useState("");
  const [size, setSize] = useState(5);
  const [game, setGame] = useState(GAMES[0].slug);
  const [saved, setSaved] = useState<Gang | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, []);

  const chosen = useMemo(() => GAMES.find((g) => g.slug === game) || GAMES[0], [game]);

  function save() {
    const g: Gang = { name: name.trim() || "Our squad", size: Math.max(2, Math.min(20, size)), game };
    try { localStorage.setItem(KEY, JSON.stringify(g)); } catch {}
    setSaved(g);
  }

  return (
    <div className="shell">
      <div className="topbar">
        <div className="brand">SQUADUP</div>
        <span className="muted" style={{ marginLeft: "auto", fontSize: 12 }}>Offline · 10 games</span>
      </div>
      <div className="page stack">
        <h1 className="h1" style={{ fontSize: 26 }}>Squad Games</h1>
        <p className="lead">Pick a game, set how many people, play. No account.</p>
        <div className="card stack">
          <div style={{ fontWeight: 700 }}>Tonight&apos;s gang</div>
          <div><label className="label">Gang name</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Lab crew / Block A" /></div>
          <div><label className="label">How many people?</label><input type="number" min={2} max={20} value={size} onChange={(e) => setSize(Number(e.target.value) || 2)} /></div>
          <div><label className="label">Game</label>
            <select value={game} onChange={(e) => setGame(e.target.value as any)}>
              {GAMES.map((g) => <option key={g.slug} value={g.slug}>{g.icon} {g.name}</option>)}
            </select>
          </div>
          <button type="button" className="btn" onClick={save}>Save plan · {chosen.name}</button>
          {saved && <div className="ok"><strong>{saved.name}</strong> · {saved.size} players · {GAMES.find((g) => g.slug === saved.game)?.name}</div>}
        </div>
        <div className="section-label">All games</div>
        {GAMES.map((g) => (
          <Link key={g.slug} href={`/games/${g.slug}`} className="game-tile">
            <div className="game-icon" style={{ background: `${g.accent}22` }}>{g.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{g.name}</div>
              <p className="muted" style={{ fontSize: 12, marginTop: 2 }}>{g.tagline}</p>
              <p className="muted" style={{ fontSize: 11, marginTop: 4 }}>{g.players} · {g.duration}</p>
            </div>
            <span className="muted">→</span>
          </Link>
        ))}
      </div>
      <Nav />
    </div>
  );
}
