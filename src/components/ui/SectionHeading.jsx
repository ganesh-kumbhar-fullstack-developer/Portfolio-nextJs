import Reveal from "./Reveal.jsx";
import ScrambleText from "@/components/fx/ScrambleText.jsx";

// Shell-prompt style heading: `ganesh@os:~/path$ command` then a decoded title.
export default function SectionHeading({ index, path, command, title, description }) {
  return (
    <Reveal className="mb-14 max-w-3xl">
      <p className="prompt">
        <span className="text-accent">ganesh@os</span>
        <span>:</span>
        <span className="text-cyan">~/{path}</span>
        <span>$ </span>
        <span className="text-ink">{command}</span>
      </p>
      <h2 className="mt-4 flex items-baseline gap-4 font-mono text-3xl font-bold tracking-tight text-white sm:text-5xl">
        <span className="text-base font-normal text-accent sm:text-lg">{index}</span>
        <ScrambleText text={title} className="text-balance" />
      </h2>
      {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </Reveal>
  );
}
