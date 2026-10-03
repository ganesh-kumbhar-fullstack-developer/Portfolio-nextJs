"use client";
import { useEffect, useState } from "react";

// Types, pauses, deletes and cycles through `words`.
export default function Typewriter({ words, className = "" }) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    let len = words[0].length;
    let deleting = true;
    let timer;
    const step = () => {
      if (deleting) {
        len--;
        if (len === 0) {
          deleting = false;
          i = (i + 1) % words.length;
        }
      } else {
        len++;
      }
      setText(words[i].slice(0, len));
      let delay = deleting ? 35 : 75;
      if (!deleting && len === words[i].length) {
        deleting = true;
        delay = 2200;
      }
      if (deleting && len === 0) delay = 300;
      timer = setTimeout(step, delay);
    };
    timer = setTimeout(step, 3200);
    return () => clearTimeout(timer);
  }, [words]);

  return (
    <span className={className}>
      {text}
      <span className="cursor" aria-hidden />
    </span>
  );
}
