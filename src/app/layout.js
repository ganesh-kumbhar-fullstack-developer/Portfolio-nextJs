import "./globals.css";
import Navbar from "@/components/navbar/Navbar.jsx";
import Footer from "@/components/footer/Footer.jsx";
import ToastProvider from "@/components/toaster/ToastProvider.jsx";
import JsonLdSchemas from "@/components/seo/JsonLdSchemas.jsx";
import { SITE_URL, profile } from "@/data/portfolio";

const title = `${profile.name} – Software Engineer | Backend & Distributed Systems`;
const description =
  "Ganesh Kumbhar is a software engineer in Pune, India with ~2 years of experience building event-driven systems with Python, FastAPI, RabbitMQ, PostgreSQL and React — real-time alerting for 7,000+ intrusion panels, secure APIs and large-scale data processing.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${profile.name}`,
  },
  description,
  keywords: [
    "Ganesh Kumbhar",
    "Software Engineer Pune",
    "Backend Engineer",
    "Distributed Systems",
    "Python Developer",
    "FastAPI Developer",
    "RabbitMQ",
    "PostgreSQL",
    "React Developer",
    "Full Stack Engineer",
    "Event-driven architecture",
    "GK TechHub",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  publisher: "GK TechHub",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "GK TechHub",
    locale: "en_IN",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport = {
  themeColor: "#07060b",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JS runs, so content is never hidden without it */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-strong focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <JsonLdSchemas />
        <ToastProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
