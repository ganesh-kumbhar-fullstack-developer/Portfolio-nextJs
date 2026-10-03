import SectionHeading from "@/components/ui/SectionHeading.jsx";
import Reveal from "@/components/ui/Reveal.jsx";
import ExperienceHighlights from "./ExperienceHighlights.jsx";
import { experience } from "@/data/portfolio";

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Experience"
          title="~2 years shipping production systems"
          description="From MERN platforms with thousands of users to event-driven pipelines for a nationwide security-monitoring network."
        />

        <ol className="relative space-y-8 border-l border-line pl-6 sm:pl-10">
          {experience.map((job, i) => (
            <Reveal as="li" key={job.company} delay={i * 80} className="relative">
              <span
                aria-hidden
                className={`absolute -left-[31px] top-7 h-3 w-3 rounded-full ring-4 ring-bg sm:-left-[47px] ${
                  job.current ? "bg-brand" : "bg-subtle"
                }`}
              />
              <article className="card p-6 sm:p-8">
                <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                    <p className="mt-1 text-brand-soft">{job.company}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted sm:flex-col sm:items-end sm:gap-1">
                    <span className="font-mono text-xs sm:text-sm">{job.period}</span>
                    {job.current && (
                      <span className="rounded-full border border-ok/30 bg-ok/10 px-2 py-0.5 text-xs text-ok">Current</span>
                    )}
                  </div>
                </header>

                <ExperienceHighlights highlights={job.highlights} />

                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
                  {job.stack.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
