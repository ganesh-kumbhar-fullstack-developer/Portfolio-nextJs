import { Mail, Phone, MapPin, Briefcase } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading.jsx";
import Reveal from "@/components/ui/Reveal.jsx";
import { profile, aboutPoints } from "@/data/portfolio";

export default function About() {
  const facts = [
    { icon: Briefcase, label: "Currently", value: profile.currentCompany },
    { icon: MapPin, label: "Based in", value: profile.location },
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone, href: profile.phoneHref },
  ];

  return (
    <section id="about" className="section">
      <div className="container-page">
        <SectionHeading eyebrow="About" title="Engineering systems that stay up when it matters" />

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            <p>{profile.summary}</p>
            <p>
              Right now I work on <span className="text-ink">SentrixAI</span>, an intrusion-monitoring platform for
              banks, retail chains and ATM sites. Before that I spent over a year shipping MERN applications used by
              thousands of people every day.
            </p>
            <p>
              I&apos;m happiest when a problem involves concurrency, correctness and scale — and when the fix is simple
              enough that the next engineer understands it.
            </p>
          </Reveal>

          <Reveal delay={100} as="ul" className="card divide-y divide-line self-start">
            {facts.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-4 p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-subtle">{label}</span>
                  {href ? (
                    <a href={href} className="block truncate text-sm text-ink hover:text-brand-soft">
                      {value}
                    </a>
                  ) : (
                    <span className="block truncate text-sm text-ink">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aboutPoints.map((point, i) => (
            <Reveal key={point.title} delay={i * 70} className="card card-hover p-5">
              <h3 className="text-sm font-semibold text-white">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
