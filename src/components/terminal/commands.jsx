import {
  profile,
  experience,
  caseStudies,
  skillGroups,
  education,
  certifications,
  socials,
  RESUME_PATH,
} from "@/data/portfolio";

const A = ({ children }) => <span className="text-accent">{children}</span>;
const C = ({ children }) => <span className="text-cyan">{children}</span>;
const Y = ({ children }) => <span className="text-amber">{children}</span>;
const M = ({ children }) => <span className="text-muted">{children}</span>;

const FILES = {
  "about.txt": "about",
  "experience.log": "experience",
  "projects/": "work",
  "skills.json": "skills",
  "education.txt": "education",
  "certs/": "certs",
  "contact.sh": "contact",
  "resume.pdf": "resume",
};

const SECTIONS = ["home", "about", "experience", "work", "skills", "education", "contact"];

export const HELP = [
  ["whoami", "who is this guy?"],
  ["about", "short summary"],
  ["experience", "where I've worked"],
  ["work", "engineering case studies"],
  ["skills", "the toolbox"],
  ["education", "degree, achievements"],
  ["certs", "certifications"],
  ["contact", "ways to reach me"],
  ["resume", "download my resume"],
  ["neofetch", "system info"],
  ["cd <section>", "jump to a section"],
  ["ls / cat <file>", "browse files"],
  ["sudo hire-me", "you know you want to"],
  ["clear", "clear the screen"],
];

export const COMMAND_NAMES = [
  ...HELP.map(([c]) => c.split(" ")[0]),
  "github",
  "linkedin",
  "socials",
  "date",
  "echo",
  "history",
  "exit",
];

export const FILE_NAMES = Object.keys(FILES);

