import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Work from './components/Work'
import WhatWeBuild from './components/WhatWeBuild'
import UseCaseStudy from './components/UseCaseStudy'
import FromIdeaToLaunch from './components/FromIdeaToLaunch'
import StartWhereYouAre from './components/StartWhereYouAre'
import SeniorLedStudio from './components/SeniorLedStudio'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import ScrollStar from './components/ScrollStar'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <ScrollStar />
      <Navbar />
      <Hero />
      <Work />
      <WhatWeBuild />
      <UseCaseStudy />
      <FromIdeaToLaunch />
      <StartWhereYouAre />
      <SeniorLedStudio />
      <FAQ />
      <Footer />
    </div>
  )
}

export default App
