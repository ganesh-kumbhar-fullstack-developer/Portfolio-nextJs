"use client";
import { useState } from "react";

const VISIBLE = 4;

// Highlights rendered as a diff: `+ title` additions. Long lists collapse.
export default function ExperienceHighlights({ highlights }) {
  const [expanded, setExpanded] = useState(false);
  const canCollapse = highlights.length > 6;
  const shown = expanded || !canCollapse ? highlights : highlights.slice(0, VISIBLE);

  return (
    <>
      <ul className="mt-5 space-y-3 border-l-2 border-accent/25 pl-4">
        {shown.map((h) => (
          <li key={h.title} className="text-sm leading-relaxed">
            <span className="font-semibold text-accent">+ {h.title}</span>
            <p className="mt-0.5 font-sans text-muted">{h.text}</p>
          </li>
        ))}
      </ul>
      {canCollapse && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="mt-4 text-xs text-cyan transition-colors hover:text-accent"
        >
          {expanded ? "[ - collapse ]" : `[ + ${highlights.length - VISIBLE} more changes ]`}
        </button>
      )}
    </>
  );
}
