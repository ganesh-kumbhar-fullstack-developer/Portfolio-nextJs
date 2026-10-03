"use client";
import { useEffect, useRef } from "react";

const LINES = [
  ["[ OK ]", "Loading kernel: ganesh-os 2.0 (python/fastapi)"],
  ["[ OK ]", "Mounting /dev/experience ............ 2 roles"],
  ["[ OK ]", "Connecting amqp://event-bus ......... connected"],
  ["[ OK ]", "Starting heartbeat consumer ......... 7,000+ panels"],
  ["[ OK ]", "Applying RBAC + MFA policies ........ enforced"],
  ["[ OK ]", "Opening websocket → monitoring CMS .. live"],
];

// The animation itself is pure CSS (it also runs before hydration).
// This component only lets visitors skip it with a key press or click.
export default function BootScreen() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const skip = () => el.classList.add("is-skipped");
    const t = setTimeout(skip, 1900);
    window.addEventListener("keydown", skip, { once: true });
    el.addEventListener("click", skip, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  return (
    <div ref={ref} className="boot" role="presentation" aria-hidden>
      <div className="w-[min(560px,90vw)] font-mono text-[11px] leading-6 sm:text-[13px]">
        {LINES.map(([status, text], i) => (
          <p key={text} className="boot-line truncate" style={{ "--d": `${i * 80}ms` }}>
            <span className="text-accent">{status}</span> <span className="text-muted">{text}</span>
          </p>
        ))}
        <div className="boot-line mt-5" style={{ "--d": "500ms" }}>
          <div className="flex justify-between text-subtle">
            <span>booting portfolio</span>
            <span className="text-accent">press any key to skip</span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded bg-line">
            <div className="boot-bar h-full bg-accent shadow-[0_0_12px_#3dfc9a]" />
          </div>
        </div>
      </div>
    </div>
  );
}
