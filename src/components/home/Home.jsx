import { ArrowRight } from "lucide-react";
import ScrambleText from "@/components/fx/ScrambleText.jsx";
import Typewriter from "@/components/fx/Typewriter.jsx";
import CountUp from "@/components/fx/CountUp.jsx";
import Terminal from "@/components/terminal/Terminal.jsx";
import OpenTerminalButton from "@/components/terminal/OpenTerminalButton.jsx";
import EventStream from "./EventStream.jsx";
import { profile, heroStats, socials, RESUME_PATH } from "@/data/portfolio";

const ROLES = [
  "backend engineer",
  "distributed systems builder",
  "event-driven architect",
  "api security nerd",
  "full-stack shipper",
];

export default function Home() {
  return (
    <section id="home" className="relative pt-24 sm:pt-28">
      <div className="container-page grid items-center gap-12 pb-16 lg:grid-cols-12 lg:gap-10 lg:pb-20">
        <div className="lg:col-span-7">
          <p className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 px-3 py-1.5 font-mono text-[11px] text-muted sm:text-xs">
            <span className="live-dot" aria-hidden />
            <span>
              <span className="text-accent">online</span> · software engineer @ {profile.currentCompany}
            </span>
          </p>

          <h1 className="mt-7 font-mono font-extrabold uppercase leading-[0.95] tracking-tighter">
            <span className="sr-only">{profile.name} — {profile.title}</span>
            <span aria-hidden className="block text-[13vw] text-white sm:text-7xl lg:text-[5.6rem]">
              <ScrambleText text="Ganesh" className="glitch inline-block" data-text="GANESH" duration={700} />
            </span>
            <span aria-hidden className="block text-[13vw] text-accent glow sm:text-7xl lg:text-[5.6rem]">
              <ScrambleText text="Kumbhar" className="glitch inline-block" data-text="KUMBHAR" duration={900} delay={150} />
            </span>
          </h1>

          <p className="mt-6 font-mono text-base text-ink sm:text-xl" aria-hidden>
            <span className="text-accent">&gt;</span> <Typewriter words={ROLES} className="text-cyan" />
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I build the systems behind <span className="text-ink">real-time security alerts</span> — RabbitMQ
            pipelines, WebSockets and PostgreSQL serving <span className="text-ink">7,000+ intrusion panels</span>.
            Python, FastAPI and React, with security and correctness designed in from the start.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#work" className="btn btn-primary">
              ./view_work.sh
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href={RESUME_PATH} download className="btn btn-ghost">
              resume.pdf ↓
            </a>
            <OpenTerminalButton className="btn btn-ghost hidden sm:inline-flex">
              open terminal <kbd className="rounded border border-line-2 px-1.5 text-[10px] text-subtle">~</kbd>
            </OpenTerminalButton>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-subtle">
            {socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                [{s.name.toLowerCase()}]
              </a>
            ))}
            <span>· {profile.location}</span>
          </div>

          <p className="mt-5 hidden font-mono text-[11px] text-subtle sm:block">
            <span className="text-amber">{"//"}</span> your cursor is the message broker — click anywhere to publish an
            event
          </p>
        </div>

        <div className="animate-fade-up lg:col-span-5" style={{ animationDelay: "200ms" }}>
          <Terminal autoRun={["whoami", "neofetch"]} className="h-[380px] sm:h-[420px]" />
        </div>
      </div>

      <div className="container-page">
        <dl className="grid grid-cols-2 border-y border-line lg:grid-cols-4">
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col px-2 py-6 sm:px-6 ${i % 2 ? "border-l border-line" : ""} ${i === 2 ? "lg:border-l" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""}`}
            >
              <dt className="order-2 mt-1 font-mono text-[11px] leading-snug text-muted sm:text-xs">{stat.label}</dt>
              <dd className="font-mono text-3xl font-bold text-white sm:text-4xl">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <EventStream />
    </section>
  );
}
