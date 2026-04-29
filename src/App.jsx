import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import EligibilityTool from './components/EligibilityTool'
import Timeline from './components/Timeline'
import FormGuide from './components/FormGuide'
import Checklist from './components/Checklist'
import Footer from './components/Footer'
import PromptModalFAB from './components/PromptModalFAB'

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <Hero />
        <EligibilityTool />
        <Timeline />
        <FormGuide />
        <Checklist />
      </main>
      <Footer />
      <PromptModalFAB />
    </div>
  )
}

export default App
