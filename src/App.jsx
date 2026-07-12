import Navbar from "./components/Navbar"
import Pricing from "./components/Pricing"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Testimonial from "./components/Testimonial"
import Footer from "./components/Footer"
function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">

      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Testimonial />
      <Footer /> 
      
    </div>
  )
}
export default App