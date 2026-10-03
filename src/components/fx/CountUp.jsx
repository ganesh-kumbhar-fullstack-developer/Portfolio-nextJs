"use client";
import { useEffect, useRef } from "react";

// Counts "7,000+" / "900M+" up from zero when first visible. Server HTML has the final value.
export default function CountUp({ value, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^([\d,]+)(.*)$/);
    if (!el || !match || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = Number(match[1].replace(/,/g, ""));
    const suffix = match[2];
    let frame = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / 1400);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(target * eased).toLocaleString("en-US") + suffix;
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
