"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import { GAMES } from "@/lib/games";

export default function HomePage() {
  return (
    <div className="shell">
      <div className="topbar">
        <div className="brand">SQUADUP</div>
        <span className="badge" style={{ marginLeft: "auto" }}>No login needed</span>
      </div>
      <div className="page">
        <section className="hero stack" style={{ gap: 14 }}>
          <h1 className="h1">Your squad. Real nights. Zero chaos.</h1>
          <p className="lead">Professional campus app for party games, I&apos;m Free meetups, and clean tools.</p>
          <Link href="/games" className="btn" style={{ width: "100%" }}>Open Squad Games</Link>
          <Link href="/free" className="btn-ghost" style={{ width: "100%" }}>I&apos;m Free map</Link>
        </section>
        <div className="section-label" style={{ marginTop: 28 }}>Why SquadUp</div>
        <div className="feature-grid">
          <div className="feature-card"><strong>10 offline games</strong><span>Truth or Dare with 1000 prompts + 9 more</span></div>
          <div className="feature-card"><strong>Gang planner</strong><span>Who&apos;s playing · which game</span></div>
          <div className="feature-card"><strong>I&apos;m Free</strong><span>Library · canteen · ground</span></div>
          <div className="feature-card"><strong>Pro UI</strong><span>Calm slate · faculty-safe</span></div>
        </div>
        <div className="section-label" style={{ marginTop: 28 }}>Popular games</div>
        <div className="stack">
          {GAMES.slice(0, 4).map((g) => (
            <Link key={g.slug} href={`/games/${g.slug}`} className="game-tile">
              <div className="game-icon" style={{ background: `${g.accent}22` }}>{g.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{g.name}</div>
                <p className="muted" style={{ fontSize: 12, marginTop: 2 }}>{g.tagline}</p>
              </div>
              <span className="muted">→</span>
            </Link>
          ))}
        </div>
      </div>
      <Nav />
    </div>
  );
}