function list(items) {
  return (
    <ul className="space-y-0.5">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

/**
 * Runs a command line. Returns output (ReactNode | null) and optional side effects
 * through `ctx` ({ clear, navigate, history, exit }).
 */
export function run(input, ctx) {
  const raw = input.trim();
  if (!raw) return null;
  const [cmd, ...args] = raw.split(/\s+/);
  const arg = args.join(" ");

  switch (cmd.toLowerCase()) {
    case "help":
      return (
        <div>
          <p className="mb-1">
            <M>available commands:</M>
          </p>
          <div className="grid grid-cols-[minmax(8rem,auto)_1fr] gap-x-4">
            {HELP.map(([c, d]) => (
              <div key={c} className="contents">
                <A>{c}</A>
                <M>{d}</M>
              </div>
            ))}
          </div>
        </div>
      );

    case "whoami":
      return (
        <p>
          <A>{profile.name.toLowerCase()}</A> — {profile.title.toLowerCase()} ({profile.focus.toLowerCase()}).{" "}
          <M>~2 yrs shipping production systems from {profile.location.split(",")[0]}.</M>
        </p>
      );

    case "about":
      return <p className="max-w-prose">{profile.summary}</p>;

    case "experience":
    case "exp":
      return (
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
          {experience.map((j) => (
            <div key={j.company} className="contents">
              <Y>{j.period}</Y>
              <span>
                <A>{j.role}</A> <M>@</M> {j.company}
                {j.current && <C> [current]</C>}
              </span>
            </div>
          ))}
        </div>
      );

    case "work":
    case "projects":
      return list(
        caseStudies.map((s, i) => (
          <>
            <M>{String(i + 1).padStart(2, "0")}.</M> <A>{s.title}</A> <M>— {s.impact}</M>
          </>
        )),
      );

    case "skills":
      return (
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5">
          {skillGroups.map((g) => (
            <div key={g.title} className="contents">
              <C>{g.title.toLowerCase()}</C>
              <span>{g.items.join(", ")}</span>
            </div>
          ))}
        </div>
      );

    case "education":
    case "edu":
      return (
        <p>
          <A>{education.degree}</A>
          <br />
          {education.institution} <M>· {education.period} · {education.grade}</M>
        </p>
      );

    case "certs":
      return list(
        certifications.map((c) => (
          <>
            <M>-r--r--r--</M> <C>{c.provider.toLowerCase()}</C>{" "}
            <a href={c.href} target="_blank" rel="noopener noreferrer" className="underline decoration-accent/40 hover:text-accent">
              {c.title}
            </a>
          </>
        )),
      );

    case "contact":
      return list([
        <>
          <C>email </C>{" "}
          <a className="text-accent hover:underline" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </>,
        <>
          <C>phone </C> {profile.phone}
        </>,
        ...socials.map((s) => (
          <>
            <C>{s.name.toLowerCase().padEnd(6, " ")}</C>{" "}
            <a className="hover:text-accent" href={s.href} target="_blank" rel="noopener noreferrer">
              {s.href.replace("https://", "")}
            </a>
          </>
        )),
      ]);

    case "socials":
      return run("contact", ctx);

    case "github":
    case "linkedin": {
      const s = socials.find((x) => x.name.toLowerCase() === cmd.toLowerCase());
      window.open(s.href, "_blank", "noopener");
      return <M>opening {s.href} …</M>;
    }

    case "resume": {
      const a = document.createElement("a");
      a.href = RESUME_PATH;
      a.download = "";
      a.click();
      return (
        <p>
          <A>✓</A> downloading resume.pdf <M>— thanks for your interest!</M>
        </p>
      );
    }

    case "neofetch":
      return (
        <div className="flex gap-4">
          <pre className="hidden whitespace-pre text-[10px] leading-[1.15] text-accent sm:block">{` ██████╗ ██╗  ██╗
██╔════╝ ██║ ██╔╝
██║  ███╗█████╔╝
██║   ██║██╔═██╗
╚██████╔╝██║  ██╗
 ╚═════╝ ╚═╝  ╚═╝`}</pre>
          <div>
            <p>
              <A>ganesh</A>@<A>kumbhar</A>
            </p>
            <p>
              <C>role</C>: {profile.title}
            </p>
            <p>
              <C>host</C>: {profile.currentCompany}
            </p>
            <p>
              <C>uptime</C>: ~2 years
            </p>
            <p>
              <C>stack</C>: {profile.stack}
            </p>
            <p>
              <C>loc</C>: {profile.location}
            </p>
          </div>
        </div>
      );

    case "ls":
      return (
        <p className="flex flex-wrap gap-x-5">
          {FILE_NAMES.map((f) => (f.endsWith("/") ? <C key={f}>{f}</C> : <span key={f}>{f}</span>))}
        </p>
      );

    case "cat": {
      if (!arg) return <M>usage: cat &lt;file&gt; — try `ls`</M>;
      const target = FILES[arg] ?? FILES[`${arg}/`];
      if (!target) return <span className="text-danger">cat: {arg}: No such file or directory</span>;
      return run(target, ctx);
    }

    case "cd":
    case "open": {
      const target = arg.replace(/^[~/.]+/, "").replace(/\/$/, "").toLowerCase() || "home";
      const id = target === "projects" ? "work" : target === "exp" ? "experience" : target;
      if (!SECTIONS.includes(id)) {
        return <span className="text-danger">cd: no such section: {arg}. try: {SECTIONS.join(", ")}</span>;
      }
      ctx.navigate(id);
      return <M>→ ~/{id}</M>;
    }

    case "sudo":
      if (/hire/i.test(arg)) {
        setTimeout(() => {
          window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Let's talk about a role")}`;
        }, 900);
        return (
          <div>
            <p>
              <M>[sudo] password for recruiter:</M> ********
            </p>
            <p>
              <A>✓ access granted.</A> excellent decision. opening your mail client…
            </p>
          </div>
        );
      }
      return <span className="text-danger">guest is not in the sudoers file. This incident will be reported. (try `sudo hire-me`)</span>;

    case "rm":
      return <span className="text-danger">rm: refusing to touch production. nice try 😉</span>;

    case "date":
      return <span>{new Date().toString()}</span>;

    case "echo":
      return <span>{arg}</span>;

    case "history":
      return list(ctx.history.map((h, i) => <><M>{String(i + 1).padStart(3, " ")}</M>  {h}</>));

    case "clear":
      ctx.clear();
      return null;

    case "exit":
      if (ctx.exit) {
        ctx.exit();
        return null;
      }
      return <M>there is no escape. but `contact` works.</M>;

    case "hack":
    case "matrix":
      return <A>wake up, recruiter… the matrix has you. follow the white rabbit → `sudo hire-me`</A>;

    default:
      return (
        <span>
          <span className="text-danger">command not found: {cmd}</span> <M>— type `help`</M>
        </span>
      );
  }
}
