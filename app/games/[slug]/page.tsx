"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Nav from "@/components/Nav";
import { getGame, TRUTHS, DARES, NEVER, MOST, RATHER, CHARADES, HOT, RAPID, WHO, STORY, pick, pickIndex } from "@/lib/games";

export default function PlayPage() {
  const params = useParams();
  const slug = String(params?.slug || "");
  const game = getGame(slug);
  const [mode, setMode] = useState<"truth" | "dare">("truth");
  const [idx, setIdx] = useState(() => pickIndex(500));
  const [line, setLine] = useState("");
  const [rather, setRather] = useState<[string, string] | null>(null);

  function next() {
    if (!game) return;
    let text = "";
    if (game.slug === "truth-or-dare") {
      const deck = mode === "truth" ? TRUTHS : DARES;
      const i = pickIndex(deck.length);
      setIdx(i);
      text = deck[i];
    } else if (game.slug === "never-have-i-ever") text = pick(NEVER);
    else if (game.slug === "most-likely-to") text = pick(MOST);
    else if (game.slug === "would-you-rather") {
      const r = pick(RATHER);
      setRather(r);
      text = `A) ${r[0]}  ·  B) ${r[1]}`;
    } else if (game.slug === "two-truths") text = "Three statements. Exactly one lie. Group votes.";
    else if (game.slug === "charades") text = `Act (no talking): ${pick(CHARADES)}`;
    else if (game.slug === "hot-seat") text = pick(HOT);
    else if (game.slug === "rapid-fire") text = pick(RAPID);
    else if (game.slug === "who-am-i") text = `Show others only: ${pick(WHO)}`;
    else if (game.slug === "story-chain") text = pick(STORY);
    else text = "Pass the phone.";
    setLine(text);
  }

  const prompt = useMemo(() => {
    if (!line && game?.slug === "truth-or-dare") return mode === "truth" ? TRUTHS[idx] : DARES[idx];
    return line;
  }, [line, game, mode, idx]);

  if (!game) {
    return (
      <div className="shell">
        <div className="page"><p className="muted">Game not found.</p><Link href="/games" className="btn btn-sm">All games</Link></div>
        <Nav />
      </div>
    );
  }

  return (
    <div className="shell">
      <div className="topbar">
        <Link href="/games" className="btn-ghost btn-sm">← Games</Link>
        <div style={{ fontWeight: 700, marginLeft: 8 }}>{game.icon} {game.name}</div>
      </div>
      <div className="page stack">
        <p className="muted" style={{ fontSize: 13 }}>{game.tagline} · {game.players}</p>
        <div className="card" style={{ borderLeft: `3px solid ${game.accent}` }}>
          <div className="section-label" style={{ marginTop: 0 }}>How to play</div>
          <ol style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.55, color: "var(--text-secondary)" }}>
            {game.how.map((h) => <li key={h}>{h}</li>)}
          </ol>
        </div>
        {game.slug === "truth-or-dare" && (
          <div className="row" style={{ gap: 8 }}>
            <button type="button" className={mode === "truth" ? "btn btn-sm" : "btn-ghost btn-sm"} onClick={() => { setMode("truth"); setLine(""); setIdx(pickIndex(TRUTHS.length)); }}>Truth ({TRUTHS.length})</button>
            <button type="button" className={mode === "dare" ? "btn btn-sm" : "btn-ghost btn-sm"} onClick={() => { setMode("dare"); setLine(""); setIdx(pickIndex(DARES.length)); }}>Dare ({DARES.length})</button>
          </div>
        )}
        <div className="prompt-box">
          <div className="prompt-kicker">PROMPT</div>
          <p className="prompt-text">{prompt || "Tap Next prompt"}</p>
          {game.slug === "would-you-rather" && rather && (
            <div className="stack" style={{ marginTop: 16, gap: 8 }}>
              <div className="chip on">A · {rather[0]}</div>
              <div className="chip">B · {rather[1]}</div>
            </div>
          )}
        </div>
        <button type="button" className="btn" style={{ width: "100%" }} onClick={next}>Next prompt</button>
      </div>
      <Nav />
    </div>
  );
}
