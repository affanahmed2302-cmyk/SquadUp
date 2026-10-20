"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/games", label: "Games", icon: "◈" },
  { href: "/free", label: "I'm Free", icon: "●" },
  { href: "/more", label: "More", icon: "☰" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="nav" aria-label="Main">
      {items.map((it) => {
        const on = it.href === "/" ? path === "/" : path === it.href || path.startsWith(it.href + "/");
        return (
          <Link key={it.href} href={it.href} className={on ? "on" : ""}>
            <span className="nav-icon" aria-hidden>{it.icon}</span>
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
