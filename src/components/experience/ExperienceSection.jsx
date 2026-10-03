import SectionHeading from "@/components/ui/SectionHeading.jsx";
import Reveal from "@/components/ui/Reveal.jsx";
import ExperienceHighlights from "./ExperienceHighlights.jsx";
import { experience } from "@/data/portfolio";

// Stable, fake-but-plausible commit hashes derived from the company name
const hash = (s) => {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container-page">
        <SectionHeading
          index="02"
          path="experience"
          command="git log --graph --author=ganesh"
          title="Commit history"
          description="~2 years shipping production systems — from MERN platforms with thousands of users to event-driven pipelines for a nationwide security-monitoring network."
        />

        <ol className="relative font-mono">
          {experience.map((job, i) => (
            <Reveal as="li" key={job.company} delay={i * 100} className="relative grid grid-cols-[1.5rem_1fr] gap-x-3 sm:grid-cols-[2rem_1fr] sm:gap-x-5">
              {/* graph rail */}
              <div className="relative flex justify-center" aria-hidden>
                <span className="absolute bottom-0 top-0 w-px bg-line-2" />
                <span
                  className={`relative z-10 mt-1.5 h-3.5 w-3.5 rounded-full border-2 ${
                    job.current ? "border-accent bg-accent shadow-[0_0_14px_#3dfc9a]" : "border-subtle bg-bg"
                  }`}
                />
              </div>

              <article className="pb-14">
                <p className="text-xs sm:text-sm">
                  <span className="text-amber">commit {hash(job.company)}</span>
                  {job.current ? (
                    <span className="text-muted">
                      {" "}
                      (<span className="text-cyan">HEAD → main</span>, <span className="text-accent">tag: current</span>)
                    </span>
                  ) : (
                    <span className="text-muted"> (tag: v1.0)</span>
                  )}
                </p>
                <p className="mt-1 text-xs text-subtle">
                  Date: <span className="text-muted">{job.period}</span> · {job.location}
                </p>

                <div className="panel panel-hover mt-4 p-5 sm:p-7">
                  <h3 className="text-lg font-bold text-white sm:text-2xl">{job.role}</h3>
                  <p className="mt-1 text-sm text-accent sm:text-base">@ {job.company}</p>

                  <ExperienceHighlights highlights={job.highlights} />

                  <p className="mt-6 text-xs text-subtle">deps:</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Technologies used">
                    {job.stack.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
          <li className="grid grid-cols-[1.5rem_1fr] gap-x-3 text-xs text-subtle sm:grid-cols-[2rem_1fr] sm:gap-x-5" aria-hidden>
            <span className="flex justify-center">○</span>
            <span>init: B.Tech E&amp;TC, 2024 — first commit</span>
          </li>
        </ol>
      </div>
    </section>
  );
}
