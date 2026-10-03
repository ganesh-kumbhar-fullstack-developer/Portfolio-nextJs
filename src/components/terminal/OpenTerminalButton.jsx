"use client";

export default function OpenTerminalButton({ className = "", children }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("open-terminal"))} className={className}>
      {children}
    </button>
  );
}
