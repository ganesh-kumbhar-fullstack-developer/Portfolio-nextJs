import Home from "@/components/home/Home.jsx";
import About from "@/components/about/About.jsx";
import ExperienceSection from "@/components/experience/ExperienceSection.jsx";
import Projects from "@/components/projects/Projects.jsx";
import Skills from "@/components/skills/Skills.jsx";
import EducationSection from "@/components/education/EducationSection.jsx";
import Contact from "@/components/contact/Contact.jsx";
import ContactButtons from "@/components/contactButtons/ContactButtons.jsx";

export default function Page() {
  return (
    <main id="main">
      <Home />
      <About />
      <ExperienceSection />
      <Projects />
      <Skills />
      <EducationSection />
      <Contact />
      <ContactButtons />
    </main>
  );
}
