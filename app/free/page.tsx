"use client";
import { useEffect, useState } from "react";
import Nav from "@/components/Nav";

const PLACES = ["Library", "Main Canteen", "Cafeteria", "Architecture Park", "Ground", "Sports Complex", "Basement", "Back Benches"];
type FreeItem = { id: string; name: string; place: string; note: string; at: number };
const KEY = "squadup_free_v1";
const TTL = 90 * 60 * 1000;

export default function FreePage() {
  const [name, setName] = useState("");
  const [place, setPlace] = useState(PLACES[0]);
  const [note, setNote] = useState("");
  const [list, setList] = useState<FreeItem[]>([]);

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      const arr: FreeItem[] = raw ? JSON.parse(raw) : [];
      setList(arr.filter((x) => Date.now() - x.at < TTL));
    } catch { setList([]); }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, []);

  function goLive() {
    const item: FreeItem = { id: Math.random().toString(36).slice(2), name: name.trim() || "Someone", place, note: note.trim(), at: Date.now() };
    try {
      const raw = localStorage.getItem(KEY);
      const arr: FreeItem[] = raw ? JSON.parse(raw) : [];
      const next = [item, ...arr.filter((x) => x.name !== item.name)].slice(0, 40);
      localStorage.setItem(KEY, JSON.stringify(next));
      setList(next.filter((x) => Date.now() - x.at < TTL));
      setNote("");
    } catch {}
  }

  return (
    <div className="shell">
      <div className="topbar">
        <div className="brand">SQUADUP</div>
        <span className="muted" style={{ marginLeft: "auto", fontSize: 12 }}>Local device</span>
      </div>
      <div className="page stack">
        <h1 className="h1" style={{ fontSize: 26 }}>I&apos;m Free</h1>
        <p className="lead">Drop your place ~90 min. On-device for squads — no server.</p>
        <div className="card stack">
          <div><label className="label">Your name</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="First name" /></div>
          <div><label className="label">Place</label>
            <div className="row" style={{ flexWrap: "wrap", gap: 8 }}>
              {PLACES.map((p) => (
                <button key={p} type="button" className={place === p ? "chip on" : "chip"} onClick={() => setPlace(p)}>{p}</button>
              ))}
            </div>
          </div>
          <div><label className="label">Up for?</label><input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Coffee · study · walk" maxLength={80} /></div>
          <button type="button" className="btn" onClick={goLive}>I&apos;m free at {place}</button>
        </div>
        <div className="section-label">Free now</div>
        {list.length === 0 && <p className="muted" style={{ fontSize: 13 }}>Nobody yet. Be first.</p>}
        {list.map((x) => (
          <div key={x.id} className="card">
            <div style={{ fontWeight: 700 }}>{x.name}</div>
            <p style={{ fontSize: 13, marginTop: 4 }}><strong style={{ color: "#6ee7b7" }}>{x.place}</strong>{x.note ? ` · ${x.note}` : ""}</p>
            <p className="muted" style={{ fontSize: 11, marginTop: 6 }}>{Math.max(1, Math.round((TTL - (Date.now() - x.at)) / 60000))} min left</p>
          </div>
        ))}
      </div>
      <Nav />
    </div>
  );
}
