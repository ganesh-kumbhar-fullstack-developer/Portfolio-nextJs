"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navItems, RESUME_PATH } from "@/data/portfolio";

const isTypingTarget = (el) => el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);

function Clock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = () =>
      setTime(new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour12: false }));
    fmt();
    const t = setInterval(fmt, 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="tabular-nums">{time} IST</span>;
}

// tmux-style status bar. Windows are numbered; press 1–6 to jump between sections.
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy
  useEffect(() => {
    if (!isHome) return;
    const ids = ["home", ...navItems.map((n) => n.id)];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [isHome]);

  // Number-key shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTypingTarget(e.target)) return;
      const n = Number(e.key);
      if (!Number.isInteger(n) || n < 1 || n > navItems.length) return;
      const id = navItems[n - 1].id;
      if (isHome) document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      else router.push(`/#${id}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isHome, router]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b font-mono text-xs transition-colors duration-300 ${
        scrolled || open ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-14 items-center gap-4">
        <Link href="/#home" onClick={() => setOpen(false)} className="group flex items-center gap-2 text-sm" aria-label="Ganesh Kumbhar – home">
          <span className="rounded bg-accent px-1.5 py-0.5 font-bold text-bg">gk</span>
          <span className="text-muted transition-colors group-hover:text-ink">
            ~/ganesh<span className="cursor !h-[0.9em] !w-[0.45em]" aria-hidden />
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center lg:flex">
          {navItems.map(({ id, label }, i) => {
            const isActive = active === id;
            return (
              <Link
                key={id}
                href={`/#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={`rounded px-2.5 py-1.5 transition-colors ${
                  isActive ? "bg-accent/12 text-accent" : "text-muted hover:text-ink"
                }`}
              >
                <span className={isActive ? "text-accent" : "text-subtle"}>{i + 1}:</span>
                {label.toLowerCase()}
                {isActive && <span className="text-accent">*</span>}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-2">
          <span className="hidden items-center gap-2 text-subtle xl:flex">
            <span className="live-dot" aria-hidden />
            <Clock />
          </span>
          <a
            href={RESUME_PATH}
            download
            className="hidden rounded border border-accent/50 px-3 py-1.5 text-accent transition-colors hover:bg-accent hover:text-bg sm:inline-block"
          >
            resume.pdf ↓
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="rounded p-2 text-ink hover:bg-white/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="container-page border-t border-line pb-5 pt-2 lg:hidden">
          <ul className="grid grid-cols-2 gap-1">
            {navItems.map(({ id, label }, i) => (
              <li key={id}>
                <Link
                  href={`/#${id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded px-3 py-3 text-sm ${active === id ? "bg-accent/12 text-accent" : "text-muted"}`}
                >
                  <span className="text-subtle">{i + 1}:</span>
                  {label.toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
          <a href={RESUME_PATH} download onClick={() => setOpen(false)} className="btn btn-primary mt-3 w-full">
            download resume.pdf
          </a>
        </nav>
      )}
    </header>
  );
}
