import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading.jsx";
import Reveal from "@/components/ui/Reveal.jsx";
import { education, achievements, certifications } from "@/data/portfolio";

export default function EducationSection() {
  return (
    <section id="education" className="section">
      <div className="container-page">
        <SectionHeading index="05" path="education" command="cat education.txt achievements.md" title="Foundations" />

        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal className="panel panel-hover p-6 sm:p-7">
            <p className="font-mono text-xs text-subtle">{education.period}</p>
            <h3 className="mt-3 font-mono text-lg font-bold text-white sm:text-xl">{education.degree}</h3>
            <p className="mt-1 text-muted">{education.institution}</p>
            <div className="mt-6 font-mono text-xs">
              <div className="flex justify-between text-subtle">
                <span>cgpa</span>
                <span className="text-accent">8.4 / 10</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded bg-line">
                <div className="h-full w-[84%] bg-accent shadow-[0_0_10px_#3dfc9a]" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="panel panel-hover p-6 sm:p-7">
            <p className="font-mono text-xs text-subtle">achievements.md</p>
            <ul className="mt-4 space-y-4">
              {achievements.map((a) => (
                <li key={a} className="flex gap-3 text-sm leading-relaxed text-ink sm:text-base">
                  <span className="font-mono text-accent">[x]</span>
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="window mt-5">
          <div className="window-bar">
            <span className="dots" aria-hidden>
              <i />
              <i />
              <i />
            </span>
            <span>ls -la ~/certs</span>
          </div>
          <ul className="p-3 font-mono text-xs sm:p-4 sm:text-[13px]">
            {certifications.map((cert) => (
              <li key={cert.href}>
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded px-2 py-2 transition-colors hover:bg-accent/8 sm:gap-6"
                >
                  <span className="hidden text-subtle sm:inline">-r--r--r--</span>
                  <span className="w-24 shrink-0 text-cyan">{cert.provider.toLowerCase()}</span>
                  <span className="min-w-0 flex-1 truncate text-ink group-hover:text-accent">
                    {cert.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}.cert
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-subtle group-hover:text-accent" aria-label="View certificate" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
