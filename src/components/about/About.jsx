import SectionHeading from "@/components/ui/SectionHeading.jsx";
import Reveal from "@/components/ui/Reveal.jsx";
import { profile, aboutPoints, education } from "@/data/portfolio";

const ASCII = ` ██████╗ ██╗  ██╗
██╔════╝ ██║ ██╔╝
██║  ███╗█████╔╝
██║   ██║██╔═██╗
╚██████╔╝██║  ██╗
 ╚═════╝ ╚═╝  ╚═╝`;

const SWATCHES = ["bg-bg", "bg-danger", "bg-accent", "bg-amber", "bg-cyan", "bg-violet", "bg-muted", "bg-ink"];

export default function About() {
  const info = [
    ["role", profile.title],
    ["focus", profile.focus],
    ["host", profile.currentCompany],
    ["uptime", "~2 years in production"],
    ["shell", "python · fastapi · react"],
    ["infra", "rabbitmq · postgresql · aws"],
    ["edu", `B.Tech E&TC · ${education.grade.replace("CGPA ", "")} CGPA`],
    ["loc", profile.location],
  ];

  return (
    <section id="about" className="section">
      <div className="container-page">
        <SectionHeading index="01" path="about" command="whoami --verbose" title="The human behind the logs" />

        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg lg:col-span-6">
            <p>
              <span className="text-ink">{profile.summary.split(".")[0]}.</span>
              {profile.summary.slice(profile.summary.indexOf(".") + 1)}
            </p>
            <p>
              Right now I work on <span className="text-accent">SentrixAI</span>, an intrusion-monitoring platform for
              banks, retail chains and ATM sites, where a missed or late alert is a real-world incident. Before that I
              spent over a year shipping MERN applications used by thousands of people every day.
            </p>
            <p>
              I like problems that involve <span className="text-ink">concurrency, correctness and scale</span>, and fixes
              simple enough that the next engineer understands them at 3am.
            </p>
          </Reveal>

          <Reveal delay={120} className="window self-start lg:col-span-6">
            <div className="window-bar">
              <span className="dots" aria-hidden>
                <i />
                <i />
                <i />
              </span>
              <span>neofetch</span>
            </div>
            <div className="flex gap-6 p-5 font-mono text-xs sm:text-[13px]">
              <pre className="hidden shrink-0 leading-tight text-accent glow sm:block" aria-hidden>
                {ASCII}
              </pre>
              <div className="min-w-0 flex-1">
                <p>
                  <span className="text-accent">ganesh</span>
                  <span className="text-subtle">@</span>
                  <span className="text-accent">kumbhar</span>
                </p>
                <p className="text-subtle">────────────────</p>
                <dl className="mt-1 space-y-0.5">
                  {info.map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <dt className="w-14 shrink-0 text-cyan">{k}</dt>
                      <dd className="truncate text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 flex" aria-hidden>
                  {SWATCHES.map((c) => (
                    <span key={c} className={`h-4 w-5 ${c}`} />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14">
          <p className="prompt mb-4">
            <span className="text-accent">$</span> lsmod | grep ganesh
          </p>
          <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {aboutPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 80} className="group bg-surface p-6 transition-colors hover:bg-surface-2">
                <p className="font-mono text-xs text-subtle">
                  <span className="text-accent">[loaded]</span> {point.title.toLowerCase().replace(/[^a-z]+/g, "_")}.ko
                </p>
                <h3 className="mt-2 font-mono text-lg font-semibold text-white transition-colors group-hover:text-accent">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{point.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
