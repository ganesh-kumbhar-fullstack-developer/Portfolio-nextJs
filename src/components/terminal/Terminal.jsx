"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { run, COMMAND_NAMES, FILE_NAMES } from "./commands.jsx";

const PROMPT = (
  <span className="shrink-0 select-none">
    <span className="text-accent">guest@ganesh-os</span>
    <span className="text-subtle">:</span>
    <span className="text-cyan">~</span>
    <span className="text-subtle">$ </span>
  </span>
);

let uid = 0;

/**
 * Interactive terminal. `autoRun` types those commands on mount (until the visitor
 * interacts). `onExit` lets the `exit` command close a surrounding modal.
 */
export default function Terminal({ autoRun = [], autoFocus = false, onExit, onNavigate, className = "", title = "guest@ganesh-os: ~" }) {
  const [lines, setLines] = useState([]);
  const [value, setValue] = useState("");
  const [typing, setTyping] = useState("");
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const interacted = useRef(false);

  const execute = useCallback(
    (cmd) => {
      const ctx = {
        history: [...history, cmd],
        clear: () => setLines([]),
        exit: onExit,
        navigate: (id) => {
          onNavigate?.();
          setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), onNavigate ? 120 : 0);
        },
      };
      const output = run(cmd, ctx);
      if (cmd.trim().toLowerCase() === "clear") return;
      setLines((prev) => [
        ...prev,
        { id: ++uid, kind: "cmd", content: cmd },
        ...(output ? [{ id: ++uid, kind: "out", content: output }] : []),
      ]);
      if (cmd.trim()) setHistory((h) => [...h, cmd]);
    },
    [history, onExit, onNavigate],
  );

  // Auto-typed intro (skipped as soon as the visitor touches the terminal)
  useEffect(() => {
    if (!autoRun.length) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const booting = !document.documentElement.classList.contains("booted");
    let cancelled = false;
    const timers = [];
    const wait = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)));

    (async () => {
      await wait(reduce ? 0 : booting ? 2300 : 500);
      for (const cmd of autoRun) {
        if (cancelled || interacted.current) return;
        if (!reduce) {
          for (let i = 1; i <= cmd.length; i++) {
            if (cancelled || interacted.current) return;
            setTyping(cmd.slice(0, i));
            await wait(55 + Math.random() * 45);
          }
          await wait(250);
        }
        if (cancelled || interacted.current) return;
        setTyping("");
        execute(cmd);
        await wait(reduce ? 0 : 500);
      }
      if (!cancelled && !interacted.current) {
        setLines((prev) => [
          ...prev,
          {
            id: ++uid,
            kind: "out",
            content: (
              <span className="text-subtle">
                # your turn → type <span className="text-accent">help</span> (or try <span className="text-amber">sudo hire-me</span>)
              </span>
            ),
          },
        ]);
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  // Keep the newest output in view — scrolls the terminal only, never the page
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, typing]);

  const takeOver = () => {
    if (!interacted.current) {
      interacted.current = true;
      setTyping("");
    }
  };

  const onKeyDown = (e) => {
    takeOver();
    if (e.key === "Enter") {
      execute(value);
      setValue("");
      setCursor(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cursor === -1) return;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setValue("");
      } else {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = value.split(" ");
      const pool = parts.length > 1 ? FILE_NAMES : COMMAND_NAMES;
      const last = parts[parts.length - 1];
      const match = pool.find((c) => c.startsWith(last));
      if (match) {
        parts[parts.length - 1] = match;
        setValue(parts.join(" "));
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div className={`window flex flex-col ${className}`} onClick={() => inputRef.current?.focus({ preventScroll: true })}>
      <div className="window-bar">
        <span className="dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="truncate">{title}</span>
        {!onExit && <span className="ml-auto hidden text-[10px] uppercase tracking-widest text-subtle sm:inline">zsh</span>}
      </div>
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain whitespace-pre-wrap break-words p-4 font-mono text-[12.5px] leading-relaxed text-ink sm:text-[13px]"
        role="log"
        aria-live="polite"
      >
        <p className="text-subtle">ganesh-os 2.0 · type `help` · tab completes</p>
        {lines.map((line) =>
          line.kind === "cmd" ? (
            <div key={line.id} className="mt-3 flex">
              {PROMPT}
              <span>{line.content}</span>
            </div>
          ) : (
            <div key={line.id} className="mt-1 text-ink/90">
              {line.content}
            </div>
          ),
        )}
        <label className="mt-3 flex items-center">
          {PROMPT}
          <span className="sr-only">Terminal command</span>
          <span className="relative flex-1">
            {typing && (
              <span aria-hidden className="pointer-events-none absolute inset-0">
                {typing}
                <span className="cursor" />
              </span>
            )}
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => {
                takeOver();
                setValue(e.target.value);
              }}
              onKeyDown={onKeyDown}
              onFocus={takeOver}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              className={`w-full bg-transparent text-base caret-accent outline-none sm:text-[13px] ${typing ? "opacity-0" : ""}`}
              aria-label="Type a command, for example help"
            />
          </span>
        </label>
      </div>
    </div>
  );
}
