"use client";
import Link from "next/link";
import Nav from "@/components/Nav";

export default function MorePage() {
  return (
    <div className="shell">
      <div className="topbar"><div className="brand">SQUADUP</div></div>
      <div className="page stack">
        <h1 className="h1" style={{ fontSize: 24 }}>More</h1>
        <p className="lead">Brand new product — not Hatch.</p>
        <div className="card stack">
          <div style={{ fontWeight: 700 }}>Shipped</div>
          <p className="muted" style={{ fontSize: 13 }}>10 games · 1000 ToD prompts · gang planner · I&apos;m Free · pro UI · no login</p>
        </div>
        <div className="card stack">
          <div style={{ fontWeight: 700 }}>Next</div>
          <p className="muted" style={{ fontSize: 13 }}>Realtime free list · optional college login · chats · PWA</p>
        </div>
        <Link href="/games" className="btn" style={{ textAlign: "center" }}>Back to Games</Link>
      </div>
      <Nav />
    </div>
  );
}
