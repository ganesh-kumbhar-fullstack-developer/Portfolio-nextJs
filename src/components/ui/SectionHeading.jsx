import Reveal from "./Reveal.jsx";

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>}
    </Reveal>
  );
}
