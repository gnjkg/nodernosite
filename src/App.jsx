import SmoothScroll from '@/components/shared/SmoothScroll'
import About from '@/sections/About'
import Footer from '@/sections/Footer'
import Hero from '@/sections/Hero'
import IotSection from '@/sections/IotSection'
import Contact from '@/sections/Contact'
import ProcessSection from '@/sections/ProcessSection'
import Services from '@/sections/Services'
import { Analytics } from "@vercel/analytics/next"
const App = () => {
  return (
    <div className="min-h-screen bg-[#1C324C] text-white">
      <SmoothScroll />
      <main>
        <Hero />
        <Services />
        <IotSection />
        <ProcessSection />
        <About />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default App
