import { SITE_URL, profile, socials, skillGroups, experience, education } from "@/data/portfolio";

// Rendered on the server once, from the same data as the page.
export default function JsonLdSchemas() {
  const current = experience.find((e) => e.current);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.summary,
    url: SITE_URL,
    email: `mailto:${profile.email}`,
    telephone: profile.phone.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    worksFor: current ? { "@type": "Organization", name: current.company } : undefined,
    alumniOf: { "@type": "CollegeOrUniversity", name: education.institution },
    knowsAbout: skillGroups.flatMap((g) => g.items),
    sameAs: socials.map((s) => s.href),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GK TechHub – Portfolio of Ganesh Kumbhar",
    alternateName: ["Ganesh Kumbhar Portfolio", "GK TechHub", "gktechhub"],
    url: SITE_URL,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([person, website]) }}
    />
  );
}
