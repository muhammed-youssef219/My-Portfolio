
import './App.css'

import Hero from './components/Hero'
import FeaturedProjects from './components/FeaturedProjects'
import About from './components/About'
import SkillsTechnologies from './components/SkillsTechnologies'
import Certifications from './components/Certifications'
import FinalCTAContact from './components/FinalCTAContact'
import PremiumFooter from './components/PremiumFooter'
import Navbar from './components/Navbar'
import { useScrollRestoration } from './hooks/useScrollRestoration'

export default function App() {
  useScrollRestoration()

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <FeaturedProjects />
      <SkillsTechnologies />
      <Certifications />
      <FinalCTAContact />
      <PremiumFooter />
    </>
  )
}






