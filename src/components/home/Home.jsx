import { ArrowRight, FileDown, MapPin } from "lucide-react";
import { profile, heroStats, socials, RESUME_PATH } from "@/data/portfolio";

export default function Home() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Subtle grid, masked to fade out — static, no JS animation */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mask-[radial-gradient(ellipse_at_top,black_30%,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(#8b6cff 1px, transparent 1px), linear-gradient(90deg, #8b6cff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="container-page">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
            </span>
            Software Engineer at {profile.currentCompany}
          </p>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white text-balance sm:text-6xl lg:text-7xl">
            Hi, I&apos;m {profile.name}.
            <span className="mt-2 block bg-linear-to-r from-brand-soft via-brand to-brand-strong bg-clip-text text-transparent">
              I build reliable backend systems.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.title} focused on <span className="text-ink">{profile.focus.toLowerCase()}</span> with{" "}
            <span className="text-ink">{profile.stack}</span>. I build event-driven alerting pipelines, secure APIs
            and large-scale data workflows that run in production.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#work" className="btn btn-primary">
              See my work
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href={RESUME_PATH} download className="btn btn-ghost">
              <FileDown className="h-4 w-4" aria-hidden />
              Download resume
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-subtle">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden />
              {profile.location}
            </span>
            {socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {s.name} ↗
              </a>
            ))}
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className="animate-fade-up bg-surface p-5 sm:p-6"
              style={{ animationDelay: `${150 + i * 80}ms` }}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-2xl font-semibold text-white tabular-nums sm:text-3xl">{stat.value}</span>
                <span className="mt-1 block text-xs leading-snug text-muted sm:text-sm">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
