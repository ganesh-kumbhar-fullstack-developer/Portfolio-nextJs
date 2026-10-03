"use client";
import { useState } from "react";

export default function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className={`ml-auto rounded border px-2 py-0.5 transition-colors ${
        copied ? "border-accent/60 text-accent" : "border-line-2 text-muted hover:border-accent/60 hover:text-accent"
      }`}
      aria-live="polite"
    >
      {copied ? "✓ copied" : "copy email"}
    </button>
  );
}
