"use client";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { profile } from "@/data/portfolio";

// Floating WhatsApp shortcut — appears once the visitor scrolls past the hero.
export default function ContactButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const text = encodeURIComponent("Hi Ganesh, I came across your portfolio and would like to connect.");
  return (
    <a
      href={`https://wa.me/${profile.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Ganesh on WhatsApp"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-accent/40 bg-surface/90 text-accent shadow-[0_0_24px_-6px_rgb(61_252_154/0.6)] backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-bg active:scale-95 sm:h-14 sm:w-14 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <FaWhatsapp className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
    </a>
  );
}
