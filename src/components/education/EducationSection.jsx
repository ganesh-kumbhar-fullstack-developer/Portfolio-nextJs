import { GraduationCap, Trophy, BadgeCheck, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading.jsx";
import Reveal from "@/components/ui/Reveal.jsx";
import { education, achievements, certifications } from "@/data/portfolio";

export default function EducationSection() {
  return (
    <section id="education" className="section">
      <div className="container-page">
        <SectionHeading eyebrow="Education & achievements" title="Foundations" />

        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal className="card p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand">
                <GraduationCap className="h-4 w-4" aria-hidden />
              </span>
              <span className="font-mono text-xs text-muted">{education.period}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">{education.degree}</h3>
            <p className="mt-1 text-muted">{education.institution}</p>
            <p className="mt-4 inline-flex rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-sm text-brand-soft">
              {education.grade}
            </p>
          </Reveal>

          <Reveal delay={80} className="card p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand">
                <Trophy className="h-4 w-4" aria-hidden />
              </span>
              <h3 className="font-semibold text-white">Achievements</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {achievements.map((a) => (
                <li key={a} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-5 card p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand">
              <BadgeCheck className="h-4 w-4" aria-hidden />
            </span>
            <h3 className="font-semibold text-white">Certifications</h3>
          </div>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <li key={cert.href}>
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3 transition-colors hover:border-brand/40 hover:bg-white/3"
                >
                  <span>
                    <span className="block text-sm text-ink">{cert.title}</span>
                    <span className="block text-xs text-subtle">{cert.provider}</span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-subtle transition-colors group-hover:text-brand-soft"
                    aria-label="View certificate"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
