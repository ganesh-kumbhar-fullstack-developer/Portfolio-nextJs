import SectionHeading from "@/components/ui/SectionHeading.jsx";
import Reveal from "@/components/ui/Reveal.jsx";
import ContactForm from "@/components/forms/ContactForm.jsx";
import CopyEmail from "@/components/ui/CopyEmail.jsx";
import { profile, socials } from "@/data/portfolio";

export default function Contact() {
  const entries = [
    ["email", profile.email, `mailto:${profile.email}`],
    ["phone", profile.phone, profile.phoneHref],
    ["whatsapp", profile.phone, `https://wa.me/${profile.whatsapp}`],
    ...socials.map((s) => [s.name.toLowerCase(), s.href.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, ""), s.href]),
    ["location", `${profile.location.split(",")[0]}, IN · open to remote`],
  ];

  return (
    <section id="contact" className="section">
      <div className="container-page">
        <SectionHeading
          index="06"
          path="contact"
          command="./send_message.sh"
          title="Open a connection"
          description="Hiring for a backend or full-stack role, or have a system that needs to scale? Ping me. I usually reply within a day."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="window self-start lg:col-span-5">
            <div className="window-bar">
              <span className="dots" aria-hidden>
                <i />
                <i />
                <i />
              </span>
              <span>contact.json</span>
              <CopyEmail email={profile.email} />
            </div>
            <div className="p-5 font-mono text-[12.5px] leading-7 sm:text-[13px]">
              <p className="text-muted">{"{"}</p>
              {entries.map(([k, v, href], i) => (
                <p key={k} className="truncate pl-4 sm:pl-6">
                  <span className="text-cyan">&quot;{k}&quot;</span>
                  <span className="text-muted">: </span>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-amber underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                    >
                      &quot;{v}&quot;
                    </a>
                  ) : (
                    <span className="text-amber">&quot;{v}&quot;</span>
                  )}
                  {i < entries.length - 1 && <span className="text-muted">,</span>}
                </p>
              ))}
              <p className="text-muted">{"}"}</p>
            </div>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
