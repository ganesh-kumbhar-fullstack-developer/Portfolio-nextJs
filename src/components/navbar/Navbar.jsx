"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, FileDown } from "lucide-react";
import { navItems, RESUME_PATH } from "@/data/portfolio";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Elevated style once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section crossing the middle of the viewport
  useEffect(() => {
    if (!isHome) return;
    const sections = navItems.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/#home" onClick={close} className="flex items-center" aria-label="Ganesh Kumbhar – home">
          <Image src="/logo2.png" width={124} height={40} alt="GK TechHub" priority className="h-9 w-auto" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map(({ id, label }) => (
            <Link
              key={id}
              href={`/#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                active === id ? "text-white" : "text-muted hover:text-white"
              }`}
            >
              {label}
              <span
                aria-hidden
                className={`mx-auto mt-0.5 block h-px bg-brand transition-all duration-300 ${active === id ? "w-full" : "w-0"}`}
              />
            </Link>
          ))}
          <a href={RESUME_PATH} download className="btn btn-primary ml-3 py-2">
            <FileDown className="h-4 w-4" aria-hidden />
            Resume
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg p-2 text-ink hover:bg-white/5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="container-page border-t border-line pb-6 pt-2 md:hidden">
          <ul className="flex flex-col">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <Link
                  href={`/#${id}`}
                  onClick={close}
                  className={`flex items-center justify-between rounded-lg px-3 py-3 text-base ${
                    active === id ? "bg-white/5 text-white" : "text-muted"
                  }`}
                >
                  {label}
                  {active === id && <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />}
                </Link>
              </li>
            ))}
          </ul>
          <a href={RESUME_PATH} download onClick={close} className="btn btn-primary mt-4 w-full">
            <FileDown className="h-4 w-4" aria-hidden />
            Download resume
          </a>
        </nav>
      )}
    </header>
  );
}
