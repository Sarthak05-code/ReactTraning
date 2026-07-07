import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import profile from "./assets/ReoMikage.png";

function App() {
  return (
    <>
      <Navbar title="My Portfolio" />

      <Hero
        image={profile}
        name="Sarthak"
        role="Frontend Learner"
      />

      <About
        description="I am learning React and Tailwind CSS."
      />

      <Skills
        skills={[
          "HTML",
          "CSS",
          "JavaScript",
          "React",
          "Tailwind"
        ]}
      />

      <Projects
        projects={[
          {
            id: 1,
            title: "Calculator",
            tech: "HTML CSS JavaScript"
          },
          {
            id: 2,
            title: "Portfolio",
            tech: "React"
          },
          {
            id: 3,
            title: "Weather App",
            tech: "React API"
          }
        ]}
      />

      <Contact
        email="sarthak@example.com"
        phone="+977 98XXXXXXXX"
      />

      <Footer
        copyright="© 2026 Sarthak"
      />
    </>
  );
}

export default App;