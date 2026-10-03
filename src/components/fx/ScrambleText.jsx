"use client";
import { useEffect, useRef } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ABCDEFX$%&";

/**
 * Renders the final text (so it's in the server HTML), then "decodes" it from random
 * glyphs the first time it scrolls into view. Writes to the DOM directly — no re-renders.
 */
export default function ScrambleText({ text, as: Tag = "span", className = "", duration = 900, delay = 0, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let timer = 0;

    const animate = () => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const revealed = Math.floor(p * text.length);
        let out = text.slice(0, revealed);
        for (let i = revealed; i < text.length; i++) {
          out += text[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        el.textContent = out;
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          timer = setTimeout(animate, delay);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      el.textContent = text;
    };
  }, [text, duration, delay]);

  return (
    <Tag ref={ref} className={className} aria-label={text} {...rest}>
      {text}
    </Tag>
  );
}
