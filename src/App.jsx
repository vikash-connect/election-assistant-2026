import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import LiveElectionData from './components/LiveElectionData'
import VoterTools from './components/VoterTools'
import ElectionTimeline from './components/ElectionTimeline'
import FormGuide from './components/FormGuide'
import Checklist from './components/Checklist'
import StateResources from './components/StateResources'
import Footer from './components/Footer'
import PromptModalFAB from './components/PromptModalFAB'
import ErrorBoundary from './components/ErrorBoundary'
import HealthCheck from './components/HealthCheck'

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <LiveElectionData />
      <main className="flex-grow">
        <Hero />
        <VoterTools />
        <ElectionTimeline />
        <FormGuide />
        <Checklist />
        <StateResources />
      </main>
      <Footer />
      <PromptModalFAB />
      <HealthCheck />
    </div>
    </ErrorBoundary>
  )
}

export default App
