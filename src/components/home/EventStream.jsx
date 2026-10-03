"use client";
import { useEffect, useRef, useState } from "react";

const EVENTS = [
  { code: "FIRE_ALARM", cls: "CRITICAL", color: "text-danger" },
  { code: "DOOR_OPEN", cls: "HIGH", color: "text-amber" },
  { code: "ATM_TAMPER", cls: "CRITICAL", color: "text-cyan" },
  { code: "MOTION_ZONE3", cls: "MEDIUM", color: "text-violet" },
  { code: "PANEL_RESTORE", cls: "INFO", color: "text-accent" },
];

const MAX_LINES = 11;

// Small seeded PRNG so the server-rendered first frame is deterministic (no hydration mismatch).
function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let nextId = 0;
function makeLine(rand, time) {
  const panel = `panel#${String(Math.floor(rand() * 7200) + 100).padStart(5, "0")}`;
  if (rand() < 0.68) {
    return { id: nextId++, time, kind: "hb", panel, ms: 1 + Math.floor(rand() * 5) };
  }
  const evt = EVENTS[Math.floor(rand() * EVENTS.length)];
  return { id: nextId++, time, kind: "evt", panel, evt, ms: 6 + Math.floor(rand() * 18) };
}

const stamp = (d) =>
  d.toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour12: false }) +
  "." +
  String(d.getMilliseconds()).padStart(3, "0");

function initialLines() {
  const rand = mulberry32(42);
  return Array.from({ length: MAX_LINES }, (_, i) => makeLine(rand, `09:41:${String(10 + i * 2).padStart(2, "0")}.${String(100 + i * 37).slice(0, 3)}`));
}

function Line({ line }) {
  return (
    <div className="flex gap-3 whitespace-nowrap" style={{ animation: "fade-up .35s ease-out both" }}>
      <span className="text-subtle">{line.time}</span>
      {line.kind === "hb" ? (
        <>
          <span className="w-8 text-subtle">hb</span>
          <span className="text-muted">{line.panel}</span>
          <span className="hidden text-subtle sm:inline">ok → pg:panel_health</span>
          <span className="ml-auto pl-3 text-subtle">{line.ms}ms</span>
        </>
      ) : (
        <>
          <span className="w-8 text-accent">evt</span>
          <span className="text-ink">{line.panel}</span>
          <span className={`w-28 font-semibold ${line.evt.color}`}>{line.evt.code}</span>
          <span className="hidden text-muted sm:inline">
            → classify:<span className={line.evt.color}>{line.evt.cls}</span> → ws:push(cms)
          </span>
          <span className="ml-auto pl-3 text-ink">{line.ms}ms</span>
        </>
      )}
    </div>
  );
}

export default function EventStream() {
  const [lines, setLines] = useState(initialLines);
  const [stats, setStats] = useState({ events: 18452, heartbeats: 1290377 });
  const ref = useRef(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rand = Math.random;
    let timer = 0;
    let visible = false;

    const tick = () => {
      if (visible && !document.hidden) {
        const line = makeLine(rand, stamp(new Date()));
        setLines((prev) => [...prev.slice(-(MAX_LINES - 1)), line]);
        setStats((s) => ({
          events: s.events + (line.kind === "evt" ? 1 : 0),
          heartbeats: s.heartbeats + (line.kind === "hb" ? 37 + Math.floor(rand() * 20) : 0),
        }));
      }
      timer = setTimeout(tick, 380 + Math.random() * 520);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(ref.current);
    timer = setTimeout(tick, 600);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={ref} className="container-page py-14 sm:py-20">
      <div className="grid gap-4 lg:grid-cols-[1fr_15rem]">
        <div className="window">
          <div className="window-bar">
            <span className="dots" aria-hidden>
              <i />
              <i />
              <i />
            </span>
            <span className="truncate">tail -f /var/log/sentrix/events.log</span>
            <span className="ml-auto flex items-center gap-2 text-accent">
              <span className="live-dot" aria-hidden /> live
            </span>
          </div>
          <div
            className="flex h-[264px] flex-col justify-end overflow-hidden px-4 py-3 font-mono text-[11px] leading-[22px] sm:text-xs"
            aria-hidden
          >
            {lines.map((line) => (
              <Line key={line.id} line={line} />
            ))}
          </div>
        </div>

        <aside className="grid grid-cols-2 gap-4 font-mono lg:grid-cols-1">
          <div className="panel p-4">
            <p className="text-[10px] uppercase tracking-widest text-subtle">alerts routed</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-accent">{stats.events.toLocaleString("en-US")}</p>
            <p className="mt-1 text-[11px] text-muted">event queue · priority lane</p>
          </div>
          <div className="panel p-4">
            <p className="text-[10px] uppercase tracking-widest text-subtle">heartbeats</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-cyan">{stats.heartbeats.toLocaleString("en-US")}</p>
            <p className="mt-1 text-[11px] text-muted">separate queue · never blocks alerts</p>
          </div>
          <p className="col-span-2 text-[11px] leading-relaxed text-subtle lg:col-span-1">
            <span className="text-amber">{"// note:"}</span> simulated feed modelled on the Event/Heartbeat RabbitMQ
            pipeline I built. Real data stays private.
          </p>
        </aside>
      </div>
    </div>
  );
}
