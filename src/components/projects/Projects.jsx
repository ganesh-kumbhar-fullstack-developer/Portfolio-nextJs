import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading.jsx";
import Reveal from "@/components/ui/Reveal.jsx";
import { caseStudies, sideProjects } from "@/data/portfolio";

// Pipeline nodes joined by wires with travelling packets
function Pipeline({ steps }) {
  return (
    <ol className="flex flex-wrap items-center gap-y-3 font-mono text-[11px]" aria-label="Data flow">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center">
          <span className="rounded border border-accent/30 bg-accent/8 px-2 py-1 text-accent transition-colors group-hover:border-accent/60">
            {step}
          </span>
          {i < steps.length - 1 && <span className="wire mx-1" style={{ "--delay": `${i * 0.35}s` }} aria-hidden />}
        </li>
      ))}
    </ol>
  );
}

function CaseStudy({ study, index }) {
  return (
    <Reveal as="article" delay={(index % 2) * 100} className="group panel panel-hover flex flex-col overflow-hidden">
      <div className="flex items-center gap-3 border-b border-line px-5 py-2.5 font-mono text-[11px] text-subtle">
        <span>PID {1042 + index * 97}</span>
        <span className="flex items-center gap-1.5 text-accent">
          <span className="live-dot !h-1.5 !w-1.5" aria-hidden /> running
        </span>
        <span className="ml-auto uppercase tracking-widest text-cyan">{study.tag}</span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <h3 className="font-mono text-xl font-bold text-white transition-colors group-hover:text-accent sm:text-2xl">
          {study.title}
        </h3>

        <dl className="mt-5 space-y-4 text-sm leading-relaxed">
          <div>
            <dt className="font-mono text-xs text-amber"># problem</dt>
            <dd className="mt-1 text-muted">{study.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-amber"># approach</dt>
            <dd className="mt-1 text-muted">{study.solution}</dd>
          </div>
        </dl>

        <div className="mt-6 rounded-lg border border-line bg-bg/60 p-4">
          <Pipeline steps={study.flow} />
        </div>

        <p className="mt-5 font-mono text-xs leading-relaxed text-ink sm:text-[13px]">
          <span className="text-accent">✓ exit 0 —</span> {study.impact}
        </p>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-6" aria-label="Technologies used">
          {study.stack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

function SideProject({ project }) {
  const host = project.liveUrl.replace("https://", "");
  return (
    <Reveal as="article" className="group grid gap-8 lg:grid-cols-12 lg:items-center">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="window block transition-transform duration-500 group-hover:-translate-y-1 lg:col-span-7"
        aria-label={`Open ${project.title} live demo`}
      >
        <div className="window-bar">
          <span className="dots" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className="mx-auto truncate rounded bg-bg/70 px-3 py-0.5 text-muted">🔒 {host}</span>
        </div>
        <div className="relative aspect-[16/9]">
          <Image
            src={project.image}
            alt={`${project.title} — ${project.category} screenshot`}
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover object-top opacity-90 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>
      </a>
      <div className="lg:col-span-5">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan">{project.category}</p>
        <h3 className="mt-2 font-mono text-3xl font-bold text-white">{project.title}</h3>
        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.stack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            live demo <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            git clone <ArrowUpRight className="h-4 w-4" aria-hidden />
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
          index="03"
          path="work"
          command="ps aux --sort=impact"
          title="Systems in production"
          description="The code is proprietary, so here is the problem, the architecture and the outcome. Watch the packets flow."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {caseStudies.map((study, i) => (
            <CaseStudy key={study.title} study={study} index={i} />
          ))}
        </div>

        <p className="prompt mt-24 mb-8">
          <span className="text-accent">$</span> ls ~/side-projects
        </p>
        <div className="space-y-16">
          {sideProjects.map((project) => (
            <SideProject key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
