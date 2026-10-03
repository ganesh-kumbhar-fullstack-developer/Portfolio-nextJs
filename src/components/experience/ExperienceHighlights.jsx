"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const VISIBLE = 4;

// Long bullet lists collapse to the first few so the timeline stays scannable.
export default function ExperienceHighlights({ highlights }) {
  const [expanded, setExpanded] = useState(false);
  const canCollapse = highlights.length > VISIBLE + 1;
  const shown = expanded || !canCollapse ? highlights : highlights.slice(0, VISIBLE);

  return (
    <>
      <ul className="mt-6 space-y-4">
        {shown.map((h) => (
          <li key={h.title} className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-4">
            <span className="text-sm font-medium text-white">{h.title}</span>
            <span className="text-sm leading-relaxed text-muted">{h.text}</span>
          </li>
        ))}
      </ul>
      {canCollapse && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="mt-4 inline-flex items-center gap-1 text-sm text-brand-soft hover:text-white"
        >
          {expanded ? "Show less" : `Show all ${highlights.length} highlights`}
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden />
        </button>
      )}
    </>
  );
}
