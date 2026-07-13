export const codeExample = {
  "App.jsx": `import Navbar from "./Navbar";
import Hero from "./Hero";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;`,

  "Hero.jsx": `function Hero() {
  return (
    <section className="hero">
      <h1>Welcome to React</h1>
      <p>Build modern web applications with reusable components.</p>
      <button>Get Started</button>
    </section>
  );
}

export default Hero;`,

  "Navbar.jsx": `function Navbar() {
  return (
    <nav className="navbar">
      <h2>MyApp</h2>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;`,
};