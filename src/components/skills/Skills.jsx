import { Code2, Server, LayoutTemplate, Database, Cloud, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading.jsx";
import Reveal from "@/components/ui/Reveal.jsx";
import { skillGroups } from "@/data/portfolio";

const icons = {
  Languages: Code2,
  "Backend & Systems": Server,
  Frontend: LayoutTemplate,
  Databases: Database,
  "Cloud & Tools": Cloud,
  Security: ShieldCheck,
};

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Skills"
          title="The toolbox"
          description="Backend-first, comfortable across the stack — and the tools I reach for to keep systems secure and observable."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = icons[group.title] ?? Code2;
            return (
              <Reveal key={group.title} delay={(i % 3) * 70} className="card card-hover p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <h3 className="font-semibold text-white">{group.title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="chip text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
