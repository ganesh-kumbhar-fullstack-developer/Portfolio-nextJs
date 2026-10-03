import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading.jsx";
import Reveal from "@/components/ui/Reveal.jsx";
import { caseStudies, sideProjects } from "@/data/portfolio";

function Flow({ steps }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2 font-mono text-[11px] sm:text-xs" aria-label="Data flow">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-1.5">
          <span className="rounded-md border border-brand/25 bg-brand/10 px-2 py-1 text-brand-soft">{step}</span>
          {i < steps.length - 1 && (
            <span aria-hidden className="text-subtle">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function CaseStudy({ study, index }) {
  return (
    <Reveal as="article" delay={(index % 2) * 80} className="card card-hover flex flex-col p-6 sm:p-7">
      <p className="eyebrow">{study.tag}</p>
      <h3 className="mt-2 text-xl font-semibold text-white">{study.title}</h3>

      <dl className="mt-5 space-y-4 text-sm leading-relaxed">
        <div>
          <dt className="font-medium text-ink">Problem</dt>
          <dd className="mt-1 text-muted">{study.problem}</dd>
        </div>
        <div>
          <dt className="font-medium text-ink">Approach</dt>
          <dd className="mt-1 text-muted">{study.solution}</dd>
        </div>
      </dl>

      <div className="mt-5">
        <Flow steps={study.flow} />
      </div>

      <p className="mt-5 rounded-xl border border-ok/20 bg-ok/5 px-4 py-3 text-sm text-ink">
        <span className="font-medium text-ok">Result: </span>
        {study.impact}
      </p>

      <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label="Technologies used">
        {study.stack.map((tech) => (
          <li key={tech} className="chip">
            {tech}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function SideProject({ project }) {
  return (
    <Reveal as="article" className="card grid overflow-hidden lg:grid-cols-2">
      <div className="relative aspect-video bg-surface-2 lg:aspect-auto lg:min-h-80">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.category} screenshot`}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="flex flex-col p-6 sm:p-8">
        <p className="eyebrow">{project.category}</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">{project.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.stack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Live demo
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Source code
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="work" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Selected work"
          title="Engineering case studies"
          description="Problems I've solved in production. The code is proprietary, so here's the reasoning, the architecture and the outcome."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {caseStudies.map((study, i) => (
            <CaseStudy key={study.title} study={study} index={i} />
          ))}
        </div>

        <h3 className="mt-20 mb-6 text-sm font-medium uppercase tracking-[0.2em] text-subtle">Side projects</h3>
        <div className="space-y-5">
          {sideProjects.map((project) => (
            <SideProject key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
