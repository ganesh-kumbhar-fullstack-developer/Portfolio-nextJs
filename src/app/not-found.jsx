import Link from "next/link";

export const metadata = { title: "404 – command not found" };

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[85vh] items-center pt-14">
      <div className="container-page">
        <div className="window mx-auto max-w-2xl">
          <div className="window-bar">
            <span className="dots" aria-hidden>
              <i />
              <i />
              <i />
            </span>
            <span>bash — 404</span>
          </div>
          <div className="space-y-2 p-6 font-mono text-sm sm:p-8">
            <p>
              <span className="text-accent">guest@ganesh-os</span>:<span className="text-cyan">~</span>$ cd ./this-page
            </p>
            <p className="text-danger">bash: cd: ./this-page: No such file or directory</p>
            <p className="pt-4 text-6xl font-extrabold text-white glow sm:text-8xl">404</p>
            <p className="text-muted">The page you were looking for has been moved, deleted, or never existed.</p>
            <div className="flex flex-wrap gap-3 pt-6">
              <Link href="/" className="btn btn-primary">
                cd ~ (home)
              </Link>
              <Link href="/#work" className="btn btn-ghost">
                view work
              </Link>
              <Link href="/#contact" className="btn btn-ghost">
                contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
