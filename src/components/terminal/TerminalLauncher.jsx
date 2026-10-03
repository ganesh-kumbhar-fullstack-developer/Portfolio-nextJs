"use client";
import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import Terminal from "./Terminal.jsx";

const isTypingTarget = (el) => el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);

// Floating ">_" button + global shortcut (~ or Ctrl/⌘+K) that opens the terminal anywhere.
export default function TerminalLauncher() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if ((e.key === "`" || e.key === "~") && !isTypingTarget(e.target)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    const onOpen = () => setOpen(true);
    onScroll();
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("open-terminal", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("open-terminal", onOpen);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open terminal (shortcut: ~)"
        className={`fixed bottom-5 left-5 z-40 hidden sm:inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-surface/90 px-3 py-2.5 font-mono text-xs text-accent shadow-[0_0_24px_-6px_rgb(61_252_154/0.6)] backdrop-blur transition-all duration-300 hover:bg-accent hover:text-bg ${
          visible && !open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <span className="font-bold">&gt;_</span>
        <span className="hidden sm:inline">terminal</span>
        <kbd className="hidden rounded border border-current/40 px-1 text-[10px] sm:inline">~</kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-bg/70 p-3 backdrop-blur-sm animate-fade-up sm:items-center sm:p-6"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Interactive terminal"
        >
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-2 z-10 rounded p-1 text-subtle hover:text-ink"
              aria-label="Close terminal"
            >
              <X className="h-4 w-4" />
            </button>
            <Terminal
              autoFocus
              onExit={close}
              onNavigate={close}
              autoRun={[]}
              className="h-[70vh] max-h-[560px]"
              title="guest@ganesh-os: ~ — esc to close"
            />
          </div>
        </div>
      )}
    </>
  );
}
