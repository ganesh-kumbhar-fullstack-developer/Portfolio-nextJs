import Link from "next/link";
import { profile, socials, navItems } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg/80 font-mono">
      <div className="container-page pt-12 pb-24 sm:pb-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm text-subtle">
              <span className="text-accent">$</span> echo &quot;thanks for scrolling&quot;
            </p>
            <p className="mt-3 text-2xl font-bold text-white">
              {profile.name.split(" ")[0].toLowerCase()}
              <span className="text-accent">.</span>
              {profile.name.split(" ")[1].toLowerCase()}
              <span className="cursor" aria-hidden />
            </p>
            <a href={`mailto:${profile.email}`} className="mt-3 inline-block text-sm text-muted transition-colors hover:text-accent">
              {profile.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-12 text-xs">
            <nav aria-label="Footer">
              <p className="mb-3 text-subtle">{"// sections"}</p>
              <ul className="space-y-2">
                {navItems.map(({ id, label }, i) => (
                  <li key={id}>
                    <Link href={`/#${id}`} className="text-muted transition-colors hover:text-accent">
                      <span className="text-subtle">{i + 1}</span> {label.toLowerCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="mb-3 text-subtle">{"// elsewhere"}</p>
              <ul className="space-y-2">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-accent">
                      {s.name.toLowerCase()} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[11px] text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name} · <span className="text-accent">[process exited with code 0]</span>
          </p>
          <p className="hidden lg:block">
            tip: press <kbd className="rounded border border-line-2 px-1">1</kbd>–<kbd className="rounded border border-line-2 px-1">6</kbd> to
            jump · <kbd className="rounded border border-line-2 px-1">~</kbd> for terminal
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-ink">
              privacy
            </Link>
            <Link href="/terms-of-service" className="hover:text-ink">
              terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
