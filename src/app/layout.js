import "./globals.css";
import { JetBrains_Mono, Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar.jsx";
import Footer from "@/components/footer/Footer.jsx";
import ToastProvider from "@/components/toaster/ToastProvider.jsx";
import JsonLdSchemas from "@/components/seo/JsonLdSchemas.jsx";
import BootScreen from "@/components/fx/BootScreen.jsx";
import BackgroundFX from "@/components/fx/BackgroundFX.jsx";
import TerminalLauncher from "@/components/terminal/TerminalLauncher.jsx";
import { SITE_URL, profile } from "@/data/portfolio";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const title = `${profile.name} – Software Engineer | Backend & Distributed Systems`;
const description =
  "Ganesh Kumbhar is a software engineer in Pune, India with ~2 years of experience building event-driven systems with Python, FastAPI, RabbitMQ, PostgreSQL and React — real-time alerting for 7,000+ intrusion panels, secure APIs and large-scale data processing.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ${profile.name}` },
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
  openGraph: { title, description, url: SITE_URL, siteName: "GK TechHub", locale: "en_IN", type: "profile" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport = {
  themeColor: "#05070a",
  colorScheme: "dark",
};

// Runs before paint: enables JS-only styles and skips the boot screen if already seen
// this session or if the visitor prefers reduced motion.
const prePaintScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('gk-booted')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('booted')}sessionStorage.setItem('gk-booted','1')}catch(e){d.classList.add('booted')}})()`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${mono.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaintScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-bg"
        >
          Skip to content
        </a>
        <BootScreen />
        <BackgroundFX />
        <div className="crt" aria-hidden />
        <JsonLdSchemas />
        <ToastProvider />
        <Navbar />
        {children}
        <Footer />
        <TerminalLauncher />
      </body>
    </html>
  );
}
