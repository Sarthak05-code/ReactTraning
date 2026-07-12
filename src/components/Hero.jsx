import { useEffect } from "react"
import { useState } from "react"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function handleMouseMove(e) {
    setMousePosition({x : e.clientX,y : e.clientY})
    }
    window.addEventListener("mousemove", handleMouseMove)

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      <div className="absolute inset-0 opacity-30" style={{
        background : `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px , rgba(56,130,246,0.15), transparent 40%)`
      }}></div>
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse"
        style={{ animationDuration: "4s" }}
      ></div>
      
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse"
        style={{
          animationDuration: "5s",
          animationDelay: "1s",
        }}
      ></div>

      <div>
        <div>
          <div></div>
        </div>
      </div>

      
    </section>
  )
}