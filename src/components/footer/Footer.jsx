import Link from "next/link";
import { profile, socials, navItems } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg/60">
      <div className="container-page py-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold text-white">{profile.name}</p>
            <p className="mt-1 text-sm text-muted">
              {profile.title} · {profile.focus}
            </p>
            <a href={`mailto:${profile.email}`} className="link mt-4 inline-block text-sm">
              {profile.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:gap-16">
            <nav aria-label="Footer">
              <p className="mb-3 font-medium text-white">Sections</p>
              <ul className="space-y-2">
                {navItems.map(({ id, label }) => (
                  <li key={id}>
                    <Link href={`/#${id}`} className="text-muted hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="mb-3 font-medium text-white">Elsewhere</p>
              <ul className="space-y-2">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white">
                      {s.name} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {profile.name} · gktechhub.com</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
