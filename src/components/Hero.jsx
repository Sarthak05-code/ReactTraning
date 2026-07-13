import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // 1. Added state to track the active tab
  const [activeTab, setActiveTab] = useState("App.jsx");

  useEffect(() => {
    function handleMouseMove(e) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 2. Defined the tabs to easily map over them
  const tabs = ["App.jsx", "Hero.jsx", "Navbar.jsx"];

  // 3. Simple content mapping for the editor body
  const tabContent = {
    "App.jsx":
      "// Main application entry point\nimport Hero from './Hero';\n\nexport default function App() {\n  return <Hero />;\n}",
    "Hero.jsx":
      "// Hero component logic goes here\nexport default function Hero() {\n  return <section>...</section>;\n}",
    "Navbar.jsx":
      "// Navigation bar component\nexport default function Navbar() {\n  return <nav>Links</nav>;\n}",
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-950">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px , rgba(56,130,246,0.15), transparent 40%)`,
        }}
      ></div>
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse pointer-events-none"
        style={{ animationDuration: "4s" }}
      ></div>

      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse pointer-events-none"
        style={{
          animationDuration: "5s",
          animationDelay: "1s",
        }}
      ></div>

      <div className="relative order-2 w-full max-w-3xl mx-auto z-10">
        <div className="relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/10">
          {/* Note: Changed bg-linear-to-br to bg-gradient-to-br for standard Tailwind compatibility */}
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-lg overflow-hidden h-[320px] lg:h-[450px] border border-white/5 flex flex-col w-full">
            {/* IDE Header */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border-b border-white/10">
              <div className="flex space-x-4 items-center">
                <div className="flex space-x-1.5 sm:space-x-2 items-center">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs sm:text-sm text-gray-400 font-medium">
                  Experiments
                </span>
              </div>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 cursor-pointer hover:text-white transition-colors" />
            </div>

            {/* File Tabs */}
            <div className="flex overflow-x-auto border-b border-white/5 bg-black/20">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs sm:text-sm outline-none whitespace-nowrap transition-colors border-t-2 ${
                    activeTab === tab
                      ? "text-blue-400 bg-white/5 border-t-blue-500" // Active styles
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.02] border-t-transparent" // Inactive styles
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Editor Body */}
            <div className="p-4 flex-1 text-gray-300 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
              <span
                className={
                  activeTab === "App.jsx" ? "text-blue-300" : "text-gray-400"
                }
              >
                {tabContent[activeTab]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
