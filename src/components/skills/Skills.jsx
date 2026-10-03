import SectionHeading from "@/components/ui/SectionHeading.jsx";
import Reveal from "@/components/ui/Reveal.jsx";
import { skillGroups } from "@/data/portfolio";

const key = (title) =>
  title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z]+(.)/g, (_, c) => c.toUpperCase());

export default function Skills() {
  const all = skillGroups.flatMap((g) => g.items);
  const n = skillGroups.length;

  return (
    <section id="skills" className="section overflow-hidden">
      <div className="container-page">
        <SectionHeading
          index="04"
          path="skills"
          command="cat stack.ts"
          title="The toolbox"
          description="Backend-first, comfortable across the stack, with security built in."
        />

        <Reveal className="window">
          <div className="window-bar">
            <span className="dots" aria-hidden>
              <i />
              <i />
              <i />
            </span>
            <span className="rounded-t border-x border-t border-line bg-surface px-3 py-0.5 text-ink">stack.ts</span>
            <span className="hidden sm:inline">README.md</span>
            <span className="ml-auto hidden sm:inline">TypeScript · UTF-8</span>
          </div>
          <pre className="overflow-x-auto p-0 font-mono text-[12px] leading-7 sm:text-[13.5px]">
            <code className="block py-4">
              <Row n={1}>
                <span className="text-subtle">{"// things I use to ship reliable systems"}</span>
              </Row>
              <Row n={2}>
                <span className="text-violet">export const</span> <span className="text-cyan">stack</span>{" "}
                <span className="text-muted">=</span> {"{"}
              </Row>
              {skillGroups.map((g, i) => (
                <Row key={g.title} n={i + 3} indent>
                  <span className="text-ink">{key(g.title)}</span>
                  <span className="text-muted">: [</span>
                  {g.items.map((item, j) => (
                    <span key={item}>
                      <span className="rounded px-0.5 text-amber transition-colors hover:bg-accent/15 hover:text-accent">
                        &quot;{item}&quot;
                      </span>
                      {j < g.items.length - 1 && <span className="text-muted">, </span>}
                    </span>
                  ))}
                  <span className="text-muted">],</span>
                </Row>
              ))}
              <Row n={n + 3}>
                {"}"} <span className="text-violet">as const</span>;
              </Row>
              <Row n={n + 4}>
                <span className="text-subtle">{`// ${all.length} tools · always learning`}</span>
                <span className="cursor" aria-hidden />
              </Row>
            </code>
          </pre>
        </Reveal>
      </div>

      {/* Ticker band */}
      <div className="mt-16 border-y border-line bg-surface/50 py-4" aria-hidden>
        <div className="flex w-max marquee font-mono text-sm text-subtle">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0">
              {all.map((s) => (
                <span key={s} className="px-5">
                  <span className="text-accent">◆</span> {s}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ n, indent, children }) {
  return (
    <span className="grid grid-cols-[2.5rem_1fr] hover:bg-white/2 sm:grid-cols-[3.5rem_1fr]">
      <span className="select-none pr-4 text-right text-subtle/60">{n}</span>
      <span className={`whitespace-pre-wrap pr-4 ${indent ? "pl-4 sm:pl-6" : ""}`}>{children}</span>
    </span>
  );
}
