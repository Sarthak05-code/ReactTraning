import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    // Added bg-gray-950 so the white text/borders show up properly
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-950">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none" // Added pointer-events-none so it doesn't block interactions
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

      {/* Added max-w-3xl mx-auto and z-10 for proper sizing and layering */}
      <div className="relative order-2 w-full max-w-3xl mx-auto z-10">
        <div className="relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/10">
          
          {/* Removed the restrictive sm:w-[350px] so it fills the container nicely. Made it a flex column. */}
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

            {/* File Tabs (Fixed the unstyled buttons) */}
            <div className="flex overflow-x-auto border-b border-white/5 bg-black/20">
              <button className="px-4 py-2 text-xs sm:text-sm text-blue-400 bg-white/5 border-t-2 border-t-blue-500 outline-none whitespace-nowrap">
                App.jsx
              </button>
              <button className="px-4 py-2 text-xs sm:text-sm text-gray-400 hover:text-gray-200 hover:bg-white/[0.02] transition-colors outline-none whitespace-nowrap">
                Hero.jsx
              </button>
              <button className="px-4 py-2 text-xs sm:text-sm text-gray-400 hover:text-gray-200 hover:bg-white/[0.02] transition-colors outline-none whitespace-nowrap">
                Navbar.jsx
              </button>
            </div>

            {/* Empty Editor Body for completeness */}
            <div className="p-4 flex-1 text-gray-300 font-mono text-sm overflow-y-auto">
                <span className="text-gray-500 italic"></span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}