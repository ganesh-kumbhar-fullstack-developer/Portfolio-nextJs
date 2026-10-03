import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading.jsx";
import Reveal from "@/components/ui/Reveal.jsx";
import ContactForm from "@/components/forms/ContactForm.jsx";
import { profile, socials } from "@/data/portfolio";

export default function Contact() {
  const channels = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone / WhatsApp", value: profile.phone, href: profile.phoneHref },
    { icon: MapPin, label: "Location", value: `${profile.location} · open to remote` },
  ];

  return (
    <section id="contact" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something reliable together"
          description="Hiring for a backend or full-stack role, or have a system that needs to scale? Send me a message — I usually reply within a day."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="space-y-3">
            {channels.map(({ icon: Icon, label, value, href }) => {
              const body = (
                <>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-subtle">{label}</span>
                    <span className="block truncate text-sm text-ink">{value}</span>
                  </span>
                </>
              );
              return href ? (
                <a key={label} href={href} className="card card-hover flex items-center gap-4 p-4">
                  {body}
                </a>
              ) : (
                <div key={label} className="card flex items-center gap-4 p-4">
                  {body}
                </div>
              );
            })}

            <div className="flex flex-wrap gap-2 pt-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost py-2"
                >
                  {s.name}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
